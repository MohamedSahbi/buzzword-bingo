// Advent calendars per culture. Add a culture by creating advent/<code>.js and registering it here.
// Validate with: node scripts/check-advent.mjs
import en from './en.js';
import cs from './cs.js';

export const CALENDARS = { en, cs };

// Cultures with a real (time-locked) calendar published from the private repo. The page asks Firebase for these.
export const SEASON_CODES = ['en', 'en-US', 'en-AU', 'cs', 'ja', 'pt-BR', 'pt-PT', 'hi', 'fr'];
