export type TextureVariant =
  | "wood"
  | "leather"
  | "paper"
  | "spice"
  | "glass"
  | "atelier"
  | "linen";

export interface Product {
  id: string;
  name: string;
  /** Single key scent-note descriptor shown on the product card */
  noteTag: string;
  /** Fuller note breakdown, used on hover / future PDP */
  notes: string[];
  description: string;
  price: number;
  volumeMl: number;
  texture: TextureVariant;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
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
