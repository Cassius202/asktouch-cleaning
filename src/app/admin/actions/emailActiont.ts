'use server'

import { info } from "@/constants/data";
import { ClientFormData } from "@/constants/types";
import ThankYouEmail from "@/templates/ThankYouEmail";
import ReviewRequestEmail from "@/templates/ReviewRequestEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCompletedClientEmails(formData: ClientFormData, requestReview: boolean, sendThankYou: boolean) {

  const service = formData.service.trim().toLowerCase() === 'both' ? 'cleaning & fumigation' : formData.service.trim().toLowerCase();

  let thankYouEmailSent: boolean = false;

  if (sendThankYou) {
    const { data: clientEmailResponse, error: clientError } = await resend.emails.send({
      from: `Ask Touch <${info.contactEmail}>`,
      to: formData.email.trim(),
      subject: 'Thank you for booking with Ask Touch Cleaning & Fumigation',
      react: ThankYouEmail({ name: formData.name, service }),
    });

    if (clientError) {
      console.error('Resend error (thank you email):', clientError);
    } else {
      thankYouEmailSent = true;
      console.log('Thank you email sent successfully:', clientEmailResponse);
    }
  }

  let reviewEmailSent: boolean = false;

  if (requestReview) {
    const { data: reviewRequestEmailResponse, error: reviewRequestError } = await resend.emails.send({
      from: `Ask Touch <${info.contactEmail}>`,
      to: formData.email.trim(),
      subject: 'Share Your Experience with Ask Touch',
      react: ReviewRequestEmail({ name: formData.name, service}),
    });

    if (reviewRequestError) {
      console.error('Resend error (review request):', reviewRequestError);
    } else {
      reviewEmailSent = true;
      console.log('Review request email sent successfully:', reviewRequestEmailResponse);
    }
  }

  // Fixed: Build message properly
  let message = '';
  if (thankYouEmailSent) message += 'Thank you email sent successfully. ';
  if (reviewEmailSent) message += 'Review request email sent successfully. ';
  if (!thankYouEmailSent && !reviewEmailSent) message = 'No emails were sent.';

  return { 
    success: true, 
    reviewEmailSent, 
    thankYouEmailSent, 
    message: message.trim() 
  };
}