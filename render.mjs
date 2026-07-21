import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_DIR = "output";

async function renderHtml(browser, htmlPath, outputPath, width, height, scale, imageType, quality) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  const page = await context.newPage();

  try {
    const absolutePath = join(process.cwd(), htmlPath);
    const fileUrl = `file://${absolutePath.replace(/\\/g, "/")}`;

    await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(300);

    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    await page.screenshot({
      path: outputPath,
      type: imageType,
      ...(imageType === "jpeg" ? { quality } : {}),
      fullPage: false,
    });

    console.log(`✓ Converted: ${htmlPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${htmlPath}:`, error);
    throw error;
  } finally {
    await context.close();
  }
}

async function main() {
  const rawArgs = process.argv.slice(2);

  if (rawArgs.length === 0 || rawArgs.includes("--help") || rawArgs.includes("-h")) {
    console.log(`
Usage: node render.mjs [--width W] [--height H] [--scale S] [--quality Q] [--png] [html-files...]

Defaults: 1080x1920, scale 2, JPEG quality 92

Examples:
  node render.mjs goggleshare_id.html
  node render.mjs --width 1200 --height 630 revolta/revolta_og.html
  node render.mjs --scale 3 --quality 100 hero.html
  node render.mjs --png hero.html
    `);
    process.exit(0);
  }

  let width = 1080;
  let height = 1920;
  let scale = 2;
  let quality = 92;
  let imageType = "jpeg";
  const args = [];

  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === "--width" && rawArgs[i + 1]) {
      width = Number.parseInt(rawArgs[++i], 10);
    } else if (rawArgs[i] === "--height" && rawArgs[i + 1]) {
      height = Number.parseInt(rawArgs[++i], 10);
    } else if (rawArgs[i] === "--scale" && rawArgs[i + 1]) {
      scale = Number.parseFloat(rawArgs[++i]);
    } else if (rawArgs[i] === "--quality" && rawArgs[i + 1]) {
      quality = Number.parseInt(rawArgs[++i], 10);
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

  const extension = imageType === "png" ? ".png" : ".jpg";
  const qualityLabel = imageType === "jpeg" ? `, q${quality}` : "";
  console.log(`Converting ${args.length} HTML file(s) to ${imageType.toUpperCase()}... [${width}x${height} @${scale}x${qualityLabel}]\n`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: chromium.executablePath(),
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const start = Date.now();

  try {
    for (const htmlFile of args) {
      const normalizedName = htmlFile
        .replace(/^[.\\/]+/, "")
        .replace(/\.html$/i, extension);
      const outputPath = join(OUTPUT_DIR, normalizedName);
      await renderHtml(browser, htmlFile, outputPath, width, height, scale, imageType, quality);
    }
  } finally {
    await browser.close();
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`\n✓ All conversions complete in ${elapsed}s! Check ${OUTPUT_DIR}/`);
}

main().catch((error) => {
  console.error("\n✗ Error:", error);
  process.exit(1);
});
