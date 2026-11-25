# Buzzword Bingo — live multiplayer

A browser-based 5×5 buzzword bingo game with:

- Solo play with local browser storage
- Multiplayer rooms with six-character room codes
- Shared-board mode (everyone marks the same card)
- Individual-card mode (each player gets a deterministic, different card)
- Live player list, activity feed, synchronized marks, and BINGO announcements
- Host-controlled new game and reset
- Topic selection: Mixed, Meeting/Corporate, AI, Cloud/DevOps, Office/Work, and Atlas Copco
- Invite links (`?room=ABC234`), printing, and PDF export

The frontend is plain HTML/CSS/JavaScript. Multiplayer uses Firebase Anonymous Authentication and Firebase Realtime Database.

## Recommended deployment

**Simplest combination: GitHub Pages for the static site + Firebase for live state.** GitHub Pages can serve `index.html`, but it cannot itself run a WebSocket/database backend. Firebase provides the real-time synchronization.

Firebase Hosting is an equally good alternative and keeps hosting and the database in one project. Cloudflare Pages + Durable Objects is more powerful, but requires a custom Worker/backend and is unnecessary for this small first version.

## 1. Create the Firebase backend

1. Open https://console.firebase.google.com/ and create a project.
2. Go to **Build → Authentication → Sign-in method** and enable **Anonymous**.
3. Go to **Build → Realtime Database → Create Database**.
4. Choose a region close to the players (for a Prague/European team, use a European location when offered).
5. Open **Realtime Database → Rules**. Paste the entire contents of `database.rules.json`, then select **Publish**.
6. Go to **Project settings → Your apps → Web app** and register a web app.
7. Copy its Firebase configuration values into `firebase-config.js`.

The Firebase web configuration is not a password. It is expected to be delivered to browsers. Authentication, database rules, App Check, quotas, and room design provide protection.

## 2A. Publish with GitHub Pages

1. Create a new GitHub repository, for example `buzzword-bingo`.
2. Upload these files to the repository root:
   - `index.html`
   - `firebase-config.js`
   - `database.rules.json`
   - `README.md`
3. Commit and push.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then save.
7. Open the generated URL, usually `https://YOUR-USERNAME.github.io/buzzword-bingo/`.

Only `index.html` and `firebase-config.js` are used by the browser. Keeping `database.rules.json` in the repository documents the matching backend policy.

## 2B. Or publish with Firebase Hosting

With the Firebase CLI installed:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

When prompted, use the current directory (or a folder containing these files) as the public directory, configure it as a single-page app only if you want URL rewrites, and do not overwrite `index.html`.

## 3. Play

1. Open the deployed site.
2. Select **Multiplayer** and enter your display name.
3. Select **Create room**, choose the topic and mode, and create it.
4. Select **Copy invite link** and send it to the other players.
5. Invitees open the link, enter a name, and select **Join room**.
6. Click phrases as they are heard. The host can reset marks or start a new game.

## Room lifecycle and cleanup

- **End room:** the host can delete the room for everyone (**End room for everyone**). Players drop back to solo mode.
- **Host leaves:** clicking **Leave room** as host offers to hand the host role to another player or end the room.
- **Host disappears:** if the host closes the tab or loses connection for more than 2 minutes, the online player who joined first becomes host automatically. The database rules enforce the same condition.
- **Idle rooms:** every room keeps `meta/lastActive` up to date. The nightly workflow `.github/workflows/cleanup-rooms.yml` deletes rooms idle for more than 24 hours (the Spark plan has no Cloud Functions, so the cleanup runs on GitHub Actions).

The workflow needs a repository secret named `FIREBASE_SERVICE_ACCOUNT` containing a Firebase service account key (Firebase Console → Project settings → Service accounts → Generate new private key). That key is a real secret: never commit it. Run the workflow manually from the **Actions** tab with **dry run** ticked to preview what it would delete. GitHub disables scheduled workflows in public repositories after 60 days without repository activity; re-enable it from the Actions tab if that happens.

## Local testing

ES modules must be served over HTTP; do not double-click `index.html` for multiplayer testing.

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/.

## Security and production notes

The included rules are suitable for a friendly prototype:

- All users authenticate anonymously.
- Room codes are unlisted and difficult to guess casually.
- Players can edit their own player record and marks.
- The host controls room metadata, reset, and new-game operations.

For a public or company-wide deployment, add:

- Firebase App Check
- Expiration/cleanup for abandoned rooms
- Rate limits or Cloud Functions validation
- Stronger membership rules or Microsoft Entra ID sign-in
- Moderation/host transfer
- Monitoring and budget alerts

Do not store confidential company information in room names, player names, or activity text.

## Files

- `index.html` — complete user interface and game logic
- `firebase-config.js` — your Firebase web app configuration
- `database.rules.json` — Realtime Database security rules
- `README.md` — setup and deployment guide
- `firebase.json` — optional Firebase Hosting configuration
- `.nojekyll` — keeps GitHub Pages from applying Jekyll processing
