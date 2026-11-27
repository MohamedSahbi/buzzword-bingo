// AI agent that adds a new bingo THEME (topic) to every language: asks Gemini (free tier) to write the theme
// natively for each culture (one call per language), validates it with the same rules as check-languages,
// then inserts the "topic.<key>" label and the topics entry into languages/<code>.js and registers the key
// in TOPIC_KEYS (languages/index.js). A human reviews the pull request.
//
// Usage: GEMINI_API_KEY=... node scripts/add-topic.mjs [--only cs,de] [--dry-run] <key> <emoji> "<English name>" "<description>"
// Env:   GEMINI_MODEL (default gemini-flash-latest); GEMINI_FAKE=1 builds canned data from English (offline tests only)
import { readFileSync, writeFileSync } from 'node:fs';
import { LANGUAGES, TOPIC_KEYS } from '../languages/index.js';
import { validateLanguage, MAX_LEN, MIN_WORDS } from './validate-language.mjs';

const args = process.argv.slice(2);
let only = null, dryRun = false;
const pos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dry-run') dryRun = true;
  else if (args[i] === '--only') only = (args[++i] || '').split(',').map(s => s.trim()).filter(Boolean);
  else if (args[i].startsWith('--only=')) only = args[i].slice(7).split(',').map(s => s.trim()).filter(Boolean);
  else pos.push(args[i]);
}
const [key = '', emojiIn = '', nameIn = '', descIn = ''] = pos;
const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const FAKE = process.env.GEMINI_FAKE === '1';
const fail = msg => { console.error(`✗ ${msg}`); process.exit(1); };
const clean = (s, n) => s.replace(/[`<>\r\n]+/g, ' ').trim().slice(0, n);

const emoji = emojiIn.trim();
const name = clean(nameIn, 60);
const description = clean(descIn, 400);
if (!/^[a-z][a-z0-9]{1,15}$/.test(key)) fail('First argument must be a topic key: lowercase letters/digits, 2–16 chars, e.g. "remote".');
if (!emoji || emoji.length > 16 || !/\p{Extended_Pictographic}/u.test(emoji)) fail('Second argument must be an emoji, e.g. "🎉".');
if (!name) fail('Third argument must be the English topic name, e.g. "Team party".');
if (!description) fail('Fourth argument must be a short description of the theme.');
if (['mixed', 'custom'].includes(key) || (TOPIC_KEYS.includes(key) && !only)) fail(`Topic "${key}" already exists. (To finish a partly added topic, pass --only with the missing languages.)`);
if (!FAKE && !KEY) fail('GEMINI_API_KEY is not set (--dry-run still calls Gemini; use GEMINI_FAKE=1 for an offline test).');

// With --only the key may already be registered (resuming a partial run): skip languages that already have it.
const codes = Object.keys(LANGUAGES).filter(c => (!only || only.includes(c)) && !(only && LANGUAGES[c].topics[key]));
if (only) for (const c of only) if (!LANGUAGES[c]) fail(`Unknown language "${c}". Known: ${Object.keys(LANGUAGES).join(', ')}`);
if (!codes.length) fail('Nothing to do: every selected language already has this topic.');

async function gemini(prompt, attempt = 1) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.8 },
    }),
  });
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {   // free tier rate limits: back off and retry
    await new Promise(r => setTimeout(r, 4000 * attempt * attempt));
    return gemini(prompt, attempt + 1);
  }
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  try { return JSON.parse(text); } catch { throw new Error(`Gemini did not return JSON: ${text.slice(0, 200)}`); }
}

const RULES = `Content rules (strict): friendly and workplace-safe. No insults, slurs, vulgarity, sexual content, violence,
drugs, or jokes about religion, ethnicity, nationality, gender or politics. No names of real living private people.
Film, TV and song TITLES are fine; never quote song lyrics.`;

const FREE_RE = /^(★\s*|FREE:\s*)/;
const freePrefix = L => (L.topics.meeting?.free || '★ ').match(FREE_RE)?.[0] || '★ ';
const normFree = (L, s) => freePrefix(L) + String(s || '').replace(FREE_RE, '').trim();
const normLabel = s => { s = String(s || '').trim(); return s.startsWith(emoji) ? s : `${emoji} ${s.replace(/^\p{Extended_Pictographic}[\p{Extended_Pictographic}‍️\s]*/u, '')}`; };

function prompt(code, L) {
  const counts = Object.values(L.topics).map(t => t.words.length);
  const target = Math.max(MIN_WORDS + 6, ...counts);
  const ex = L.topics.office ? { office: L.topics.office } : {};
  return `You are writing one new theme for a buzzword bingo game played by ${L.label} speakers (ISO "${code}").
New theme key "${key}", English name "${name}". What it covers: ${description}
Write phrases people in that culture actually say, hear or know in this situation. Do NOT translate English phrases: use local
workplace jargon (English loanwords only where locals really use them), local customs and habits of the language's main culture.
Return JSON: {"label": "...", "free": "...", "words": [...]}
- "label": the theme name in ${L.label} as shown in a dropdown, starting with the emoji ${emoji} then a space, e.g. "${L.ui['topic.office']}" is the style of the existing labels. Keep it short.
- "free": the single most typical phrase, prefixed with "${freePrefix(L)}".
- "words": ${target} unique phrases, each at most ${MAX_LEN} characters, none equal to the free phrase, no duplicates.
${RULES}

Style example (an existing topic written in ${L.label}):
${JSON.stringify(ex, null, 1).slice(0, 1500)}`;
}

function fakeResult(code, L) {   // offline test double: canned data built from the English office topic
  const en = LANGUAGES.en.topics.office;
  return { label: `${emoji} ${name} [${code}]`, free: `★ ${en.free.replace(FREE_RE, '')} (${key})`, words: en.words.map((w, i) => `${w} ${key}`.slice(0, MAX_LEN)).slice(0, 30) };
}

// Build the candidate language object and validate it exactly like check-languages does.
function candidate(code, L, r) {
  const ui = { ...L.ui, [`topic.${key}`]: normLabel(r.label) };
  const topics = { ...L.topics, [key]: { free: normFree(L, r.free), words: (Array.isArray(r.words) ? r.words : []).map(w => String(w).trim()).filter(Boolean) } };
  const enRef = { ...LANGUAGES.en, ui: { ...LANGUAGES.en.ui, [`topic.${key}`]: 'x' } };
  const all = [...Object.keys(L.topics), key];
  const v = validateLanguage(code, { ...L, ui, topics }, enRef, all);
  // only report problems about the new topic; the rest of the file is already checked in CI
  const errors = v.errors.filter(e => e.includes(`topics.${key}`) || e.includes(`topic.${key}`));
  return { ui, topic: topics[key], errors };
}

async function generate(code) {
  const L = LANGUAGES[code];
  if (FAKE) { const c = candidate(code, L, fakeResult(code, L)); if (c.errors.length) throw new Error(c.errors.join('; ')); return c; }
  const p = prompt(code, L);
  let r = await gemini(p), c = candidate(code, L, r);
  if (c.errors.length) {
    r = await gemini(`${p}\n\nYour previous answer had these problems. Fix them and return the complete corrected JSON:\n- ${c.errors.join('\n- ')}\n\nPrevious answer:\n${JSON.stringify(r)}`);
    c = candidate(code, L, r);
  }
  if (c.errors.length) throw new Error(`still invalid: ${c.errors.join('; ')}`);
  return c;
}

// Text edit that keeps the file's formatting: ui line after the last "topic.*" line, topics entry before the closing of `topics`.
export function insertIntoFile(src, c) {
  const q = JSON.stringify;
  if (new RegExp(`^\\s*"topic\\.${key}":`, 'm').test(src) || new RegExp(`^    ${key}: \\{`, 'm').test(src)) throw new Error(`already contains "${key}"`);
  const uiLines = [...src.matchAll(/^ {4}"topic\.[\w-]+": .*,\r?$/gm)];
  const last = uiLines[uiLines.length - 1];
  if (!last) throw new Error('could not find "topic.*" lines in ui');
  const nl = last[0].endsWith('\r') ? '\r\n' : '\n';
  const at = last.index + last[0].length;
  src = src.slice(0, at) + `${nl}    ${q(`topic.${key}`)}: ${q(c.ui[`topic.${key}`])},` + src.slice(at);
  const end = src.lastIndexOf(`${nl}  },${nl}};`);
  if (end < 0) throw new Error('could not find the end of topics');
  const block = `${nl}    ${key}: {${nl}      free: ${q(c.topic.free)},${nl}      words: [${nl}${c.topic.words.map(w => '        ' + q(w) + ',').join(nl)}${nl}      ],${nl}    },`;
  return src.slice(0, end) + block + src.slice(end);
}

console.log(`${FAKE ? '[FAKE] ' : ''}Adding topic "${key}" (${emoji} ${name}) to ${codes.length} language(s) with ${FAKE ? 'canned data' : MODEL}${dryRun ? ' [dry run]' : ''}…`);
const results = {}, failures = [];
const queue = [...codes];
await Promise.all(Array.from({ length: FAKE ? 1 : 3 }, async () => {
  while (queue.length) {
    const code = queue.shift();
    try { results[code] = await generate(code); console.log(`  ✓ ${code}: ${results[code].topic.words.length} phrases, "${results[code].ui[`topic.${key}`]}"`); }
    catch (e) { failures.push(code); console.log(`  ✗ ${code}: ${e.message}`); }
  }
}));
const done = codes.filter(c => results[c]);

const edits = {};
for (const code of done) {
  const file = new URL(`../languages/${code}.js`, import.meta.url);
  try { edits[code] = { file, text: insertIntoFile(readFileSync(file, 'utf8'), results[code]) }; }
  catch (e) { fail(`languages/${code}.js: ${e.message}`); }
}
const indexUrl = new URL('../languages/index.js', import.meta.url);
let index = readFileSync(indexUrl, 'utf8');
const newIndex = TOPIC_KEYS.includes(key) ? index : index.replace(/(export const TOPIC_KEYS = \[[^\]]*?)\s*\];/, (_, l) => `${l}, '${key}'];`);
if (newIndex === index && !TOPIC_KEYS.includes(key)) fail('Could not find TOPIC_KEYS in languages/index.js');

if (dryRun) {
  for (const code of done) console.log(`\n--- languages/${code}.js: "topic.${key}": ${JSON.stringify(results[code].ui[`topic.${key}`])}, free ${JSON.stringify(results[code].topic.free)}, ${results[code].topic.words.length} words, e.g. ${results[code].topic.words.slice(0, 3).join(' | ')}`);
  console.log(`\nDry run: nothing written. TOPIC_KEYS would end with '${key}'.`);
} else {
  for (const { file, text } of Object.values(edits)) writeFileSync(file, text);
  if (!TOPIC_KEYS.includes(key)) writeFileSync(indexUrl, newIndex);
  console.log(`✓ Wrote ${done.length} language file(s) and registered "${key}" in TOPIC_KEYS.`);
}
if (failures.length) fail(`Failed for: ${failures.join(', ')}. The others were ${dryRun ? 'not written (dry run)' : 'written'}; finish with: --only ${failures.join(',')}`);
