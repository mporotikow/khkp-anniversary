import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  let files: string[] = [];

  if (fs.existsSync(GALLERY_DIR)) {
    files = fs
      .readdirSync(GALLERY_DIR)
      .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/gallery/${f}`);
  }

  return NextResponse.json(files);
}
