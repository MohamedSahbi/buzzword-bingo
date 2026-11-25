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
import ar from './ar.js';
import hi from './hi.js';
import ja from './ja.js';
import es from './es.js';
import it from './it.js';
import ptBR from './pt-BR.js';
import ptPT from './pt-PT.js';

export const DEEDS = { en, cs, 'en-US': enUS, 'en-AU': enAU, de, fr, ko, fil, ar, hi, ja, es, it, 'pt-BR': ptBR, 'pt-PT': ptPT };
export const deedsFor = c => DEEDS[c] || DEEDS[String(c).split('-')[0]] || DEEDS.en;
