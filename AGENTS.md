# Notes for AI coding agents

- Static site: `index.html` (UI + game logic), `languages/` (one file per language), `firebase-config.js`, `database.rules.json`. No build step; GitHub Pages serves the repo root.
- **Languages:** follow `docs/ADDING_A_LANGUAGE.md`. Bingo phrases must be written for the culture, never translated. Run `node scripts/check-languages.mjs` before committing; it must report 0 errors.
- **Interface text** never goes directly in `index.html`. Add a key to every `languages/*.js` `ui` block and use `data-i18n` / `t()`.
- **Database rules:** changes to `database.rules.json` must be published by the maintainer in the Firebase console; mention it in the PR.
- Content must be workplace-safe: no insults, vulgarity, or jokes about religion, ethnicity, gender or politics.

## UX rules (product decisions, Nov 2026)
- **Phones first.** Check every change at 375 px wide. No duplicate buttons, inputs or grids; the primary action (Start, Play) is big and reachable without scrolling past empty boxes.
- **First-time players** understand what to do in one sentence. Every action gives clear feedback.
- **Advent doors are bingo only:** `chat`, `listen` (spoken with captions), `emoji`, plus the final `predict` door. No gift-wrap or other new mechanics in doors. "Nice or naughty?" (advent/angel.js) is the any-day side game.
- **Doors show in number order, all the same size**, and never reveal their game type before opening.
- **No spoilers:** never show riddle answers while a round is running; the ★ bonus square stays hidden until found and only appears in the score breakdown if found.
- **Language:** one website language shared by both pages (`bingoSiteLang`), re-rendered immediately on change. Card language is free in solo play; a room's language is fixed by the host and shown locked.
- **Scores:** the first completed run of a door counts; replays are practice and never overwrite it.
- **Before calling a change done:** test it in a browser (desktop and phone width) and list what was changed and what still needs a visual check.
