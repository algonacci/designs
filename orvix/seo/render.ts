// Batch renderer: one Playwright browser, screenshots every banner_*.html to PNG.
// Usage: cd designs && bun run orvix/seo/render.ts
// Pass --force to re-render banners that already have a PNG.

import { chromium, type Browser, type Page } from "playwright";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = join(SCRIPT_DIR, "..", "..", "output", "orvix", "seo");

const WIDTH = 1200;
const HEIGHT = 630;
const CONCURRENCY = 4;
const FORCE = process.argv.includes("--force");

async function renderOne(page: Page, htmlPath: string, outputPath: string): Promise<void> {
  await page.goto("file://" + htmlPath.replace(/\\/g, "/"), {
    waitUntil: "networkidle",
    timeout: 20000,
  });
  // Webfonts occasionally paint a frame late even after networkidle.
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: outputPath, type: "png", fullPage: false });
  console.log("  OK " + basename(outputPath));
}

async function main() {
  const htmlFiles = readdirSync(SCRIPT_DIR)
    .filter((f) => f.startsWith("banner_") && f.endsWith(".html"))
    .map((f) => join(SCRIPT_DIR, f))
    .sort();

  if (htmlFiles.length === 0) {
    console.log("No banner HTML files in " + SCRIPT_DIR + " — run generate.ts first.");
    process.exit(1);
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const work = htmlFiles.map((f) => ({
    htmlPath: f,
    outputPath: join(OUTPUT_DIR, basename(f).replace(/\.html$/, ".png")),
  }));

  const pending = FORCE ? work : work.filter((w) => !existsSync(w.outputPath));
  const skipped = work.length - pending.length;
  console.log(`Rendering ${pending.length} banners (${skipped} already done) [${WIDTH}x${HEIGHT}]...\n`);
  if (pending.length === 0) {
    console.log("All done!");
    return;
  }

  const browser: Browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const batch = pending.slice(i, i + CONCURRENCY);
    const pages = await Promise.all(batch.map(() => context.newPage()));
    await Promise.all(batch.map((w, idx) => renderOne(pages[idx], w.htmlPath, w.outputPath)));
    await Promise.all(pages.map((p) => p.close()));
  }

  await context.close();
  await browser.close();
  console.log(`\nDone! ${pending.length} banners rendered to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
