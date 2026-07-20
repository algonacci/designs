# Omniflow Design Style Guide 2 — Carousel Layout System

**Companion to [design_style.md](design_style.md), bukan pengganti.**

Dokumen pertama mengatur *identitas brand*: warna, tipografi, logo, tone copy. Semua itu masih berlaku penuh.

Dokumen ini mengatur *sistem layout carousel*: bagaimana 8 slide disusun supaya tidak monoton. Aturannya lahir dari revamp `ig-introduction` dan dimaksudkan untuk dipakai ulang di carousel berikutnya.

Kalau ada konflik, **design_style.md menang untuk urusan brand**, dokumen ini menang untuk urusan komposisi slide.

---

## Masalah yang Dipecahkan

Carousel versi lama memakai satu pola untuk hampir semua slide: background gradient terang, foto split 50/50, headline kiri. Hasilnya saat di-swipe terasa seperti satu gambar yang teksnya berganti-ganti. Ditambah 4 slide memakai foto dan 2 di antaranya foto yang sama persis.

Prinsip perbaikannya satu kalimat:

> **Tidak ada dua slide yang memakai arketipe layout yang sama.**

Konsistensi dijaga oleh token brand (warna, font, logo, jarak), bukan oleh keseragaman komposisi.

---

## 1. Ritme Background

Background bergantian supaya swipe terasa berdenyut. Slide gelap dipakai sebagai **penanda babak**: pembuka, titik balik, penutup.

| Slide | Peran naratif | Background |
|-------|---------------|------------|
| 1 | Hook | Dark |
| 2 | Insight | Light |
| 3 | Angka besar | Blue |
| 4 | Kategori | Light |
| 5 | Diferensiasi | Dark |
| 6 | Untuk siapa | Light |
| 7 | Kenapa kami | Light |
| 8 | CTA | Blue |

**Aturan ritme:**
- Slide 1 wajib gelap atau biru. Feed IG mayoritas terang, slide pertama harus menghentikan scroll.
- Slide terakhir wajib biru (CTA brand).
- Jangan pernah 3 slide terang berturut-turut. Dua boleh (slide 6–7) asal arketipenya sangat berbeda.
- Maksimal 3 slide gelap/biru per 8 slide. Lebih dari itu carousel terasa berat.

### Resep background

```css
/* LIGHT — sudut gradient diputar per slide (155–200deg) supaya tidak identik */
background: linear-gradient(170deg, #FFFFFF 0%, #F4F7FB 48%, #EAEFF7 100%);

/* DARK */
background: #0B1220;

/* BLUE */
background: linear-gradient(155deg, #1D4ED8 0%, #2563EB 42%, #172F72 100%);
```

Sudut gradient light yang sudah terpakai: `170deg` (s2), `185deg` (s4), `200deg` (s6), `175deg` (s7). Variasikan, jangan pakai satu angka untuk semua.

### Overlay wajib

Setiap canvas dapat dot grid. Warnanya menyesuaikan background:

```css
/* di atas light */
background-image: radial-gradient(rgba(59,130,246,0.045) 1px, transparent 1px);
background-size: 36px 36px;

/* di atas dark / blue */
background-image: radial-gradient(rgba(147,197,253,0.07) 1px, transparent 1px);
background-size: 38px 38px;
```

### Orb glow

1–2 per slide, posisi berbeda tiap slide, selalu `pointer-events: none` dan `border-radius: 50%`. Ini yang membuat slide dengan arketipe sama tetap terasa lain.

```css
/* light  */ background: radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%);
/* dark   */ background: radial-gradient(circle, rgba(139,92,246,0.28), transparent 68%);
/* blue   */ background: radial-gradient(circle, rgba(249,115,22,0.24), transparent 70%);
```

Ukuran 520–720px, ditempatkan menggantung keluar canvas (`top: -220px; right: -160px`) supaya terpotong natural.

---

## 2. Delapan Arketipe Layout

Ini perpustakaan bentuk. Satu carousel memilih 8 yang berbeda, tidak harus urutan ini.

### A. Full-bleed photo + floating chips
Foto menutupi seluruh canvas, ditimpa veil gelap bergradasi, headline di bawah, chip kaca melayang di area atas.
**Untuk:** hook, membuka masalah. **Butuh foto:** ya.

