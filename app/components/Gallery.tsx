import fs from "fs";
import path from "path";
import GalleryCarousel from "./GalleryCarousel";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getGalleryImages(): string[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  return fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/gallery/${f}`);
}

export default function Gallery() {
  const images = getGalleryImages();
  return <GalleryCarousel images={images} />;
}
