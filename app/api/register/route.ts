import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME     = process.env.GOOGLE_SHEET_NAME ?? "Реєстрації";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key   = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) throw new Error("Missing Google credentials");

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function POST(req: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json({ error: "Spreadsheet not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { firstName, lastName, phone } = body as Record<string, string>;

  if (!firstName?.trim() || !lastName?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const auth   = getAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const date   = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[date, firstName.trim(), lastName.trim(), phone.trim()]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sheets error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 502 });
  }
}
