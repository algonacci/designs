import { chromium, type Page, type Browser } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = "output";

async function htmlToJpg(htmlPath: string, outputPath: string, width = 1080, height = 1920, imageType: "jpeg" | "png" = "jpeg"): Promise<void> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 3,
    });
    const page: Page = await context.newPage();

    const absolutePath = join(process.cwd(), htmlPath);
    const fileUrl = `file://${absolutePath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: "networkidle" });

    await page.screenshot({
      path: outputPath,
      type: imageType,
      ...(imageType === "jpeg" ? { quality: 100 } : {}),
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
  const rawArgs = process.argv.slice(2);

  if (rawArgs.length === 0 || rawArgs.includes("--help") || rawArgs.includes("-h")) {
    console.log(`
Usage: bun run index.ts [--width W] [--height H] [html-files...]

Examples:
  bun run index.ts omniflow_id.html
  bun run index.ts --width 1200 --height 630 revolta/revolta_og.html
  bun run index.ts *.html
    `);
    process.exit(0);
  }

  // Parse --width, --height, and --png flags
  let width = 1080;
  let height = 1920;
  let imageType: "jpeg" | "png" = "jpeg";
  const args: string[] = [];

  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === "--width" && rawArgs[i + 1]) {
      width = parseInt(rawArgs[++i]);
    } else if (rawArgs[i] === "--height" && rawArgs[i + 1]) {
      height = parseInt(rawArgs[++i]);
    } else if (rawArgs[i] === "--png") {
      imageType = "png";
    } else {
      args.push(rawArgs[i]);
    }
  }

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR);
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const ext = imageType === "png" ? ".png" : ".jpg";
  console.log(`Converting ${args.length} HTML file(s) to ${imageType.toUpperCase()}... [${width}x${height}]\n`);

  for (const htmlFile of args) {
    const outputFileName = htmlFile.replace(/\.html$/i, ext);
    const outputPath = join(OUTPUT_DIR, outputFileName);

    await htmlToJpg(htmlFile, outputPath, width, height, imageType);
  }

  console.log(`\n✓ All conversions complete! Check ${OUTPUT_DIR}/`);
}

main().catch((error) => {
  console.error("\n✗ Error:", error);
  process.exit(1);
});
