// Convert all PNG banners to WebP in Omniflow-id/public/og/
// Usage: bun run designs/omniflow/seo/convert.ts

import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import sharp from "sharp";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const PNG_DIR = join(SCRIPT_DIR, "..", "..", "output", "omniflow", "seo");
const OUT_DIR = join(SCRIPT_DIR, "..", "..", "..", "Omniflow-id", "public", "og");

async function main() {
  const pngs = readdirSync(PNG_DIR).filter((f) => f.endsWith(".png"));
  console.log("Converting " + pngs.length + " PNGs to WebP...\n");

  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  // Process in batches of 8 concurrent
  const BATCH = 8;
  for (let i = 0; i < pngs.length; i += BATCH) {
    const batch = pngs.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (png) => {
        const name = basename(png, ".png");
        const outPath = join(OUT_DIR, name + ".webp");
        if (existsSync(outPath)) {
          console.log("  SKIP " + name + ".webp (exists)");
          return;
        }
        await sharp(join(PNG_DIR, png))
          .webp({ quality: 85 })
          .toFile(outPath);
        console.log("  OK   " + name + ".webp");
      })
    );
  }

  const done = readdirSync(OUT_DIR).filter((f) => f.endsWith(".webp"));
  console.log("\nDone! " + done.length + " WebP files in " + OUT_DIR);
}

main().catch(console.error);
