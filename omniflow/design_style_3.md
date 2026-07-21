# Omniflow Design Style Guide 3: Operational Editorial

**Sistem visual alternatif untuk carousel Omniflow. Bukan turunan layout dari `design_style.md` atau `design_style_2.md`.**

`design_style.md` tetap menjadi sumber identitas dasar: logo, warna utama, karakter brand, dan aturan copy.

Dokumen ini membawa Omniflow ke bahasa visual baru:

> **ERP bukan kumpulan kartu fitur. ERP adalah aliran keputusan, transaksi, dokumen, dan bukti kerja.**

Karena itu, carousel tidak lagi terlihat seperti landing page yang dipotong menjadi delapan slide. Setiap slide dibuat seperti artefak dari sistem operasional nyata: memo, label gudang, laporan, receipt, peta proses, audit mark, atau layar kontrol.

---

## 1. Creative Thesis

### Nama Sistem

**Operational Editorial**

Gabungan dari:

- editorial design yang tegas dan berani;
- dokumentasi operasional yang faktual;
- interface data yang presisi;
- artefak bisnis yang terasa nyata.

### Rasa yang Dicari

- Cerdas tanpa terlihat futuristik murahan.
- Enterprise tanpa terasa kaku.
- Teknis tanpa menjadi rumit.
- Berani tanpa clickbait.
- Terstruktur, tetapi tidak steril.

### Yang Sengaja Dihindari

- Gradient biru sebagai background default.
- Dot grid di setiap slide.
- Orb glow di setiap sudut.
- Semua informasi dimasukkan ke rounded card.
- Ikon dalam lingkaran berwarna untuk setiap poin.
- Layout split 50/50 foto dan teks.
- CTA palsu berbentuk tombol yang tidak bisa diketuk.
- Delapan slide yang terasa seperti satu template dengan isi berbeda.

---

## 2. Signature Device: The Flowline

Setiap carousel memakai satu garis perjalanan bernama **Flowline**.

Flowline adalah garis biru atau oranye setebal 3–6px yang masuk dari satu tepi slide, berubah fungsi di tengah, lalu keluar melalui tepi lain. Pada slide berikutnya, garis tersebut dapat diteruskan dari sisi yang sama.

Flowline bukan dekorasi acak. Ia mewakili aliran data di dalam Omniflow.

### Transformasi Flowline

- Menjadi underline headline.
- Menghubungkan tahapan proses.
- Membentuk frame foto.
- Menjadi sumbu grafik.
- Mengelilingi data penting.
- Berakhir sebagai panah menuju slide berikutnya.
- Menjadi slash besar atau potongan diagonal.

### Aturan

1. Maksimal satu Flowline utama per slide.
2. Garis harus memiliki titik masuk dan keluar yang jelas.
3. Jangan menggambar garis tanpa hubungan dengan informasi.
4. Arah garis mengikuti urutan baca.
5. Warna biru untuk aliran normal, oranye untuk intervensi, risiko, atau keputusan.

```css
.flowline {
  position: absolute;
  height: 4px;
  background: #2563EB;
}

.flowline.signal {
  background: #F97316;
}
```

---

## 3. Material Palette

Sistem ini tidak hanya memakai warna. Ia memakai **material visual**.

### Paper

Background hangat seperti dokumen kerja, bukan putih digital murni.

| Token | Hex | Fungsi |
|-------|-----|--------|
| Paper | `#F4F1EA` | Background utama |
| Paper Light | `#FBFAF7` | Area informasi utama |
| Paper Shade | `#E8E4DA` | Divider, secondary plane |
| Ink | `#111827` | Headline dan struktur |
| Ink Soft | `#475569` | Body copy |

### Signal

| Token | Hex | Fungsi |
|-------|-----|--------|
| System Blue | `#2357FF` | Flowline, data aktif, keputusan utama |
| Signal Orange | `#FF6B2C` | Risiko, perubahan, callout |
| Terminal Green | `#18A66A` | Status valid, sinkron, selesai |
| Error Red | `#DC3F45` | Masalah nyata, bukan aksen dekoratif |

### Carbon

