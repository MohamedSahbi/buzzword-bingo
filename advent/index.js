// Advent calendars per culture. Add a culture by creating advent/<code>.js and registering it here.
// Validate with: node scripts/check-advent.mjs
import en from './en.js';
import cs from './cs.js';
import de from './de.js';
import fr from './fr.js';
import es from './es.js';
import it from './it.js';
import ar from './ar.js';
import hi from './hi.js';
import ja from './ja.js';
import ko from './ko.js';
import fil from './fil.js';
import ptBR from './pt-BR.js';
import ptPT from './pt-PT.js';
import nl from './nl.js';
import nlBE from './nl-BE.js';

export const CALENDARS = { en, cs, de, fr, es, it, ar, hi, ja, ko, fil, 'pt-BR': ptBR, 'pt-PT': ptPT, nl, 'nl-BE': nlBE };

// Cultures with a real (time-locked) calendar published from the private repo. The page asks Firebase for these.
export const SEASON_CODES = ['en', 'en-US', 'en-AU', 'cs', 'ja', 'pt-BR', 'pt-PT', 'hi', 'fr', 'de', 'it', 'ar', 'fil', 'ko', 'es', 'nl', 'nl-BE'];
