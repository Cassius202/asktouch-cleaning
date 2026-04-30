'use server'

import { EmailData } from "./handleContactUpload";
import { Resend } from "resend";
import { ThankYouEmail } from '@/templates/Thankyou';
import { resendRecepients } from "@/constants/assets";
import { AdminEmail } from "@/templates/AdminEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmailContact(data: EmailData) {

   const { data: adminEmailResponse, error: adminError } = await resend.emails.send({
    from: 'Ask Touch <onboarding@resend.dev>',
    to: resendRecepients,
    subject: 'New Booking Request from ' + data.name,
    react: AdminEmail({ data }),
  });

  if (adminError) {
    console.error('Resend error:', adminError);
    return {
      success: false,
      message: 'failed to alert admin'
    }
  }


  const { data: clientEmailResponse, error: clientError } = await resend.emails.send({
    from: 'Ask Touch <onboarding@resend.dev>',
    to: data.email.trim(),
    subject: `New Booking Request from ${data.name}`,
    react: ThankYouEmail({ data }), 
  });

  if (clientError) {
    console.error('Resend error:', clientError); //admin email sent already
  }
  
  return {
    success: true,
    clientMessageSent: clientError ? false : true,
    message: "Thank you, Your message has been received." 
  };
} 