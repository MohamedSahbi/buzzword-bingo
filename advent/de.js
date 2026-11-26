// German practice Advent calendar: 6 open doors to try the games any time.
// [[...]] marks a phrase that appears on the bingo card. Each door has 12 marked phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'de', label: 'Deutsch', locale: 'de-DE', voice: ['de'],
  tagline: 'Übungskalender mit sechs offenen Türchen. Probier die Spiele aus, wann du willst – allein oder im Team.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Hausgemeinschaft: Wer räumt heute Schnee?', 'Schneeschieber im Keller', ['Streusalz ist alle', 'Hausmeister krank', 'Eiszapfen am Dach', 'Mülltonnen eingefroren'], [
      ['Frau Becker', 'Guten Morgen zusammen, es hat [[über Nacht geschneit]] ❄️'], ['Tim', 'wer ist diese Woche [[mit Räumen dran]]?'], ['Frau Becker', 'Laut Plan im Flur: [[Familie Yilmaz]]'],
      ['Herr Yilmaz', 'Stimmt, wir sind dran. [[Bin in zehn Minuten unten]] 👍'], ['Lena', '§photo ⛄'], ['Lena', 'die Kinder haben schon [[einen Schneemann gebaut]] 😄'], ['Tim', '§react ❤️'],
      ['Herr Yilmaz', 'Steht der [[Schneeschieber im Keller]]?'], ['Frau Becker', 'Ja, [[hinter den Fahrrädern]].'], ['Herr Yilmaz', '§voice 0:18'], ['Lena', 'Herr Yilmaz sagt, [[der Griff ist locker]] 😅'],
      ['Tim', '§deleted'], ['Tim', 'sorry, falscher Chat 🙈'], ['Frau Becker', 'Ich habe [[noch Streusplitt]] im Vorratsraum.'], ['Lena', 'Wir nehmen nachher [[den Schlitten zum Bäcker]] 🛷'],
      ['Herr Yilmaz', '[[Gehweg ist frei]]! ✅'], ['Frau Becker', 'Danke! [[Ich backe euch Waffeln]] am Sonntag. Liebe Grüße, I. Becker']]), start: '07:15' },
    2: emoji('Spieleabend mit der Familie', 'Mensch ärgere dich nicht', ['Schach', 'Halma', 'Domino', 'Skat'], [
      ['😠🚫🎲', 'Mensch ärgere dich nicht'], ['🃏🔴🟡', 'Uno'], ['🧠🖼️🔁', 'Memory'], ['🏝️🐑🧱', 'Die Siedler von Catan'], ['🎲🎲🎲🎲🎲', 'Kniffel'], ['🤫🗣️🚫', 'Tabu'],
      ['✏️🎭🗣️', 'Activity'], ['🧩', 'Puzzle'], ['🥢🥢🤏', 'Mikado'], ['🏙️🌍🏞️', 'Stadt, Land, Fluss'], ['🐇🦔🏁', 'Hase und Igel'], ['🔤🧱', 'Scrabble']]),
    3: listen('Durchsage in der Stadtbücherei: Vorlesestunde', 'eine Geschichte vom Eisbären', ['Hörbuch-CD', 'Lesebrille vergessen', 'Leise bitte', 'Kopierer defekt'], [
      'Liebe Besucherinnen und Besucher, gleich beginnt [[die Vorlesestunde im Advent]].', 'Alle Kinder sind eingeladen in [[die Leseecke im ersten Stock]].', 'Bitte [[Schuhe ausziehen]], auf dem Teppich liegen Kissen bereit.',
      'Heute lesen wir [[eine Geschichte vom Eisbären]], der im Winter nicht schlafen kann.', 'Danach [[basteln wir Lesezeichen]] mit Sternen.', 'Eltern können solange [[in Ruhe stöbern]].',
      'Die neuen [[Bilderbücher für den Winter]] stehen am Eingang.', 'Ein Hinweis: [[Rückgabe bitte am Automaten]].', 'Wer noch keinen hat, kann [[einen Leseausweis beantragen]].',
      'Zwischen den Jahren gelten [[verkürzte Öffnungszeiten]].', 'Bitte [[an die Leihfrist denken]], die Erinnerung kommt per Mail.', 'Wir wünschen euch [[viel Spaß beim Zuhören]]!']),
    4: { ...chat('Familie: Videoanruf mit Opa', 'Opa, das ist dein Ohr', ['Passwort vergessen', 'Akku leer', 'Lautsprecher aus', 'WLAN weg'], [
      ['Mia', 'Sonntag 16 Uhr [[Videoanruf mit Opa]]! 📱'], ['Papa', 'Hab ihm den [[Link per SMS geschickt]]'], ['Opa', 'Hallo. [[Was muss ich drücken]]. Gruß Opa'],
      ['Mia', 'einfach [[auf den grünen Knopf]] Opa 😊'], ['Opa', '§photo 📷'], ['Papa', '[[Das ist ein Foto vom Fernseher]] 😄'], ['Mia', '§react 😂'],
      ['Oma', 'Opa sagt, [[die Brille ist in der Küche]]'], ['Opa', '§voice 0:07'], ['Mia', 'Opa wir hören nur [[ein Rauschen]] 🙉'], ['Papa', 'Probier mal [[das Handy umdrehen]]'],
      ['Opa', '§deleted'], ['Opa', 'Jetzt? Gruß Opa'], ['Mia', '[[Opa, das ist dein Ohr]] 😂❤️'], ['Oma', '[[Jetzt sehen wir euch!]] Hallo ihr Lieben!!'],
      ['Papa', '[[Klappt doch prima]] 👏'], ['Opa', '[[Nächsten Sonntag wieder]]. Gruß Opa']]), start: '18:05' },
    5: listen('Durchsage auf der Eisbahn', 'die Eismaschine', ['Pirouette', 'Eishockeyspiel', 'Kufen schleifen', 'Spinde voll'], [
      'Hallo zusammen, [[die Eisbahn ist geöffnet]]!', 'Bitte [[nur in eine Richtung laufen]], gegen den Uhrzeigersinn.', 'In zehn Minuten kommt [[die Eismaschine]], bitte dann die Fläche verlassen.',
      '[[Schlittschuhe ausleihen]] könnt ihr an der Kasse.', 'Die [[Laufhilfen für Kinder]] sind die kleinen Pinguine.', 'Ein Paar [[blaue Handschuhe]] wurde gefunden.',
      'Ab 18 Uhr gibt es [[Disco auf dem Eis]].', 'Bitte [[keine Wettrennen]] auf der Bahn.', 'Am Kiosk gibt es [[heiße Maronen]] und Kakao.',
      'Der [[Kurs für Anfänger]] beginnt um 17 Uhr.', 'Bei kleinen Stürzen hilft das Team am [[Erste-Hilfe-Punkt]].', 'Viel Spaß und [[immer schön Abstand halten]]!']),
    6: emoji('Winterurlaub in den Bergen', 'Sessellift', ['Lawine', 'Gondel', 'Schneekanone', 'Seilbahn'], [
      ['⛷️', 'Skifahren'], ['🪑🚡', 'Sessellift'], ['🛷', 'Rodeln'], ['🏂', 'Snowboard'], ['🏔️🏠', 'Berghütte'], ['🥾❄️', 'Winterwandern'],
      ['🧤🧣🧢', 'Mütze, Schal und Handschuhe'], ['🫕🧀', 'Käsefondue'], ['☀️🕶️', 'Sonnenbrille'], ['🥛🍫🔥', 'Heiße Schokolade'], ['🐕🛷', 'Hundeschlitten'], ['🧑‍🏫⛷️', 'Skikurs']]),
  },
};
