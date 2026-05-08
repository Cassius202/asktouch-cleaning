'use server'
import { Resend } from "resend";
import { ChatLeadsData } from "@/constants/types";
import { info } from "@/constants/data";

interface AdminNotificationData extends ChatLeadsData {
  rowId: string;
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAdminNotification(data: AdminNotificationData) {
  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Ask Touch <${info.bookingEmail}>`,
      to: ["asktouch39@gmail.com"],
      subject: `Follow Up: ${data.name || data.email} left their contact`,
      html: `
        <p>A user dropped their contact details in the chat.</p>
        <p><strong>Name:</strong> ${data.name || "N/A"}</p>
        <p><strong>Email:</strong> ${data.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
        <p><strong>Service:</strong> ${data.service || "N/A"}</p>
      `,
    });

    if (emailError) {
      console.error("Failed to send admin notification:", emailError);
      return { success: false, error: emailError };
    }

    console.log("Admin notification sent:", emailData?.id);
    return { success: true, messageId: emailData?.id };

  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}