// Reads data.toml, generates one banner HTML per entry into this directory.
// Usage: cd designs && bun run orvix/seo/generate.ts

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
  url_path: string;
  // Optional. Defaults to the compro's domain; set it for banners that belong
  // to another host, such as the platform on platform.orvix.id.
  domain?: string;
}

function parseToml(src: string): Banner[] {
  const result: Banner[] = [];
  const sections = src.split(/^\[/m);
  for (const section of sections) {
    const headerMatch = section.match(/^([^\]]+)\]/);
    if (!headerMatch) continue;
    if (!headerMatch[1].trim().startsWith("banners.")) continue;

    const entry: Record<string, string> = {};
    for (const line of section.split("\n")) {
      if (line.trim().startsWith("#")) continue;
      const kv = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
      if (!kv) continue;
      let val = kv[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1).replace(/\\"/g, '"');
      }
      entry[kv[1]] = val;
    }
    if (entry.key && entry.headline) result.push(entry as unknown as Banner);
  }
  return result;
}

// Orvix logomark: three skewed bars, cyan -> blue -> purple. Mirrors
// orvix-id/public/logo.svg but with banner-scoped gradient ids and a viewBox
// cropped to the bars themselves.
//
// The shipped logo.svg draws into a 64x64 box but the skewed bars only occupy
// x 1.8-47.4, y 16-56 — roughly 26% of the width is empty on the right. Left
// uncropped, that dead space stacks on top of the flex gap and the wordmark
// drifts away from the mark. Cropping means the gap value below is the gap.
const LOGOMARK_SVG =
  '<svg viewBox="1.8 16 45.6 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<defs>' +
  '<linearGradient id="og-cyan" x1="0" y1="0" x2="0" y2="1">' +
  '<stop stop-color="#4de4ff"/><stop offset="1" stop-color="#5b8cff"/></linearGradient>' +
  '<linearGradient id="og-purple" x1="0" y1="0" x2="0" y2="1">' +
  '<stop stop-color="#5b8cff"/><stop offset="1" stop-color="#9b72ff"/></linearGradient>' +
  '</defs>' +
  '<g transform="translate(12 8) skewX(-12)">' +
  '<rect x="0" y="25" width="11" height="23" rx="3" fill="url(#og-cyan)"/>' +
  '<rect x="14" y="8" width="11" height="40" rx="3" fill="url(#og-cyan)"/>' +
  '<rect x="28" y="17" width="11" height="31" rx="3" fill="url(#og-purple)"/>' +
  '</g></svg>';

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
}

function hsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hexFromHsl(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
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
  return hexFromHsl((h + degrees + 360) % 360, s, l);
}

function lighten(hex: string, amount: number): string {
  const [h, s, l] = hsl(hex);
  return hexFromHsl(h, s, Math.min(100, l + amount * 100));
}

// <grad>...</grad> in data.toml marks the gradient span explicitly. Without it,
// gradient the back half of the headline so something always pops.
function applyGrad(text: string): string {
  if (text.includes("<grad>")) {
    return text.replace(/<grad>/g, '<span class="grad">').replace(/<\/grad>/g, "</span>");
  }
  const words = text.split(" ");
  const start = words.length <= 4 ? Math.floor(words.length / 2) : Math.floor(words.length * 0.4);
  words[start] = '<span class="grad">' + words[start];
  words[words.length - 1] += "</span>";
  return words.join(" ");
}

