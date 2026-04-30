"use server";

import { NewsletterData } from "@/constants/types";

export const handleNewsletterSending = async (data: NewsletterData) => {
  const fullData = {
    ...data,
    sheetName: "Newsletter",
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
    console.error('Newsletter Spreadsheet Error:', await response.json());
    return { success: false, message: 'Failed to email save to spreadsheet' };
  }

  return { success: true, message: "Newsletter sent successfully" };
};
