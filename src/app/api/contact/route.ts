import { EmailData, handleContactUpload } from "@/app/actions/handleContactUpload";
import { sendEmailContact } from "@/app/actions/sendEmailContact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const data: EmailData = await req.json();

    //we sent json.stringify(data) to the backend from the form page

    if (!data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    //sending leads to spreasheet
    let spreadsheetResult;
    try {
      spreadsheetResult = await handleContactUpload(data);
      if (!spreadsheetResult.success) {
        console.warn('Spreadsheet warning:', spreadsheetResult.message);
        // Don't return error - just log it
      }
    } catch (sheetError) {
      console.error('Spreadsheet error:', sheetError);
      // Continue - don't fail the request
    }
    //sending leads to my email
    const emailResult = await sendEmailContact(data);

    console.log(emailResult);

    if (!emailResult.success) {
      console.error(emailResult.message);
      return Response.json({ error: emailResult.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Contact message sent successfully', spreadsheetLogged: spreadsheetResult?.success || false });

  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}