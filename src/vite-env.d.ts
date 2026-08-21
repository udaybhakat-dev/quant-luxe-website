/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site URL, e.g. https://quant-luxe-website.vercel.app — see src/lib/siteConfig.ts */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
