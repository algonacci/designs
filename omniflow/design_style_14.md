# Omniflow Design Style 14: Transaction Trail

**Cocok untuk:** PoS, retail, payment, register, shift, refund.

## Creative Thesis

Transaksi retail adalah rangkaian jejak atomik. Tombol bayar mengubah order, payment, stock, shift, receipt, dan potensi retur secara bersamaan.

## Signature Device

**Thermal Trail:** kertas thermal vertikal melintasi carousel dan berubah menjadi barcode, cart tally, payment split, stock mutation, receipt, dan refund reversal.

## Palette

- Till Black `#111315`
- Thermal White `#F3F1E9`
- Scan Cyan `#31C9D5`
- Paid Lime `#A6E34F`
- Pending Amber `#F6B83F`
- Refund Coral `#F05E5E`

## Typography

- Display: League Spartan
- Brand/body: Outfit
- Receipt/data: IBM Plex Mono

## Material Grammar

- thermal paper;
- barcode;
- cash denomination blocks;
- register display;
- stock arrows;
- shift seals;
- refund strike-through.

## Scene Types

1. Shift Open Seal
2. Barcode Scan
3. Cart Tally
4. Payment Split
5. Atomic Checkout
6. Stock Mutation
7. Refund Reversal
8. Register Closeout

## Narrative Sequence

`OPEN → SCAN → CALCULATE → PAY → COMMIT → MUTATE → REVERSE → CLOSE`

## Avoid

- Shopping bag dan delivery visual.
- Ecommerce storefront metaphor.
- Payment logo wall.
- Receipt kecil di setiap slide.
- Klaim settlement tanpa status evidence.

## QA

- [ ] Thermal Trail tersambung minimal enam slide.
- [ ] Payment dan stock memiliki timestamp atau reference.
- [ ] Refund terlihat sebagai reversal, bukan delete.
- [ ] Cash dan non-cash dibedakan.
- [ ] Barcode simulasi tidak dapat dipakai sebagai data nyata.
