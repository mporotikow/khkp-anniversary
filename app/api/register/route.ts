import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, phone } = body as Record<string, string>;

  if (!firstName?.trim() || !lastName?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const data = { firstName: firstName.trim(), lastName: lastName.trim(), phone: phone.trim() };

  // Save to PostgreSQL
  try {
    const db = await getDb();
    await db.query(
      "INSERT INTO registrations (first_name, last_name, phone) VALUES ($1, $2, $3)",
      [data.firstName, data.lastName, data.phone]
    );
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  // Push to Google Sheets (fire and forget — не блокуємо відповідь)
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => console.error("Sheets webhook error:", err));
  }

  return NextResponse.json({ ok: true });
}
