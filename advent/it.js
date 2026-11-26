// Italian practice Advent calendar: 6 open doors to try the games any time.
// [[...]] marks a phrase that appears on the bingo card. Each door has 12 marked phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'it', label: 'Italiano', locale: 'it-IT', voice: ['it'],
  tagline: 'Calendario di prova con sei finestrelle già aperte. Prova i giochi quando vuoi, da solo o in squadra.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Calcetto: l’ultima partita dell’anno', 'campo prenotato alle 21', ['Pallone bucato', 'Fuorigioco', 'Arbitro in ritardo', 'Docce fredde'], [
      ['Marco', 'Ragazzi [[giovedì ultimo calcetto]] dell’anno ⚽'], ['Luca', '[[ci sono!]]'], ['Ste', 'io pure, [[a che ora?]]'],
      ['Marco', '[[campo prenotato alle 21]]'], ['Ale', '§react 👍'], ['Ale', 'siamo in nove, [[manca uno]]'], ['Luca', '[[porto mio cugino]], gioca bene'],
      ['Ste', '§photo 👕'], ['Ste', '[[maglie rosse contro bianche]]'], ['Marco', '§voice 0:35'], ['Ale', 'Marco dice [[dopo pizza tutti insieme]]'],
      ['Luca', '§deleted'], ['Luca', 'scusate, chat sbagliata 😅'], ['Ste', 'chi perde [[offre il panettone]] 😎'], ['Ale', '[[ho già paura]] 😂'],
      ['Marco', '[[portate le scarpe da calcetto]]'], ['Luca', '[[Ci vediamo giovedì]] 💪']]), start: '22:05' },
    2: emoji('Giochi da tavolo in famiglia', 'Tombola', ['Scacchi', 'Scopa', 'Briscola', 'Domino'], [
      ['🔢🫘🎉', 'Tombola'], ['🃏🧑‍💼🎪', 'Mercante in fiera'], ['🪿🎲🌀', 'Gioco dell’oca'], ['🎩🏠💶', 'Monopoly'], ['🃏🔴🟢🔵', 'Uno'], ['🔤🔢🟫', 'Scarabeo'],
      ['🔍🕵️🏚️', 'Cluedo'], ['⚫⚪♟️', 'Dama'], ['🧩', 'Puzzle'], ['🧱🧱🫳', 'Jenga'], ['🔴🟡4️⃣', 'Forza quattro'], ['🙋‍♂️❓👨‍🦰', 'Indovina chi?']]),
    3: listen('Annuncio alla pista di pattinaggio', 'passa la macchina del ghiaccio', ['Hockey su ghiaccio', 'Armadietti pieni', 'Triplo salto', 'Lame affilate'], [
      'Buon pomeriggio, [[la pista è aperta]]!', 'Vi chiediamo di [[pattinare nello stesso senso]].', 'Tra dieci minuti [[passa la macchina del ghiaccio]]: liberate la pista.',
      'Il [[noleggio pattini]] è alla cassa.', 'Per i più piccoli ci sono [[i pinguini di sostegno]] vicino alla balaustra.', 'È stato trovato [[un guanto azzurro]] negli spogliatoi.',
      'Alle diciotto [[musica sul ghiaccio]] per tutti!', 'Per favore, [[niente gare di velocità]] in pista.', 'Al chiosco trovate [[cioccolata calda e frittelle]].',
      'Il [[corso per principianti]] inizia alle diciassette.', 'Se cadete, [[lo staff vi aiuta]] all’ingresso.', 'Buon divertimento e [[mantenete le distanze]]!']),
    4: { ...chat('Famiglia: videochiamata con il nonno', 'Nonno, è il tuo orecchio', ['Password dimenticata', 'Batteria scarica', 'Audio disattivato', 'Niente wifi'], [
      ['Giulia', 'Domenica alle 5 [[videochiamata col nonno]] 📱'], ['Papà', 'Gli ho [[mandato il link]]'], ['Nonno', 'Ciao. [[Che tasto devo premere]]. Saluti, nonno'],
      ['Giulia', '[[quello verde, nonno]] 😊'], ['Nonno', '§photo 📷'], ['Papà', '[[È una foto della tv]] 😄'], ['Giulia', '§react 😂'],
      ['Nonna', 'Il nonno dice che [[gli occhiali sono in cucina]]'], ['Nonno', '§voice 0:07'], ['Giulia', 'nonno si sente solo [[un fruscio]] 🙉'], ['Papà', 'prova a [[girare il telefono]]'],
      ['Nonno', '§deleted'], ['Nonno', 'E adesso? Nonno'], ['Giulia', '[[Nonno, è il tuo orecchio]] 😂❤️'], ['Nonna', '[[Adesso vi vediamo]]! Ciao tesori 😘'],
      ['Papà', '[[Funziona!]] 👏'], ['Nonno', '[[Domenica prossima di nuovo]]. Saluti']]), start: '18:20' },
    5: listen('In biblioteca: letture d’inverno per bambini', 'un orso che non dorme', ['Silenzio, prego', 'Fotocopiatrice', 'Audiolibro', 'Occhiali dimenticati'], [
      'Buon pomeriggio, [[la lettura animata]] inizia tra cinque minuti.', 'I bambini sono attesi [[nella sala ragazzi]] al primo piano.', 'Per favore, [[togliete le scarpe]] prima di sedervi sui cuscini.',
      'Oggi leggiamo la storia di [[un orso che non dorme]] per tutto l’inverno.', 'Dopo [[facciamo i segnalibri]] con le stelline.', 'Intanto i genitori possono [[curiosare tra gli scaffali]].',
      'I [[libri d’inverno]] sono esposti all’ingresso.', 'Ricordate: [[i resi vanno nel box]] automatico.', 'Chi non ce l’ha può [[fare la tessera]] al bancone.',
      'Durante le feste [[l’orario è ridotto]].', 'Controllate [[la data di scadenza]] dei prestiti.', 'E adesso, [[buon ascolto a tutti]]!']),
    6: emoji('Pomeriggio d’inverno a casa', 'Borsa dell’acqua calda', ['Stufetta', 'Sciarpa', 'Termosifone', 'Brodo di pollo'], [
      ['🛋️🧣', 'Coperta sul divano'], ['🥛🍯', 'Latte caldo e miele'], ['💧🔥🛏️', 'Borsa dell’acqua calda'], ['🥿🥿', 'Pantofole'], ['🍲🥕', 'Minestrone'], ['🫖🌿', 'Tisana'],
      ['🎬🍿', 'Film del pomeriggio'], ['📖☕', 'Un libro e un caffè'], ['🧦🧦', 'Calzettoni'], ['🔥🪵', 'Camino acceso'], ['🃏🃏', 'Giochi di carte'], ['🥣🌽', 'Polenta']]),
  },
};
