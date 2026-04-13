import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function getRegistrations(secret: string | null) {
  if (secret !== process.env.EXPORT_SECRET) return null;
  const db = await getDb();
  const { rows } = await db.query(
    "SELECT id, created_at, first_name, last_name, phone FROM registrations ORDER BY created_at DESC"
  );
  return rows;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;

  if (secret !== process.env.EXPORT_SECRET) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", fontFamily: "sans-serif" }}>
        <form method="GET" style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", width: "320px" }}>
          <h1 style={{ margin: "0 0 24px", fontSize: "20px", color: "#092750" }}>Адмін панель</h1>
          <input
            name="secret"
            type="password"
            placeholder="Пароль"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box", marginBottom: "12px" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px", borderRadius: "10px", background: "#092750", color: "#fff", border: "none", fontSize: "14px", cursor: "pointer" }}
          >
            Увійти
          </button>
        </form>
      </div>
    );
  }

  const rows = await getRegistrations(secret);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: "22px", color: "#092750" }}>
            Заявки <span style={{ color: "#999", fontWeight: 400, fontSize: "16px" }}>({rows?.length ?? 0})</span>
          </h1>
          <a
            href={`/api/export?secret=${secret}`}
            style={{ padding: "8px 18px", borderRadius: "10px", background: "#092750", color: "#fff", textDecoration: "none", fontSize: "13px" }}
          >
            Скачати CSV
          </a>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#092750", color: "#fff" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>#</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Дата</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Ім&apos;я</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Прізвище</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Телефон</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((r, i) => (
                <tr key={r.id} style={{ borderTop: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "12px 16px", color: "#999" }}>{i + 1}</td>
                  <td style={{ padding: "12px 16px", color: "#555", whiteSpace: "nowrap" }}>
                    {new Date(r.created_at).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#092750", fontWeight: 500 }}>{r.first_name}</td>
                  <td style={{ padding: "12px 16px", color: "#092750", fontWeight: 500 }}>{r.last_name}</td>
                  <td style={{ padding: "12px 16px", color: "#333" }}>{r.phone}</td>
                </tr>
              ))}
              {(!rows || rows.length === 0) && (
                <tr>
                  <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#999" }}>Заявок ще немає</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
