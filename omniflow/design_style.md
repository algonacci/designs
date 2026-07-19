# Omniflow Design Style Guide

## Brand Identity

Omniflow is an **AI-native ERP** — Integrated Business Solution. 26 integrated modules for end-to-end business operations.

- **Domain:** omniflow.id
- **Tagline:** AI-native ERP / Integrated Business Solution
- **Personality:** Professional, Modern, Reliable, Clean, Helpful, Enterprise-ready

---

## Color Palette

### Primary Blue
| Swatch | Hex | Tailwind | Usage |
|--------|-----|----------|-------|
| Blue 500 | `#3B82F6` | `blue-500` | Primary brand color, CTAs, links, headlines accent |
| Blue 600 | `#2563EB` | `blue-600` | Button hover, gradients |
| Blue 700 | `#1D4ED8` | `blue-700` | Dark backgrounds, nav active |
| Blue 50 | `#EFF6FF` | `blue-50` | Icon backgrounds, light accents |
| Blue 100 | `#DBEAFE` | `blue-100` | Badges, borders, subtle highlights |
| Blue 200 | `#BFDBFE` | `blue-200` | Card borders (hover) |

### Accent Orange
| Swatch | Hex | Tailwind | Usage |
|--------|-----|----------|-------|
| Orange 500 | `#F97316` | `orange-500` | CTA buttons on blue bg, highlights, warnings |

### Neutrals
| Swatch | Hex | Tailwind | Usage |
|--------|-----|----------|-------|
| Slate 900 | `#0F172A` | `slate-900` | Headlines, primary text |
| Slate 700 | `#334155` | `slate-700` | Body text bold |
| Slate 600 | `#475569` | `slate-600` | Secondary text |
| Slate 500 | `#64748B` | `slate-500` | Body copy, muted text |
| Slate 400 | `#94A3B8` | `slate-400` | Subtle labels |
| Slate 200 | `#E2E8F0` | `slate-200` | Borders, dividers |
| Slate 100 | `#F1F5F9` | `slate-100` | Light card backgrounds |
| Slate 50 | `#F8FAFC` | `slate-50` | Page background, section alternates |
| White | `#FFFFFF` | `white` | Cards, main content bg |

### Semantic Colors
| Swatch | Hex | Usage |
|--------|-----|-------|
| Green 600 | `#22C55E` | Success states, Cuti/leave icon |
| Green 50 | `#F0FDF4` | Success bg |
| Red 500 | `#EF4444` | Errors, delete, "Without HRIS" |
| Red 50 | `#FEF2F2` | Error bg |
| Purple 600 | `#8B5CF6` | Analytics/performance accent |
| Indigo 600 | `#6366F1` | Modules accent |

---

## Typography

### Primary Font: Outfit
```
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
```

### Weight Scale
| Weight | Usage |
|--------|-------|
| 700 Bold | Headlines, CTAs, brand name |
| 600 SemiBold | Subheadings, labels, button text |
| 500 Medium | Card titles, nav links, emphasis copy |
| 400 Regular | Body copy, descriptions |
| 300 Light | Fine print, footnotes |

### Sizing Scale (Web)
| Element | Size | Weight | Letter Spacing |
|---------|------|--------|----------------|
| h1 (hero) | 48-60px / `text-5xl lg:text-6xl` | 700 | `-0.02em` |
| h2 | 30-36px / `text-3xl md:text-4xl` | 700 | `-0.01em` |
| h3 | 24-30px / `text-2xl md:text-3xl` | 600 | normal |
| Body lg | 20-22px / `text-xl` | 400 | normal |
| Body | 16-18px | 400 | normal |
| Small | 13-14px / `text-sm` | 500 | normal |

### Sizing Scale (Social Media — 1080x1350)
| Element | Size | Weight |
|---------|------|--------|
| Headline | 52-68px | 700 |
| Body copy | 23-27px | 400 |
| Brand watermark | 17px | 600 |
| Slide number | 18px | 500 |

