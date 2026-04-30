import { Resend } from 'resend';
import { render } from '@react-email/render';
import LeadAlertEmail from '@/components/extras/LeadAlertEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function alertAdmin(
  customerNumber: string,
  interestedProperty: string | null
) {
  const message = `Hey, a customer showed interest in ${interestedProperty ?? "a property"} but hasn't booked yet. Their number is ${customerNumber} — give them a call.`;

  try {
    // ── Email alert ──
    const html = await render(
      LeadAlertEmail({ message, number: customerNumber })
    );

    await resend.emails.send({
      from: `Cassius <${process.env.OWNER_EMAIL!}>`,
      to: process.env.OWNER_EMAIL!,
      subject: '🏠 Unconfirmed Booking Lead',
      html,
    });
  } catch (err) {
    console.error("[Email alert failed]", err);
  }

  try {
    // ── WhatsApp alert to owner ──
    await fetch(
      `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: process.env.OWNER_WHATSAPP_NUMBER,
          type: "text",
          text: { body: message },
        }),
      }
    );
  } catch (err) {
    console.error("[WhatsApp alert failed]", err);
  }
}