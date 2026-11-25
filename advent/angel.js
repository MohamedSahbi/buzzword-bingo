// "Anděl, nebo čert?" / "Nice or naughty?": a quick-fire side game on the Advent page, playable any day.
// Everyday deeds flash up one by one; sort each into 😇 or 😈 before the timer runs out.
// You score for agreeing with the book (Mikuláš's golden book, Santa's list…): +10 per match,
// +5 for a fast answer, +5 per answer while on a streak of 3 or more matches.
// Content per culture lives in advent/deeds/<code>.js; see advent/deeds/en.js for the format.

const ROUNDS = 15, SECONDS = 4;

export function mountAngel(root, ctx) {
  const { pack, esc, magic, sfx, bestKey, onExit, share: shareTo } = ctx;
  const u = pack.ui;
  let timer = null, alive = true, keyHandler = null;
  const stop = () => { alive = false; clearInterval(timer); if (keyHandler) removeEventListener('keydown', keyHandler); };

  function intro() {
    const best = +localStorage.getItem(bestKey) || 0;
    root.innerHTML = `<p class="muted" style="margin-top:6px">${esc(u.intro)}</p>
      <div class="angel-rules"><span>😇 ${esc(u.angel)}</span><span>😈 ${esc(u.devil)}</span></div>
      <p class="muted">${esc(u.how)}</p>
      ${best ? `<p class="note">🏅 ${esc(u.best)}: <b>${best}</b></p>` : ''}
      <div class="row"><button class="btn primary" id="angelGo">▶ ${esc(u.start)}</button></div>`;
    root.querySelector('#angelGo').onclick = play;
  }

  function play() {
    const deck = [...pack.deeds].sort(() => Math.random() - .5).slice(0, ROUNDS);
    let i = 0, score = 0, streak = 0, answered = false, t0 = 0;
    const log = [];
    root.innerHTML = `<div class="angel-top"><span id="aRound"></span><span id="aStreak"></span><b id="aScore">0</b></div>
      <div class="angel-bar"><i id="aBar"></i></div>
      <div class="angel-card" id="aCard"></div>
      <div class="angel-btns"><button class="angel-pick a" id="aA" type="button">😇<span>${esc(u.angel)}</span></button><button class="angel-pick d" id="aD" type="button">😈<span>${esc(u.devil)}</span></button></div>
      <p class="muted angel-keys">${esc(u.keys)}</p>`;
    const $ = id => root.querySelector('#' + id);

    function show() {
      if (!alive) return;
      if (i >= deck.length) return done();
      answered = false; t0 = performance.now();
      $('aRound').textContent = `${i + 1} / ${deck.length}`;
      $('aStreak').textContent = streak >= 3 ? `🔥 ${streak}` : '';
      const c = $('aCard'); c.className = 'angel-card in'; c.textContent = deck[i][0];
      $('aBar').style.transition = 'none'; $('aBar').style.width = '100%'; void $('aBar').offsetWidth;
      $('aBar').style.transition = `width ${SECONDS}s linear`; $('aBar').style.width = '0%';
      clearInterval(timer); timer = setInterval(() => { if (performance.now() - t0 >= SECONDS * 1000) answer(null); }, 100);
    }
    function answer(pick) {
      if (answered || !alive) return; answered = true; clearInterval(timer);
      const [text, book] = deck[i], ms = performance.now() - t0, c = $('aCard');
      let pts = 0;
      if (pick === book) {
        streak++; pts = 10 + (ms < 1500 ? 5 : 0) + (streak >= 3 ? 5 : 0); score += pts; sfx.ok();
        c.className = 'angel-card ok'; if (streak === 5 || streak === 10) magic(c, false);
      } else { streak = 0; sfx.bad(); c.className = 'angel-card no'; }
      c.innerHTML = `${esc(text)}<small>${book === 'a' ? '😇' : '😈'} ${esc(u.bookSays)}${pts ? ` · +${pts}` : pick ? '' : ` · ⏱ ${esc(u.tooSlow)}`}</small>`;
      $('aScore').textContent = score;
      log.push({ text, book, pick });
      i++; setTimeout(show, 900);
    }
    $('aA').onclick = () => answer('a'); $('aD').onclick = () => answer('d');
    // Swipe the card on phones: left = angel, right = devil (same sides as the buttons).
    let sx = null; const card = $('aCard');
    card.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    card.addEventListener('touchend', e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) answer(dx < 0 ? 'a' : 'd'); });
    keyHandler = e => { if (e.key === 'ArrowLeft' || e.key === '1') answer('a'); else if (e.key === 'ArrowRight' || e.key === '2') answer('d'); };
    addEventListener('keydown', keyHandler);

    function done() {
      removeEventListener('keydown', keyHandler); keyHandler = null;
      const matches = log.filter(l => l.pick === l.book).length, best = +localStorage.getItem(bestKey) || 0, record = score > best;
      if (record) localStorage.setItem(bestKey, String(score));
      const verdict = matches >= 13 ? u.v3 : matches >= 9 ? u.v2 : u.v1;
      const share = `😇😈 ${pack.title}: ${score} · ${log.map(l => l.pick === l.book ? '✅' : '❌').join('')}`;
      const diff = log.filter(l => l.pick !== l.book);
      root.innerHTML = `<div class="result" style="text-align:center"><div id="aFinal" style="font:800 46px Georgia,serif;color:var(--berry);line-height:1.1">${score}</div>
        <p style="margin:6px 0"><b>${esc(verdict)}</b></p><p class="muted">${esc(u.matches.replace('{n}', matches).replace('{of}', log.length))}${record && best ? ` · 🏅 ${esc(u.newBest)}` : ''}</p>
        <div id="aShareBox"></div>
        <div class="row" style="justify-content:center;margin-top:12px"><button class="btn primary" id="aAgain">↻ ${esc(u.again)}</button><button class="btn" id="aExit">${esc(u.back)}</button></div></div>
        ${diff.length ? `<h3 style="margin:16px 0 6px">${esc(u.disagreed)}</h3><ul class="angel-diff">${diff.map(l => `<li><span>${l.pick ? (l.pick === 'a' ? '😇' : '😈') : '⏱'} → ${l.book === 'a' ? '😇' : '😈'}</span> ${esc(l.text)}</li>`).join('')}</ul>` : ''}`;
      if (record || matches >= 13) { sfx.bingo(); magic(root.querySelector('#aFinal'), true); }
      root.querySelector('#aAgain').onclick = play;
      root.querySelector('#aExit').onclick = onExit;
      if (shareTo) shareTo(root.querySelector('#aShareBox'), share);
    }
    show();
  }

  intro();
  return stop;
}
