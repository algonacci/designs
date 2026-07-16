// Reads banner data, generates HTML files, outputs to current dir
// Usage: bun run designs/omniflow/seo/generate.ts

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const SCRIPT_DIR = dirname(new URL(import.meta.url).pathname);

interface Banner {
  key: string;
  page: string;
  headline: string;
  subtitle: string;
  accent: string;
  tag: string;
  lang?: string;
  url_path: string;
}

function parseToml(src: string): { banners: Record<string, Banner> } {
  const result: Record<string, Banner> = {};
  const sections = src.split(/^\[/m);
  for (const section of sections) {
    const headerMatch = section.match(/^([^\]]+)\]/);
    if (!headerMatch) continue;
    const header = headerMatch[1].trim();
    if (!header.startsWith("banners.")) continue;

    const entry: Record<string, string> = {};
    const lines = section.split("\n");
    for (const line of lines) {
      const kv = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
      if (!kv) continue;
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1).replace(/\\"/g, '"');
      }
      entry[kv[1]] = val;
    }
    if (entry.key && entry.headline) {
      result[entry.key] = entry as unknown as Banner;
    }
  }
  return { banners: result };
}

const LOGOMARK_SVG =
  '<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<polygon fill="#FFFFFF" points="492.61 542.75 346.66 542.75 346.61 542.75 346.65 542.82 318.1 695.74 301.39 695.74 271.57 660.3 328.84 342.73 375.84 302.78 558 302.78 588.41 339.71 584.15 363.7 361.89 363.7 434.48 472.28 564.87 472.28 564.87 472.28 711.09 472.28 711.18 472.28 881.98 472.28 809.39 363.7 730.42 363.7 742.84 293.6 644.45 174.96 312.4 174.96 193.96 276.34 118.02 705.47 216.38 825.04 550.2 825.04 665.99 727.28 674.5 679.26 506.15 679.26 484.45 695.74 464.17 695.74 472.43 651.34 533.07 651.34 679.45 651.34 865.85 651.34 793.26 542.75 492.61 542.75"/>' +
  '</svg>';

const WORDMARK_SVG =
  '<svg viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill="#FFFFFF" d="M89.6,285.76l13.13-74.22,19.78-16.93h56.97l16.14,19.46-13.29,75.01-19.31,16.3h-57.28l-16.14-19.62ZM153.06,287.03l9.49-8.07,10.29-57.92-6.65-8.07h-34.02l-9.49,8.07-10.44,57.92,6.65,8.07h34.18Z"/>' +
  '<path fill="#FFFFFF" d="M218.09,194.62h18.67l20.41,71.53h.32l45.42-71.53h21.2l-19.46,110.77h-20.73l11.87-67.41h-.32l-34.5,51.9h-13.29l-16.14-51.9h-.32l-11.87,67.41h-20.73l19.46-110.77Z"/>' +
  '<path fill="#FFFFFF" d="M344.85,194.62h19.31l36.24,75.17h.32l13.13-75.17h20.73l-19.62,110.77h-19.31l-35.92-75.01h-.32l-13.29,75.01h-20.73l19.46-110.77Z"/>' +
  '<path fill="#FFFFFF" d="M455.93,194.62h21.52l-19.62,110.77h-21.52l19.62-110.77Z"/>' +
  '<path fill="#FFFFFF" d="M498.81,194.62h78.33l-3.17,18.2h-56.81l-5.38,30.7h49.21l-3.17,18.2h-49.21l-7.75,43.67h-21.52l19.46-110.77Z"/>' +
  '<path fill="#FFFFFF" d="M589.96,194.62h21.52l-16.3,92.57h55.23l-3.16,18.2h-76.75l19.46-110.77Z"/>' +
  '<path fill="#FFFFFF" d="M658.63,285.76l13.13-74.22,19.78-16.93h56.97l16.14,19.46-13.29,75.01-19.31,16.3h-57.28l-16.14-19.62ZM722.09,287.03l9.49-8.07,10.29-57.92-6.65-8.07h-34.02l-9.49,8.07-10.44,57.92,6.65,8.07h34.18Z"/>' +
  '<path fill="#FFFFFF" d="M779.21,194.62h21.21l-.32,78.17h.63l35.76-78.17h16.14l7.75,78.17h.63l27.22-78.17h22.15l-42.41,110.77h-20.1l-8.39-77.86h-.63l-36.08,77.86h-20.1l-3.48-110.77Z"/>' +
  '</svg>';

// Color utilities
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha.toFixed(2) + ")";
}