```css
.veil {
  background: linear-gradient(180deg,
    rgba(11,18,32,0.72) 0%, rgba(11,18,32,0.34) 26%,
    rgba(11,18,32,0.88) 62%, #0B1220 88%);
}
.photo img { filter: saturate(0.62) brightness(0.92) contrast(1.04); opacity: 0.68; }
```

Veil dua tahap ini penting: bagian tengah dibiarkan terang supaya foto terbaca, bagian bawah dibuat pekat supaya teks aman berapa pun fotonya.

### B. Diagram before/after
Dua panel SVG berdampingan dengan panah di tengah. Kiri: node berserak dengan garis putus-putus kusut. Kanan: hub-and-spoke rapi dengan logo di pusat.
**Untuk:** menjelaskan konsep, bukan mendaftar fitur. **Butuh foto:** tidak.

Digambar penuh dengan SVG (`<text>` ikut di dalam SVG) supaya presisi dan tajam di 3x. Jangan campur chip HTML dengan garis SVG, penyelarasannya rapuh.

### C. Angka raksasa
Satu numeral 300–380px dengan gradient text, label di sampingnya, grid chip di bawah.
**Untuk:** satu angka yang ingin diingat. **Butuh foto:** tidak.

```css
.numeral {
  font-size: 372px; font-weight: 700; line-height: 0.82; letter-spacing: -0.05em;
  background: linear-gradient(160deg, #FFFFFF 0%, #DBEAFE 55%, #93C5FD 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```

`line-height: 0.82` memangkas ruang kosong bawaan angka. Tanpa itu numeral tampak melayang.

### D. Bento 2×2
Empat kartu setara, tiap kartu punya warna aksen sendiri, garis aksen 5px di tepi atas.
**Untuk:** 4 kategori sejajar. **Butuh foto:** tidak.

### E. Mockup UI produk
Kartu putih yang meniru antarmuka asli: header + baris alert + bar chart + baris rekomendasi.
**Untuk:** membuktikan klaim produk, bukan sekadar menyebutkannya. **Butuh foto:** tidak.

Arketipe paling mahal dibuat, tapi paling meyakinkan. Pakai satu per carousel, jangan lebih.

### F. Band rows
Baris full-width bergaris pemisah, tiap baris: ikon kotak + nama + sub + pill di kanan.
**Untuk:** 4–6 item yang perlu dibaca berurutan. **Butuh foto:** tidak.

Iramanya seperti tabel, sengaja berbeda dari grid kartu (D) supaya dua slide berisi "daftar" tidak terasa kembar.

### G. Stat trio + photo card
Tiga tile angka di atas, satu kartu foto besar dengan caption overlay di bawah.
**Untuk:** kredibilitas, bukti sosial. **Butuh foto:** ya.

### H. Centered brand CTA
Logo besar di tengah, wordmark, tagline, divider oranye, headline, dua tombol, URL.
**Untuk:** slide penutup. **Butuh foto:** tidak.

Satu-satunya arketipe dengan `text-align: center`. Kalau dipakai di tengah carousel, kekuatannya sebagai penutup hilang.

---

## 3. Canvas & Spacing

| Properti | Nilai |
|----------|-------|
| Ukuran canvas | 1080 × 1350 |
| Padding standar | `80px` semua sisi |
| Padding saat elemen menyentuh dasar | `80px 80px 108px` atau `80px 80px 112px` |
| Lebar konten maksimal | 920px (1080 − 80 − 80) |
| Headline → body | 20–24px |
| Body → blok berikutnya | 38–56px |

### Aturan clearance nomor slide

Nomor slide duduk di `bottom: 62px`, artinya sisi atasnya ada di sekitar y=1266. Padding 80px membuat kotak konten berakhir di y=1270. **Keduanya bertabrakan.**

> Kalau ada kartu, grid, atau foto yang menempel ke dasar canvas, naikkan `padding-bottom` ke **108–112px**.

Slide yang blok bawahnya berupa teks biasa boleh tetap 80px, tapi teks itu harus dibatasi `max-width: 800px` supaya tidak menabrak nomor slide secara horizontal.

### Aturan dead space

