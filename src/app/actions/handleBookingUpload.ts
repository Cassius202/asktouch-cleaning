'use server';

import { info } from "@/constants/data";
import { BookingFormData } from "@/constants/types";
import { BookingConfirmationEmail } from "@/templates/BookingConfirmationEmail";
import { AdminBookingNotificationEmail } from "@/templates/AdminBookingNotificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleBookingUpload(data: BookingFormData) {
  const fullData = {
    ...data,
    sheetName: "Bookings",
  };
  
  // Submit to spreadsheet
  const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullData),
  });

  if (!response.ok) {
    console.error('Booking Spreadsheet Error:', await response.json());
    return { success: false, message: 'Failed to save to spreadsheet' };
  }

  // Send confirmation email to customer
  const { data: customerEmailData, error: customerEmailError } = await resend.emails.send({
    from: `Ask Touch <${info.bookingEmail}>`,
    to: [data.email],
    subject: `Booking Confirmation`,
    react: BookingConfirmationEmail({ data }),
  });

  if (customerEmailError) {
    console.error('Customer Email Error:', customerEmailError);
    // Still continue to try sending owner email
  }

  // Send notification email to owner/admin
  const { data: ownerEmailData, error: ownerEmailError } = await resend.emails.send({
    from: `Ask Touch <${info.bookingEmail}>`,
    to: [info.bookingEmail],
    subject: `New Booking Request: ${data.service} - ${data.name}`,
    react: AdminBookingNotificationEmail({ data }),
  });

  if (ownerEmailError) {
    console.error('Owner Email Error:', ownerEmailError);
    // Return appropriate response
    return { 
      success: true, 
      message: "Booking saved but owner notification failed",
      customerEmailSent: !customerEmailError,
      ownerEmailError: ownerEmailError.message
    };
  }

  return {
    success: true,
    message: "Booking Successful! Check your email for confirmation.",
    customerEmailSent: !customerEmailError,
    ownerEmailSent: !ownerEmailError,
  };
}