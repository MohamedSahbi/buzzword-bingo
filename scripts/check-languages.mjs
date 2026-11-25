// Validates every language in languages/index.js against English (the reference).
// Usage: node scripts/check-languages.mjs [code]   (exit code 1 when something is wrong)
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LANGUAGES } from '../languages/index.js';
import { validateLanguage } from './validate-language.mjs';

const only = process.argv[2];
let errors = 0, warnings = 0;

// Every languages/*.js file must be registered.
const dir = fileURLToPath(new URL('../languages/', import.meta.url));
for (const f of readdirSync(dir)) {
  const code = f.replace(/\.js$/, '');
  if (f.endsWith('.js') && f !== 'index.js' && !LANGUAGES[code]) { errors++; console.log(`✗ ${code}: languages/${f} exists but is not registered in languages/index.js`); }
}
if (only && !LANGUAGES[only]) { console.log(`✗ ${only}: not registered in languages/index.js`); process.exit(1); }

for (const [code, L] of Object.entries(LANGUAGES)) {
  if (only && code !== only) continue;
  const r = validateLanguage(code, L, LANGUAGES.en);
  r.errors.forEach(e => console.log(`✗ ${code}: ${e}`));
  r.warnings.forEach(w => console.log(`! ${code}: ${w}`));
  errors += r.errors.length; warnings += r.warnings.length;
  if (!r.errors.length) console.log(`✓ ${code} (${L.label})`);
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
