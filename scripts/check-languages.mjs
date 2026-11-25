// Validates every language in languages/index.js against English (the reference).
// Usage: node scripts/check-languages.mjs [code]   (exit code 1 when something is wrong)
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LANGUAGES, TOPIC_KEYS } from '../languages/index.js';

const MIN_WORDS = 24;      // a card has 24 phrases + the free centre square
const MAX_LEN = 40;        // longer phrases don't fit a square on phones
const only = process.argv[2];
const en = LANGUAGES.en;
const topics = TOPIC_KEYS.filter(k => k !== 'mixed');
const placeholders = s => [...String(s).matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort().join(',');
let errors = 0, warnings = 0;
const err = (code, msg) => { errors++; console.log(`✗ ${code}: ${msg}`); };
const warn = (code, msg) => { warnings++; console.log(`! ${code}: ${msg}`); };

// Every languages/*.js file must be registered.
const dir = fileURLToPath(new URL('../languages/', import.meta.url));
for (const f of readdirSync(dir)) {
  const code = f.replace(/\.js$/, '');
  if (f.endsWith('.js') && f !== 'index.js' && !LANGUAGES[code]) err(code, `languages/${f} exists but is not registered in languages/index.js`);
}

for (const [code, L] of Object.entries(LANGUAGES)) {
  if (only && code !== only) continue;
  if (L.code !== code) err(code, `code is "${L.code}" but it is registered as "${code}"`);
  if (!/^[a-z]{2,3}$/.test(code)) err(code, 'code must be a 2–3 letter ISO 639-1 code, e.g. "pl"');
  if (!L.label) err(code, 'label (the language name in that language) is missing');
  if (!['ltr', 'rtl'].includes(L.dir)) err(code, 'dir must be "ltr" or "rtl"');

  for (const [key, text] of Object.entries(en.ui)) {
    const v = L.ui?.[key];
    if (typeof v !== 'string' || !v.trim()) { err(code, `ui["${key}"] is missing`); continue; }
    if (placeholders(v) !== placeholders(text)) err(code, `ui["${key}"] must keep the placeholders {${placeholders(text)}}`);
  }
  for (const key of Object.keys(L.ui || {})) if (!(key in en.ui)) warn(code, `ui["${key}"] is not used (not in English)`);

  for (const t of topics) {
    const d = L.topics?.[t];
    if (!d) { err(code, `topics.${t} is missing`); continue; }
    if (typeof d.free !== 'string' || !d.free.trim()) err(code, `topics.${t}.free is missing`);
    const words = Array.isArray(d.words) ? d.words : [];
    const unique = new Set(words.map(w => w.trim()));
    if (unique.size < MIN_WORDS) err(code, `topics.${t} has ${unique.size} unique phrases, needs at least ${MIN_WORDS}`);
    if (unique.size !== words.length) err(code, `topics.${t} has duplicate phrases`);
    const long = words.filter(w => w.length > MAX_LEN);
    if (long.length) err(code, `topics.${t} has phrases over ${MAX_LEN} characters: ${long.join(' | ')}`);
    const bare = String(d.free).replace(/^(★\s*|FREE:\s*)/, '');
    if (unique.has(bare)) err(code, `topics.${t}.free "${bare}" is also in the word list`);
  }
  if (!only || only === code) console.log(`✓ ${code} (${L.label}) checked`);
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
