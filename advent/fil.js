// Filipino (Taglish) practice Advent calendar: 6 doors, lahat bukas na.
// [[...]] = phrase sa bingo card. Bawat door: 12 phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'fil', label: 'Filipino', locale: 'fil-PH', voice: ['fil', 'tl'],
  tagline: 'Practice calendar ’to: 6 na pinto, lahat bukas na. Laro lang kahit kailan, solo o kasama ang team.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Magkakapatid: Regalo para kay Mama', 'may air fryer na siya', ['gift certificate', 'bagong kaldero', 'padala sa GCash', 'spa voucher'], [
      ['Ate Joy', 'guys [[ano regalo natin kay Mama?]] 🎁'], ['Paolo', '[[ambagan na lang tayo]]'], ['Bea', 'G ako dyan'], ['Ate Joy', '[[tig-500 each]]? okay lang?'],
      ['Paolo', '§react 👍'], ['Bea', '[[air fryer kaya?]] sira na yung luma'], ['Paolo', '[[may air fryer na siya]] 😂 bigay ni Tita'], ['Ate Joy', 'massage chair na lang hahaha'],
      ['Bea', '[[wala tayong budget]] dun ate'], ['Paolo', '[[bagong cellphone]]? lagi nagla-lag phone nya'], ['Ate Joy', '§photo 📱'], ['Ate Joy', 'eto, [[naka-sale sa online]]'],
      ['Bea', 'omg [[free shipping pa]]'], ['Paolo', 'sige [[i-checkout mo na ate]]'], ['Ate Joy', '§voice 0:21'], ['Bea', '[[surprise ’to ha]], walang magsasabi!'],
      ['Paolo', '[[sealed lips]] 🤐']]), start: '21:15' },
    2: emoji('Laro ng mga bata tuwing bakasyon', 'Luksong tinik', ['Siato', 'Bato-bato pik', 'Luksong baka', 'Sungka'], [
      ['🥫🩴', 'Tumbang preso'], ['1️⃣2️⃣🦘', 'Piko'], ['🦶🪶', 'Sipa'], ['🦘🌵', 'Luksong tinik'], ['⭐🏀✋', 'Jackstones'], ['🙈🔢', 'Taguan'],
      ['🏃🏠🚩', 'Agawan base'], ['🌀🪵', 'Trumpo'], ['🪁🌬️', 'Saranggola'], ['🔗🦵', 'Chinese garter'], ['☁️⬇️🏃', 'Langit-lupa'], ['🔮🟢👆', 'Holen']]),
    3: listen('Anunsyo ng barangay: Paghahanda sa Pasko', 'patimpalak sa Christmas decor', ['tanod sa gabi', 'feeding program', 'liga ng basketball', 'libreng bigas'], [
      '[[Magandang gabi, mga kabarangay]]!', 'Ito po ang [[paalala ng barangay hall]] para sa linggong ito.', 'Sa Sabado ay may [[clean-up drive]] sa buong purok, alas-sais ng umaga.',
      'Magdala po ng [[walis tingting at sako]].', 'Bukas na rin ang [[patimpalak sa Christmas decor]] ng bawat kalye.', 'Ang mananalong kalye ay may [[premyong grocery package]].',
      'Sa Linggo naman ang [[libreng gupit para sa mga bata]] sa covered court.', 'Paalala sa mga motorista: [[bawal mag-park sa kanto]].', 'Ang [[koleksyon ng basura]] ay tuwing Martes at Biyernes pa rin.',
      'Sa mga may alagang aso, [[itali po natin ang mga alaga]].', 'May [[Christmas party ng mga senior]] sa Huwebes ng hapon.', 'Muli, [[maraming salamat po]] at Merry Christmas sa ating lahat!']),
    4: { ...chat('Team chat: Bago mag-holiday break', 'ako pala sa 27', ['performance review', 'overtime pay', 'team building', 'floating holiday'], [
      ['Rica', 'team, [[last working day]] na natin sa Friday 🙌'], ['Jomar', '[[naka-OOO na ako]] sa calendar'], ['Rica', 'wait [[i-turnover mo muna]] yung report ha'], ['Jomar', '§react 🫡'],
      ['Jomar', '[[nasa shared drive na]]'], ['Ella', 'sino [[on-call sa holidays]]?'], ['Rica', '[[rotation tayo]], check nyo yung sheet'], ['Ella', '§photo 🗓️'],
      ['Ella', '[[ako pala sa 27]] 😭'], ['Jomar', '[[swap tayo]]? gusto ko 29'], ['Ella', 'deal! [[salamat bes]]'], ['Rica', 'wag kalimutan [[mag-set ng auto-reply]]'],
      ['Jomar', '§deleted'], ['Jomar', '[[i-log out ang laptop]] bago umalis'], ['Ella', '[[happy holidays team]] 🎄'], ['Rica', 'ingat kayong lahat 💛']]), start: '16:30' },
    5: listen('Anunsyo ng paaralan: Christmas program', 'magsasayaw ng Christmas medley', ['recognition day', 'field trip', 'report card', 'PTA meeting'], [
      '[[Magandang umaga, mga magulang]] at mga mag-aaral.', 'Ang ating [[Christmas program]] ay sa Biyernes, ala-una ng hapon.', 'Gaganapin ito sa [[school gym]].',
      'Ang bawat seksyon ay may [[presentation sa stage]].', 'Ang Grade 1 ay [[magsasayaw ng Christmas medley]].', 'Ang kulay ng costume ay [[pula, puti at berde]].',
      'Paki-dala po ng [[pagkain para sa salu-salo]].', 'Ang [[exchange gift sa classroom]] ay hanggang 150 pesos lamang.', 'Mga magulang, [[bawal tumayo sa harap]] ng stage para hindi matakpan ang iba.',
      'Pwede po kayong [[mag-video mula sa upuan]].', 'Ang [[Christmas break]] ay magsisimula sa Lunes.', 'Muli, [[salamat po sa suporta]] ninyong lahat!']),
    6: emoji('Pagsalubong sa Bagong Taon', 'Torotot', ['Lusis', 'Kwitis', 'Leche flan', 'Countdown'], [
      ['🍇🍊🍎', '12 bilog na prutas'], ['⚪🔴👗', 'Damit na polka dots'], ['🦘🕛', 'Tumalon sa hatinggabi'], ['🪙👖', 'Barya sa bulsa'], ['📯🎉', 'Torotot'], ['🍳🥄🔊', 'Kalampag ng kaldero'],
      ['🪟🚪🌙', 'Bukas ang pinto at bintana'], ['🍚🧺', 'Punong bigasan'], ['🍰🥥', 'Buko pandan'], ['🎆🌃', 'Fireworks display'], ['🗓️✍️', 'New Year’s resolution'], ['🍲🍗🎊', 'Media Noche']]),
  },
};
