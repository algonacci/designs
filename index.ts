import { chromium, type Page, type Browser } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = "output";

async function htmlToJpg(htmlPath: string, outputPath: string): Promise<void> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch();
    // Launch with high device scale factor for 3x resolution (3240x5760)
    // This makes text ultra-crisp and removes the "pecah" (noise) artifacts
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1920 },
      deviceScaleFactor: 3,
    });
    const page: Page = await context.newPage();

    const absolutePath = join(process.cwd(), htmlPath);
    const fileUrl = `file://${absolutePath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: "networkidle" });

    // Using high-quality JPEG (100) and ensuring it captures the high-res buffer correctly
    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 100,
      fullPage: false,
    });

    console.log(`✓ Converted: ${htmlPath} → ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${htmlPath}:`, error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: bun run index.ts [html-files...]

Examples:
  bun run index.ts omniflow_id.html
  bun run index.ts *.html
  bun run index.ts omniflow_id.html tot_invitation.html
    `);
    process.exit(0);
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  console.log(`Converting ${args.length} HTML file(s) to JPG...\n`);

  for (const htmlFile of args) {
    const outputFileName = htmlFile.replace(/\.html$/i, ".jpg");
    const outputPath = join(OUTPUT_DIR, outputFileName);

    await htmlToJpg(htmlFile, outputPath);
  }

  console.log(`\n✓ All conversions complete! Check ${OUTPUT_DIR}/`);
}

main().catch((error) => {
  console.error("\n✗ Error:", error);
  process.exit(1);
});
