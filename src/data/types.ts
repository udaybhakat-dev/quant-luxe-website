export type TextureVariant =
  | "wood"
  | "leather"
  | "paper"
  | "spice"
  | "glass"
  | "atelier"
  | "linen";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export type BottleVariant =
  | "amber"
  | "smokedCharcoal"
  | "deepBrown"
  | "nearBlack"
  | "burgundy"
  | "forestGreen"
  | "warmAmber";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  /** Route segment for a dedicated PDP, e.g. "solaris" -> /solaris. Only the flagship has one today. */
  slug?: string;
  name: string;
  /** Single key scent-note descriptor shown on the product card */
  noteTag: string;
  /** Fuller note breakdown, used on hover / future PDP */
  notes: string[];
  description: string;
  price: number;
  volumeMl: number;
  texture: TextureVariant;
  /** Glass colour for the sculpted bottle design system */
  bottleVariant: BottleVariant;
  /** One-line personality/mood or occasion, shown in the collection showcase */
  mood: string;
  /** Marks the house flagship — spotlighted on the homepage grid and given its own PDP */
  isFlagship?: boolean;
  tagline?: string;
  notesDetail?: FragranceNotes;
  benefits?: string[];
  occasions?: string[];
  howToApply?: string[];
  faqs?: FaqEntry[];
}

export interface JournalArticle {
  id: string;
  /** Route segment, e.g. "how-to-apply-perfume" -> /journal/how-to-apply-perfume */
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  focusKeyword: string;
  readTime: string;
  category: string;
  texture: TextureVariant;
}

export interface Testimonial {
  id: string;
  name: string;
  occasion: string;
  quote: string;
}
