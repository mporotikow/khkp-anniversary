import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = await getDb();
  const { rows } = await db.query(
    "SELECT created_at, first_name, last_name, phone FROM registrations ORDER BY created_at ASC"
  );

  const header = "Дата,Ім'я,Прізвище,Телефон\n";
  const body = rows
    .map((r) => {
      const date = new Date(r.created_at).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });
      return [date, r.first_name, r.last_name, r.phone]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",");
    })
    .join("\n");

  return new NextResponse(header + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations.csv"`,
    },
  });
}
