// Validates every Advent calendar in advent/index.js.
// Usage: node scripts/check-advent.mjs   (exit code 1 when something is wrong)
import { CALENDARS } from '../advent/index.js';
import { ADVENT_UI } from '../advent/ui.js';

const MAX_LEN = 30;
const marks = s => [...s.matchAll(/\[\[(.+?)\]\]/g)].map(m => m[1]);
let errors = 0;
const err = (where, msg) => { errors++; console.log(`✗ ${where}: ${msg}`); };

function checkReveal(where, d) {
  const phrases = d.type === 'emoji' ? d.riddles.map(r => r[1]) : (d.type === 'chat' ? d.lines.map(l => l[1]) : d.text).flatMap(marks);
  const uniq = new Set(phrases);
  if (uniq.size !== phrases.length) err(where, `a phrase is marked twice: ${phrases.filter((p, i) => phrases.indexOf(p) !== i).join(', ')}`);
  if (uniq.size !== 12) err(where, `needs exactly 12 card phrases, has ${uniq.size}`);
  if (!Array.isArray(d.decoys) || d.decoys.length !== 4) err(where, 'needs exactly 4 decoys');
  for (const x of d.decoys || []) if (uniq.has(x)) err(where, `decoy "${x}" also appears in the content`);
  if (!uniq.has(d.star)) err(where, `star "${d.star}" is not one of the marked phrases`);
  for (const p of [...uniq, ...(d.decoys || [])]) if (p.length > MAX_LEN) err(where, `"${p}" is longer than ${MAX_LEN} characters`);
  if (d.type === 'emoji') for (const [e] of d.riddles) if (!e || /[A-Za-z]/.test(e)) err(where, `riddle "${e}" should be emoji only`);
}
function checkWrap(where, d) {
  if (d.groups?.length !== 4) return err(where, 'needs 4 groups');
  const all = d.groups.flatMap(g => g.w);
  d.groups.forEach(g => { if (g.w.length !== 4) err(where, `group "${g.n}" needs 4 items`); });
  if (new Set(all).size !== 16) err(where, `items must be 16 unique: duplicates ${all.filter((x, i) => all.indexOf(x) !== i).join(', ')}`);
}

for (const [code, cal] of Object.entries(CALENDARS)) {
  if (cal.code !== code) err(code, 'code mismatch');
  for (const k of ['label', 'locale', 'tagline']) if (!cal[k]) err(code, `missing ${k}`);
  if (!ADVENT_UI[code]) console.log(`! ${code}: no interface text in advent/ui.js (falls back to English)`);
  else for (const k of Object.keys(ADVENT_UI.en)) if (!(k in ADVENT_UI[code])) err(code, `advent/ui.js is missing "${k}"`);
  const days = Object.keys(cal.dates);
  for (const n of days) {
    let d = cal.doors[n]; const where = `${code} door ${n}`;
    if (!d) { err(where, 'missing'); continue; }
    if (!d.title) err(where, 'missing title');
    if (d.type === 'predict') { if (!d.alt) { err(where, 'prediction door needs an alt game'); continue; } d = d.alt; }
    if (!d.title) err(where, 'missing title');
    if (d.type === 'wrap') err(where, "gift-wrap doors are no longer used: write a chat, listen or emoji door");
    else if (['chat', 'listen', 'emoji'].includes(d.type)) checkReveal(where, d);
    else err(where, `unknown type ${d.type}`);
  }
  console.log(`✓ ${code}: ${days.length} doors checked`);
}
// Side game "Nice or naughty?": every file in advent/deeds/ must be registered and complete.
{
  const { readdirSync } = await import('node:fs');
  const { DEEDS } = await import('../advent/deeds/index.js');
  const keys = Object.keys(DEEDS.en.ui);
  for (const f of readdirSync(new URL('../advent/deeds/', import.meta.url)).filter(f => f !== 'index.js')) {
    const code = f.replace(/\.js$/, ''), p = DEEDS[code], w = `deeds/${code}`;
    if (!p) { err(w, 'not registered in advent/deeds/index.js'); continue; }
    if (!p.title) err(w, 'missing title');
    for (const k of keys) if (!p.ui?.[k]) err(w, `ui.${k} missing`);
    for (const k of ['matches']) if (p.ui?.[k] && !(p.ui[k].includes('{n}') && p.ui[k].includes('{of}'))) err(w, `ui.${k} needs {n} and {of}`);
    if (!Array.isArray(p.deeds) || p.deeds.length < 30) err(w, 'needs at least 30 deeds');
    const seen = new Set();
    (p.deeds || []).forEach(([text, v], i) => {
      if (v !== 'a' && v !== 'd') err(w, `deed ${i + 1}: verdict must be 'a' or 'd'`);
      if (!text || text.length > 70) err(w, `deed ${i + 1}: empty or over 70 characters`);
      if (seen.has(text)) err(w, `deed ${i + 1}: duplicate`); seen.add(text);
    });
    const angels = (p.deeds || []).filter(d => d[1] === 'a').length;
    if (p.deeds?.length && (angels < p.deeds.length * .35 || angels > p.deeds.length * .65)) err(w, `unbalanced: ${angels} of ${p.deeds.length} are angel`);
    console.log(`✓ deeds/${code}: ${p.deeds?.length} deeds`);
  }
}
console.log(`\n${errors} error(s)`);
process.exit(errors ? 1 : 0);
