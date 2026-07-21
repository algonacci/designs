# Omniflow Design Style 15: Ledger and Route Control

**Cocok untuk:** Purchasing, inventory, shipping, supply chain, logistics.

## Creative Thesis

Supply chain adalah kombinasi keputusan ledger dan gerakan fisik. Desain memperlihatkan kapan barang disetujui, diterima, dihitung, dipindahkan, dan dikirim.

## Signature Device

**Segmented Route:** garis rute memiliki checkpoint keputusan, bukan panah dekoratif. Setiap segmen mengubah nomor PO, stock tally, warehouse coordinate, weight, dan shipping rate.

## Palette

- Mineral Paper `#E5E1D6`
- Logistics Navy `#1B3147`
- Pending Amber `#D89A32`
- Variance Vermilion `#D9513C`
- Route Green `#3E8A67`
- Steel `#697680`

## Typography

- Display: Roboto Condensed Black
- Brand/body: Outfit
- Manifest/data: IBM Plex Mono

## Material Grammar

- purchase ledger;
- approval marks;
- warehouse coordinates;
- tally marks;
- transfer manifest;
- scale ticket;
- route map;
- courier rate strip.

## Scene Types

1. Demand Signal
2. PO Approval Lane
3. Receiving Checkpoint
4. Stock Ledger
5. Warehouse Transfer
6. Physical Count
7. Rate Comparison Route
8. Supply Control Map

## Narrative Sequence

`REQUEST → APPROVE → ORDER → RECEIVE → STORE → COUNT → ROUTE → DELIVER`

## Avoid

- Truck photo sebagai visual utama.
- Warehouse icon grid.
- Flowchart generik.
- Semua status memakai hijau.
- Peta tanpa hubungan ke data barang.

## QA

- [ ] Checkpoint memiliki decision label.
- [ ] Purchasing, inventory, dan shipping tetap dapat dibedakan.
- [ ] Quantity, UOM, weight, dan rate konsisten.
- [ ] Variance hanya merah saat benar-benar selisih.
- [ ] Closing memperlihatkan satu aliran end-to-end.