| Token | Hex | Fungsi |
|-------|-----|--------|
| Carbon | `#111318` | Slide gelap |
| Carbon Raised | `#1B1E25` | Panel atau strip gelap |
| Carbon Line | `#343944` | Rule dan divider |
| Terminal Text | `#D8DEE9` | Teks pada slide gelap |

### Warna Bukan Background Rhythm

Tidak ada kewajiban pola dark-light-blue. Ritme dibentuk oleh perubahan **material**:

1. Paper poster.
2. Carbon terminal.
3. White receipt.
4. Blueprint blue.
5. Paper ledger.
6. Full-bleed crop.
7. Carbon memo.
8. Paper identity card.

Perubahan terasa kuat walaupun palet tetap terbatas.

---

## 4. Texture, Rules, and Marks

### Grain

Paper dan carbon boleh mendapat noise halus 1–2%. Gunakan SVG noise atau image texture kecil. Grain tidak boleh mengganggu keterbacaan.

```css
.grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

### Ruled Lines

Pakai garis horizontal seperti ledger atau dokumen audit.

```css
.ruled {
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 43px,
    rgba(17,24,39,0.08) 44px
  );
}
```

### Crop Marks

Crop marks boleh muncul di 1–2 slide untuk rasa editorial/print. Jangan dipakai di semua slide.

### Stamps

Stamp digunakan untuk status, bukan badge kategori generik.

Contoh:

- `SYNCED`
- `READY TO SHIP`
- `AUDIT TRACE`
- `LIVE STOCK`
- `1 SOURCE OF TRUTH`

Stamp boleh sedikit berotasi `-4deg` sampai `3deg`, memakai border 2px dan tipografi mono.

### Barcode and IDs

Barcode, order ID, timestamp, atau status code dipakai sebagai bukti operasional.

Contoh:

```text
ORDER / OF-240721-0816
SYNC / 14:32:08 WIB
STATUS / READY TO SHIP
```

Jangan memakai data acak tanpa konteks. Angka harus membantu cerita slide.

---

## 5. Typography System

### Font Pairing

1. **Outfit** untuk headline, body, dan brand.
2. **IBM Plex Mono** atau **JetBrains Mono** untuk data, label, timestamp, nomor slide, dan annotation.

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Headline Behavior

Headline bukan selalu blok teks di atas. Pilih satu dari perilaku berikut:

- Oversized dan terpotong tepi canvas.
- Mengikuti garis diagonal.
- Terbagi dua oleh foto atau Flowline.
- Disusun vertikal satu kata per baris.
- Diletakkan seperti judul laporan dengan nomor besar.
- Menjadi margin note di sisi kiri.

### Skala

| Peran | Ukuran | Catatan |
|-------|--------|---------|
| Poster headline | 84–118px | Boleh keluar canvas |
| Editorial headline | 60–78px | Maksimal 4 baris |
| Section title | 38–52px | Untuk slide padat |
| Body | 22–28px | Maksimal 25 kata |
| Data value | 72–180px | Gunakan seperlunya |
| Mono label | 14–18px | Uppercase, tracking lebar |
| Footnote | 14–16px | Sumber, konteks, disclaimer |

### Ragged Alignment

Default alignment adalah kiri. Center hanya boleh dipakai jika kontennya benar-benar simetris. Hindari center alignment otomatis pada headline dan body.

### Highlight

Hanya satu highlight per slide. Bentuk highlight tidak selalu warna teks:

- orange underline;
- blue background strip;
- circle annotation;
- bracket;
- stamp;
- reversed text pada black strip.

---

## 6. Composition Rules

### 12-Column Editorial Grid

Gunakan grid 12 kolom dengan gutter 20px dan margin 64–80px. Elemen boleh melanggar grid, tetapi titik awal dan akhirnya harus terasa disengaja.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
}
```

### Controlled Collision

Elemen boleh saling tumpang tindih jika membentuk hubungan:

- angka besar di belakang headline;
- foto menutupi 20% kata;
- stamp melintasi garis tabel;
- annotation circle menyentuh grafik.

Hindari overlap yang sekadar dekoratif.

### Hard Edges First

Sistem ini mengutamakan:

- garis lurus;
- frame rectangular;
- divider;
- square corner;
- alignment presisi.

Rounded corners hanya untuk elemen yang memang memiliki affordance digital, misalnya UI preview. Dokumen, chart, receipt, dan label tidak perlu rounded besar.

