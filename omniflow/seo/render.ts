// Batch renderer: opens 1 Playwright browser, renders all HTMLs in seo/ dir to PNG
// Usage: cd designs && bun run omniflow/seo/render.ts

import { chromium, type Browser, type Page } from "playwright";
import { readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = join(SCRIPT_DIR, "..", "..", "output", "omniflow", "seo");

const WIDTH = 1200;
const HEIGHT = 630;
const CONCURRENCY = 4;

async function renderOne(page: Page, htmlPath: string, outputPath: string): Promise<void> {
  const fileUrl = "file://" + htmlPath.replace(/\\/g, "/");
  await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 15000 });
  await page.screenshot({
    path: outputPath,
    type: "png",
    fullPage: false,
  });
  console.log("  OK " + basename(outputPath));
}

async function main() {
  const htmlFiles = readdirSync(SCRIPT_DIR)
    .filter((f) => f.startsWith("banner_") && f.endsWith(".html"))
    .map((f) => join(SCRIPT_DIR, f))
    .sort();

  if (htmlFiles.length === 0) {
    console.log("No banner HTML files found in " + SCRIPT_DIR);
    process.exit(1);
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const work: { htmlPath: string; outputPath: string }[] = htmlFiles.map((f) => ({
    htmlPath: f,
    outputPath: join(OUTPUT_DIR, basename(f).replace(/\.html$/, ".png")),
  }));

  // Skip already-rendered files
  const pending = work.filter((w) => !existsSync(w.outputPath));
  const skipped = work.length - pending.length;
  console.log(
    "Rendering " + pending.length + " banners (" + skipped + " already done) [" + WIDTH + "x" + HEIGHT + "]...\n"
  );

  if (pending.length === 0) {
    console.log("All done!");
    return;
  }

  const browser: Browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });

  // Render in concurrent batches
  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const batch = pending.slice(i, i + CONCURRENCY);
    const pages: Page[] = [];
    for (const w of batch) {
      const page = await context.newPage();
      pages.push(page);
    }
    await Promise.all(
      batch.map((w, idx) => renderOne(pages[idx], w.htmlPath, w.outputPath))
    );
    for (const page of pages) {
      await page.close();
    }
  }

  await context.close();
  await browser.close();

  console.log("\nDone! " + pending.length + " banners rendered to " + OUTPUT_DIR);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
