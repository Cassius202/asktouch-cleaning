'use server'

import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendFollowUpEmail(to: string, subject: string, body: string) {
  try {
    const response = await resend.emails.send({
      from: "Short Apartments <business@cassiusdev.online>",
      to,
      subject,
      html: body,
    });
    console.log("[Follow-up email sent]", response);
  } catch (err) {
    console.error("[Follow-up email failed]", err);
  }
}