import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id         SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      first_name TEXT NOT NULL,
      last_name  TEXT NOT NULL,
      phone      TEXT NOT NULL
    )
  `);
  return pool;
}
