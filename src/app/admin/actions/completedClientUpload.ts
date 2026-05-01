'use client'

import { ClientFormData } from "@/constants/types";
import { createClient } from "@/lib/supabase/client"; // Use client component, not server

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
          note: formData.note || null, // Ensure null instead of empty string
        }
      ])
      .select() // Return the inserted data
      .single(); // Expect a single record back

    if (clientError) {
      console.error('Error inserting client:', clientError);
      return { success: false, error: clientError.message };
    }

    // 2. Handle review request if needed
    if (requestReview && clientData) {
      // Call your review request API/function here
      console.log(`Sending review request to ${formData.email}`);
      // Example: await sendReviewRequest(clientData.id, formData.email);
    }

    // 3. Handle thank you message if needed
    if (sendThankYou && clientData) {
      // Call your thank you message API/function here
      console.log(`Sending thank you message to ${formData.email}`);
      // Example: await sendThankYouMessage(clientData.id, formData.email);
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