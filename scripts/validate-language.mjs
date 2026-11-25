// Shared validation for one language object against English. Used by check-languages.mjs
// (all languages) and add-language.mjs (the AI agent, which feeds errors back to the model).
export const MIN_WORDS = 24;   // a card has 24 phrases + the free centre square
export const MAX_LEN = 40;     // longer phrases don't fit a square on phones
export const TOPICS = ['meeting', 'ai', 'cloud', 'office', 'christmas', 'advent'];

const placeholders = s => [...String(s).matchAll(/\{(\w+)\}/g)].map(m => m[1]).sort().join(',');

export function validateLanguage(code, L, en) {
  const errors = [], warnings = [];
  if (L.code !== code) errors.push(`code is "${L.code}" but it is registered as "${code}"`);
  if (!/^[a-z]{2,3}(-[A-Z]{2})?$/.test(code)) errors.push('code must be an ISO code like "pl" or a regional one like "pt-BR"');
  if (!L.label) errors.push('label (the language name written in that language) is missing');
  if (!['ltr', 'rtl'].includes(L.dir)) errors.push('dir must be "ltr" or "rtl"');

  for (const [key, text] of Object.entries(en.ui)) {
    const v = L.ui?.[key];
    if (typeof v !== 'string' || !v.trim()) { errors.push(`ui["${key}"] is missing`); continue; }
    if (placeholders(v) !== placeholders(text)) errors.push(`ui["${key}"] must keep exactly the placeholders {${placeholders(text)}}`);
  }
  for (const key of Object.keys(L.ui || {})) if (!(key in en.ui)) warnings.push(`ui["${key}"] is not used (not in English)`);

  for (const t of TOPICS) {
    const d = L.topics?.[t];
    if (!d) { errors.push(`topics.${t} is missing`); continue; }
    if (typeof d.free !== 'string' || !d.free.trim()) errors.push(`topics.${t}.free is missing`);
    const words = Array.isArray(d.words) ? d.words.filter(w => typeof w === 'string') : [];
    const unique = new Set(words.map(w => w.trim()));
    if (unique.size < MIN_WORDS) errors.push(`topics.${t} has ${unique.size} unique phrases, needs at least ${MIN_WORDS}`);
    if (unique.size !== words.length) errors.push(`topics.${t} has duplicate phrases`);
    const long = words.filter(w => w.length > MAX_LEN);
    if (long.length) errors.push(`topics.${t} has phrases over ${MAX_LEN} characters: ${long.join(' | ')}`);
    const bare = String(d.free || '').replace(/^(★\s*|FREE:\s*)/, '');
    if (unique.has(bare)) errors.push(`topics.${t}.free "${bare}" is also in the word list`);
  }
  return { errors, warnings };
}

// Writes a language object as a readable languages/<code>.js module.
export function languageModule(L) {
  const q = s => JSON.stringify(s);
  let out = `// ${L.label}: website text (ui) and bingo phrases (topics).\n// See docs/ADDING_A_LANGUAGE.md before editing. Phrases are written for this culture, not translated.\nexport default {\n  code: ${q(L.code)},\n  label: ${q(L.label)},\n  dir: ${q(L.dir)},\n  ui: {\n`;
  for (const [k, v] of Object.entries(L.ui)) out += `    ${q(k)}: ${q(v)},\n`;
  out += `  },\n  topics: {\n`;
  for (const k of TOPICS) out += `    ${k}: {\n      free: ${q(L.topics[k].free)},\n      words: [\n${L.topics[k].words.map(w => '        ' + q(w) + ',').join('\n')}\n      ],\n    },\n`;
  return out + `  },\n};\n`;
}
