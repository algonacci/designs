import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Export PNG previews of the API Store rollout banners, failing on any text outside the canvas.
const banners = [
  ['orvix_api_store_rollout_story', 1080, 1920],
  ['orvix_api_store_rollout_fhd', 1920, 1080],
];
const browser = await chromium.launch({ headless: true });
try {
  for (const [name, width, height] of banners) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(new URL(`./${name}.svg`, import.meta.url).href);
    await page.evaluate(() => document.fonts.ready);
    const issues = await page.evaluate(([w, h]) => {
      if (document.querySelector('parsererror')) return ['Invalid SVG'];
      return [...document.querySelectorAll('text')].filter(el => {
        const b = el.getBoundingClientRect();
        return b.left < 0 || b.right > w || b.top < 0 || b.bottom > h;
      }).map(el => el.textContent);
    }, [width, height]);
    if (issues.length) throw new Error(`${name}: ${JSON.stringify(issues)}`);
    await page.screenshot({ path: fileURLToPath(new URL(`./out/${name}.png`, import.meta.url)) });
    await page.close();
    console.log(`Exported out/${name}.png; no text outside canvas.`);
  }
} finally {
  await browser.close();
}
