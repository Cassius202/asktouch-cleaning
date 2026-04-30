'use server'

export async function logLead(
  phone: string,
  timestamp: string,
  messageId: string,
  summary: string,
  interestedProperty: string | null
) {
  try {
    await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheet: "Whatsapp leads",
        phone,
        timestamp,
        messageId,
        summary,
        property: interestedProperty ?? "Not specified",
      }),
    });

    console.log("[Lead logged]", phone, interestedProperty);
  } catch (err) {
    console.error("[Sheet log failed]", err);
  }
};