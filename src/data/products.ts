import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "solaris",
    slug: "solaris",
    name: "Eleganz Solaris",
    noteTag: "Citrus Woody",
    notes: ["Bergamot", "Cardamom", "Vetiver"],
    description:
      "The house flagship — a fresh citrus opening over aromatic lavender and geranium, settling into a deep, long-wearing woody base. Built for Indian summers.",
    price: 2999,
    volumeMl: 100,
    texture: "wood",
    bottleVariant: "amber",
    photoImage: "/images/products/eleganz-solaris-hero.jpg",
    mood: "Fresh citrus energy that settles into quiet confidence — for warm days and long evenings.",
    isFlagship: true,
    tagline: "Fresh citrus. Aromatic sophistication. A deep woody finish.",
    notesDetail: {
      top: ["Sicilian Bergamot", "Pink Grapefruit", "Cardamom"],
      heart: ["Lavender", "Geranium", "Aromatic Accord"],
      base: ["Vetiver", "Cedarwood", "Amberwood"],
    },
    benefits: [
      "12+ hour wear, engineered to hold up in Indian heat and humidity",
      "A fresh opening that turns warm and woody through the day",
      "Balanced sillage — noticeable up close, never overpowering a room",
      "Eau de Parfum concentration, skin-safe and IFRA-compliant",
    ],
    occasions: [
      "Office and client meetings",
      "Summer evenings and dinners",
      "First dates",
      "Festive and family occasions",
    ],
    howToApply: [
      "Apply to pulse points — wrists, neck and behind the ears — right after a shower, on clean, moisturised skin.",
      "Hold the bottle 5–7 cm away and spray directly; don't rub your wrists together afterwards, it breaks down the top notes.",
      "2–3 sprays is enough for a full day's wear — Solaris is built to last, not to be reapplied.",
      "On hot, humid days, add one extra spray to clothing (not skin) to extend wear without overwhelming the room.",
    ],
    faqs: [
      {
        question: "What kind of fragrance is Eleganz Solaris?",
        answer:
          "Solaris is a fresh-woody Eau de Parfum: a citrus and aromatic opening of bergamot, grapefruit and cardamom, resting on a deep base of vetiver, cedarwood and amberwood.",
      },
      {
        question: "Is Solaris suitable for warm weather?",
        answer:
          "Yes — it's formulated specifically for warm, humid Indian summers. The citrus opening feels light in heat, while the woody base keeps it from disappearing by midday.",
      },
      {
        question: "What are the key fragrance notes in Solaris?",
        answer:
          "Top: Sicilian bergamot, pink grapefruit, cardamom. Heart: lavender, geranium, an aromatic accord. Base: vetiver, cedarwood, amberwood.",
      },
      {
        question: "How long does the fragrance last?",
        answer:
          "Most wearers get 10–12 hours from 2–3 sprays, even through a full working day in Indian summer conditions.",
      },
      {
        question: "How should I apply perfume?",
        answer:
          "Spray onto pulse points on clean skin — wrists, neck, behind the ears — right after a shower. Don't rub the spots together afterwards.",
      },
      {
        question: "When is the best time to wear Solaris?",
        answer:
          "It's an all-day fragrance: sharp enough for office mornings, warm enough for evening dinners and festive occasions.",
      },
      {
        question: "Is Solaris a fresh or woody fragrance?",
        answer:
          "Both, in sequence — it opens fresh and citrus-forward, then dries down into a deep, sophisticated woody base over the first hour of wear.",
      },
    ],
  },
  {
    id: "vetiver-ash",
    name: "Vetiver & Ash",
    noteTag: "Smoked Vetiver",
    notes: ["Vetiver", "Ash Wood", "Black Pepper"],
    description:
      "A smoked-vetiver opening settles into warm ash wood — built for long boardroom days that run into late dinners.",
    price: 4950,
    volumeMl: 50,
    texture: "wood",
    bottleVariant: "smokedCharcoal",
    photoImage: "/images/products/eleganz-vetiver-ash.jpg",
    mood: "Smoky and grounded — for boardrooms that run late.",
  },
  {
    id: "cognac-folio",
    name: "Cognac Folio",
    noteTag: "Amber Leather",
    notes: ["Leather", "Amber", "Aged Tobacco"],
    description:
      "Worn leather and aged tobacco, folded into amber — the scent of a well-used desk diary.",
    price: 5400,
    volumeMl: 50,
    texture: "leather",
    bottleVariant: "deepBrown",
    photoImage: "/images/products/eleganz-cognac-folio.jpg",
    mood: "Worn leather and warmth — for dinners that matter.",
  },
  {
    id: "black-pepper-ledger",
    name: "Black Pepper Ledger",
    noteTag: "Cracked Pepper",
    notes: ["Black Pepper", "Cedar", "White Musk"],
    description:
      "Cracked black pepper against clean cedar — precise, unshowy, built to be noticed only up close.",
    price: 4650,
    volumeMl: 50,
    texture: "spice",
    bottleVariant: "nearBlack",
    photoImage: "/images/products/eleganz-black-pepper-ledger.jpg",
    mood: "Sharp, precise, unshowy — noticed only up close.",
  },
  {
    id: "saffron-atelier",
    name: "Saffron Atelier",
    noteTag: "Saffron Oud",
    notes: ["Saffron", "Oud", "Sandalwood"],
    description:
      "A measured dose of saffron and oud, softened by sandalwood — the collection's most formal note.",
    price: 6200,
    volumeMl: 50,
    texture: "atelier",
    bottleVariant: "burgundy",
    photoImage: "/images/products/eleganz-saffron-atelier.jpg",
    mood: "Formal and rich — the collection's most ceremonial note.",
  },
  {
    id: "fig-copper",
    name: "Fig & Copper",
    noteTag: "Green Fig",
    notes: ["Green Fig", "Vetiver", "Patchouli"],
    description:
      "Green fig leaf over dry patchouli — the daytime note in the collection, worn from desk to dinner.",
    price: 4800,
    volumeMl: 50,
    texture: "linen",
    bottleVariant: "forestGreen",
    photoImage: "/images/products/eleganz-fig-copper.jpg",
    mood: "Green and daylight-bright — desk to dinner in one spray.",
  },
  {
    id: "amber-study",
    name: "Amber Study",
    noteTag: "Warm Amber",
    notes: ["Amber", "Leather", "Bergamot"],
    description:
      "A study in warm amber, structured by leather and a bright bergamot opening — the house signature.",
    price: 5750,
    volumeMl: 50,
    texture: "glass",
    bottleVariant: "warmAmber",
    photoImage: "/images/products/eleganz-amber-study.jpg",
    mood: "The house signature — warm amber worn as an everyday habit, not an occasion.",
  },
];
