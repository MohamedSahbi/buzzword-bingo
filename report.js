// "Report a problem": a bottom sheet that saves the player's note to Firebase /feedback (write-only for players).
// A scheduled job in the private content repo triages reports with Gemini into private GitHub issues.
// Self-contained (own texts and styles) so both pages use it the same way: openReport({ where }).
import { firebaseConfig } from './firebase-config.js';

const TXT = {
  en: ['Report a problem', 'What happened? What did you expect?', 'Send', 'Thanks! We read every report.', 'Something went wrong. Please try again.', 'Cancel', "We send only your message, this page, your language and browser name. Please don’t include names or contact details."],
  cs: ['Nahlásit problém', 'Co se stalo? Co jste čekali?', 'Odeslat', 'Díky! Čteme každé hlášení.', 'Něco se pokazilo. Zkuste to znovu.', 'Zrušit', "Odešleme jen vaši zprávu, tuto stránku, jazyk a název prohlížeče. Prosím neuvádějte jména ani kontakty."],
  de: ['Problem melden', 'Was ist passiert? Was hast du erwartet?', 'Senden', 'Danke! Wir lesen jede Meldung.', 'Etwas ist schiefgelaufen. Bitte versuch es erneut.', 'Abbrechen', "Wir senden nur deine Nachricht, diese Seite, deine Sprache und den Browsernamen. Bitte keine Namen oder Kontaktdaten angeben."],
  fr: ['Signaler un problème', 'Que s’est-il passé ? À quoi vous attendiez-vous ?', 'Envoyer', 'Merci ! Nous lisons chaque signalement.', 'Une erreur est survenue. Réessayez.', 'Annuler', "Nous n’envoyons que votre message, cette page, votre langue et le nom du navigateur. N’indiquez ni noms ni coordonnées."],
  es: ['Informar de un problema', '¿Qué pasó? ¿Qué esperabas?', 'Enviar', '¡Gracias! Leemos cada informe.', 'Algo salió mal. Inténtalo de nuevo.', 'Cancelar', "Solo enviamos tu mensaje, esta página, tu idioma y el nombre del navegador. No incluyas nombres ni datos de contacto."],
  it: ['Segnala un problema', 'Cosa è successo? Cosa ti aspettavi?', 'Invia', 'Grazie! Leggiamo ogni segnalazione.', 'Qualcosa è andato storto. Riprova.', 'Annulla', "Inviamo solo il tuo messaggio, questa pagina, la lingua e il nome del browser. Non inserire nomi o recapiti."],
  ar: ['الإبلاغ عن مشكلة', 'ماذا حدث؟ وماذا كنت تتوقع؟', 'إرسال', 'شكرًا! نقرأ كل بلاغ.', 'حدث خطأ. حاول مرة أخرى.', 'إلغاء', "نرسل رسالتك وهذه الصفحة ولغتك واسم المتصفح فقط. من فضلك لا تكتب أسماء أو بيانات اتصال."],
  'pt-BR': ['Relatar um problema', 'O que aconteceu? O que você esperava?', 'Enviar', 'Obrigado! Lemos todos os relatos.', 'Algo deu errado. Tente de novo.', 'Cancelar', "Enviamos só sua mensagem, esta página, seu idioma e o nome do navegador. Não inclua nomes nem contatos."],
  'pt-PT': ['Reportar um problema', 'O que aconteceu? O que esperavas?', 'Enviar', 'Obrigado! Lemos todos os relatos.', 'Algo correu mal. Tenta novamente.', 'Cancelar', "Enviamos só a tua mensagem, esta página, o teu idioma e o nome do navegador. Não incluas nomes nem contactos."],
  ja: ['問題を報告', '何が起きましたか？本来はどうなるはずでしたか？', '送信', 'ありがとう！すべての報告に目を通します。', 'うまくいきませんでした。もう一度お試しください。', 'キャンセル', "送信するのはメッセージ、このページ、言語、ブラウザ名だけです。名前や連絡先は書かないでください。"],
  ko: ['문제 신고', '무슨 일이 있었나요? 원래 어떻게 될 줄 알았나요?', '보내기', '고마워요! 모든 신고를 읽어요.', '문제가 생겼어요. 다시 시도해 주세요.', '취소', "메시지, 이 페이지, 언어, 브라우저 이름만 보내요. 이름이나 연락처는 적지 마세요."],
  hi: ['समस्या बताएँ', 'क्या हुआ? आप क्या उम्मीद कर रहे थे?', 'भेजें', 'धन्यवाद! हम हर रिपोर्ट पढ़ते हैं।', 'कुछ गड़बड़ हुई। फिर से कोशिश करें।', 'रद्द करें', "हम सिर्फ़ आपका संदेश, यह पेज, आपकी भाषा और ब्राउज़र का नाम भेजते हैं। कृपया नाम या संपर्क विवरण न लिखें।"],
  fil: ['Mag-report ng problema', 'Ano ang nangyari? Ano ang inaasahan mo?', 'Ipadala', 'Salamat! Binabasa namin ang bawat report.', 'May nagkaproblema. Subukan ulit.', 'Kanselahin', "Ang mensahe mo, ang page na ito, ang wika at pangalan ng browser lang ang ipapadala. Huwag maglagay ng pangalan o contact details."],
  nl: ['Probleem melden', 'Wat gebeurde er? Wat had je verwacht?', 'Versturen', 'Bedankt! We lezen elke melding.', 'Er ging iets mis. Probeer het opnieuw.', 'Annuleren', "We sturen alleen je bericht, deze pagina, je taal en de naam van je browser. Vermeld geen namen of contactgegevens."],
};
TXT['nl-BE'] = TXT.nl;
export const reportText = (lang = localStorage.getItem('bingoSiteLang') || document.documentElement.lang || 'en') =>
  TXT[lang] || TXT[String(lang).split('-')[0]] || TXT.en;

