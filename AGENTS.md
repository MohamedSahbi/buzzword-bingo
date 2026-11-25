# Notes for AI coding agents

- Static site: `index.html` (UI + game logic), `languages/` (one file per language), `firebase-config.js`, `database.rules.json`. No build step; GitHub Pages serves the repo root.
- **Languages:** follow `docs/ADDING_A_LANGUAGE.md`. Bingo phrases must be written for the culture, never translated. Run `node scripts/check-languages.mjs` before committing; it must report 0 errors.
- **Interface text** never goes directly in `index.html`. Add a key to every `languages/*.js` `ui` block and use `data-i18n` / `t()`.
- **Database rules:** changes to `database.rules.json` must be published by the maintainer in the Firebase console; mention it in the PR.
- Content must be workplace-safe: no insults, vulgarity, or jokes about religion, ethnicity, gender or politics.