function renderBanner(b: Banner): string {
  // Small hue step only. A wide shift walks the gradient out of the Orvix
  // cyan-blue-purple ramp and the banner stops reading as Orvix.
  const accent2 = shiftHue(b.accent, 26);
  const host = b.domain || "orvix.id";
  const url = b.url_path ? host + "/" + b.url_path : host;

  return `<!doctype html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Orvix.id ${b.page}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
html,body{width:1200px;height:630px;overflow:hidden;font-family:"Plus Jakarta Sans",sans-serif;color:#F1F5F9;background:#0b0e19}
.canvas{position:relative;width:1200px;height:630px;overflow:hidden;
  background:linear-gradient(135deg,#070b14 0%,#0b0e19 52%,#121a2e 100%);}
.canvas::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(circle at 78% 22%,${hexToRgba(b.accent, 0.16)} 0%,transparent 52%),
             radial-gradient(circle at 14% 84%,${hexToRgba(accent2, 0.09)} 0%,transparent 46%);}
.bg-grid{position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(148,163,184,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.045) 1px,transparent 1px);
  background-size:56px 56px;
  -webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,0.85),transparent 92%);
  mask-image:linear-gradient(180deg,rgba(0,0,0,0.85),transparent 92%);}
.frame{position:relative;z-index:1;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 80px 64px;}
/* Lockup follows the navbar: Plus Jakarta Sans 600, ".id" flush against the
   wordmark (the navbar's -ml-2.5 only cancels the flex gap it would otherwise
   inherit — it is not a real negative offset), and the mark sized to ~0.97x
   the type so it reads the same weight next to it.
   The gap is deliberately tighter than the navbar's em-ratio: identical ratios
   read looser as type scales up, and at 50px the navbar spacing leaves the
   mark floating away from the word. */
.brand-block{display:flex;align-items:center;gap:22px;}
.logomark{width:56px;height:49px;display:block;filter:drop-shadow(0 4px 22px ${hexToRgba(b.accent, 0.45)});}
.wordmark{font-family:"Plus Jakarta Sans",sans-serif;font-size:50px;font-weight:600;letter-spacing:-0.02em;color:#F8FAFC;line-height:1;}
.wordmark .tld{color:#4de4ff;}
.badge-pill{display:inline-block;padding:5px 16px;border-radius:100px;border:1px solid ${hexToRgba(b.accent, 0.3)};background:${hexToRgba(b.accent, 0.08)};color:${lighten(b.accent, 0.16)};font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-family:"JetBrains Mono",monospace;margin-top:26px;}
.headline{font-size:50px;font-weight:800;line-height:1.16;letter-spacing:-0.02em;text-align:center;max-width:900px;margin-top:16px;}
.headline .grad{background:linear-gradient(115deg,${lighten(b.accent, 0.22)},${b.accent},${accent2});-webkit-background-clip:text;background-clip:text;color:transparent;}
.sub{font-size:22px;line-height:1.45;color:#94A3B8;text-align:center;max-width:700px;margin-top:14px;}
.url{font-size:17px;font-weight:500;color:#64748B;font-family:"JetBrains Mono",monospace;letter-spacing:0.01em;margin-top:18px;}
.accent-line{position:absolute;bottom:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,transparent 8%,${b.accent} 50%,transparent 92%);opacity:0.65;z-index:1;}
</style></head>
<body><div class="canvas"><div class="bg-grid"></div><div class="frame">
<div class="brand-block">
<div class="logomark">${LOGOMARK_SVG}</div>
<div class="wordmark">Orvix<span class="tld">.id</span></div>
</div>
<span class="badge-pill">${b.tag}</span>
<h1 class="headline">${applyGrad(b.headline)}</h1>
<p class="sub">${b.subtitle}</p>
<span class="url">${url}</span>
</div><div class="accent-line"></div></div></body></html>
`;
}

const banners = parseToml(readFileSync(join(SCRIPT_DIR, "data.toml"), "utf-8"));

if (!existsSync(SCRIPT_DIR)) mkdirSync(SCRIPT_DIR, { recursive: true });

console.log(`Generating ${banners.length} banner HTML files...\n`);
for (const banner of banners) {
  const filename = `banner_${banner.key}.html`;
  writeFileSync(join(SCRIPT_DIR, filename), renderBanner(banner), "utf-8");
  console.log("  OK " + filename);
}
console.log("\nDone!");
