import { useEffect } from "react";

const SITE_NAME = "Eleganz";
const SITE_URL = "https://eleganz.example.com";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  /** Optional JSON-LD structured data object(s) to inject for this page. */
  structuredData?: object | object[];
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

/**
 * Client-side SEO: sets document.title, meta description/OG tags, canonical
 * link, and optional JSON-LD per route. This is a Vite SPA with no SSR, so
 * these tags update after the JS bundle runs — modern Googlebot renders
 * JS before indexing, but a non-JS crawler only ever sees index.html's
 * base tags. See README "SEO limitations" for the tradeoff.
 */
export function useSeo({ title, description, path, structuredData }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;
    upsertMeta("description", description);
    upsertProperty("og:title", fullTitle);
    upsertProperty("og:description", description);
    upsertProperty("og:url", `${SITE_URL}${path}`);
    upsertProperty("og:type", "website");
    upsertCanonical(`${SITE_URL}${path}`);

    let scriptEl: HTMLScriptElement | null = null;
    if (structuredData) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl) document.head.removeChild(scriptEl);
    };
  }, [title, description, path, structuredData]);
}