let fbp = null;
async function fb() {
  fbp ??= (async () => {
    const [{ initializeApp, getApps }, A, D] = await Promise.all([import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'), import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'), import('https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js')]);
    const app = getApps().find(a => a.name === 'report') || initializeApp(firebaseConfig, 'report');
    await A.signInAnonymously(A.getAuth(app));
    return { D, db: D.getDatabase(app) };
  })();
  return fbp;
}

// Only the browser family, never the device, model, OS version or any ID (privacy by default, GDPR).
const browserName = () => { const u = navigator.userAgent; return /SamsungBrowser/.test(u) ? 'Samsung Internet' : /Edg\//.test(u) ? 'Edge' : /Firefox|FxiOS/.test(u) ? 'Firefox' : /CriOS|Chrome/.test(u) ? 'Chrome' : /Safari/.test(u) ? 'Safari' : 'Other'; };

export function openReport({ where = location.pathname } = {}) {
  const [title, ph, send, thanks, err, cancel, note] = reportText();
  let el = document.getElementById('reportSheet');
  if (!el) {
    const css = document.createElement('style');
    css.textContent = `#reportSheet{position:fixed;inset:0;background:#0d1f3666;display:none;align-items:flex-end;justify-content:center;z-index:90}#reportSheet.show{display:flex}
#reportSheet .rp{width:min(520px,100%);background:#fff;color:#132433;border-radius:22px 22px 0 0;padding:14px 20px max(20px,env(safe-area-inset-bottom));display:grid;gap:10px;animation:rpUp .25s ease-out}
#reportSheet h2{margin:0;font-size:20px;text-align:center}#reportSheet textarea{width:100%;min-height:120px;box-sizing:border-box;border:1px solid #c9d3de;border-radius:12px;padding:10px;font:inherit;font-size:16px;resize:vertical}
#reportSheet small{color:#5b6b7b}#reportSheet .rp-row{display:flex;gap:8px}#reportSheet .rp-row button{flex:1;padding:12px;border-radius:12px;border:1px solid #c9d3de;background:#f3f6f9;font:inherit;font-weight:600;color:#132433}
#reportSheet .rp-row .go{background:#c8392f;border-color:#c8392f;color:#fff}#reportSheet .rp-msg{text-align:center;font-weight:600}@keyframes rpUp{from{transform:translateY(100%)}}@media (prefers-reduced-motion:reduce){#reportSheet .rp{animation:none}}`;
    document.head.appendChild(css);
    el = document.createElement('div'); el.id = 'reportSheet'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('show'); });
  }
  el.innerHTML = `<div class="rp"><h2>🐞 ${title}</h2><textarea maxlength="1000" placeholder="${ph}"></textarea><small>${note}</small><p class="rp-msg" hidden></p><div class="rp-row"><button type="button" class="no">${cancel}</button><button type="button" class="go">${send}</button></div></div>`;
  const ta = el.querySelector('textarea'), msg = el.querySelector('.rp-msg'), go = el.querySelector('.go');
  el.querySelector('.no').onclick = () => el.classList.remove('show');
  go.onclick = async () => {
    const text = ta.value.trim(); if (!text) { ta.focus(); return; }
    go.disabled = true;
    try {
      const { D, db } = await fb();
      await D.set(D.push(D.ref(db, 'feedback')), { text: text.slice(0, 1000), where: String(where).slice(0, 120), lang: (localStorage.getItem('bingoSiteLang') || document.documentElement.lang || '').slice(0, 8), ua: browserName(), at: Date.now() });
      el.querySelector('.rp').innerHTML = `<h2>💌</h2><p class="rp-msg">${thanks}</p>`; setTimeout(() => el.classList.remove('show'), 1800);
    } catch (e) { console.warn('report', e); msg.hidden = false; msg.textContent = err; go.disabled = false; }
  };
  el.classList.add('show'); setTimeout(() => ta.focus(), 250);
}