### Line Height
- Headlines: `1.08 — 1.1` (tight)
- Body: `1.45 — 1.5` (comfortable)
- Paragraphs: `1.7` (web reading)

---

## Logo & Brand Mark

### Logomark (Icon Only)
The Omniflow logomark is a geometric polygon shape. Used as:
- Favicon
- App icon
- Small watermark on social media slides
- Corner brand badge

### Wordmark
Uses Outfit Bold. The text "omniflow." is lowercase with a period:
- **Color:** `#3B82F6` (blue) on light bg
- **Color:** `#FFFFFF` (white) on dark/blue bg
- **Gap between mark and text:** 8-12px

### Usage Rules
- Always use the official SVG, never rasterized
- Minimum clear space: equal to the height of the logomark
- Don't stretch, rotate, or add effects beyond the official drop-shadow
- On social media: use as subtle watermark (opacity 25-30%) or fully visible brand badge

---

## Backgrounds & Gradients

### Social Media / IG Carousel
```css
/* Primary background — light mode */
background: linear-gradient(165deg, #FFFFFF 0%, #F5F8FC 45%, #EEF2F8 100%);

/* Dot grid overlay */
background-image: radial-gradient(rgba(59,130,246,0.04) 1px, transparent 1px);
background-size: 36px 36px;

/* Blue radial glow (corner accent) */
background: radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%);

/* Orange radial glow */
background: radial-gradient(circle, rgba(249,115,22,0.04), transparent 70%);
```

### Web
```css
/* Hero section */
background: linear-gradient(to bottom right, #F8FAFC, #EFF6FF, #EEF2FF);

/* Dark CTA section */
background: linear-gradient(to bottom right, #0F172A, #1E3A5F, #312E81);

/* Dark sections */
background: linear-gradient(to bottom right, #0F172A, #1E3A5F, #312E81);

/* Button primary */
background: linear-gradient(to right, #2563EB, #1D4ED8);

/* Secondary section */
background: linear-gradient(to right, #F8FAFC, #EFF6FF, #EEF2FF);
```

---

## Shadows & Elevation

| Level | CSS | Usage |
|-------|-----|-------|
| Card default | `0 2px 12px rgba(0,0,0,0.04)` | Dashboard cards, benefit cards |
| Card hover | `0 8px 30px rgba(0,0,0,0.08)` | Interactive cards |
| Button | `0 4px 14px rgba(37,99,235,0.25)` | Primary CTA buttons |
| CTA orange | `0 8px 32px rgba(249,115,22,0.35)` | Orange CTA on blue bg |
| Modal/Dropdown | `0 20px 60px rgba(0,0,0,0.12)` | Enterprise shadow |

---

## Border Radius

| Element | Radius | Usage |
|---------|--------|-------|
| Buttons (pill) | `999px` | CTA buttons |
| Buttons (standard) | `12-14px` / `rounded-xl` | Form buttons, secondary CTAs |
| Cards | `22-28px` / `rounded-2xl` to `rounded-3xl` | All cards |
| Input fields | `12px` / `rounded-xl` | Form inputs |
| Icon circles | `50%` / `rounded-full` | Feature icons, stat badges |
| Badges | `999px` / `rounded-full` | Hero badges, tags |

---

## Iconography

### Library: Lucide React (web) / Phosphor Icons (social media)

### Icon Sizes
| Context | Size |
|---------|------|
| Hero feature icons | 24-28px (`h-6` to `h-7`) |
| Card feature icons | 20-24px |
| Button icons | 18-22px |
| Social media slide icons | 28-40px (SVG viewBox 32) |
| Badge icons | 16px |

### Icon Backgrounds
- Icon circles in social media: `#FFFFFF` bg with `#DBEAFE` border, `100px` diameter
- Icon circles on web: gradient bg (`from-blue-500 to-blue-600`)

---

## Photography Style

### Stock Photo Guidelines
- **Region:** Indonesia / Southeast Asia
- **Lighting:** Natural, not studio
- **Tone:** Slightly desaturated (filter: `saturate(0.85) brightness(1.02)`)
- **Environment:** Real office, real warehouse, real factory
- **Avoid:** Cheesy smiling business people, AI-generated faces, obvious stock poses

