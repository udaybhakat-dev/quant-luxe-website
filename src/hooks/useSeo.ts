import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/siteConfig";

interface BreadcrumbCrumb {
  label: string;
  /** Route path, e.g. "/journal". Omitted for the current page itself. */
  to?: string;
}

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  /** Relative path to a page-specific share image, e.g. "/images/products/eleganz-solaris-hero.jpg". Falls back to the site default. */
  image?: string;
  /** Optional JSON-LD structured data object(s) to inject for this page. */
  structuredData?: object | object[];
  /** Breadcrumb trail mirroring the visual <Breadcrumbs> trail — used to emit a matching BreadcrumbList schema so the two never drift apart. */
  breadcrumb?: BreadcrumbCrumb[];
}

function upsertMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function buildBreadcrumbSchema(trail: BreadcrumbCrumb[], currentPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.to ?? currentPath}`,
    })),
  };
}

/**
 * Client-side SEO: sets document.title, meta description/OG/Twitter tags,
 * canonical link, and optional JSON-LD (page schema + breadcrumb schema)
 * per route. This is a Vite SPA with no SSR, so these tags update after the
 * JS bundle runs — modern Googlebot renders JS before indexing, but a
 * non-JS crawler or link-unfurler only ever sees index.html's base tags.
 */
export function useSeo({ title, description, path, image, structuredData, breadcrumb }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const absoluteImage = `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`;

    document.title = fullTitle;
    upsertMeta("description", description);
    upsertProperty("og:title", fullTitle);
    upsertProperty("og:description", description);
    upsertProperty("og:url", canonicalUrl);
    upsertProperty("og:type", "website");
    upsertProperty("og:image", absoluteImage);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", absoluteImage);
    upsertCanonical(canonicalUrl);

    const schemas: object[] = structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];
    if (breadcrumb) schemas.push(buildBreadcrumbSchema(breadcrumb, path));

    const scriptEls = schemas.map((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      for (const el of scriptEls) document.head.removeChild(el);
    };
  }, [title, description, path, image, structuredData, breadcrumb]);
}
