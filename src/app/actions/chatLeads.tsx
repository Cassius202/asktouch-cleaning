'use server'
import { ChatLeadsData } from "@/constants/types"

export async function LogChatLeads(data: ChatLeadsData) {
  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, sheetName: "Chat Leads", action: 'create' }),
      redirect: 'follow' // Crucial for Google Apps Script
    });

    const text = await response.text(); // Get raw text first
    try {
      const result = JSON.parse(text);
      return { success: true, rowId: result.rowId };
    } catch (e) {
      console.error("Google returned HTML instead of JSON. Check script permissions. Response:", text.slice(0, 200));
      return { success: false, message: "Invalid response from Google" };
    }
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

export async function logAdditionalInfo(data: ChatLeadsData & { rowId: string | null }) {
  if (!data.rowId || data.rowId === 'null') return { success: false, message: 'Invalid rowId' };

  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, sheetName: "Chat Leads", action: 'update' }),
      redirect: 'follow'
    });

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      return { success: result.success };
    } catch (e) {
      console.error("Update failed. Google returned HTML. Response:", text.slice(0, 100));
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}