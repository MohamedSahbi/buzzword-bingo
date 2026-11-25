// Validates ONE language file before it is registered: node scripts/check-language-file.mjs languages/pt-BR.js
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import en from '../languages/en.js';
import { validateLanguage } from './validate-language.mjs';
const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/check-language-file.mjs languages/<code>.js'); process.exit(1); }
const L = (await import(pathToFileURL(resolve(file)).href)).default;
const { errors, warnings } = validateLanguage(L.code, L, en);
errors.forEach(e => console.log(`✗ ${e}`)); warnings.forEach(w => console.log(`! ${w}`));
console.log(`${L.code}: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
