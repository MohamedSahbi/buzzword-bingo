// English (UK flavour) Advent calendar: 25 doors, 1–25 December.
// [[...]] marks a phrase that appears on the bingo card. Each reveal door has 12 marked phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });
const wrap = (title, groups) => ({ type: 'wrap', title, groups: groups.map(([n, ...w]) => ({ n, w })) });

export default {
  code: 'en', label: 'English (UK)', locale: 'en-GB', voice: ['en-GB', 'en'],
  tagline: '25 doors from 1 December to Christmas Day. One small game a day, solo or with your team.',
  dates: Object.fromEntries(Array.from({ length: 25 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Family group: who’s hosting this year?', 'Secret Santa', ['Turkey or beef?', 'The dog ate it', 'Board game row', 'Train cancelled'], [
      ['Mum', 'Morning all! [[Who’s hosting this year?]] Love Mum x'], ['Dad', 'Not us. [[The oven is broken]]. Dad'], ['Sophie', 'ours works but [[the flat is tiny]] 😅'],
      ['Gran', 'I STILL HAVE [[THE GOOD TABLECLOTH]]'], ['Tom', 'can we do [[Secret Santa]] this year'], ['Sophie', '§react 👍'], ['Mum', 'Yes! [[£20 limit]], no exceptions x'],
      ['Dad', 'Last year [[someone went over budget]]. Dad'], ['Sophie', 'it was a [[tiny spa voucher]] 🙄'], ['Gran', '[[HOW DO I MUTE THIS GROUP]]'], ['Gran', '👍👍👍👍'],
      ['Tom', 'gran you just [[sent a thumbs up]] to everyone 😂'], ['Mum', '[[Let’s do a poll]] for the date x'], ['Mum', '§photo 📊'], ['Dad', 'Or [[same as last year]]. Done. Dad']]), start: '19:40' },
    2: wrap('Under the tree', [['Christmas films', 'Home Alone', 'Elf', 'The Grinch', 'Love Actually'], ['Santa’s reindeer', 'Dasher', 'Comet', 'Cupid', 'Blitzen'], ['Found in a stocking', 'Satsuma', 'Chocolate coins', 'Socks', 'Lip balm'], ['On the Christmas plate', 'Turkey', 'Sprouts', 'Stuffing', 'Gravy']]),
    3: emoji('Christmas classics', 'Boxing Day', ['Gingerbread house', 'Secret Santa', 'Ice skating', 'Christmas jumper'], [
      ['⛄🏃‍♂️☁️', 'The Snowman'], ['🦌🔴👃', 'Rudolph'], ['🥧🍖', 'Mince pies'], ['🍷🔥', 'Mulled wine'], ['🌿💋', 'Mistletoe'], ['🧦🔥', 'Stockings by the fire'],
      ['🎄💡😵', 'Tangled fairy lights'], ['👑📺', 'The King’s speech'], ['🥊📦', 'Boxing Day'], ['🍫🪙', 'Chocolate coins'], ['🦃🍽️', 'Roast turkey'], ['🎤🚪🌙', 'Carol singers']]),
    4: listen('The CEO’s Christmas message', 'took the last mince pie', ['Bonus news', 'Quick win', 'Hard stop', 'Back-to-back'], [
      'Good morning team, and [[what a year it’s been]].', 'Together we’ve [[moved the needle]] in every region.', 'Our [[synergies]] have never been stronger.',
      'We [[leaned in]] when it mattered most.', 'Next year is all about [[doing more with less]].', 'But today, [[it’s not about the numbers]].',
      'I want to [[thank every single one of you]].', 'Yes, even whoever [[took the last mince pie]].', 'Please [[enjoy the festive lunch]] in the canteen.',
      'And remember, [[wellbeing is a priority]].', '[[The office closes on the 23rd]].', '[[Merry Christmas]], and see you in January.']),
    5: chat('Office chat: Christmas jumper day', 'It also plays music', ['Elf hat', 'Out of office', 'Leaving drinks', 'Fire drill'], [
      ['Priya', 'Reminder: [[Christmas jumper day]] is Friday!'], ['Ben', 'Does a [[red hoodie]] count?'], ['Priya', 'No. It needs [[at least one reindeer]]'],
      ['Marcus', 'Mine has [[flashing lights]] 🎄'], ['Ben', '[[Battery or plug-in?]]'], ['Marcus', 'Battery. [[It also plays music]]'],
      ['Jo', 'Please, [[not in the 9am call]]'], ['Priya', '[[£2 donation]] goes to charity'], ['Ben', '[[Can I pay by card?]]'],
      ['Jo', 'It’s [[a bucket on reception]], Ben'], ['Marcus', '[[Group photo at 12]]?'], ['Priya', 'Yes! [[Wear it with pride]]']]),
    6: wrap('Under the tree', [['Christmas songs', 'Last Christmas', 'Fairytale of New York', 'Jingle Bells', 'Silent Night'], ['Things that pop', 'Crackers', 'Champagne', 'Balloons', 'Popcorn'], ['Classic pantos', 'Cinderella', 'Aladdin', 'Peter Pan', 'Dick Whittington'], ['Christmas bakes', 'Christmas pudding', 'Yule log', 'Mince pie', 'Stollen']]),
    7: emoji('Christmas films', 'Die Hard', ['Miracle on 34th Street', 'It’s a Wonderful Life', 'Jingle All the Way', 'Paddington 2'], [
      ['🏠👦😱', 'Home Alone'], ['💚😠🎄', 'The Grinch'], ['❤️🤷', 'Love Actually'], ['🧝🏙️', 'Elf'], ['🚂🎅❄️', 'The Polar Express'], ['👻⛓️💰', 'A Christmas Carol'],
      ['🏢💥🎄', 'Die Hard'], ['🐸📖👻', 'The Muppet Christmas Carol'], ['❄️👸⛄', 'Frozen'], ['🏠🔁✈️', 'The Holiday'], ['⛄🎩✨', 'Frosty the Snowman'], ['🍬🤴🩰', 'The Nutcracker']]),
    8: listen('Gran’s voice message about the trifle', 'the cat knocked over the tree', ['Gravy granules', 'Cracker jokes', 'Boxing Day walk', 'Wrapping paper'], [
      'Hello love, it’s Gran, [[is this thing recording?]]', 'I’m calling about [[the trifle]].', 'Your grandad says there was [[too much sherry]] last year.',
      'I say there’s [[no such thing]].', 'Can you bring [[the big glass bowl]]?', 'And [[don’t forget the custard]].', 'Not the [[packet stuff]], the proper one.',
      'Your cousin is [[vegan now]], apparently.', 'So I’ll make [[a second trifle]].', 'Oh, and [[the cat knocked over the tree]] again.',
      'Anyway, [[ring me back]] when you can.', '[[Lots of love]], bye, bye, bye, bye.']),
    9: chat('Friends: the Secret Santa draw', 'Is a candle lazy?', ['Mulled wine', 'Ugly jumper', 'Karaoke', 'Lost the receipt'], [
      ['Leah', '[[The draw is done]]! Check your messages 🎁'], ['Sam', '[[Can I swap?]] I got myself'], ['Leah', '[[No swaps!]] Redraw in 5 minutes'],
      ['Nina', '[[What’s the budget again?]]'], ['Leah', '[[£15]], and [[no gift cards]]'], ['Omar', '[[Is a candle lazy?]]'], ['Nina', 'Yes. [[Everyone gets a candle]]'],
      ['Sam', '[[Wish lists please]] 🙏'], ['Omar', 'Mine is [[anything but socks]]'], ['Leah', '[[Swap on the 20th]] at mine'], ['Nina', '[[Bring snacks]] too!']]),
    10: wrap('Under the tree', [['Tree toppers', 'Star', 'Angel', 'Fairy', 'Santa hat'], ['Twelve Days of Christmas', 'Partridge', 'Gold rings', 'Swans', 'Drummers'], ['Christmas Day traditions', 'King’s speech', 'Cracker jokes', 'Paper crowns', 'Afternoon nap'], ['Snow…', 'Snowman', 'Snowball', 'Snowdrift', 'Snow globe']]),
    11: emoji('Food and drink', 'Pigs in blankets', ['Trifle', 'Stollen', 'Hot chocolate', 'Cranberry sauce'], [
      ['🥧', 'Mince pie'], ['🪵🍫', 'Yule log'], ['🌱🟢', 'Brussels sprouts'], ['🐷🛏️', 'Pigs in blankets'], ['🥚🍶', 'Eggnog'], ['🍮🔥', 'Christmas pudding'],
      ['🧀🍷', 'Cheese board'], ['🍊🍫', 'Chocolate orange'], ['🌰🔥', 'Roast chestnuts'], ['🍪🧍', 'Gingerbread man'], ['🦃🥪', 'Leftover sandwiches'], ['🥕🦌', 'Carrot for Rudolph']]),
    12: listen('Christmas market announcements', 'reindeer onesie', ['Snow machine', 'Last orders', 'Car park full', 'Lost glove'], [
      'Welcome to the [[Christmas market]]!', 'The [[mulled wine stall]] is open by the fountain.', 'Please [[mind the ice]] near the carousel.',
      'Santa’s grotto has [[a forty-minute queue]].', 'A small boy is looking for [[his mum in a red hat]].', 'The [[ice rink]] reopens at six.',
      'A [[reindeer onesie]] has been handed in.', 'The [[choir starts at seven]].', '[[Toasted marshmallows]] are now half price.',
      'Please [[keep dogs on leads]] near the stalls.', 'Card payments are [[back working]].', '[[Happy shopping]], everyone!']),
    13: chat('Office: collecting for the boss’s present', 'He’s right behind you', ['Bottle of wine', 'Desk plant', 'Leaving card', 'Team lunch'], [
      ['Kate', '[[Collecting for Dave’s present]] 🎁'], ['Raj', '[[How much are we putting in?]]'], ['Kate', '[[A fiver]] is fine'],
      ['Lucy', '[[What does Dave even like?]]'], ['Raj', '[[Golf?]] He always talks about golf'], ['Kate', 'We got him [[golf balls last year]]'],
      ['Lucy', '[[Fancy coffee]] then?'], ['Raj', 'He [[only drinks tea]]'], ['Kate', '[[The card is on my desk]], sign it'],
      ['Lucy', '[[Don’t let him see it]]!'], ['Raj', '[[He’s right behind you]]'], ['Kate', '😳 [[Nothing to see here]]']]),
    14: wrap('Under the tree', [['Advent…', 'Calendar', 'Wreath', 'Candle', 'Sunday'], ['Panto shouts', 'Behind you!', 'Oh no it isn’t!', 'Boo!', 'Hiss!'], ['On a Christmas jumper', 'Reindeer', 'Snowflakes', 'Penguin', 'Pudding'], ['Things you hang up', 'Stocking', 'Bauble', 'Mistletoe', 'Tinsel']]),
    15: emoji('Christmas songs', 'Fairytale of New York', ['O Holy Night', 'Deck the Halls', 'Mistletoe and Wine', 'Step into Christmas'], [
      ['🔔🔔', 'Jingle Bells'], ['🤫🌃', 'Silent Night'], ['🗓️🎄💔', 'Last Christmas'], ['❄️❄️❄️', 'Let It Snow'], ['🧚🗽', 'Fairytale of New York'], ['🎁🙋', 'All I Want for Christmas'],
      ['⚪🎄', 'White Christmas'], ['❓🌍🎄', 'Do They Know It’s Christmas?'], ['🚗🏠🎄', 'Driving Home for Christmas'], ['🎉🎄🇪🇸', 'Feliz Navidad'], ['🤩⏰🎄', 'Wonderful Christmastime'], ['🎉👨‍👩‍👧‍👦', 'Merry Xmas Everybody']]),
    16: listen('The school nativity, live from Dad', 'third sheep from the left', ['Star on a stick', 'Raffle prizes', 'Mince pies after', 'Car park chaos'], [
      'So we’re at the [[school nativity]].', 'Our Lily is [[third sheep from the left]].', 'Joseph has [[forgotten his line]] already.',
      'Mary is [[waving at her nan]].', 'The [[donkey costume]] is two kids arguing.', 'There’s [[a tea towel on every head]].', 'One of the kings [[dropped the gold]].',
      'Every parent is [[filming on their phone]].', 'The [[piano is slightly out of tune]].', 'A shepherd just [[waved at me]].',
      'The head teacher says [[a few words]].', 'And now everyone sings [[Away in a Manger]].']),
    17: chat('Family: the Christmas tree trip', 'cut off the top', ['Tinsel tangle', 'Fairy lights', 'Garden centre', 'Broken bauble'], [
      ['Dad', '[[Tree shopping]] on Saturday, who’s in?'], ['Ella', '[[Real or fake?]]'], ['Mum', 'Real. [[It smells like Christmas]]'], ['Dad', '[[Needles everywhere]] though'],
      ['Ella', '[[Will it fit in the car?]]'], ['Mum', 'We’ll [[put it on the roof]]'], ['Dad', 'Remember [[the one that was too tall]]'], ['Ella', 'We had to [[cut off the top]] 😂'],
      ['Mum', '[[Measure the ceiling]] first this time'], ['Dad', '[[Where’s the tape measure?]]'], ['Ella', '[[In the drawer of doom]]'], ['Mum', '[[Hot chocolate after]] ☕']]),
    18: chat('Office party: the Teams thread', 'You sang three songs', ['Secret Santa', 'Speech by the boss', 'Last train', 'Free bar'], [
      ['Hana', '[[Taxi at 6]], who needs a lift?'], ['Joe', '[[What’s the dress code?]]'], ['Hana', '[[Festive smart]], whatever that means'], ['Mike', 'Is there [[a vegetarian option]]?'],
      ['Joe', '[[Karaoke confirmed]] 🎤'], ['Mike', '[[I’m not singing]]'], ['Hana', '[[You sang three songs]] last year'], ['Joe', '[[Photo booth]] with props!'],
      ['Mike', '[[What happens at the party]]…'], ['Hana', '…[[stays in the Teams chat]]'], ['Joe', '[[Raffle at nine]]!'], ['Hana', '[[Chips on the way home]]?']]),
    19: wrap('Under the tree', [['Boxing Day', 'Sales', 'Long walk', 'Leftovers', 'Football'], ['Inside a cracker', 'Paper crown', 'Bad joke', 'Tiny toy', 'Snap'], ['Winter weather', 'Frost', 'Sleet', 'Fog', 'Blizzard'], ['Christmas trees', 'Nordmann', 'Spruce', 'Pine', 'Fir']]),
    20: emoji('Christmas traditions', 'Snacks for Santa', ['Ice skating', 'Panto', 'Midnight mass', 'Secret Santa'], [
      ['📬🎅', 'Letter to Santa'], ['🍪🥛🥕', 'Snacks for Santa'], ['🛒⏰😰', 'Last-minute shopping'], ['🎉🧨', 'Pulling crackers'], ['📄👑', 'Paper crowns'], ['📅🍫', 'Advent calendar'],
      ['💌🎄', 'Christmas cards'], ['⛪🎶', 'Carol service'], ['🧶🦌', 'Christmas jumper'], ['🎁✂️', 'Wrapping presents'], ['🥾🍂❄️', 'Boxing Day walk'], ['🎲♟️', 'Board games']]),
    21: listen('The Christmas Eve weather forecast', 'a sleigh over Lapland', ['Heavy rain', 'Strong winds', 'Fog patches', 'Heatwave'], [
      'Good evening, here’s [[your Christmas Eve forecast]].', 'There’s [[a chance of snow]] in the north.', 'In the south, it’s [[mostly drizzle]].',
      'Expect [[icy roads]] after midnight.', 'So [[allow extra time]] if you’re travelling.', 'Airports report [[some delays]].',
      'Bookmakers say [[a white Christmas]] is unlikely.', 'Tomorrow starts [[crisp and bright]].', 'Perfect for [[a Boxing Day walk]] too.',
      'And our radar shows [[a sleigh over Lapland]].', 'It’s heading [[west at great speed]].', 'From all of us, [[sleep well]].']),
    22: chat('Family: the big food shop', 'Never enough potatoes', ['Bread sauce', 'Mince pies', 'Self-checkout', 'Bag for life'], [
      ['Mum', '[[Big shop tomorrow]], add to the list'], ['Jack', '[[Pigs in blankets]] ×3'], ['Dad', '[[The good crackers]] this year'], ['Amy', '[[Oat milk]] for me please'],
      ['Mum', '[[How many potatoes?]]'], ['Dad', '[[Never enough potatoes]]'], ['Jack', '[[Is the turkey ordered?]]'], ['Mum', '[[Pick up on the 23rd]]'],
      ['Amy', '[[Don’t forget the cranberry]]'], ['Dad', '[[Shops shut for one day]], relax 😅'], ['Jack', '[[A tub of chocolates]] is essential'], ['Mum', '[[I’m going at 7am]] to beat the queues']]),
    23: wrap('Under the tree', [['Christmas Eve jobs', 'Wrap presents', 'Peel sprouts', 'Hang stockings', 'Leave a mince pie'], ['A Christmas Carol', 'Scrooge', 'Marley', 'Tiny Tim', 'Bob Cratchit'], ['Things that sparkle', 'Tinsel', 'Glitter', 'Sequins', 'Frost'], ['Sounds of Christmas', 'Sleigh bells', 'Church bells', 'Carols', 'Cracker bang']]),
    24: chat('Christmas Eve: the family group', 'Assembly instructions', ['Fairy lights', 'Snow!', 'Carol singers', 'Wrapping paper'], [
      ['Mum', '[[Merry Christmas Eve]] everyone!'], ['Dad', '[[Stockings are up]]'], ['Lily', '[[Can we open one present?]]'], ['Mum', '[[Just the pyjamas]]'],
      ['Dad', 'The [[Santa tracker says]] he’s over France'], ['Lily', '[[Did you leave the carrot?]]'], ['Mum', '[[And a mince pie]] for Santa'], ['Dad', '[[And a sherry]] for… Santa'],
      ['Gran', '[[Midnight mass]] at 11, who’s coming?'], ['Lily', '[[I can’t sleep]]'], ['Mum', '[[Bed now]] or Santa won’t come'], ['Dad', '[[Assembly instructions]] incoming 😩']]),
    25: { type: 'predict', title: 'Christmas Day', alt: chat('Christmas Day: the family group', 'Batteries not included', ['Snowball fight', 'Board game row', 'Leftover sandwich', 'Boxing Day sales'], [
      ['Lily', '[[He came!!!]] 🎅'], ['Mum', '[[It’s 5:43am]], Lily'], ['Dad', '[[Coffee first]]'], ['Tom', '[[What time is lunch?]]'], ['Mum', '[[Turkey’s in at 8]]'],
      ['Gran', '[[Thank you for the scarf]]'], ['Sophie', '[[Crackers at the table]], not before!'], ['Tom', '[[Who’s doing the washing up?]]'], ['Dad', '[[King’s speech at 3]]'],
      ['Lily', '[[Batteries not included]] 😭'], ['Mum', '[[Charades after dinner]]'], ['Gran', '[[Best Christmas ever]] ❤️']]) },
  },
};
