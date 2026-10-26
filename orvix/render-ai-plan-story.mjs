import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Export a portable SVG with embedded logos, plus its PNG preview.
const source = new URL('./orvix_ai_plan_daily_reset_story.svg', import.meta.url);
let svg = await readFile(source, 'utf8');
for (const match of [...svg.matchAll(/href="(\.\.\/[^\"]+)"/g)]) {
  const logo = await readFile(new URL(match[1], source), 'utf8');
  const still = logo.replace(/<animateTransform\b[\s\S]*?\/>/g, '').replace(/<animate\b[\s\S]*?\/>/g, '');
  svg = svg.replace(match[0], `href="data:image/svg+xml;base64,${Buffer.from(still).toString('base64')}"`);
}
const output = new URL('./out/orvix_ai_plan_daily_reset_story.svg', import.meta.url);
await writeFile(output, svg);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto(output.href);
  await page.evaluate(() => document.fonts.ready);
  const issues = await page.evaluate(() => {
    if (document.querySelector('parsererror')) return ['Invalid SVG'];
    return [...document.querySelectorAll('text')].filter(el => {
      const b = el.getBoundingClientRect();
      return b.left < 0 || b.right > 1080 || b.top < 0 || b.bottom > 1920;
    }).map(el => el.textContent);
  });
  if (issues.length) throw new Error(JSON.stringify(issues));
  await page.screenshot({ path: fileURLToPath(new URL('./out/orvix_ai_plan_daily_reset_story.png', import.meta.url)) });
  console.log('Exported standalone SVG and PNG; no text outside canvas.');
} finally {
  await browser.close();
}