### Negative Space as Pause

Whitespace digunakan seperti jeda editorial, bukan sisa ruang. Ruang kosong harus berada di sisi yang mengarahkan mata ke elemen berikutnya, bukan lubang besar di tengah komposisi.

---

## 7. Eight New Scene Types

Ini bukan template wajib satu per slide. Scene dapat dipilih sesuai cerita. Semuanya berbeda dari arketipe A–P.

### Q. The Operational Poster

Satu headline besar seperti poster kampanye. Kata kunci dipotong oleh Flowline, nomor edisi besar menjadi elemen komposisi, dan satu fakta kecil berada jauh di sudut berlawanan.

**Cocok untuk:** hook atau provokasi.

**Karakter:** hampir tanpa kartu, 80% tipografi.

### R. The Evidence Board

Beberapa artefak tampak ditempel pada bidang kerja:

- order slip;
- screenshot mini;
- sticky annotation;
- status stamp;
- connector line.

Tidak simetris, tetapi tetap mengikuti 12-column grid.

**Cocok untuk:** menunjukkan masalah yang tersebar atau bukti proses manual.

### S. The Infinite Receipt

Satu receipt vertikal panjang mengalir dari atas ke bawah. Isi receipt bukan harga produk, tetapi biaya proses:

```text
MANUAL STOCK CHECK      08 MIN
RE-ENTRY ACCOUNTING     20 MIN
WAITING WAREHOUSE       12 MIN
--------------------------------
TOTAL OPERATING TIME    90 MIN
```

**Cocok untuk:** cost breakdown, timeline, audit, hidden cost.

### T. The Exploded System

Objek inti berada di tengah. Komponen sistem meledak keluar seperti exploded technical diagram, masing-masing diberi leader line dan annotation mono.

**Cocok untuk:** menjelaskan apa saja yang terjadi setelah satu aksi.

### U. The Data X-Ray

Separuh slide menunjukkan tampilan yang terlihat pengguna. Separuh lain menunjukkan proses di balik layar seperti lapisan X-ray.

Contoh:

- kiri: customer menekan checkout;
- kanan: stock reservation, invoice, journal, warehouse task.

**Cocok untuk:** diferensiasi produk.

### V. The Ledger Matrix

Tabel besar memenuhi canvas. Satu baris atau kolom disorot kuat. Informasi dibaca seperti laporan operasional, bukan comparison card.

**Cocok untuk:** comparison, daftar channel, status integrasi.

### W. The Decision Memo

Slide tampak seperti memo internal eksekutif:

- `TO / Operations Director`
- `SUBJECT / Why orders are slowing down`
- ringkasan 3 poin;
- keputusan akhir diberi blue highlight.

**Cocok untuk:** kesimpulan atau rekomendasi.

### X. The Identity Backplate

Penutup bergaya business card atau system identity plate, bukan CTA landing page.

Isi:

- logomark besar;
- module name;
- satu kalimat positioning;
- dua URL yang benar-benar berguna;
- `LINK IN BIO` sebagai satu-satunya instruction.

Tidak ada tombol palsu.

---

## 8. Carousel Narrative Engine

Jangan mulai desain dari delapan layout. Mulai dari delapan **fungsi naratif**.

### Sequence yang Direkomendasikan

| Slide | Fungsi | Scene yang Cocok |
|-------|--------|------------------|
| 1 | Disrupt | Q: Operational Poster |
| 2 | Prove the pain | R: Evidence Board |
| 3 | Quantify | S: Infinite Receipt |
| 4 | Reveal mechanism | T: Exploded System |
| 5 | Explain differentiation | U: Data X-Ray |
| 6 | Compare | V: Ledger Matrix |
| 7 | Recommend | W: Decision Memo |
| 8 | Identify next action | X: Identity Backplate |

Urutan ini membentuk alur:

> **Attention → Evidence → Cost → Mechanism → Difference → Choice → Decision → Action**

### Swipe Continuity

Setiap slide harus meninggalkan satu elemen yang diteruskan ke slide berikutnya:

- Flowline keluar kanan lalu masuk kiri.
- Nomor order sama berpindah konteks.
- Kata terakhir slide menjadi label slide berikutnya.
- Warna sinyal berpindah dari orange ke blue setelah solusi diperkenalkan.

