// Sends one push reminder per player when a door of their Advent calendar opens.
// Runs hourly (GitHub Actions). Players are anonymous: /push/<uid> = { token, cal, lang, tz, last }.
// Door release times come from the published calendar meta (/advent/<cal>/<year>/meta/release), so each
// culture's midnight is respected. Dead tokens (uninstalled, permission revoked) are removed.
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getMessaging } from 'firebase-admin/messaging';
import { ADVENT_UI } from '../advent/ui.js';

const { FIREBASE_SERVICE_ACCOUNT, DATABASE_URL } = process.env;
if (!FIREBASE_SERVICE_ACCOUNT || !DATABASE_URL) { console.error('FIREBASE_SERVICE_ACCOUNT and DATABASE_URL are required'); process.exit(1); }
const dryRun = process.env.DRY_RUN === 'true';
const testAll = process.env.TEST_SEND === 'true';   // send a sample reminder to every subscriber now (testing)
const WINDOW = 2 * 60 * 60 * 1000;   // a door counts as "just opened" for 2 hours (covers a late or skipped run)
const SITE = 'https://buzzword-bingo.app';

const app = initializeApp({ credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT)), databaseURL: DATABASE_URL });
const db = getDatabase(app), fcm = getMessaging(app);
const text = (lang, key, vars) => {
  const base = String(lang || 'en').split('-')[0];
  const s = ADVENT_UI[lang]?.[key] ?? ADVENT_UI[base]?.[key] ?? ADVENT_UI.en[key];
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
};

try {
  const now = Date.now(), year = new Date().getUTCFullYear();
  const subs = Object.entries((await db.ref('push').get()).val() || {});
  const metas = {};
  let sent = 0, removed = 0;
  for (const [uid, sub] of subs) {
    if (!sub?.token || !sub.cal) continue;
    metas[sub.cal] ??= (await db.ref(`advent/${sub.cal}/${year}/meta/release`).get()).val() || {};
    const rel = metas[sub.cal];
    // the latest door released within the window
    const door = testAll ? (Object.keys(rel).length ? Math.max(1, ...Object.entries(rel).filter(([, at]) => at <= now).map(([n]) => Number(n))) : 1) : Object.entries(rel).map(([n, at]) => [Number(n), at]).filter(([, at]) => at <= now && now - at < WINDOW).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!door || (!testAll && sub.last === `${year}-${door}`)) continue;
    const msg = { token: sub.token, webpush: { headers: { TTL: '21600', Urgency: 'high' }, data: {
      title: 'Buzzword Bingo', body: text(sub.lang, 'pushDoor', { n: door }), tag: `door-${door}`, url: `${SITE}/advent.html?lang=${encodeURIComponent(sub.cal)}`,
    } } };
    if (dryRun) { console.log(`Would remind ${uid} (${sub.cal}) about door ${door}`); continue; }
    try { await fcm.send(msg); if (!testAll) await db.ref(`push/${uid}/last`).set(`${year}-${door}`); sent++; }
    catch (e) {
      if (/registration-token-not-registered|invalid-registration-token|invalid-argument/.test(e.code || '')) { await db.ref(`push/${uid}`).remove(); removed++; }
      else console.warn(`Failed for ${uid}: ${e.code || e.message}`);
    }
  }
  console.log(`${subs.length} subscriber(s), ${sent} reminder(s) sent, ${removed} expired token(s) removed${dryRun ? ' (dry run)' : ''}.`);
} finally {
  await app.delete();
}
