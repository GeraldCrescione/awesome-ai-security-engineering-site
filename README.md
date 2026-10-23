# Awesome AI Security Engineering — site (V1)

Astro static site generated from `data/resources.yml` in
[awesome-ai-security-engineering](https://github.com/GeraldCrescione/awesome-ai-security-engineering).
The data file is fetched at build time, so the list repo stays the single source of truth.

## Develop

```bash
npm install
npm run build        # fetches resources.yml, then builds to dist/
npm run dev          # local dev server (run `npm run fetch-data` once first)
```

Set `DATA_URL` to read from another branch or fork. Set `SKIP_FETCH=1` to use a local `data/resources.yml`.

## Deploy

GitHub Actions builds and deploys to GitHub Pages on every push to `main`, daily at 05:17 UTC,
and on demand. In repo Settings → Pages, set Source to **GitHub Actions**.

To rebuild right after the list changes, add a workflow in the list repo that sends a
`repository_dispatch` event of type `resources-updated` to this repo.

## Moving to a custom domain or org

Edit `site` and drop `base` in `astro.config.mjs`.

## Layout

- `src/pages/` home, explore, per-resource pages, research, methodology, data, JSON/CSV exports
- `src/lib/data.ts` YAML parsing, license-caveat rules, lifecycle and domain constants
- `src/styles/global.css` placeholder palette (CSS variables at the top)
