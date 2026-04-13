import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, phone } = body as Record<string, string>;

  if (!firstName?.trim() || !lastName?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db.query(
      "INSERT INTO registrations (first_name, last_name, phone) VALUES ($1, $2, $3)",
      [firstName.trim(), lastName.trim(), phone.trim()]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
