# Adding a theme (topic)

A theme is a bingo topic such as "Team party". Each language gets its own culturally written word list, not a translation.

**From the Actions tab:** **Add a theme (AI agent) → Run workflow**, then enter:
- `key`: lowercase id, e.g. `party`
- `emoji`: e.g. 🎉
- `name`: English name, e.g. `Team party`
- `description`: what the writers should cover, e.g. `year-end party, secret Santa, speeches, playlists, snacks (workplace-safe)`

The agent asks Gemini once per language (secret `GEMINI_API_KEY`, optional variable `GEMINI_MODEL`), adds `"topic.<key>"` and `topics.<key>` to every `languages/*.js`, adds the key to `TOPIC_KEYS` in `languages/index.js`, runs `scripts/check-languages.mjs` and opens a pull request. Review it (skim the languages you read), edit the files in the PR if needed, then merge.

**Locally:** `GEMINI_API_KEY=... node scripts/add-topic.mjs party 🎉 "Team party" "year-end party, secret Santa"`
- `--dry-run` prints what would be written (still calls Gemini; `GEMINI_FAKE=1` gives offline canned data for testing).
- `--only cs,de` limits it to some languages, e.g. to finish a run where some languages failed (the key may already be registered).

Rules enforced per language (same as `check-languages`): at least 24 unique phrases, 40 characters or fewer, none equal to the free square, label starts with the emoji. Gemini is told to write workplace-safe content, no real people, no lyrics.
