// Converts rendered PNGs into the shipping assets under orvix-id/public/.
//   banner_*.png -> orvix-id/public/og/banner_*.webp   (per-route, ~25 KB each)
//   banner_home.png -> orvix-id/public/og.jpg          (site-wide default)
//
// The default stays JPEG on purpose: it is the fallback every scraper hits,
// and a few still handle WebP badly.
//
// banner_platform belongs to a different site — the app on platform.orvix.id,
// which lives in another repository — so it is excluded here and shipped by
// `--platform` instead. Without that split it would be written into the
// compro's og/ directory, where nothing would ever request it.
//
// Usage: cd designs && bun run orvix/seo/convert.ts
//        cd designs && bun run orvix/seo/convert.ts --platform
// Pass --force to overwrite existing outputs.

import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import sharp from "sharp";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const PNG_DIR = join(SCRIPT_DIR, "..", "..", "output", "orvix", "seo");
const PUBLIC_DIR = join(SCRIPT_DIR, "..", "..", "..", "orvix-id", "public");
const OG_DIR = join(PUBLIC_DIR, "og");

// The platform is a separate app in a separate repository.
const PLATFORM_PUBLIC_DIR = join(
  SCRIPT_DIR, "..", "..", "..", "orvix-project", "platform", "public",
);

const FORCE = process.argv.includes("--force");
const PLATFORM = process.argv.includes("--platform");

// Every platform route except /login sits behind auth, so one banner covers
// the only link anybody can share.
const PLATFORM_KEY = "banner_platform";
const BATCH = 8;

async function convertPlatform() {
  const png = join(PNG_DIR, PLATFORM_KEY + ".png");
  if (!existsSync(png)) {
    console.log(`No ${PLATFORM_KEY}.png — run generate.ts and render.ts first.`);
    process.exit(1);
  }
  if (!existsSync(PLATFORM_PUBLIC_DIR)) {
    console.log("Platform repo not found at " + PLATFORM_PUBLIC_DIR);
    process.exit(1);
  }

  // JPEG, and only JPEG. The compro can ship WebP because it also ships an
  // og.jpg fallback; a single-banner site has no fallback to fall back to, and
  // WhatsApp in particular is where these links actually get shared.
  const outJpg = join(PLATFORM_PUBLIC_DIR, "og.jpg");
  if (!FORCE && existsSync(outJpg)) {
    console.log("  SKIP og.jpg (exists) — pass --force to overwrite");
    return;
  }
  await sharp(png).jpeg({ quality: 86, progressive: true }).toFile(outJpg);
  console.log("  OK   og.jpg -> " + outJpg);
}

async function main() {
  if (PLATFORM) {
    await convertPlatform();
    return;
  }

  if (!existsSync(PNG_DIR)) {
    console.log("No PNGs at " + PNG_DIR + " — run render.ts first.");
    process.exit(1);
  }

  const pngs = readdirSync(PNG_DIR)
    .filter((f) => f.endsWith(".png"))
    .filter((f) => basename(f, ".png") !== PLATFORM_KEY)
    .sort();
  if (pngs.length === 0) {
    console.log("No PNGs to convert — run render.ts first.");
    process.exit(1);
  }

  if (!existsSync(OG_DIR)) mkdirSync(OG_DIR, { recursive: true });

  console.log(`Converting ${pngs.length} PNGs to WebP...\n`);
  for (let i = 0; i < pngs.length; i += BATCH) {
    await Promise.all(
      pngs.slice(i, i + BATCH).map(async (png) => {
        const name = basename(png, ".png");
        const outPath = join(OG_DIR, name + ".webp");
        if (!FORCE && existsSync(outPath)) {
          console.log("  SKIP " + name + ".webp (exists)");
          return;
        }
        await sharp(join(PNG_DIR, png)).webp({ quality: 88 }).toFile(outPath);
        console.log("  OK   " + name + ".webp");
      }),
    );
  }

  const homePng = join(PNG_DIR, "banner_home.png");
  if (existsSync(homePng)) {
    await sharp(homePng).jpeg({ quality: 86, progressive: true }).toFile(join(PUBLIC_DIR, "og.jpg"));
    console.log("\n  OK   og.jpg (default, from banner_home)");
  } else {
    console.log("\n  WARN banner_home.png missing — og.jpg left untouched");
  }

  const done = readdirSync(OG_DIR).filter((f) => f.endsWith(".webp"));
  console.log(`\nDone! ${done.length} WebP files in ${OG_DIR}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
