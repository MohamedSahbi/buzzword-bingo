// Language registry. To add a language: create languages/<code>.js (copy en.js) and add it below.
// docs/ADDING_A_LANGUAGE.md has the full checklist; scripts/check-languages.mjs validates the result.
import en from './en.js';
import cs from './cs.js';
import de from './de.js';
import fr from './fr.js';
import es from './es.js';
import it from './it.js';
import ar from './ar.js';
import ja from './ja.js';
import ptBR from './pt-BR.js';
import hi from './hi.js';
import ptPT from './pt-PT.js';
import fil from './fil.js';
import ko from './ko.js';

export const LANGUAGES = { en, cs, de, fr, es, it, ar, 'pt-BR': ptBR, 'pt-PT': ptPT, ja, ko, hi, fil };

// Topic keys in picker order. "mixed" is built from WORK_TOPICS of the chosen language.
export const TOPIC_KEYS = ['mixed', 'meeting', 'ai', 'cloud', 'office', 'christmas', 'advent'];
export const WORK_TOPICS = ['meeting', 'ai', 'cloud', 'office'];

// Built-in English for the newest keys, in case a browser still has an older cached language file.
const FALLBACK = { 'nav.card': 'Card', 'nav.play': 'Play together', 'nav.activity': 'Activity', 'menu.open': 'Menu' };

// Website text with {placeholders}; falls back to English, then to the key itself.
export function translate(lang, key, vars = {}) {
  const s = LANGUAGES[lang]?.ui[key] ?? LANGUAGES.en.ui[key] ?? FALLBACK[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

// Card phrases for a language + topic; unknown topics (e.g. the retired Atlas Copco one) fall back to Mixed.
export function topicData(lang, key) {
  const L = LANGUAGES[lang] ? lang : 'en';
  const t = LANGUAGES[L].topics;
  if (key !== 'mixed' && t[key]) return t[key];
  return { free: t.ai.free, words: [...new Set(WORK_TOPICS.flatMap(k => t[k].words))] };
}

// First supported language from the browser's preferences, e.g. "cs-CZ" → "cs".
export function detectLanguage() {
  const codes = Object.keys(LANGUAGES);
  for (const l of navigator.languages || [navigator.language || 'en']) {
    const exact = codes.find(c => c.toLowerCase() === String(l).toLowerCase());   // e.g. pt-BR
    if (exact) return exact;
    const base = String(l).toLowerCase().split('-')[0];
    if (LANGUAGES[base]) return base;
    const regional = codes.find(c => c.toLowerCase().startsWith(base + '-'));      // pt → first pt-XX
    if (regional) return regional;
  }
  return 'en';
}