### Photo Treatment in Layouts
```css
/* Standard photo treatment for slides */
.photo-side img {
  object-fit: cover;
  filter: saturate(0.85) brightness(1.02);
}
/* Blend gradient from photo to background */
.photo-side::after {
  background: linear-gradient(90deg, rgba(255,255,255,0.12), transparent 55%);
}
```

---

## Layout & Spacing

### Social Media (IG Carousel 1080x1350)
| Property | Value |
|----------|-------|
| Safe margin | 80px all sides |
| Headline → Body gap | 28-36px |
| Section gap | 48-56px |
| Photo width | 46-52% |
| Whitespace minimum | 30% of canvas |

### Web Spacing
| Property | Value |
|----------|-------|
| Section vertical padding | `py-20 lg:py-28` (80-112px) |
| Hero padding | `pt-32 lg:pt-40 pb-20 lg:pb-28` |
| Container max-width | `container-enterprise` |
| Card padding | 28-40px (`p-8` to `p-10`) |
| Card gap | 24-32px (`gap-6` to `gap-8`) |

---

## Button & Component Styles

### Primary Button
```
bg-gradient-to-r from-blue-600 to-blue-700
text-white font-semibold
rounded-xl shadow-lg
hover:shadow-xl hover:-translate-y-0.5
px-8 py-4
```

### Secondary Button
```
bg-white text-blue-700 font-semibold
rounded-xl border-2 border-blue-200
hover:bg-blue-50 hover:border-blue-300
px-8 py-4
```

### CTA on Dark Background
```
bg-white text-blue-700 font-semibold
rounded-xl shadow-lg
border-2 border-white
hover:bg-blue-50
px-8 py-4
```

### Form Inputs
```
w-full px-6 py-4
border-2 border-gray-200 rounded-xl
focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
bg-white shadow-sm
```

### Cards
```
bg-white rounded-2xl shadow-lg
border border-gray-100
hover:shadow-2xl hover:border-blue-200
hover:-translate-y-1
transition-all duration-500
```

### Badges / Pills
```
inline-flex items-center px-4 py-2
bg-blue-100/80 backdrop-blur-sm text-blue-800
rounded-full text-sm font-bold
shadow-sm border border-blue-200
```

---

## Copywriting Tone

### Voice
- Professional, helpful, educational
- Never salesy, never clickbait
- Active voice, short paragraphs

### Rules
- Never use: "Best", "No.1", "Guaranteed", "100%"
- Prefer: "lebih mudah", "lebih cepat", "membantu", "mempermudah", "mengurangi risiko"
- Maximum 10 words per headline (social media)
- Maximum 25 words per supporting copy (social media)
- No em-dashes (—) in social media copy — use commas or periods
- No jargon without explanation

### CTA Style
- Never: "Buy Now", "Limited Offer", "Discount"
- Always: "Pelajari lebih lanjut", "Jadwalkan demo", "Konsultasi gratis", "Hubungi tim kami"

### Languages
- **id:** Indonesian — primary market
- **en:** English — international
- **zh:** Chinese — secondary market

---

## File Naming Conventions

### Stock Photos
```
kebab-case-descriptive.jpg

Good:
  hr-office-worker.jpg
  fingerprint-attendance.jpg
  payroll-documents-desk.jpg
  woman-reviewing-report.jpg

Bad:
  photo_01.jpg
  indonesian-hr.jpg
```

### Template Files
```
omniflow/ig-hris/slide_01.html
omniflow/seo/banner_module-hris-id.html
```

---

## Tooling

| Tool | Purpose |
|------|---------|
| Bun + Playwright | Render HTML→JPG/PNG at 3x DPR |
| Vite + React + Tailwind | Omniflow-id website |
| Lucide React | Web icons |
| Phosphor Icons | Social media icons |
| i18next | Multi-language (id/en/zh) |
| TOML | OG banner data configuration |
| Sharp | PNG→WebP conversion |
