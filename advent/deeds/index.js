// Side game content per culture ("Nice or naughty?" / "Anděl, nebo čert?"). Missing cultures fall back to the
// base language (pt-BR → pt) and then to English.
import en from './en.js';
import cs from './cs.js';
import enUS from './en-US.js';
import enAU from './en-AU.js';
import de from './de.js';
import fr from './fr.js';
import ko from './ko.js';
import fil from './fil.js';

export const DEEDS = { en, cs, 'en-US': enUS, 'en-AU': enAU, de, fr, ko, fil };
export const deedsFor = c => DEEDS[c] || DEEDS[String(c).split('-')[0]] || DEEDS.en;
