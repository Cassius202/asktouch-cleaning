'use server'

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  location: string;
};

export async function handleContactUpload(data: EmailData) {

  const fullData = {
    ...data,
    sheetName: "Contact Forms",
  }

  const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullData),
  });

  if (!response.ok) {
    console.error('Spreadsheet Error:', await response.json());
    return ({ success: false, message: 'Spreadsheet Error' });
  }

  return {
    success: true,
    message: "Thank you, Ma/Sir! Your message has been received."
  };
};