Pola `margin-top: auto` pada blok terakhir mendorong seluruh sisa ruang menjadi satu celah menganga di tengah slide. Kalau celahnya lewat ~150px, **jangan dibiarkan dan jangan diakali dengan auto margin kedua** (dua auto margin bersebelahan tetap menghasilkan satu celah yang sama).

Pilih salah satu:
1. Perbesar elemen yang ada (padding kartu, tinggi foto, ukuran numeral).
2. Tambah konten yang memang berguna, misal satu baris chip ringkasan.
3. Ubah proporsi SVG, misalnya viewBox `920×520` menjadi `920×660`.

Ketiganya menambah bobot visual. Menggeser posisi saja tidak menyelesaikan apa pun.

---

## 4. Token Warna Tambahan

Melengkapi palet di design_style.md.

### Dark canvas

| Token | Hex | Kegunaan |
|-------|-----|----------|
| Canvas dark | `#0B1220` | Background slide gelap |
| Teks utama | `#FFFFFF` | Headline |
| Teks sekunder | `#94A3B8` | Body copy |
| Teks tersier | `#CBD5E1` | Label chip |
| Nomor slide | `rgba(255,255,255,0.38)` | — |
| Border kaca | `rgba(255,255,255,0.18–0.28)` | Chip, kartu kaca |
| Isi kaca | `rgba(255,255,255,0.08–0.14)` | Chip, kartu kaca |

### Aksen empat pilar

Dipakai di bento (D). Empat warna berbeda inilah yang paling terasa menyegarkan dibanding kartu serba biru.

| Pilar | Accent | Tint |
|-------|--------|------|
| Operasional | `#3B82F6` | `#EFF6FF` |
| People | `#22C55E` | `#F0FDF4` |
| Keuangan | `#F97316` | `#FFF7ED` |
| AI | `#8B5CF6` | `#F5F3FF` |

### Aksen industri

Dipakai di band rows (F).

| Industri | Accent | Tint |
|----------|--------|------|
| Manufaktur | `#2563EB` | `#EFF6FF` |
| Distribusi | `#7C3AED` | `#F5F3FF` |
| Retail & F&B | `#EA580C` | `#FFF7ED` |
| Jasa & Profesional | `#16A34A` | `#F0FDF4` |
| Properti & Klinik | `#0891B2` | `#ECFEFF` |

Diterapkan lewat CSS custom property supaya satu kelas melayani semua varian:

```css
.card { border-top: 5px solid var(--accent); }
.card .ico { background: var(--tint); }
.c-ops { --accent: #3B82F6; --tint: #EFF6FF; }
```

---

## 5. Tipografi per Arketipe

Ukuran headline **turun** seiring bertambahnya elemen dalam slide. Slide penuh kartu tidak boleh memakai headline sebesar slide hook.

| Arketipe | Headline | Body | Catatan |
|----------|----------|------|---------|
| A. Full-bleed photo | 68px | 25px | Terbesar, nyaris tanpa elemen lain |
| B. Diagram | 56px | 25px | — |
| C. Angka raksasa | 62px (label) | 23px | Numeral 372px jadi fokus |
| D. Bento 2×2 | 50px | 24px | Terkecil, 4 kartu sudah ramai |
| E. UI mock | 54px | 24px | — |
| F. Band rows | 52px | 24px | — |
| G. Stat + photo | 52px | — | Body diserap tile & caption |
| H. CTA | 56px | 24px | — |

Konstanta: `font-weight: 700`, `line-height: 1.06–1.10`, `letter-spacing: -0.022em`.

Satu frasa kunci per headline diberi warna aksen (`<span>`). Di background terang pakai `#3B82F6` atau `#F97316`; di gelap pakai `#FB923C` atau gradient text.

---

## 6. Komponen

### Badge kategori
Label kecil di atas headline. Warnanya mengikuti tema slide, bukan selalu biru.

```css
.badge {
  display: inline-flex; align-items: center;
  padding: 8px 18px; border-radius: 100px; margin-bottom: 26px;
  font-size: 14px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.1em;
}
```