Carousel terasa seperti satu perjalanan, bukan delapan poster terpisah.

---

## 9. Photography Direction

### Editorial Crop, Not Stock Placement

Foto tidak dipasang sebagai setengah canvas. Foto diperlakukan sebagai material:

- crop ekstrem pada tangan, barcode scanner, paket, layar;
- rectangular window yang menimpa teks;
- contact sheet berisi 3 crop dari satu sesi;
- duotone blue-black;
- foto dengan annotation dan leader line.

### Subject Direction

Pilih tindakan, bukan pose:

- tangan menempel label;
- staf scan paket;
- owner memeriksa pesanan;
- tim melihat satu layar;
- barang berpindah di conveyor;
- kasir memproses transaksi.

### Treatment

```css
.photo-blueprint {
  filter: grayscale(1) contrast(1.12);
  mix-blend-mode: multiply;
  opacity: 0.82;
}

.photo-carbon {
  filter: saturate(0.55) contrast(1.08) brightness(0.78);
}
```

### Photo Limit

- Maksimal dua sumber foto per carousel.
- Satu sumber foto boleh menghasilkan beberapa crop dalam **slide yang sama**.
- Foto tidak boleh dipinjam dari carousel lain.
- Foto tidak wajib ada jika cerita lebih kuat lewat artefak data.

---

## 10. Data Visualization

### Default: Direct Labeling

Jangan gunakan legend terpisah jika label bisa ditempatkan langsung pada elemen.

### Chart Style

- Flat, tanpa shadow.
- Sumbu tipis `#CBD5E1`.
- Satu seri utama biru.
- Satu exception oranye.
- Angka utama besar, label kecil mono.
- Gridline hanya horizontal dan maksimal 4.

### Annotation

Annotation ditulis seperti catatan analis:

```text
↑ 38% VS AVG
BOTTLENECK HERE
AUTO-SYNCED
NO RE-ENTRY
```

Gunakan leader line 1.5px. Annotation boleh sedikit keluar dari chart agar terasa editorial.

### Honest Numbers

Angka simulasi harus diberi label:

- `ILUSTRASI PROSES`
- `CONTOH OPERASIONAL`
- `SIMULASI`

Jangan tampilkan testimonial, persentase, atau waktu implementasi sebagai fakta jika belum ada sumber yang dapat diverifikasi.

---

## 11. Logo, Index, and Navigation

### Logo

Logo tidak wajib selalu di kiri atas.

Pilihan penempatan:

- menjadi masthead vertikal di kiri;
- tercetak seperti stamp pada receipt;
- menjadi watermark besar yang terpotong;
- diletakkan pada identity strip bawah;
- menjadi node pusat pada system diagram.

Logo tetap harus terbaca minimal sekali di setiap slide.

### Slide Index

Nomor slide menjadi bagian editorial:

```text
OF / 03
03 OF 08
FRAME 03
PAGE 03
```

Gunakan font mono 14–18px. Format boleh bervariasi antar carousel, tetapi konsisten dalam satu carousel.

### Swipe Cue

Slide 1–7 dapat memiliki cue kecil:

```text
NEXT / SEE THE COST →
```

Cue harus merujuk isi slide berikutnya. Jangan hanya menulis `Swipe`.

---

## 12. Copy Behavior

Aturan tone dasar tetap mengikuti `design_style.md`.

### Tambahan Khusus Operational Editorial

- Tulis seperti analyst, bukan advertiser.
- Gunakan kata benda dan kata kerja konkret.
- Tunjukkan mekanisme sebelum manfaat.
- Hindari klaim abstrak seperti "transformasi", "revolusioner", dan "solusi terbaik".
- Headline boleh berbentuk observasi, memo subject, atau statement data.

### Contoh

Kurang tepat:

> Tingkatkan efisiensi bisnis Anda dengan solusi terintegrasi.

Lebih tepat:

> Satu order dicatat ulang tiga kali.

Kurang tepat:

> Kelola stok lebih mudah dan cepat.

Lebih tepat:

> Checkout mengurangi stok sebelum invoice dikirim.

### No Em Dash

Tetap gunakan koma, titik, colon, slash, atau line break.

---

