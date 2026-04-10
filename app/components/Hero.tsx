import fs from "fs";
import path from "path";
import HeroClient from "./HeroClient";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function getHeroImage(): string | null {
  for (const ext of SUPPORTED) {
    if (fs.existsSync(path.join(PUBLIC_DIR, `hero${ext}`))) {
      return `/hero${ext}`;
    }
  }
  return null;
}

export default function Hero() {
  const imageSrc = getHeroImage();
  return <HeroClient imageSrc={imageSrc} />;
}
