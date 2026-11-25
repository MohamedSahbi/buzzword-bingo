// Result card image (1080×1350, portrait like Duolingo/Instagram posts), drawn in the browser on a canvas.
// Shared as a file through the phone's share sheet, or downloaded on desktop. Nothing is uploaded anywhere.
// card: { kicker, title, big, bigLabel, lines: [string], strip: string (emoji row), footer, theme: 'night' | 'bingo' }
export async function resultCardBlob(card) {
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const night = card.theme !== 'bingo';
  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, night ? '#1d4568' : '#143552'); bg.addColorStop(1, '#0d2236');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  // snow / confetti dots
  for (let i = 0; i < 90; i++) { g.globalAlpha = .25 + Math.random() * .4; g.fillStyle = night ? '#ffffff' : ['#f2b84b', '#16a66e', '#ffffff'][i % 3]; g.beginPath(); g.arc(Math.random() * W, Math.random() * H, 2 + Math.random() * 5, 0, 7); g.fill(); }
  g.globalAlpha = 1;
  // white card
  const x = 70, y = 170, w = W - 140, h = H - 340, r = 48;
  g.fillStyle = '#ffffff'; g.beginPath(); g.roundRect(x, y, w, h, r); g.fill();
  const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif', serif = 'Georgia, "Times New Roman", serif';
  // Shrink the font until the text fits; only very long text is shortened with an ellipsis.
  const center = (text, ty, font, color, maxW = w - 100) => {
    let s = String(text); if (!s) return; let size = parseFloat(font.match(/(\d+)px/)[1]); const set = () => g.font = font.replace(/\d+px/, size + 'px');
    set(); while (g.measureText(s).width > maxW && size > 26) { size -= 2; set(); }
    while (g.measureText(s).width > maxW && s.length > 4) s = s.slice(0, -2) + '…';
    g.fillStyle = color; g.textAlign = 'center'; g.fillText(s, W / 2, ty);
  };
  // header above the card
  center(card.kicker, 115, `800 44px ${sans}`, '#f2b84b');
  center(card.title, y + 120, `800 64px ${serif}`, '#132433');
  center(card.big, y + 330, `900 190px ${serif}`, '#b3261e');
  center(card.bigLabel, y + 400, `700 38px ${sans}`, '#5a6b7b');
  let ly = y + 510;
  for (const line of card.lines || []) { center(line, ly, `700 44px ${sans}`, '#132433'); ly += 72; }
  if (card.strip) {
    // emoji row, wrapped to fit
    g.font = `56px ${sans}`; const chars = [...card.strip]; const per = Math.max(1, Math.floor((w - 80) / g.measureText(chars[0] || 'x').width));
    for (let i = 0; i < chars.length; i += per) { center(chars.slice(i, i + per).join(''), ly + 30, `56px ${sans}`, '#132433', w); ly += 72; }
  }
  center(card.footer, H - 80, `700 36px ${sans}`, '#cfe3f5');
  return new Promise(res => c.toBlob(res, 'image/png'));
}

export function canShareFiles() {
  try { return !!navigator.canShare && navigator.canShare({ files: [new File([new Blob(['x'])], 'x.png', { type: 'image/png' })] }); } catch { return false; }
}
