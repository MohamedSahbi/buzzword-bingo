// Deletes bingo rooms that have been idle for longer than IDLE_HOURS.
// Runs from .github/workflows/cleanup-rooms.yml with a Firebase service account,
// which bypasses the database rules (the Spark plan has no Cloud Functions).
//
// Env:
//   FIREBASE_SERVICE_ACCOUNT  service account JSON (GitHub secret)
//   DATABASE_URL              Realtime Database URL
//   IDLE_HOURS                default 24
//   DRY_RUN                   "true" to only list what would be deleted
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

const { FIREBASE_SERVICE_ACCOUNT, DATABASE_URL } = process.env;
if (!FIREBASE_SERVICE_ACCOUNT) {
  console.error('FIREBASE_SERVICE_ACCOUNT secret is not set.');
  process.exit(1);
}
const idleHours = Number(process.env.IDLE_HOURS || 24);
const dryRun = process.env.DRY_RUN === 'true';
const cutoff = Date.now() - idleHours * 60 * 60 * 1000;

const app = initializeApp({ credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT)), databaseURL: DATABASE_URL });
const db = getDatabase(app);

try {
  const rooms = (await db.ref('rooms').get()).val() || {};
  const codes = Object.keys(rooms);
  const stale = {};
  for (const code of codes) {
    const meta = rooms[code]?.meta;
    // Rooms created before lastActive existed fall back to createdAt; rooms without meta are leftovers.
    const last = meta?.lastActive || meta?.createdAt || 0;
    if (last < cutoff) {
      stale[code] = null;
      const age = last ? `${Math.round((Date.now() - last) / 3600000)}h idle` : 'no metadata';
      console.log(`${dryRun ? 'Would delete' : 'Deleting'} ${code} (${age})`);
    }
  }
  const count = Object.keys(stale).length;
  if (count && !dryRun) await db.ref('rooms').update(stale);
  console.log(`${codes.length} room(s) checked, ${count} ${dryRun ? 'would be ' : ''}deleted (idle > ${idleHours}h).`);

  // Advent team calendars carry their own expiry date (a couple of weeks after the season ends).
  const teams = (await db.ref('teams').get()).val() || {};
  const expired = {};
  for (const [code, team] of Object.entries(teams)) {
    const exp = team?.meta?.expiresAt;
    if (!exp || exp < Date.now()) {
      expired[code] = null;
      console.log(`${dryRun ? 'Would delete' : 'Deleting'} team ${code} (${exp ? 'expired' : 'no metadata'})`);
    }
  }
  const teamCount = Object.keys(expired).length;
  if (teamCount && !dryRun) await db.ref('teams').update(expired);
  console.log(`${Object.keys(teams).length} team calendar(s) checked, ${teamCount} ${dryRun ? 'would be ' : ''}deleted (expired).`);

  // Prediction rooms expire a few days after their event.
  const preds = (await db.ref('predict').get()).val() || {};
  const oldPreds = Object.fromEntries(Object.entries(preds).filter(([, r]) => !r?.meta?.expiresAt || r.meta.expiresAt < Date.now()).map(([c]) => [c, null]));
  if (Object.keys(oldPreds).length && !dryRun) await db.ref('predict').update(oldPreds);
  console.log(`${Object.keys(preds).length} prediction room(s) checked, ${Object.keys(oldPreds).length} ${dryRun ? 'would be ' : ''}deleted (expired).`);
} finally {
  await app.delete();
}
