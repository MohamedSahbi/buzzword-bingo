// Prediction bingo: the Advent calendar's finale.
// Before the event players write 9 sealed predictions (3×3). The host starts the event: cards lock and are revealed.
// During the event you claim a square ("It happened!") and the others vote 👍/👎. Confirmed squares count.
// Firebase: predict/<CODE>/{meta, players, cards/<uid>, claims/<id>, votes/<id>/<uid>}; see database.rules.json.
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const clean = v => (v || '').toUpperCase().replace(/[^A-Z2-9]/g, '').slice(0, 6);

export function mountPredict(root, ctx) {
  const { t, esc, firebase, magic, sfx, ideas, myName, onFinish, onSkip, title, invite, startCode, expiresAt } = ctx;
  let unsubs = [], code = null, me = null, S = { meta: null, players: {}, cards: {}, claims: {}, votes: {}, mine: {} }, finished = false, solo = null, cardsListening = false;
  const $ = id => root.querySelector('#' + id);
  const off = () => { unsubs.forEach(f => f()); unsubs = []; };

  // ---------- lobby ----------
  function lobby(msg = '') {
    root.innerHTML = `<p class="muted">${esc(t('p_intro'))}</p>
      <div class="field"><label>${esc(t('yourName'))}</label><input id="pn" maxlength="24" value="${esc(localStorage.getItem('bingoName') || '')}"></div>
      <div class="row"><button class="btn primary" id="pc">🔮 ${esc(t('p_create'))}</button></div>
      <div class="field"><label>${esc(t('p_joinCode'))}</label><input id="pj" maxlength="6" placeholder="ABC234" style="text-transform:uppercase" value="${esc(startCode || '')}"></div>
      <div class="row"><button class="btn" id="pjb">${esc(t('p_join'))}</button><button class="btn" id="ps">✍️ ${esc(t('p_solo'))}</button>${onSkip ? `<button class="btn" id="pk">${esc(t('p_skip'))}</button>` : ''}</div>
      <p class="err" id="perr">${esc(msg)}</p>`;
    const name = () => { const n = ($('pn').value || '').trim().slice(0, 24); if (n) localStorage.setItem('bingoName', n); return n || myName(); };
    $('pj').oninput = e => e.target.value = clean(e.target.value);
    $('pc').onclick = () => guard(async () => { const { D, db, uid } = await firebase(); let c; do { c = [...crypto.getRandomValues(new Uint32Array(6))].map(x => CHARS[x % CHARS.length]).join(''); } while ((await D.get(D.ref(db, `predict/${c}/meta`))).exists());
      await D.set(D.ref(db, `predict/${c}/meta`), { hostId: uid, hostName: name(), title, state: 'collect', createdAt: Date.now(), expiresAt: expiresAt() });
      await join(c, name()); });
    $('pjb').onclick = () => guard(async () => { const c = clean($('pj').value); if (c.length !== 6) return; const { D, db } = await firebase(); if (!(await D.get(D.ref(db, `predict/${c}/meta`))).exists()) throw new Error(t('teamNotFound')); await join(c, name()); });
    $('ps').onclick = () => startSolo();
    if (onSkip) $('pk').onclick = onSkip;
  }
  async function guard(fn) { try { await fn(); } catch (e) { const el = $('perr'); if (el) el.textContent = e?.code ? t('teamErr', { err: e.code }) : (e?.message || String(e)); } }

  // ---------- room ----------
  async function join(c, name) {
    const { D, db, uid } = await firebase(); code = c; me = uid; off();
    await D.update(D.ref(db, `predict/${c}/players/${uid}`), { name, joinedAt: Date.now() });
    const on = (p, k) => unsubs.push(D.onValue(D.ref(db, `predict/${c}/${p}`), s => { S[k] = s.val() || {}; if (k === 'meta') S.meta = s.val(); onChange(); }));
    on('meta', 'meta'); on('players', 'players'); on('claims', 'claims'); on('votes', 'votes'); on(`cards/${uid}`, 'mine');
    history.replaceState(null, '', invite(c, false));
  }
  function onChange() {
    if (!S.meta) { root.innerHTML = `<p class="muted">${esc(t('st.ended') || '')}</p>`; return; }
    if (S.meta.state !== 'collect' && !cardsListening) {
      cardsListening = true;
      firebase().then(({ D, db }) => unsubs.push(D.onValue(D.ref(db, `predict/${code}/cards`), s => { S.cards = s.val() || {}; render(); })));
    }
    render();
  }
  const isHost = () => S.meta?.hostId === me;
  const others = () => Object.keys(S.players).filter(id => id !== me);
  // A claim is confirmed when more 👍 than 👎 and at least half of the other players agreed (alone in the room: auto).
  function verdict(cid) {
    const c = S.claims[cid]; const v = S.votes[cid] || {}; const voters = Object.keys(S.players).filter(id => id !== c.uid).length;
    const up = Object.entries(v).filter(([id, x]) => id !== c.uid && x === 1).length, down = Object.entries(v).filter(([id, x]) => id !== c.uid && x === -1).length;
    if (voters === 0 || (up > down && up >= Math.ceil(voters / 2))) return 'yes';
    if (down >= Math.ceil(voters / 2) && down >= up) return 'no';
    return 'pending';
  }
  function confirmedFor(uid) { const set = new Set(); for (const [cid, c] of Object.entries(S.claims)) if (c.uid === uid && verdict(cid) === 'yes') set.add(Number(c.idx)); return set; }
  function scoreOf(set) { const lines = LINES.filter(l => l.every(i => set.has(i))).length; return { set, lines, parts: [[t('b_confirmed'), set.size * 20], [t('b_line'), lines * 40]] }; }

  function render() {
    const m = S.meta, state = m.state;
    const head = `<div class="row" style="margin:6px 0"><b>${esc(t('p_room', { code }))}</b><span class="muted">· ${esc(m.hostName)} 👑</span><div class="grow"></div><button class="btn gold" id="pinv">${esc(t('p_invite'))}</button></div>`;
    const people = `<div class="muted" style="margin:4px 0 10px">${Object.entries(S.players).map(([id, p]) => `${esc(p.name)}${id === me ? ` (${esc(t('you'))})` : ''} ${p.sealed ? '✉️' : (state === 'collect' ? '✍️' : '')}`).join(' · ')}</div>`;
    if (state === 'collect') renderCollect(head + people);
    else if (state === 'live') renderLive(head + people);
    else renderDone(head);
    const inv = $('pinv'); if (inv) inv.onclick = async () => { try { await navigator.clipboard.writeText(invite(code, true)); inv.textContent = t('copied'); } catch {} };
  }

  function editor(values, locked) {
    return `<div class="card" style="grid-template-columns:repeat(3,minmax(0,1fr))">${[...Array(9)].map((_, i) => `<textarea data-i="${i}" maxlength="60" ${locked ? 'disabled' : ''} placeholder="${esc(t('p_ph', { ex: ideas[i % ideas.length] }))}" style="aspect-ratio:1.4;resize:none;border:1px solid var(--line);border-radius:10px;padding:6px;font:inherit;font-size:13px">${esc(values[i] || '')}</textarea>`).join('')}</div>`;
  }
  function chips() { return `<p class="muted" style="margin-top:10px">${esc(t('p_ideas'))}</p><div class="row">${ideas.map(x => `<button class="btn" data-idea="${esc(x)}" style="font-weight:600;font-size:12px;padding:5px 9px">${esc(x)}</button>`).join('')}</div>`; }
  function wireChips() { root.querySelectorAll('[data-idea]').forEach(b => b.onclick = () => { const empty = [...root.querySelectorAll('textarea[data-i]')].find(x => !x.value.trim() && !x.disabled); if (empty) { empty.value = b.dataset.idea; empty.dispatchEvent(new Event('input')); } }); }
  const readEditor = () => Object.fromEntries([...root.querySelectorAll('textarea[data-i]')].map(x => [x.dataset.i, x.value.trim().slice(0, 60)]));

  function renderCollect(top) {
    const sealed = !!S.players[me]?.sealed;
    if (root.querySelector('#pseal') && root.dataset.state === 'collect' && !sealed) { root.querySelector('#ppeople').innerHTML = top; wire(); return; } // keep typing intact
    root.dataset.state = 'collect';
    root.innerHTML = `<div id="ppeople">${top}</div><h3 style="margin:6px 0">${esc(t('p_yourCard'))}</h3>${editor(S.mine, sealed)}
      <div class="row"><button class="btn primary" id="pseal" ${sealed ? 'disabled' : ''}>${esc(sealed ? t('p_sealed') : t('p_seal'))}</button>${isHost() ? `<div class="grow"></div><button class="btn gold" id="pstart">▶ ${esc(t('p_start'))}</button>` : `<span class="muted">${esc(t('p_waiting'))}</span>`}</div>
      ${isHost() ? `<p class="muted">${esc(t('p_startHint'))}</p>` : ''}${sealed ? '' : chips()}<p class="err" id="perr"></p>`;
    wire(); wireChips();
    function wire() {
      const s = root.querySelector('#pseal'); if (s && !sealed) s.onclick = () => guard(async () => { const v = readEditor(); if (Object.values(v).filter(Boolean).length < 9) throw new Error(t('p_need9')); const { D, db } = await firebase(); await D.set(D.ref(db, `predict/${code}/cards/${me}`), v); await D.update(D.ref(db, `predict/${code}/players/${me}`), { sealed: true }); sfx.ok(); });
      const st = root.querySelector('#pstart'); if (st) st.onclick = () => guard(async () => { const { D, db } = await firebase(); await D.update(D.ref(db, `predict/${code}/meta`), { state: 'live', startedAt: Date.now() }); sfx.bell(); });
      const inv = root.querySelector('#pinv'); if (inv) inv.onclick = async () => { try { await navigator.clipboard.writeText(invite(code, true)); inv.textContent = t('copied'); } catch {} };
    }
  }

  function miniCard(uid) {
    const card = S.cards[uid] || {}, done = confirmedFor(uid);
    return `<div style="flex:1 1 200px"><div class="muted" style="font-weight:700">${esc(t('p_cardsOf', { name: S.players[uid]?.name || '?' }))} · ${done.size}/9</div><div class="card" style="grid-template-columns:repeat(3,minmax(0,1fr));gap:3px">${[...Array(9)].map((_, i) => `<div class="sq${done.has(i) ? ' ok' : ''}" style="aspect-ratio:1.3;font-size:10.5px;cursor:default;display:grid;place-items:center">${esc(card[i] || '—')}</div>`).join('')}</div></div>`;
  }
  function renderLive(top) {
    root.dataset.state = 'live';
    const myCard = S.cards[me] || S.mine || {}, mine = confirmedFor(me);
    const pendingMine = new Set(Object.entries(S.claims).filter(([cid, c]) => c.uid === me && verdict(cid) === 'pending').map(([, c]) => Number(c.idx)));
    const claims = Object.entries(S.claims).sort((a, b) => (b[1].at || 0) - (a[1].at || 0)).slice(0, 15);
    root.innerHTML = `${top}<p class="note" style="margin-top:0">🔴 ${esc(t('p_live'))}</p>
      <div class="split"><div><h3 style="margin:4px 0">${esc(t('p_yourCard'))}</h3><div class="card" style="grid-template-columns:repeat(3,minmax(0,1fr))" id="pmy">${[...Array(9)].map((_, i) => `<button class="sq${mine.has(i) ? ' ok' : ''}" data-i="${i}" style="aspect-ratio:1.3">${pendingMine.has(i) ? '⏳ ' : ''}${esc(myCard[i] || '—')}</button>`).join('')}</div>
        <div class="stats"><div class="stat"><small>${esc(t('points'))}</small><b>${scoreOf(mine).parts.reduce((a, [, v]) => a + v, 0)}</b></div></div></div>
        <div><div class="feed" style="height:300px">${claims.map(([cid, c]) => { const v = verdict(cid), my = S.votes[cid]?.[me]; const who = S.players[c.uid]?.name || '?'; const txt = S.cards[c.uid]?.[c.idx] || '';
          return `<div class="msg"><b>${esc(t('p_claim', { name: who, text: '' }))}</b>${esc(txt)}<div class="row" style="margin-top:4px">${v === 'yes' ? esc(t('p_confirmed')) : v === 'no' ? esc(t('p_rejected')) : c.uid === me ? '⏳' : `<button class="btn" data-v="${cid}" data-x="1" style="padding:3px 9px;${my === 1 ? 'background:#c9efd9' : ''}">👍</button><button class="btn" data-v="${cid}" data-x="-1" style="padding:3px 9px;${my === -1 ? 'background:#f7c9c5' : ''}">👎</button>`}</div></div>`; }).join('') || `<p class="muted">${esc(t('noActivity'))}</p>`}</div></div></div>
      <div class="row" style="flex-wrap:wrap;gap:12px;margin-top:12px">${others().map(miniCard).join('')}</div>
      ${isHost() ? `<div class="row"><button class="btn primary" id="pend">🏁 ${esc(t('p_end'))}</button></div>` : ''}<p class="err" id="perr"></p>`;
    root.querySelectorAll('#pmy [data-i]').forEach(b => b.onclick = () => guard(async () => {
      const i = Number(b.dataset.i); if (mine.has(i) || pendingMine.has(i) || !myCard[i]) return;
      const { D, db } = await firebase(); await D.set(D.push(D.ref(db, `predict/${code}/claims`)), { uid: me, idx: i, at: Date.now() }); sfx.ok();
    }));
    root.querySelectorAll('[data-v]').forEach(b => b.onclick = () => guard(async () => { const { D, db } = await firebase(); await D.set(D.ref(db, `predict/${code}/votes/${b.dataset.v}/${me}`), Number(b.dataset.x)); }));
    const e = $('pend'); if (e) e.onclick = () => guard(async () => { const { D, db } = await firebase(); await D.update(D.ref(db, `predict/${code}/meta`), { state: 'done', endedAt: Date.now() }); });
    // celebrate newly confirmed squares / lines
    const before = render.prev || new Set(); const now = mine; for (const i of now) if (!before.has(i)) { const el = root.querySelector(`#pmy [data-i="${i}"]`); magic(el); sfx.star(); }
    if (scoreOf(now).lines > scoreOf(before).lines) { magic($('pmy'), true); sfx.bingo(); }
    render.prev = new Set(now);
  }
  function renderDone(top) {
    root.dataset.state = 'done';
    const ranking = Object.keys(S.players).map(id => ({ id, name: S.players[id].name, n: confirmedFor(id).size })).sort((a, b) => b.n - a.n);
    let wild = null, best = -1; for (const [cid, c] of Object.entries(S.claims)) if (verdict(cid) === 'yes') { const ups = Object.values(S.votes[cid] || {}).filter(x => x === 1).length; if (ups > best) { best = ups; wild = S.cards[c.uid]?.[c.idx]; } }
    root.innerHTML = `${top}<h3>🏁 ${esc(t('p_done'))}</h3>${ranking[0] ? `<p style="font-size:18px">${esc(t('p_prophet', { name: ranking[0].name }))}</p>` : ''}${wild ? `<p>${esc(t('p_wild', { text: wild }))}</p>` : ''}
      <ol class="board">${ranking.map(r => `<li class="${r.id === me ? 'me' : ''}"><span>${esc(r.name)}</span><span>${r.n}/9</span></li>`).join('')}</ol>
      <div class="row" style="flex-wrap:wrap;gap:12px;margin-top:12px">${Object.keys(S.players).map(miniCard).join('')}</div>`;
    if (!finished) { finished = true; const sc = scoreOf(confirmedFor(me)); magic(root.querySelector('h3'), true); onFinish({ parts: sc.parts, shareLine: `${t('t_predict')} · ${sc.set.size}/9 ✅ · ${sc.lines}× ━` }); }
  }

  // ---------- solo: write now, tick tonight ----------
  function startSolo() {
    const key = `bingoPredictSolo:${title}`; solo = JSON.parse(localStorage.getItem(key) || 'null') || { card: {}, locked: false, ticked: [] };
    const save = () => localStorage.setItem(key, JSON.stringify(solo));
    const draw = () => {
      if (!solo.locked) {
        root.innerHTML = `<p class="muted">${esc(t('p_soloIntro'))}</p>${editor(solo.card, false)}<div class="row"><button class="btn primary" id="sl">${esc(t('p_seal'))}</button><button class="btn" id="sb">←</button></div>${chips()}<p class="err" id="perr"></p>`;
        wireChips();
        $('sb').onclick = () => lobby();
        $('sl').onclick = () => { const v = readEditor(); if (Object.values(v).filter(Boolean).length < 9) { $('perr').textContent = t('p_need9'); return; } solo.card = v; solo.locked = true; save(); draw(); };
        return;
      }
      const set = new Set(solo.ticked);
      root.innerHTML = `<p class="muted">${esc(t('p_tick'))}</p><div class="card" style="grid-template-columns:repeat(3,minmax(0,1fr))" id="pmy">${[...Array(9)].map((_, i) => `<button class="sq${set.has(i) ? ' ok' : ''}" data-i="${i}" style="aspect-ratio:1.3">${esc(solo.card[i] || '')}</button>`).join('')}</div><div class="row"><button class="btn gold" id="sf">🏁 ${esc(t('p_finish'))}</button></div>`;
      root.querySelectorAll('#pmy [data-i]').forEach(b => b.onclick = () => { const i = Number(b.dataset.i); set.has(i) ? set.delete(i) : (set.add(i), magic(b), sfx.star()); solo.ticked = [...set]; save(); draw(); });
      $('sf').onclick = () => { if (finished) return; finished = true; const sc = scoreOf(set); if (sc.lines) magic($('pmy'), true); onFinish({ parts: sc.parts, shareLine: `${t('t_predict')} · ${set.size}/9 ✅ · ${sc.lines}× ━` }); };
    };
    draw();
  }

  if (startCode) firebase().then(({ D, db }) => D.get(D.ref(db, `predict/${startCode}/meta`))).then(s => s.exists() ? join(startCode, localStorage.getItem('bingoName') || myName()) : lobby(t('teamNotFound'))).catch(() => lobby());
  else lobby();
  return off;
}
