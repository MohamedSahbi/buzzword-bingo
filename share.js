// Share buttons for results: the phone's own share sheet (when the browser offers it), then direct links to the
// big networks, then copy. Nothing is sent anywhere until the player taps a button; no trackers or SDKs are loaded.
const enc = encodeURIComponent;
// Logos are simple 24×24 paths (white on the brand colour); the name stays as tooltip and accessible label.
const ICON = {
  whatsapp: '<path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2z" fill="#fff"/><path transform="translate(6.3 6.3) scale(.48)" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#25d366"/>',
  linkedin: '<path fill="#fff" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>',
  x: '<path fill="#fff" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zM17.61 20.64h2.04L6.49 3.24H4.3l13.31 17.4z"/>',
  facebook: '<path fill="#fff" d="M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.76 0 2.07.15 2.61.3v3.32c-.28-.03-.78-.04-1.39-.04-1.97 0-2.73.75-2.73 2.69v1.29h3.92l-.67 3.67h-3.25v8.24A12 12 0 1 0 9.1 23.69z"/>',
  telegram: '<path fill="#fff" d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.4-1.5zM8.9 13.5l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-4.9z"/>',
  native: '<path fill="#fff" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 21 5a3 3 0 1 0-5.91.7L8.04 9.81A3 3 0 1 0 6 15c.79 0 1.5-.31 2.04-.81l7.12 4.16a2.92 2.92 0 1 0 2.84-2.27z"/>',
  copy: '<path fill="#132433" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/>',
  done: '<path fill="#0f5132" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
};
const svg = k => `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${ICON[k]}</svg>`;
const TARGETS = [
  ['whatsapp', 'WhatsApp', '#25d366', (t, u) => `https://wa.me/?text=${enc(`${t}\n${u}`)}`],
  ['linkedin', 'LinkedIn', '#0a66c2', (t, u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`],
  ['x', 'X', '#000000', (t, u) => `https://twitter.com/intent/tweet?text=${enc(t)}&url=${enc(u)}`],
  ['facebook', 'Facebook', '#1877f2', (t, u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`],
  ['telegram', 'Telegram', '#229ed9', (t, u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`],
];

let styled = false;
function style() {
  if (styled) return; styled = true;
  const s = document.createElement('style');
  s.textContent = `.sharebar{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 4px}
  .sharebar a,.sharebar button{display:inline-grid;place-items:center;width:40px;height:40px;border:0;border-radius:50%;padding:0;cursor:pointer;color:#fff;transition:transform .12s}
  .sharebar a:hover,.sharebar button:hover{transform:translateY(-2px)}
  .sharebar .native{background:#132433}.sharebar .copy{background:#e9eef3;color:#132433}
  .sharebar a:focus-visible,.sharebar button:focus-visible{outline:3px solid #f2b84b;outline-offset:2px}`;
  document.head.appendChild(s);
}

// el: container; text: the result (no link); url: page to link to; labels: { share, copy, copied }
export function shareBar(el, { text, url, labels }) {
  style();
  const canNative = typeof navigator.share === 'function';
  el.innerHTML = `<div class="sharebar" role="group" aria-label="${labels.share}">
    ${canNative ? `<button type="button" class="native" data-act="native" title="${labels.share}" aria-label="${labels.share}">${svg('native')}</button>` : ''}
    ${TARGETS.map(([id, name, color, link]) => `<a href="${link(text, url)}" target="_blank" rel="noopener noreferrer" style="background:${color}" data-net="${id}" title="${name}" aria-label="${name}">${svg(id)}</a>`).join('')}
    <button type="button" class="copy" data-act="copy" title="${labels.copy}" aria-label="${labels.copy}">${svg('copy')}</button></div>`;
  const native = el.querySelector('[data-act=native]');
  if (native) native.onclick = async () => { try { await navigator.share({ text, url }); } catch {} };
  const copy = el.querySelector('[data-act=copy]');
  copy.onclick = async () => { try { await navigator.clipboard.writeText(`${text}\n${url}`); copy.innerHTML = svg('done'); copy.title = labels.copied; copy.setAttribute('aria-label', labels.copied); } catch {} };
}