function hsl(hex: string): [number, number, number] {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hexFromHsl(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return "#" + f(0) + f(8) + f(4);
}

function shiftHue(hex: string, degrees: number): string {
  const [h, s, l] = hsl(hex);
  return hexFromHsl((h + degrees) % 360, s, l);
}

function lighten(hex: string, amount: number): string {
  const [h, s, l] = hsl(hex);
  return hexFromHsl(h, s, Math.min(100, l + amount * 100));
}

function insertGrad(text: string): string {
  const words = text.split(" ");
  if (words.length <= 4) {
    const mid = Math.floor(words.length / 2);
    words[mid] = '<span class="grad">' + words[mid] + '</span>';
    return words.join(" ");
  }
  const start = Math.floor(words.length * 0.35);
  const end = Math.min(start + 3, words.length);
  words[start] = '<span class="grad">' + words[start];
  words[end - 1] = words[end - 1] + '</span>';
  return words.join(" ");
}

function renderBanner(b: Banner): string {
  const langAttr = b.lang || "en";
  const accent2 = shiftHue(b.accent, 30);

  return [
    '<!doctype html>',
    '<html lang="' + langAttr + '">',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">',
    '<title>Omniflow ' + b.page + '</title>',
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">',
    '<style>',
    '*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}',
    'html,body{width:1200px;height:630px;overflow:hidden;font-family:"Outfit",sans-serif;color:#F1F5F9;background:#0A0F1A}',
    '.canvas{position:relative;width:1200px;height:630px;overflow:hidden;',
    '  background:linear-gradient(135deg,#0A0F1A 0%,#111827 55%,#151F32 100%);}',
    '.canvas::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;',
    '  background:radial-gradient(circle at 75% 25%,' + hexToRgba(b.accent, 0.13) + ' 0%,transparent 50%),',
    '             radial-gradient(circle at 15% 85%,' + hexToRgba(accent2, 0.06) + ' 0%,transparent 45%);}',
    '.bg-grid{position:absolute;inset:0;pointer-events:none;z-index:0;',
    '  background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);',
    '  background-size:56px 56px;}',
    '.frame{position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:50px 80px;gap:18px;}',
    '.brand-block{display:flex;flex-direction:column;align-items:center;gap:4px;}',
    '.logomark{width:85px;height:85px;filter:drop-shadow(0 4px 20px rgba(59,130,246,0.5));}',
    '.wordmark{width:260px;height:auto;display:block;}',
    '.badge-pill{display:inline-block;padding:4px 16px;border-radius:100px;border:1px solid ' + hexToRgba(b.accent, 0.25) + ';background:' + hexToRgba(b.accent, 0.06) + ';color:' + lighten(b.accent, 0.25) + ';font-size:14px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;font-family:"Space Grotesk",monospace;}',
    '.headline{font-size:50px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;text-align:center;max-width:860px;}',
    '.headline .grad{background:linear-gradient(120deg,' + lighten(b.accent, 0.2) + ',' + b.accent + ',' + accent2 + ');-webkit-background-clip:text;background-clip:text;color:transparent;}',
    '.sub{font-size:23px;line-height:1.45;color:#94A3B8;text-align:center;max-width:660px;}',
    '.url{font-size:18px;font-weight:600;color:#64748B;font-family:"Space Grotesk",monospace;letter-spacing:0.02em;margin-top:4px;}',
    '.accent-line{position:absolute;bottom:0;left:0;right:0;height:4px;',
    '  background:linear-gradient(90deg,transparent 10%,' + b.accent + ' 50%,transparent 90%);opacity:0.6;z-index:1;}',
    '</style></head>',
    '<body><div class="canvas"><div class="bg-grid"></div><div class="frame">',
    '<div class="brand-block">',
    '<div class="logomark">' + LOGOMARK_SVG + '</div>',
    '<div class="wordmark">' + WORDMARK_SVG + '</div>',
    '</div>',
    '<span class="badge-pill">' + b.tag + '</span>',
    '<h1 class="headline">' + insertGrad(b.headline) + '</h1>',
    '<p class="sub">' + b.subtitle + '</p>',
    '<span class="url">omniflow.id/' + b.url_path + '</span>',
    '</div><div class="accent-line"></div></div></body></html>',
  ].join("\n");
}

// --- Main ---

const tomlContent = readFileSync(join(SCRIPT_DIR, "data.toml"), "utf-8");
const data = parseToml(tomlContent);
const banners = Object.values(data.banners);

if (!existsSync(SCRIPT_DIR)) {
  mkdirSync(SCRIPT_DIR, { recursive: true });
}

console.log("Generating " + banners.length + " banner HTML files...\n");

for (const banner of banners) {
  const content = renderBanner(banner);
  const filename = "banner_" + banner.key + ".html";
  const filepath = join(SCRIPT_DIR, filename);
  writeFileSync(filepath, content, "utf-8");
  console.log("  OK " + filename);
}

console.log("\nDone!");
