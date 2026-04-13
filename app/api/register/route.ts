import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { firstName, lastName, phone } = body;

  if (!firstName || !lastName || !phone) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, phone }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to save" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
