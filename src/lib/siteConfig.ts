/**
 * Central site configuration. Change SITE_URL here (or override it via the
 * VITE_SITE_URL environment variable at build time) rather than hard-coding
 * the domain anywhere else in the codebase — useSeo, the sitemap, and
 * robots.txt all key off this single value.
 */
export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://quant-luxe-website.vercel.app";

export const SITE_NAME = "Eleganz";

/** Default OG/Twitter share image, used when a page doesn't specify its own. */
export const DEFAULT_OG_IMAGE = "/images/products/eleganz-solaris-hero.jpg";
