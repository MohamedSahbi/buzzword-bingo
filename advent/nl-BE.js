// Oefenkalender (nl-BE, Vlaams): 6 open deurtjes om te oefenen. [[...]] markeert een zin van de bingokaart.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'nl-BE', label: 'Vlaams (België)', locale: 'nl-BE', voice: ['nl-BE', 'nl'],
  tagline: 'Oefenkalender: 6 open deurtjes om te spelen wanneer je maar wil, alleen of met je team.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Jeugdbeweging: de wafelenbak', 'mijn bomma heeft er twee', ['Pannenkoeken', 'Bladerdeeg', 'Chocoladesaus', 'Slagroom'], [
      ['Lotte', 'Hey leiding! Zaterdag is [[de wafelenbak]] 🧇'], ['Wout', '[[hoeveel deeg maken we?]]'], ['Lotte', 'vorig jaar [[300 wafels verkocht]]'],
      ['Jana', 'amai 😮'], ['Wout', 'dan [[twee emmers deeg]]'], ['Jana', 'wie heeft [[een extra wafelijzer]]?'], ['Robbe', '§voice 0:36'],
      ['Robbe', 'sorry, kon niet typen. [[mijn bomma heeft er twee]]'], ['Lotte', '§react 🙏'], ['Jana', '[[we beginnen om 9 u]] in het lokaal'], ['Wout', '§photo 📋'],
      ['Wout', '[[de bestellijst hangt uit]]'], ['Robbe', '[[de suiker niet vergeten]]'], ['Jana', '§deleted'], ['Jana', '[[ik breng schorten mee]]'],
      ['Lotte', 'en de opbrengst? [[alles voor het zomerkamp]] ⛺'], ['Robbe', '[[allez, tot zaterdag]] 😄']]), start: '19:05' },
    2: emoji('Vrijdagavond: naar de frituur', 'Mitraillette', ['Bitterballen', 'Samourai', 'Tartaarsaus', 'Loempia'], [
      ['🛍️🍟', 'Grote pak friet'], ['🍟🥩🍲', 'Friet met stoofvlees'], ['🌭🌶️', 'Curryworst'], ['🥖🍟🥩', 'Mitraillette'], ['🟫🌭', 'Frikandel'], ['🧀🟫', 'Kaaskroket'],
      ['🍜🟫', 'Bamischijf'], ['🥚🫙⚪', 'Mayonaise'], ['🌶️🫙🟠', 'Andalousesaus'], ['🐔🍗', 'Kipnuggets'], ['🧅💍', 'Ajuinringen'], ['🥩🥢', 'Brochette']]),
    3: listen('Spraakbericht van bompa: de vogels voederen', 'een pindasnoer', ['Zonnebloempitten', 'Merel', 'Voederhuisje', 'Duiven'], [
      'Dag jongen, het is bompa, [[hoort ge mij goed?]]', 'Het is koud, dus ik ben [[de vogels aan het voederen]].', 'Ik heb [[vetbollen gekocht]] bij het tuincentrum.',
      'En ik maak [[een pindasnoer]] voor aan de appelboom.', 'Gisteren zag ik [[een roodborstje]] op de vensterbank.', 'De [[mezen zijn heel brutaal]], die komen tot aan het raam.',
      'Gij moet ook [[een bakje water]] zetten, want alles vriest dicht.', 'Uw bomma lacht, want [[ik zit hier uren te kijken]].', 'Als ge komt, [[bouwen we een vogelhuisje]].',
      'Ik heb [[de verrekijker al klaargelegd]].', 'En [[de kat blijft binnen]], die mag er niet aan.', 'Tot zondag, [[een dikke knuffel]] van bompa.']),
    4: { ...chat('Kantoor: de nieuwjaarsreceptie organiseren', 'max tien minuten', ['Dresscode', 'Fotobooth', 'Parkeerplaats', 'Badge'], [
      ['Els', 'Goeiemorgen! Wie helpt mee met [[de nieuwjaarsreceptie]]? 🥳'], ['Stijn', 'welke datum?'], ['Els', '[[vrijdag 8 januari]]'],
      ['Nathalie', 'ik doe [[de uitnodiging via Outlook]]'], ['Stijn', '§react 👍'], ['Kobe', '[[broodjes of walking dinner?]]'], ['Els', 'walking dinner, [[dat was vorig jaar top]]'],
      ['Nathalie', '§voice 0:29'], ['Nathalie', 'dus: [[de traiteur is gereserveerd]]'], ['Kobe', '[[en de speech van de CEO?]]'], ['Els', '[[max tien minuten]] 😅'],
      ['Stijn', '§photo 🎈'], ['Stijn', '[[ballonnen in onze kleuren]]'], ['Kobe', '§deleted'], ['Kobe', '[[ik regel de muziek]]'],
      ['Nathalie', 'niet te luid hé, [[da’s afgesproken]]'], ['Els', '[[merci allemaal]]! 🙏']]), start: '09:40' },
    5: listen('Toonmoment van de muziekacademie', 'het blokfluitensemble', ['Dirigeerstok', 'Viool', 'Solfège', 'Bisnummer'], [
      'Goeienavond iedereen, [[welkom op ons toonmoment]].', 'Eerst spelen [[de leerlingen van de piano]].', 'Daarna komt [[het blokfluitensemble]] van de jongste groep.',
      'Tip voor de ouders: [[pas klappen op het einde]] van elk stuk.', 'Filmen mag, maar [[blijf op uw stoel zitten]].', 'Onze [[gitaarleraar stemt nog even]].',
      'Na de pauze speelt [[het jeugdorkest]] drie kerstnummers.', 'In de pauze is er [[koffie en cake]] in de gang.', 'De opbrengst gaat naar [[nieuwe notenstaanders]].',
      'Wie wil, kan zich [[inschrijven voor volgend jaar]].', 'Een speciale dank aan [[de leerkrachten]] voor al hun werk.', 'Geniet ervan, en [[veel luisterplezier]]!']),
    6: emoji('Uitstapjes in de kerstvakantie', 'Uitwaaien aan zee', ['Trampolinepark', 'Minigolf', 'Kinderboerderij', 'Dierenpark'], [
      ['🦁🦒🎟️', 'Naar de zoo'], ['🎢🎡', 'Pretpark'], ['🍿🎬', 'Naar de cinema'], ['🏊‍♀️💦', 'Zwembad'], ['🎳', 'Bowling'], ['🌲🥾🍂', 'Boswandeling'],
      ['🖼️🏛️', 'Museum'], ['🎭🎶', 'Musical'], ['📚🏠', 'Naar de bib'], ['🧗‍♂️🏢', 'Indoor klimmen'], ['🌊🌬️🧥', 'Uitwaaien aan zee'], ['🛝👧', 'Speeltuin']]),
  },
};
