# Omniflow Design Style 19: Spatial Registry

**Cocok untuk:** Property management, asset management, habitat/community, facility operations.

## Creative Thesis

Properti dan aset tidak hidup di daftar. Mereka hidup di ruang, memiliki lokasi, status, penghuni, perawatan, biaya, dan hubungan fisik.

## Signature Device

**Coordinate Frame:** frame koordinat berpindah antar-slide dan mengunci building, floor, unit, asset, occupant, work order, dan portfolio view.

## Palette

- Concrete `#D5D1C8`
- Survey Black `#202327`
- Registry Blue `#2C5AC4`
- Occupied Orange `#E9783B`
- Available Green `#5A9A70`
- Blueprint White `#F5F5F0`

## Typography

- Display: Neue-style grotesk, gunakan Archivo
- Brand/body: Outfit
- Coordinates: IBM Plex Mono

## Material Grammar

- floor plans;
- survey coordinates;
- unit labels;
- property boundaries;
- asset pins;
- occupancy hatch;
- maintenance overlays;
- portfolio miniatures.

## Scene Types

1. Portfolio Aerial
2. Building Section
3. Floor Registry
4. Unit Status Plan
5. Occupant Layer
6. Asset Pin Map
7. Maintenance Overlay
8. Portfolio Control View

## Narrative Sequence

`PORTFOLIO → BUILDING → FLOOR → UNIT → OCCUPY → ASSET → MAINTAIN → OPTIMIZE`

## Avoid

- Foto gedung mewah generik.
- Map pin berulang.
- Dashboard card occupancy.
- Blueprint biru di semua slide.
- Denah nyata yang sensitif.

## QA

- [ ] Scale berubah dari portfolio ke unit.
- [ ] Coordinate Frame menjaga orientasi.
- [ ] Status ruang memakai hatch dan label.
- [ ] Data lokasi seluruhnya simulasi.
- [ ] Maintenance divisualkan pada lokasi fisiknya.