## 13. Motion Without Animation

Walaupun output berupa gambar statis, slide harus terasa bergerak.

Gunakan:

- garis yang masuk dan keluar frame;
- elemen yang terpotong tepi;
- sequence number;
- panah kecil;
- crop berbeda dari objek yang sama;
- perubahan status dari orange menjadi green;
- receipt yang tampak berlanjut di luar canvas.

Hindari semua elemen duduk aman di tengah. Sedikit ketegangan visual membuat swipe lebih menarik.

---

## 14. Anti-Monotony Rules

Satu carousel dianggap gagal jika memenuhi dua atau lebih kondisi berikut:

- Empat slide memakai headline di posisi yang sama.
- Tiga slide berturut-turut memakai card grid.
- Semua slide memakai rounded corners.
- Semua slide memakai background gradient.
- Semua slide punya logo dan nomor di koordinat identik.
- Dua slide memakai treatment foto yang sama.
- Setiap slide memiliki badge di atas headline.
- Semua highlight berupa teks biru.

### Rotation Rules

Dalam delapan slide, wajib ada:

- satu slide dominan tipografi;
- satu slide dominan data;
- satu slide dominan diagram;
- satu slide dominan artefak/dokumen;
- satu slide dominan foto;
- satu slide hampir tanpa warna biru;
- satu slide dengan komposisi diagonal atau overlap;
- satu slide dengan negative space yang ekstrem tetapi disengaja.

---

## 15. QA Checklist

### Concept

- [ ] Setiap slide terasa seperti scene, bukan section website.
- [ ] Flowline memiliki fungsi dan kontinuitas.
- [ ] Minimal lima jenis material visual dipakai sepanjang carousel.
- [ ] Tidak ada arketipe A–P yang disalin mentah.

### Visual

- [ ] Maksimal dua slide memakai gradient sebagai background utama.
- [ ] Rounded cards bukan bentuk dominan.
- [ ] Minimal satu slide memakai Paper background.
- [ ] Minimal satu slide memakai Carbon background.
- [ ] Minimal satu headline keluar atau menyentuh batas grid.
- [ ] Logo hadir tetapi tidak selalu di posisi sama.

### Content

- [ ] Setiap klaim angka punya sumber atau label simulasi.
- [ ] Tidak ada testimonial fiktif yang tampil sebagai fakta.
- [ ] Tidak ada tombol palsu pada CTA.
- [ ] Copy konkret dan mekanistik.
- [ ] Tidak ada em dash.

### Technical

- [ ] Canvas 1080×1350.
- [ ] Semua konten utama berada dalam safe area.
- [ ] Elemen sengaja terpotong diberi class yang jelas.
- [ ] Output JPEG quality 92.
- [ ] Total delapan slide idealnya di bawah 8MB.

---

## 16. Example Direction for `ig-ecommerce`

Contoh penerapan tanpa mendesain slide secara literal:

| Slide | Scene | Isi |
|-------|-------|-----|
| 1 | Operational Poster | "Satu order. Tiga kali input." |
| 2 | Evidence Board | Sheet stok, invoice, chat resi, order ID yang sama |
| 3 | Infinite Receipt | Biaya waktu dari proses manual |
| 4 | Exploded System | Checkout memicu lima proses ERP |
| 5 | Data X-Ray | Storefront di depan, ERP engine di belakang |
| 6 | Ledger Matrix | Toko biasa vs Omniflow per proses |
| 7 | Decision Memo | Rekomendasi untuk Operations Director |
| 8 | Identity Backplate | Omniflow Commerce + URL + link in bio |

Yang membuat versi ini berbeda bukan warna atau ikon baru. Perbedaannya adalah **cara informasi dibuktikan**.

---

## Summary

| Design Style | Metafora Utama | Kekuatan |
|--------------|----------------|----------|
| Style 1 | SaaS enterprise UI | Konsisten dan aman |
| Style 2 | Carousel layout library | Variasi komposisi |
| Style 3 | Operational editorial evidence | Distinctive, faktual, dan berkarakter |

**Style 3 tidak membuat Omniflow terlihat seperti perusahaan yang menjual software. Style 3 membuat Omniflow terlihat seperti perusahaan yang memahami bagaimana bisnis benar-benar bekerja.**
