// Český adventní kalendář: 24 okének, 1.–24. prosince (Štědrý den).
// [[...]] označuje frázi z bingo karty. Každé okénko s odhalováním má 12 frází + 4 návnady.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });
const wrap = (title, groups) => ({ type: 'wrap', title, groups: groups.map(([n, ...w]) => ({ n, w })) });

export default {
  code: 'cs', label: 'Čeština', locale: 'cs-CZ', voice: ['cs'],
  tagline: '24 okének od 1. prosince do Štědrého dne. Každý den jedna malá hra, sami nebo s týmem.',
  dates: Object.fromEntries(Array.from({ length: 24 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Rodinná skupina: Kdy se peče cukroví?', 'vosí hnízda', ['Kapr ve vaně', 'Mytí oken', 'Purpura', 'Zlaté prasátko'], [
      ['Máma', 'Ahoj všichni 🎄 [[kdy začneme péct?]] je prosinec!!'], ['Babička', 'Dobrý den. Tady babička.'], ['Táta', '[[vanilkový rohlíčky]] sou moje, to se ví 😎'],
      ['Klára', 'já dělám [[vosí hnízda]] 🐝'], ['Ondra', '👍'], ['Babička', '[[Linecké podle mého receptu]], jinak nic. Babička'], ['Ondra', '[[kolik druhů letos?]]'],
      ['Máma', '[[aspoň dvanáct]] 😅'], ['Táta', '[[to je šílenství]]'], ['Máma', '§react 🙄'], ['Táta', '§deleted'], ['Klára', 'kdo má [[vykrajovátka]]?'],
      ['Babička', 'Jsou [[v krabici na půdě]] vedle ozdob. Babička'], ['Babička', '§voice 0:42'], ['Ondra', 'můžu [[ochutnávat]]? 😇'], ['Máma', 'ne!! [[až na Štědrý den]] 😂'],
      ['Táta', 'tak [[v sobotu pečeme]] a hotovo']]), start: '09:02' },
    2: listen('Hlasovka od mámy: Posíláme PFka', 'známky zase zdražily', ['Doporučeně', 'Zpáteční adresa', 'Třpytky všude', 'Šťastný nový rok'], [
      'Ahoj zlato, to jsem já, [[píšu PFka]].', 'Koupila jsem [[balíček dvaceti přáníček]] a už teď vím, že to nebude stačit.', 'Je to [[číslo popisný nebo orientační]]? Já se v tom nevyznám.',
      'A [[známky zase zdražily]], to je hrůza.', 'Tetě Věře tam [[připíšu pár řádků]], ta to má ráda.', 'Táta chce [[poslat jedno i pošťačce]], to je od něj hezký.',
      'Letos tam dám [[fotku z dovolené]], tu s tou lodí.', 'Loni [[se nám jedno vrátilo]], napsala jsem špatný PSČ.', 'Prý je musíme [[poslat do půlky prosince]].',
      'A [[PF 2027]] píšu zlatou fixou, jako vždycky.', 'Zítra je [[hodím do schránky]] cestou z práce.', 'Tak [[zatím pa]], mám tě ráda, pa pa pa.']),
    3: emoji('České Vánoce', 'Kapr ve vaně', ['Purpura', 'Jmelí', 'Betlém', 'Svařák'], [
      ['🐟🛁', 'Kapr ve vaně'], ['🐷✨', 'Zlaté prasátko'], ['🍎🔪⭐', 'Rozkrojené jablko'], ['🌰⛵🕯️', 'Lodičky ze skořápek'], ['🔥🥄💧', 'Lití olova'], ['🥔🥗', 'Bramborový salát'],
      ['🍞🎀', 'Vánočka'], ['⛪🌙', 'Půlnoční mše'], ['🔔👶', 'Ježíšek'], ['🐟🍲', 'Rybí polévka'], ['🌙🍪', 'Vanilkové rohlíčky'], ['🐟💰🍽️', 'Šupina pod talířem']]),
    4: listen('Proslov šéfa na začátku adventu', 'nezapomeňte na docházku', ['Quick win', 'Za mě dobrý', 'Kapacity', 'Roadmapa'], [
      'Milé kolegyně, milí kolegové, [[byl to náročný rok]].', 'Přesto jsme [[překonali všechna očekávání]].', 'Naše [[synergie]] fungují skvěle.',
      'Chci [[poděkovat každému z vás]].', 'Hlavně týmu, který [[vyřešil tu migraci]].', 'Příští rok nás čeká [[spousta výzev]].',
      'Budeme dělat [[víc s menšími zdroji]].', 'Teď ale [[nejde o čísla]].', 'V kuchyňce na vás [[čeká cukroví]].',
      'A prosím, [[nezapomeňte na docházku]].', '[[Firemní večírek bude v pátek]].', '[[Krásné Vánoce]] a hodně zdraví.']),
    5: chat('Rodinný chat: Mikulášská nadílka', 'Uhlí nebo brambory?', ['Kapr ve vaně', 'Adventní věnec', 'Svařák', 'Zvoneček'], [
      ['Máma', '[[Mikuláš přijde v šest]] 😇'], ['Táta', '[[Kdo dělá čerta?]]'], ['Ondra', 'Já! [[Mám řetěz]] 😈'], ['Klára', '[[Nestraš malou]], prosím'],
      ['Babička', 'Má [[básničku připravenou]]?'], ['Máma', 'Jo, [[o sněhulákovi]] ☃️'], ['Táta', '[[Balíčky jsou v garáži]]'], ['Ondra', '[[Uhlí nebo brambory?]]'],
      ['Klára', '[[Hlavně mandarinky]] a čokoládu'], ['Babička', '[[Byla hodná celý rok]]'], ['Táta', 'Anděl má [[křídla z kartonu]]'], ['Máma', '[[Fotku pak pošlete]] 📸']]),
    6: emoji('Zdobíme byt', 'Slaměné ozdoby', ['Lameta', 'Andělíček', 'Zvoneček', 'Girlanda'], [
      ['⭐🎄🔝', 'Špička na stromeček'], ['🔮🎄', 'Skleněné baňky'], ['🌾⭐', 'Slaměné ozdoby'], ['🕯️🪟', 'Svíčka v okně'], ['🌿💋', 'Jmelí'], ['🔥🌿👃', 'Purpura'],
      ['👶🐑🐂⭐', 'Betlém'], ['💡🔗', 'Světelný řetěz'], ['🍪🧵🎄', 'Perníčky na stromeček'], ['❄️✂️📄', 'Papírové vločky'], ['🌲🪵', 'Stojan na stromek'], ['🔴⭐🪟', 'Hvězda do okna']]),
    7: emoji('Pohádky a filmy', 'Byl jednou jeden král', ['Popelka', 'Anděl Páně', 'Císařův pekař', 'Lotrando a Zubejda'], [
      ['🌰🌰🌰👸', 'Tři oříšky pro Popelku'], ['😈🚫😂', 'S čerty nejsou žerty'], ['❄️👴🪄', 'Mrazík'], ['🛋️🐱🎄', 'Pelíšky'], ['👑🧂', 'Byl jednou jeden král'], ['💧⚙️👸', 'Princezna ze mlejna'],
      ['🦷🐋', 'Jak vytrhnout velrybě stoličku'], ['🎄🏠😱', 'Sám doma'], ['👸⭐', 'Princezna se zlatou hvězdou'], ['👸😤', 'Pyšná princezna'], ['😈🎲', 'Hrátky s čertem'], ['👸😢🎸', 'Šíleně smutná princezna']]),
    8: listen('Babiččina hlasová zpráva o vánočce', 'při pletení poskakovat', ['Kapr', 'Cukroví', 'Purpura', 'Lití olova'], [
      'Ahoj, tady babička, [[nahrává se to?]]', 'Volám kvůli [[vánočce]].', 'Děda říká, že [[loni byla suchá]].', 'To [[není pravda]]!',
      'Potřebuju [[kilo hladké mouky]].', 'A [[čerstvé droždí]], ne sušené.', 'A nezapomeň [[při pletení poskakovat]], aby nespadla.', 'Strejda ji chce [[s rozinkami]].',
      'Teta zase [[bez rozinek]].', 'Tak [[upeču dvě]].', 'Jo a [[kočka shodila stromeček]].', 'Tak zatím, [[zavolej mi]]. Pa pa pa.']),
    9: chat('Kancelář: Sbírka na dárek pro šéfa', 'Stojí za tebou', ['Firemní večírek', 'Teambuilding', 'Stravenky', 'Home office'], [
      ['Petra', '[[Vybíráme na dárek pro šéfa]] 🎁'], ['Jirka', '[[Kolik dáváte?]]'], ['Petra', '[[Dvě stovky]] stačí'], ['Lucie', '[[Co on vůbec má rád?]]'],
      ['Jirka', '[[Hokej?]] Pořád mluví o hokeji'], ['Petra', 'Loni dostal [[lístky na hokej]]'], ['Lucie', 'Tak [[dobrou kávu]]?'], ['Jirka', '[[Pije jen čaj]]'],
      ['Petra', '[[Přání je u mě na stole]]'], ['Lucie', '[[Hlavně ať to nevidí]]!'], ['Jirka', '[[Stojí za tebou]] 😬'], ['Petra', '😳 [[Nic se neděje]]']]),
    10: listen('Sbormistr na zkoušce', 'alty se ztratily', ['Přídavek', 'Ladička', 'Vstupenky', 'Potlesk vestoje'], [
      'Tak, [[ještě jednou od začátku]], prosím.', 'Soprány, [[krásný, ale tišeji]] ve druhé sloce.', 'Mám pocit, že [[alty se ztratily]] někde ve dvanáctém taktu.',
      'Basy, [[koukejte na mě, ne do not]].', 'Komu [[zvoní telefon]]? Aha, mně, pardon.', 'Koncert je [[v neděli v kostele]], sraz v půl páté.',
      'Oblečení: [[černá a něco třpytivýho]].', 'A prosím, [[dejchejte u čárek]], ne uprostřed slova.', 'Paní Jana upekla [[plech perníku]] na přestávku.',
      'Ještě [[naposledy celou koledu]] a pak čaj.', 'Do příště se prosím [[naučte druhý hlas]].', 'Moc hezký, všichni, [[stejně za týden]].']),
    11: emoji('Advent a zima', 'Barborka', ['Lucie', 'Zlatá neděle', 'Punč', 'Koledy'], [
      ['🕯️🕯️🕯️🕯️', 'Adventní věnec'], ['🎅😈👼', 'Mikuláš, čert a anděl'], ['🍒🌿💧', 'Barborka'], ['🍷🔥', 'Svařák'], ['🛷⛄', 'Sáňkování'], ['⛸️🏙️', 'Bruslení na náměstí'],
      ['🎄💡🏙️', 'Rozsvícení stromu'], ['🍯🍺', 'Medovina'], ['📅🍫', 'Adventní kalendář'], ['🍪🎨', 'Zdobení perníčků'], ['✉️👶', 'Dopis Ježíškovi'], ['❄️⛄🥕', 'Sněhulák']]),
    12: listen('Hlášení na vánočních trzích', 'ztracená rukavice', ['Medovina', 'Parkoviště je plné', 'Sněhové dělo', 'Punč'], [
      'Vítejte na [[vánočních trzích]]!', '[[Svařák]] najdete u kašny.', 'Pozor, [[u kolotoče to klouže]].', 'U Mikuláše je [[fronta na půl hodiny]].',
      'Malý chlapec hledá maminku [[v červené čepici]].', '[[Kluziště]] se otevře v šest.', 'Na informacích čeká [[ztracená rukavice]].', '[[Pěvecký sbor]] začíná v sedm.',
      '[[Trdelník]] je teď za poloviční cenu.', 'Prosíme, mějte [[psy na vodítku]].', 'Platba kartou [[už zase funguje]].', '[[Krásné nakupování]]!']),
    13: chat('Přátelé: Losování Secret Santa', 'Přineste chlebíčky', ['Svařák', 'Ošklivý svetr', 'Karaoke', 'Ztracená účtenka'], [
      ['Bára', '[[Losování je hotové]] 🎁'], ['Martin', '[[Můžu měnit?]] Vylosoval jsem sebe'], ['Bára', '[[Nic se nemění!]] Za pět minut znova'], ['Eva', '[[Jaký je limit?]]'],
      ['Bára', '[[Pět stovek]] a [[žádné poukazy]]'], ['Tomáš', '[[Svíčka je málo?]]'], ['Eva', 'Ano. [[Všichni dostanou svíčku]]'], ['Martin', '[[Pošlete přání]] 🙏'],
      ['Tomáš', 'Já [[cokoliv kromě ponožek]]'], ['Bára', '[[Předávání dvacátého]] u mě'], ['Eva', '[[Přineste chlebíčky]]!']]),
    14: emoji('Hry u stolu', 'Člověče, nezlob se', ['Twister', 'Bingo', 'Mariáš', 'Schovávaná'], [
      ['🙅😠🎲', 'Člověče, nezlob se'], ['🌧️🃏', 'Prší'], ['🖼️🖼️🔄', 'Pexeso'], ['♟️👑', 'Šachy'], ['⚫⚪↗️', 'Dáma'], ['⬜⚫🔗', 'Domino'],
      ['🧩🖼️', 'Puzzle'], ['🎲🎲🎲', 'Kostky'], ['🤡🃏', 'Žolíky'], ['🎭✏️🗣️', 'Aktivity'], ['🎩🏠💰', 'Monopoly'], ['🏝️🐑🧱', 'Osadníci z Katanu']]),
    15: emoji('Koledy a vánoční písně', 'Malý bubeník', ['Purpura', 'Ježíšek', 'Koledníci', 'Zvoneček'], [
      ['🗞️📦', 'Nesem vám noviny'], ['🚶‍♂️🚶‍♀️⭐', 'Půjdem spolu do Betléma'], ['🐑🐑🏔️', 'Pásli ovce Valaši'], ['👶✨🙏', 'Narodil se Kristus Pán'], ['🔔🔔', 'Rolničky, rolničky'], ['🤫🌃', 'Tichá noc'],
      ['🥁👦', 'Malý bubeník'], ['⚪🎄', 'Bílé Vánoce'], ['🎼⛪', 'Česká mše vánoční'], ['👨‍🦳⏰⬆️', 'Hej mistře, vstaň bystře'], ['👶😍', 'Jak jsi krásné, neviňátko'], ['🌙🎁', 'Štědrej večer nastal']]),
    16: listen('Hlasatelka: Program na Štědrý den', 'Večerníček', ['Zprávy', 'Počasí', 'Sportovní přenos', 'S čerty nejsou žerty'], [
      'Dobrý den, [[přejeme krásné svátky]].', 'Ráno vysíláme [[Tři oříšky pro Popelku]].', 'Potom uvidíte [[novou pohádku]].', 'V poledne [[Mrazík]], jako každý rok.',
      'Odpoledne [[Sám doma]].', 'Večer [[vánoční koncert]].', 'Po něm [[Pelíšky]].', 'Pro nejmenší [[Večerníček]].', 'Ve 22 hodin [[Česká mše vánoční]].',
      'O půlnoci [[přenos půlnoční mše]].', 'Mezi pořady [[reklamy na parfémy]].', '[[Hezkou podívanou]] přeje vaše televize.']),
    17: chat('Rodina: Kdo koupí kapra?', 'chci řízek', ['Bramborový salát', 'Rybí polévka', 'Vánočka', 'Cukroví'], [
      ['Máma', '[[Kdo koupí kapra?]]'], ['Táta', 'Já ne, [[minule plaval ve vaně]] tři dny'], ['Ondra', '[[Pustíme ho do řeky]]!'], ['Babička', '[[Kapr musí být]]'],
      ['Klára', 'Já [[chci řízek]]'], ['Máma', '[[Bude obojí]]'], ['Táta', '[[Kde je velká mísa?]]'], ['Babička', '[[Šupinu do peněženky]]!'],
      ['Ondra', '[[Kdo ho bude čistit?]]'], ['Klára', '[[Já ne]] 🙅‍♀️'], ['Táta', '[[Koupím filety]]'], ['Máma', '[[Trhy jsou ve středu]]']]),
    18: chat('Firemní večírek: chat v Teams', 'jsi zpíval tři písničky', ['Proslov šéfa', 'Svařák', 'Chlebíčky', 'Secret Santa'], [
      ['Hana', '[[Taxi v šest]], kdo jede?'], ['Pepa', '[[Jaký je dress code?]]'], ['Hana', '[[Slavnostně, ale pohodlně]]'], ['Lukáš', 'Bude [[vegetariánské menu]]?'],
      ['Pepa', '[[Karaoke potvrzeno]] 🎤'], ['Lukáš', '[[Já zpívat nebudu]]'], ['Hana', 'Loni [[jsi zpíval tři písničky]]'], ['Pepa', '[[Fotokoutek]] s rekvizitami!'],
      ['Lukáš', '[[Co se stane na večírku]]…'], ['Hana', '…[[zůstane v Teams]]'], ['Pepa', '[[Tombola]] je v devět!'], ['Hana', '[[Poslední tramvaj]] jede ve 12']]),
    19: listen('Hlášení v supermarketu', 'malý Matýsek', ['Věrnostní karta', 'Zboží zdarma', 'Nákup online', 'Taška zdarma'], [
      'Vážení zákazníci, je tu [[poslední sobota před Vánoci]].', '[[Čerstvé rohlíky]] právě vyšly z pece.', 'Prosíme [[kolegu na pokladnu devět]].',
      '[[Samoobslužné pokladny]] jsou otevřené u vchodu.', 'U informací čeká [[malý Matýsek]], hledá maminku.', 'V uličce sedm je [[rozlitá smetana]], dávejte prosím pozor.',
      'Prosíme, [[vracejte vozíky]] na místo.', 'Živí [[kapři jsou před vchodem]], prodej do šesti.', 'Platí [[nejvýš dvě kostky másla]] na zákazníka, děkujeme za pochopení.',
      '[[Akce na mandarinky]] platí jen dnes.', 'Před obchodem [[hraje dechovka]] až do poledne.', 'Děkujeme za nákup a [[přejeme klidné svátky]].']),
    20: emoji('Dárky a nakupování', 'Balík nedorazil', ['Poukaz', 'Kosmetická sada', 'Puzzle', 'Hrnek'], [
      ['🧦🧦', 'Ponožky'], ['📚🎁', 'Kniha'], ['🌸💧', 'Parfém'], ['🎮🕹️', 'Herní konzole'], ['🧶🦌', 'Svetr se sobem'], ['🛒⏰😰', 'Nákupy na poslední chvíli'],
      ['📦🚚❌', 'Balík nedorazil'], ['💳😬', 'Výpis z karty'], ['🎁↩️', 'Vrácení dárku'], ['✂️🎀', 'Balení dárků'], ['🧾📝', 'Seznam dárků'], ['🍫🎁', 'Bonboniéra']]),
    21: listen('Hlasová zpráva od strejdy', 'dáme na lustr', ['Umělý stromeček', 'Svíčky', 'Světýlka', 'Stojan'], [
      'Čau, tady strejda, [[mám stromeček]]!', 'Je to [[jedlička jak z pohádky]].', 'Akorát je [[trochu vyšší]].', 'Možná [[o metr]].',
      '[[Nevejde se do auta]].', 'Tak jsem ho [[dal na střechu]].', 'Teď [[stojím na benzínce]].', 'A [[jehličí je všude]].',
      'Doma [[uřízneme špičku]].', 'A hvězdu [[dáme na lustr]].', '[[Kup cestou izolepu]].', '[[Ahoj, ahoj, ahoj]].']),
    22: chat('Rodina: Úklid a poslední přípravy', 'V koupelně je kapr', ['Purpura', 'Svařák', 'Sněhulák', 'Rybí polévka'], [
      ['Máma', '[[Generální úklid]] v sobotu!'], ['Ondra', '[[Musíme mýt okna?]]'], ['Máma', '[[Okna se myjí vždycky]]'], ['Táta', 'Venku [[je pět stupňů]] 🥶'],
      ['Klára', '[[Já vysaju]]'], ['Babička', '[[Záclony vyprat]]'], ['Ondra', '[[Kde je vysavač?]]'], ['Táta', '[[V koupelně je kapr]], nemůžu se osprchovat'],
      ['Máma', '[[Napeč ještě perníčky]]'], ['Klára', '[[Kdo zdobí stromeček?]]'], ['Táta', '[[Zdobí se 23.]]'], ['Babička', '[[Ozdoby jsou na půdě]]']]),
    23: emoji('Co stihnout 23. prosince', 'Zatrhnout pohádky v programu', ['Umýt okna', 'Napsat Ježíškovi', 'Koupit kapra', 'Ozdobit dveře'], [
      ['🥔🫕🥗', 'Uvařit brambory na salát'], ['🎁🙈', 'Schovat dárky'], ['🛏️👨‍👩‍👧', 'Ustlat pro návštěvu'], ['🍽️⭐🧺', 'Nachystat sváteční ubrus'], ['🔋🛒', 'Koupit baterky'], ['🧊➡️📦', 'Uvolnit místo v lednici'],
      ['🚗👵', 'Vyzvednout babičku'], ['📷🔌', 'Nabít foťák'], ['🪑🔢', 'Spočítat židle'], ['📺📖🖊️', 'Zatrhnout pohádky v programu'], ['🐕🌳', 'Vyvenčit psa'], ['🗑️🚶', 'Vynést odpadky']]),
    24: { type: 'predict', title: 'Štědrý den', alt: chat('Štědrý den: rodinný chat', 'Viděla jsem zlaté prasátko', ['Kapr ve vaně', 'Půlnoční mše', 'Cukroví', 'Ponožky'], [
      ['Máma', '[[Krásný Štědrý den]] všem! 🎄'], ['Klára', '[[Viděla jsem zlaté prasátko]]'], ['Táta', 'Já [[snědl rohlík]], takže smůla'], ['Ondra', '[[V kolik je večeře?]]'],
      ['Babička', '[[Až vyjde první hvězda]]'], ['Máma', '[[Polévka je hotová]]'], ['Táta', '[[Salát se uležel]]'], ['Klára', '[[Kdy přijde Ježíšek?]]'],
      ['Ondra', '[[Zazvonil zvoneček!]]'], ['Babička', '[[Pouštíme lodičky]]'], ['Táta', '[[Pohádka začíná]] 📺'], ['Máma', '[[Šťastné a veselé]] ❤️']]) },
  },
};
