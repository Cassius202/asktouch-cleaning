'use server'

import { ClientFormData } from "@/constants/types";
import { createClient } from "@/lib/supabase/client"; // Use client component, not server
import { sendCompletedClientEmails } from "./emailActiont";

export async function completedClientUpload(formData: ClientFormData, requestReview: boolean, sendThankYou: boolean) {
  const supabase = createClient();

  try {
    // 1. Create new client record
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          service: formData.service,
          note: formData.note || null,
        }
      ])
      .select() // Return the inserted data
      .single(); // Expect a single record back

    if (clientError) {
      console.error('Error inserting client:', clientError);
      return { success: false, error: clientError.message };
    }

    const url = process.env.GOOGLE_SHEET_URL;
    const sheetResponse = await fetch(url!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        service: formData.service,
        note: formData.note ?? '',
        sheetName: "Completed Clients"
      }),
    });

    const sheetResult = await sheetResponse.json();
    if (!sheetResponse.ok) {
      console.error('Client Spreadsheet error: ', sheetResult.message);
      return { success: false, error: 'Spreadsheet error' };
    }

    // 2. Handle review request if needed
    if (requestReview && clientData) {
      const emailResult = await sendCompletedClientEmails(formData, requestReview, sendThankYou);

      if (!emailResult.success) {
        console.error('Email sending error:', emailResult.message);
        return { success: false, error: emailResult.message };
      }
    }

    return {
      success: true,
      data: clientData,
      message: 'Client data added successfully'
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}