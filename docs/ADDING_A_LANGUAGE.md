# Adding a language

Each language is one file, `languages/<code>.js`, with two parts:

- **`ui`**: the website text (buttons, dialogs, messages, topic names). Translated naturally.
- **`topics`**: the bingo phrases. **Written for that culture, never translated** from English.

Players choose languages with the 🌐 button: one setting for the website language and one for the card language (by default the same as the website). The browser language is detected on the first visit. Rooms keep the card language the host chose, and the activity feed shows in each player's own website language.

There are two ways to add a language: let the AI agent draft it, or do it by hand. Either way, a native speaker should review it before it goes live.

## Option A: AI agent (recommended)

The agent uses Gemini on its free tier. It drafts the file, validates it, asks Gemini to fix any problems, and opens a pull request. Nothing goes live until you merge.

**One-time setup**
1. Create a free Gemini API key at https://aistudio.google.com/apikey (no billing needed).
2. Add it as a repository secret: **Settings → Secrets and variables → Actions → New repository secret**, name `GEMINI_API_KEY`.
3. Allow the workflow to open pull requests: **Settings → Actions → General → Workflow permissions →** tick **Allow GitHub Actions to create and approve pull requests**.
4. Optional: to pin a model, add a repository *variable* `GEMINI_MODEL` (default `gemini-flash-latest`).

**Trigger it**
- **From the Actions tab:** **Add a language (AI agent) → Run workflow**, then enter the code (e.g. `pl`), the name (`Polish`) and optional notes (`Brazilian Portuguese`, `Moroccan office culture`).
- **From an issue:** anyone can open the **Add a language** issue form. You approve it by adding the label **`add-language`**, and the agent runs and links its pull request in the issue. Only people with triage access can add labels, so strangers can't run the agent.

**Review the pull request** using the checklist in its description, ideally with a native speaker. Edit `languages/<code>.js` directly in the PR if anything is off, then merge. GitHub Pages deploys within a minute or two.

Run it locally instead with: `GEMINI_API_KEY=... node scripts/add-language.mjs pl Polish "optional notes"`

## Option B: By hand

1. **Copy** `languages/en.js` to `languages/<code>.js`. Use a 2–3 letter ISO 639-1 code: `pl`, `pt`, `nl`, `tr`, `uk`.
2. **Set** `code`, `label` (the language's own name for itself, e.g. `Polski`) and `dir` (`rtl` for Arabic, Hebrew, Persian or Urdu; otherwise `ltr`).
3. **Translate `ui`.**
   - Keep every key.
   - Keep placeholders like `{name}`, `{code}`, `{word}`, `{to}`, `{lang}` and `{err}` exactly as they are.
   - Keep the emoji in `topic.*` names.
   - Write it the way a native app would: short and natural, not word for word.
   - Use the language's own quotation marks in activity messages, e.g. „{word}“, « {word} », «{word}».
4. **Write `topics`** for all six topics: `meeting`, `ai`, `cloud`, `office`, `christmas`, `advent`.
   - `free`: the single most typical phrase, prefixed with `★ `.
   - `words`: about 36 unique phrases (at least 24), each 40 characters or fewer, and none equal to the free phrase.
5. **Register** it in `languages/index.js`: add `import pl from './pl.js';` and add `pl` to `LANGUAGES`.
6. **Validate:** `node scripts/check-languages.mjs pl` must report 0 errors. CI runs it on every pull request too.
7. **Try it:** run `python3 -m http.server 8080` and open http://localhost:8080. In 🌐, pick the language and play a card. For right-to-left languages, check that the whole page flips.

## What makes good phrases

Ask: *"Would someone in this country actually hear or say this?"*

- **Meeting / AI / Cloud / Office:** use local corporate jargon, including the English loanwords locals really use. For example: Czech *Pošlu ti invajt*, French *Valider en COPIL*, Italian *Mettere a terra*. Add local office customs too: meal vouchers, RTT, *Jornada intensiva*, Sunday meetings in Gulf countries.
- **Christmas:** local food, the films and TV shown every year, carol titles, local customs. For example: Czech *Tři oříšky pro Popelku*, Italian *Una poltrona per due*, Spanish *Las doce uvas*. Where Christmas is mostly celebrated by a minority, focus respectfully on those communities and on the general winter and New Year season.
- **Advent:** calendars, markets, saints' days (Mikuláš, Santa Lucia, St Barbara), office parties, the shopping rush.

**Never include:** insults, slurs, vulgarity, sexual content, violence, drugs, jokes about religion, ethnicity, nationality, gender or politics, or names of real private people. Film, TV and song *titles* are fine; never quote lyrics. When in doubt, leave it out.

## Files involved

| File | Purpose |
|---|---|
| `languages/<code>.js` | the language: `code`, `label`, `dir`, `ui`, `topics` |
| `languages/index.js` | registry, plus helper functions (`translate`, `topicData`, `detectLanguage`) |
| `scripts/validate-language.mjs` | the rules a language must pass |
| `scripts/check-languages.mjs` | validates every registered language (used by CI) |
| `scripts/add-language.mjs` | the AI agent |
| `.github/workflows/add-language.yml` | runs the agent and opens the pull request |
| `.github/ISSUE_TEMPLATE/add-language.yml` | the request form |

**Adding a new interface text?** Add the key to `languages/en.js` *and every other language*, then use it in `index.html` with `data-i18n="key"` (or `t('key')` in the script). The checker flags any language that is missing it.
