export const PRODUCTS = {
  "chapter:geteilter-himmel:4": {
    name: "Geteilter Himmel — Kapitel 4: Geteilter Himmel",
    amount: 149,
  },
  "chapter:geteilter-himmel:5": {
    name: "Geteilter Himmel — Kapitel 5: Schattenwurf",
    amount: 149,
  },
  "chapter:geteilter-himmel:6": {
    name: "Geteilter Himmel — Kapitel 6: Die Stimme im Papier",
    amount: 149,
  },
  "chapter:geteilter-himmel:7": {
    name: "Geteilter Himmel — Kapitel 7: Zwischen den Zeilen",
    amount: 149,
  },
  "bundle:geteilter-himmel": {
    name: "Geteilter Himmel — Alle 14 Kapitel",
    amount: 1499,
  },
  "poems:download-paket": {
    name: "Poems & Klang — Download-Paket (MP3 + FLAC + Text-PDF)",
    amount: 299,
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
