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
} finally {
  await app.delete();
}