| Varian | Background | Border | Teks |
|--------|-----------|--------|------|
| Biru (light) | `#EFF6FF` | `#DBEAFE` | `#1E40AF` |
| Oranye (light) | `#FFF7ED` | `#FFEDD5` | `#C2410C` |
| Oranye (dark) | `rgba(249,115,22,0.14)` | `rgba(249,115,22,0.4)` | `#FDBA74` |
| Ungu (dark) | `rgba(139,92,246,0.18)` | `rgba(139,92,246,0.45)` | `#C4B5FD` |

### Glass chip
Chip melayang di atas foto atau background gelap.

```css
.chip {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 22px; border-radius: 100px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(14px);
  color: #E2E8F0; font-size: 21px; font-weight: 500;
  box-shadow: 0 10px 30px rgba(0,0,0,0.22);
}
```

Saat berserak, beri rotasi `-7deg` sampai `6deg`. Rotasi seragam terlihat seperti kesalahan; rotasi bervariasi terbaca sebagai desain.

### Kartu bento
```css
.card {
  min-height: 372px; padding: 34px;
  background: #FFFFFF; border-radius: 26px;
  border: 1px solid #EAEFF6;
  box-shadow: 0 4px 20px rgba(15,23,42,0.05);
}
.card::before { /* garis aksen atas */
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 5px;
  background: var(--accent);
}
```
Ikon 78px lingkaran ber-tint, nama kategori 31px/700, daftar modul 21px dengan bullet ber-warna aksen, pill jumlah modul di kanan atas.

### Band row
```css
.row {
  display: flex; align-items: center; gap: 26px;
  padding: 36px 6px; border-top: 1.5px solid #E4EAF2;
}
.row:last-child { border-bottom: 1.5px solid #E4EAF2; }
```
Ikon 68px rounded-square (`border-radius: 20px`, bukan lingkaran, supaya beda dari bento), nama 29px/600, sub 20px, pill di kanan lewat `margin-left: auto`.

### Stat tile
```css
.stat {
  padding: 30px 26px; background: #FFFFFF; border-radius: 22px;
  border: 1px solid #E9EEF6; box-shadow: 0 3px 16px rgba(15,23,42,0.045);
}
.stat .v { font-size: 46px; font-weight: 700; color: #3B82F6; letter-spacing: -0.03em; }
.stat .v.sm { font-size: 34px; }  /* untuk nilai berupa kata, bukan angka */
```
Tiga tile per baris. Nilai yang berupa kata ("Lokal") memakai `.sm` supaya tinggi baris tetap seimbang.

### Kartu foto dengan caption
```css
.photo-card { width: 920px; height: 540px; border-radius: 26px; overflow: hidden;
  box-shadow: 0 18px 50px rgba(15,23,42,0.16); }
.photo-card .shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(11,18,32,0.05) 0%,
    rgba(11,18,32,0.30) 42%, rgba(11,18,32,0.86) 100%);
}
```
Caption 30px/600 putih di bawah, pill kaca di kiri atas.

### Mockup UI
Header (mark gradient 50px + judul 24px + sub 17px + pill "Live" hijau), lalu baris-baris ber-tint:

| Baris | Background | Label | Warna label |
|-------|-----------|-------|-------------|
| Alert | `#FFF7ED` | ANOMALI TERDETEKSI | `#EA580C` |
| Rekomendasi | `#EFF6FF` | REKOMENDASI | `#2563EB` |

Bar chart: 7 batang flex, `border-radius: 8px 8px 4px 4px`, tinggi 132px. Batang netral `#DBEAFE`, batang penting gradient biru, batang bermasalah gradient oranye. Bayangan kartu `0 30px 80px rgba(0,0,0,0.45)` supaya mengambang di atas canvas gelap.

---

## 7. Brand Mark & Nomor Slide

Watermark berpindah posisi antar slide. Ini yang membuat mata tidak "mengunci" ke satu titik.

| Slide | Posisi brand |
|-------|--------------|
| 1, 2, 4, 5, 7 | Kiri atas |
| 3, 6 | Kanan atas (`align-self: flex-end`) |
| 8 | Tengah, versi besar |

Logomark 30px + wordmark 18px/600. Di light `#3B82F6`, di dark/blue `#FFFFFF`.

Nomor slide: format `01 / 08`, 18px/500, `letter-spacing: 0.08em`, `bottom: 62px`. Default di kanan; pindah ke kiri kalau sudut kanan bawah sudah ramai (dipakai di slide 6).

