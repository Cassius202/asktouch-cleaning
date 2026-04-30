'use server'

export async function logUnconfirmedBooking(
  name: string,
  messageId: string,
  phone: string,
  email: string,
  property: string | null,
  roomCost: string | null,
  totalPayable: string | null,
  checkInDate: string | null,
  stayDuration: string | null,
) {
  try {
    await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheet: "Unconfirmed Bookings",
        name,
        messageId,
        phone,
        email,
        property: property ?? "Not specified",
        roomCost: roomCost ?? "",
        totalPayable: totalPayable ?? "",
        checkInDate: checkInDate ?? "",
        stayDuration: stayDuration ?? "",
      }),
    });

    console.log("[Unconfirmed booking logged]", phone, property);
  } catch (err) {
    console.error("[Unconfirmed booking log failed]", err);
  }
}