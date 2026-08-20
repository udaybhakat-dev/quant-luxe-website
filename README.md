# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Generating product images with AI (GitHub Actions)

This repo has a manually-triggered workflow, **Generate AI Image**, that calls
Cloudflare Workers AI (`@cf/black-forest-labs/flux-1-schnell`) to generate a
product image from a text prompt and commit it straight into
`public/images/products/`.

**To run it:**

1. Go to the repo on GitHub → **Actions** tab → **Generate AI Image** (in the
   left sidebar).
2. Click **Run workflow**.
3. Pick the branch you want the image committed to.
4. Fill in the two inputs:
   - **prompt** — the image you want generated, e.g. `Photorealistic luxury
     men's perfume bottle for ELEGANZ Solaris, sculptural amber glass with a
     subtle carved profile relief, dark metallic cap, warm cinematic studio
     lighting, dark background, editorial product photography`
   - **filename** — what to call the output file, e.g. `eleganz-solaris`
     (no extension needed — the workflow detects the real image format
     Cloudflare returns and appends the correct extension automatically).
5. Click **Run workflow** and wait for it to finish — it pushes a new commit
   to the branch you picked, adding `public/images/products/<filename>.<ext>`.

The workflow reads the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
repository secrets to authenticate; it never prints, logs, or commits either
value. Re-run it with a new prompt/filename any time you want another image —
each run is independent and doesn't touch anything outside the one image file
it produces.
