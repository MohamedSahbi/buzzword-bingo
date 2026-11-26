// Oefenkalender (nl): 6 open deurtjes om te oefenen. [[...]] markeert een zin van de bingokaart.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'nl', label: 'Nederlands', locale: 'nl-NL', voice: ['nl-NL', 'nl'],
  tagline: 'Oefenkalender: 6 open deurtjes om te spelen wanneer je wilt, alleen of met je team.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Hardloopgroepje: de kerstloop', 'eentje met een belletje', ['Persoonlijk record', 'Spierpijn', 'Medaille', 'Waterpost'], [
      ['Fleur', 'Morgen! Wie doet er mee aan [[de kerstloop van zondag]]? 🏃‍♀️'], ['Bas', '[[ik heb me net ingeschreven]]'], ['Ilse', '5 of 10 km?'],
      ['Bas', '[[de vijf, rustig aan]]'], ['Fleur', '[[verplicht met een kerstmuts]] trouwens 🎅'], ['Ilse', '§react 😂'], ['Jeroen', '[[ik heb geen kerstmuts]]'],
      ['Ilse', 'ik heb er nog [[eentje met een belletje]]'], ['Fleur', '§photo 🎅'], ['Bas', '§voice 0:24'], ['Bas', 'sorry, wind 😅 [[verzamelen bij het station]]?'],
      ['Jeroen', '[[om half tien]] dan'], ['Ilse', 'na afloop [[erwtensoep bij de finish]]'], ['Fleur', '§deleted'], ['Fleur', '[[vergeet je startnummer niet]]'],
      ['Jeroen', 'en [[handschoenen aan]], het wordt koud'], ['Bas', '[[tot zondag!]] 👟']]), start: '07:45' },
    2: emoji('Koekjes en gebak', 'Bokkenpootje', ['Kruidkoek', 'Kokosmakroon', 'Eierkoek', 'Janhagel'], [
      ['🧇🍯', 'Stroopwafel'], ['🐐🦶🍫', 'Bokkenpootje'], ['🧈🍰', 'Boterkoek'], ['🍪🌰', 'Gevulde koek'], ['🌸🟨🍰', 'Tompouce'], ['🍪🌀', 'Spritsen'],
      ['🥨🍬', 'Krakeling'], ['🥖🌰✨', 'Banketstaaf'], ['🍎🥐', 'Appelflap'], ['🟢🦴🍰', 'Mergpijpje'], ['🍫⚪🏙️', 'Bossche bol'], ['🍞🌅🍯', 'Ontbijtkoek']]),
    3: listen('Spraakbericht van de buurvrouw: oppassen op de kat', 'op Muis willen passen', ['Krabpaal', 'Dierenarts', 'Kattenluikje', 'Vogelvoer'], [
      'Hoi, met Marja van nummer 8, [[heb je even?]]', 'Wij gaan [[met de kerst naar mijn zus]] in Zwolle.', 'Zou jij [[op Muis willen passen]]? Dat is de kat, hè.',
      'Ze krijgt [[twee keer per dag brokjes]], een klein bakje.', 'Op zondag mag ze [[een zakje natvoer]] als traktatie.', 'De [[kattenbak staat achter]], in de bijkeuken.',
      'Ik doe [[de sleutel in je brievenbus]].', 'Wil je ook [[de plantjes water geven]]? Alleen de grote.', 'Ze [[verstopt zich onder het bed]] als er iemand komt, dat is normaal.',
      '[[Stuur je af en toe een foto]]?', 'Ik neem [[een doos bonbons]] voor je mee terug.', 'Alvast heel erg bedankt, [[fijne dagen]]!']),
    4: { ...chat('Team: de digitale kerstkaart voor klanten', 'photoshoppen we je erin', ['Huisstijl', 'Mailinglijst', 'Nieuwsbrief', 'Verzendlijst'], [
      ['Annemieke', 'Hoi allen, [[de digitale kerstkaart]] moet vrijdag de deur uit 🎄'], ['Joris', '[[met teamfoto erop?]]'], ['Annemieke', 'Ja! [[groepsfoto om twaalf uur]] bij de receptie'],
      ['Priya', '§react 😬'], ['Priya', '[[ik werk morgen thuis]]'], ['Joris', 'dan [[photoshoppen we je erin]] 😄'], ['Annemieke', '§photo 📸'],
      ['Annemieke', 'dit is [[het ontwerp van marketing]]'], ['Daan', '[[mooi strak]] 👌'], ['Priya', '[[kan het logo iets groter?]]'], ['Daan', '§voice 0:41'],
      ['Daan', 'kort gezegd: [[de tekst nog even checken]]'], ['Joris', '„Warme groeten en een mooi 2027”? [[klinkt prima]]'], ['Annemieke', '§deleted'],
      ['Annemieke', 'oeps, verkeerde bijlage 🙈 [[ik zet hem in Teams]]'], ['Daan', '[[top, goed geregeld]]']]), start: '14:30' },
    5: listen('Omroep op de ijsbaan', 'komt de ijsdweil', ['Hockeyschaats', 'IJsbeer', 'Noren', 'Elfstedentocht'], [
      'Goedemiddag schaatsers, [[welkom op de ijsbaan]]!', 'Over vijf minuten [[komt de ijsdweil]], dus iedereen even van het ijs.', 'Schaatsen huren kan [[bij het loket naast de ingang]].',
      'Kleine kinderen kunnen [[een schaatshulp lenen]], zo’n pinguïn.', 'Rijd alsjeblieft [[allemaal dezelfde kant op]].', 'Om drie uur begint [[de schaatsles voor beginners]].',
      'In de koek-en-zopie zijn er [[verse poffertjes]].', 'Er is [[een blauwe want gevonden]], die ligt bij de kassa.', 'Vanavond is het [[disco op het ijs]] vanaf zeven uur.',
      'Let op: de [[kluisjes werken met een munt]].', 'Ga je onderuit? [[Gewoon even opkrabbelen]] en doorschaatsen.', 'Veel plezier en [[tot de volgende ronde]]!']),
    6: emoji('Klusjes voor de feestdagen', 'Logeerbed opmaken', ['Vloer dweilen', 'Gordijnen wassen', 'Bedden verschonen', 'Planten water geven'], [
      ['🪟🧽', 'Ramen lappen'], ['🧹🛋️', 'Stofzuigen'], ['🛏️🧳👵', 'Logeerbed opmaken'], ['🍽️↔️🪑', 'Tafel uitschuiven'], ['🪑🏃‍♂️🏠', 'Stoelen lenen bij de buren'], ['💡🪜', 'Lampjes ophangen'],
      ['🕯️🛒', 'Kaarsen kopen'], ['🍴✨', 'Bestek poetsen'], ['🧊📦🗑️', 'Vriezer leegmaken'], ['🔋🔋🛒', 'Batterijen kopen'], ['📝🛒', 'Boodschappenlijst'], ['📦♻️🚗', 'Dozen wegbrengen']]),
  },
};