---

## 8. Kebijakan Foto

Aturan lama di design_style.md soal region, pencahayaan, dan filter tetap berlaku. Yang baru:

- **Maksimal 2 slide berfoto per 8 slide.** Sisanya diselesaikan dengan desain. Ini memangkas biaya produksi sekaligus menaikkan variasi.
- **Tidak boleh ada foto yang dipakai dua kali** dalam satu carousel.
- **Dua slide berfoto harus memakai perlakuan berbeda.** Satu full-bleed dengan veil, satu inset card dengan caption. Dua foto split 50/50 akan terbaca kembar.
- Foto di slide gelap: `saturate(0.62) brightness(0.92) contrast(1.04)`, `opacity: 0.68`.
- Foto di kartu terang: `saturate(0.85) brightness(1.02)` sesuai standar lama.

---

## 9. Copy

Semua aturan tone di design_style.md berlaku. Penegasan yang sering terlewat:

- Tanpa em-dash. Pakai koma atau titik.
- Tanpa "100%", "terbaik", "nomor 1", "garansi". Klaim "Lokal" atau "2-4 minggu" lebih kredibel dan tidak melanggar.
- Angka harus konsisten lintas slide. Pada `ig-introduction`: 8+6+7+5 = 26 di slide 4, dan 11 chip + "+15 modul lain" = 26 di slide 3. Cek penjumlahan sebelum render.
- Headline maksimal 10 kata, body maksimal 25 kata.

---

## 10. Checklist QA

Sebelum render final:

**Layout**
- [ ] Tidak ada dua slide dengan arketipe sama
- [ ] Ritme background sesuai bagian 1, tidak ada 3 slide terang beruntun
- [ ] Tidak ada celah kosong > 150px di tengah slide mana pun
- [ ] Semua slide dengan elemen menempel dasar sudah `padding-bottom: 108–112px`
- [ ] Nomor slide tidak menabrak konten mana pun
- [ ] Posisi brand watermark bervariasi

**Konten**
- [ ] Penjumlahan angka konsisten lintas slide
- [ ] Tidak ada foto terpakai dua kali
- [ ] Maksimal 2 slide berfoto
- [ ] Copy lolos aturan bagian 9

**Cek overflow otomatis**

Jalankan di console tiap slide. Abaikan hasil dari elemen dekoratif (`glow`, `orb-*`, `photo`) yang memang sengaja menggantung keluar canvas.

```js
(() => {
  let max = 0, who = '';
  document.querySelectorAll('.canvas *').forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.height && r.bottom > max) { max = r.bottom; who = e.className || e.tagName; }
  });
  return { maxBottom: Math.round(max), el: who };
})()
```

Nilai wajar untuk konten sungguhan: **di bawah 1270**.

---

## 11. Render

```bash
bun run index.ts --width 1080 --height 1350 omniflow/<folder>/slide_01.html ...
```

Keluaran 3240 × 4050 (DPR 3x).

**Quality JPEG: pakai 92, bukan 100.** Selisih visualnya tidak terlihat, tapi ukuran file turun drastis (34 MB menjadi 4,6 MB untuk 8 slide). Instagram tetap mengompresi ulang saat unggah, jadi file raksasa tidak memberi keuntungan apa pun.

**Catatan:** `index.ts` menjalankan `chromium.launch()` sekali per file dan pernah gagal dengan `TimeoutError: launch` disertai error pipe DevTools. Kegagalannya intermiten, percobaan ulang biasanya berhasil. Untuk batch besar lebih andal memakai script yang meluncurkan browser sekali lalu memutari semua file, dan script itu harus berada **di dalam root repo** supaya `playwright` teresolusi ke `node_modules` proyek, bukan ke cache global bun.

---

## Ringkasan

| Aspek | Sebelum | Sesudah |
|-------|---------|---------|
| Arketipe layout | 3 | 8 |
| Slide berfoto | 4 (2 duplikat) | 2 |
| Variasi background | 2 | 3 + ritme terencana |
| Warna aksen | Biru saja | Biru, hijau, oranye, ungu, cyan |
| Ukuran keluaran | 34 MB | 4,6 MB |
