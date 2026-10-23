import { defineConfig } from 'astro/config';

// Served from https://geraldcrescione.github.io/awesome-ai-security-engineering-site/
// When moving to a custom domain or an org, change `site` and drop `base`.
export default defineConfig({
  site: 'https://geraldcrescione.github.io',
  base: '/awesome-ai-security-engineering-site',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
