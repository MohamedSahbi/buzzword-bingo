// Side game content per culture ("Nice or naughty?" / "Anděl, nebo čert?"). Missing cultures fall back to the
// base language (pt-BR → pt) and then to English.
import en from './en.js';
import cs from './cs.js';

export const DEEDS = { en, cs };
export const deedsFor = c => DEEDS[c] || DEEDS[String(c).split('-')[0]] || DEEDS.en;
