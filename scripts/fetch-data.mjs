// Pulls the single source of truth (data/resources.yml) from the curated list repo.
// Override with DATA_URL, or set SKIP_FETCH=1 to use the local copy.
import fs from 'node:fs';
import path from 'node:path';

const URL_ =
  process.env.DATA_URL ||
  'https://raw.githubusercontent.com/GeraldCrescione/awesome-ai-security-engineering/main/data/resources.yml';
const out = path.resolve('data/resources.yml');

if (process.env.SKIP_FETCH === '1' && fs.existsSync(out)) {
  console.log('SKIP_FETCH=1, using existing', out);
  process.exit(0);
}

const res = await fetch(URL_);
if (!res.ok) {
  console.error(`Failed to fetch ${URL_}: ${res.status}`);
  process.exit(1);
}
const text = await res.text();
if (!text.includes('resources:')) {
  console.error('Fetched file does not look like resources.yml');
  process.exit(1);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text);
console.log(`Fetched ${text.length} bytes -> ${out}`);
