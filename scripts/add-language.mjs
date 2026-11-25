// AI agent that adds a new language: asks Gemini (free tier) for the interface text and culturally
// native bingo phrases, validates the result, asks Gemini to fix any problems, then writes
// languages/<code>.js and registers it in languages/index.js. A human reviews the pull request.
//
// Usage: GEMINI_API_KEY=... node scripts/add-language.mjs <code> "<language name in English>" ["notes"]
// Env:   GEMINI_MODEL (default gemini-flash-latest)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { LANGUAGES } from '../languages/index.js';
import { validateLanguage, languageModule, TOPICS } from './validate-language.mjs';

const [code, name, notes = ''] = process.argv.slice(2);
const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';
const fail = msg => { console.error(`✗ ${msg}`); process.exit(1); };

if (!/^[a-z]{2,3}$/.test(code || '')) fail('First argument must be a 2–3 letter ISO 639-1 code, e.g. "pl".');
if (!name) fail('Second argument must be the language name in English, e.g. "Polish".');
if (!KEY) fail('GEMINI_API_KEY is not set.');
if (LANGUAGES[code] || existsSync(new URL(`../languages/${code}.js`, import.meta.url))) fail(`Language "${code}" already exists.`);

const en = LANGUAGES.en;
const example = LANGUAGES.cs; // a non-English example of "written for the culture, not translated"
const safeNotes = notes.replace(/[`<>]/g, '').slice(0, 500);

async function gemini(prompt) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.8 },
    }),
  });
  if (!res.ok) fail(`Gemini API ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  try { return JSON.parse(text); } catch { fail(`Gemini did not return JSON: ${text.slice(0, 300)}`); }
}

const RULES = `Content rules (strict): friendly and workplace-safe. No insults, slurs, vulgarity, sexual content, violence,
drugs, or jokes about religion, ethnicity, nationality, gender or politics. No names of real living private people.
Film, TV and song TITLES are fine; never quote song lyrics.`;

const uiPrompt = `Translate the user interface of a buzzword bingo web app into ${name} (ISO code "${code}").
Write it the way a well-made native app in ${name} would: natural, friendly, short. Do not translate word by word.
Keep every placeholder such as {name}, {code}, {word}, {to}, {lang}, {err} exactly as is.
Keep emoji, "BINGO", "Firebase", "README.md", "database.rules.json", "PDF", "DevOps", "AI"/"IA"-style acronyms that ${name} speakers use.
Keys must stay exactly the same. "topic.*" keys are topic names shown in a dropdown: keep their emoji.
${safeNotes ? `Maintainer notes about the audience: ${safeNotes}` : ''}
Return JSON: {"label": "<the language's own name for itself, e.g. Polski>", "dir": "ltr" or "rtl", "ui": { ...same keys... }}

English UI strings:
${JSON.stringify(en.ui, null, 1)}`;

const topicsPrompt = `You are writing word lists for a buzzword bingo game played by ${name} speakers (ISO "${code}").
Write phrases people in that culture actually say or know. Do NOT translate the English lists: use local office jargon
(including English loanwords only where locals really use them), local customs, local food, films and TV shown at
Christmas in those countries, local saints' days and markets. Prefer the most widely recognised culture for the language.
${safeNotes ? `Maintainer notes about the audience: ${safeNotes}` : ''}
Topics:
- meeting: corporate meeting jargon and video-call clichés
- ai: how people at work talk about AI
- cloud: cloud / DevOps / IT operations jargon
- office: everyday office life (breaks, leave, benefits, emails, local habits)
- christmas: how Christmas is celebrated by ${name} speakers. If Christmas is mainly celebrated by a minority, focus respectfully on those communities and on the general winter holiday and New Year season.
- advent: the weeks before Christmas (calendars, markets, saints' days, shopping, office parties)
For each topic return "free": the single most typical phrase, prefixed with "★ ", and "words": 36 unique phrases,
each at most ${'40'} characters, none equal to the free phrase.
${RULES}
Return JSON: {"topics": {${TOPICS.map(t => `"${t}": {"free": "...", "words": [...]}`).join(', ')}}}

Example of the style for Czech (culturally native, not translated):
${JSON.stringify({ christmas: example.topics.christmas, office: example.topics.office }, null, 1)}`;

console.log(`Generating ${name} (${code}) with ${MODEL}…`);
const [uiPart, topicPart] = await Promise.all([gemini(uiPrompt), gemini(topicsPrompt)]);
let lang = { code, label: uiPart.label, dir: uiPart.dir, ui: uiPart.ui, topics: topicPart.topics };

let { errors, warnings } = validateLanguage(code, lang, en);
if (errors.length) {
  console.log(`First draft has ${errors.length} problem(s); asking Gemini to fix them…`);
  const fixed = await gemini(`This JSON for a ${name} buzzword bingo language file has validation errors.
Fix ONLY what the errors require and return the complete corrected JSON with the same structure
({"code","label","dir","ui","topics"}). Keep the cultural style and these rules: ${RULES}
Errors:
- ${errors.join('\n- ')}

JSON:
${JSON.stringify(lang)}`);
  lang = { ...fixed, code };
  ({ errors, warnings } = validateLanguage(code, lang, en));
}
warnings.forEach(w => console.log(`! ${w}`));
if (errors.length) fail(`Still invalid after one fix attempt:\n- ${errors.join('\n- ')}`);

// Drop unused keys, keep English key order, then write and register the file.
lang.ui = Object.fromEntries(Object.keys(en.ui).map(k => [k, lang.ui[k]]));
writeFileSync(new URL(`../languages/${code}.js`, import.meta.url), languageModule(lang));
const indexUrl = new URL('../languages/index.js', import.meta.url);
let index = readFileSync(indexUrl, 'utf8');
const imports = [...index.matchAll(/^import \w+ from '\.\/\w+\.js';$/gm)];
const last = imports[imports.length - 1];
index = index.slice(0, last.index + last[0].length) + `\nimport ${code} from './${code}.js';` + index.slice(last.index + last[0].length);
index = index.replace(/export const LANGUAGES = \{([^}]*)\};/, (_, list) => `export const LANGUAGES = {${list.trimEnd()}, ${code} };`);
writeFileSync(indexUrl, index);
console.log(`✓ Wrote languages/${code}.js (${lang.label}, ${lang.dir}) and registered it.`);
