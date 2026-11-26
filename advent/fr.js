// French practice Advent calendar: 6 open doors to try the games any time.
// [[...]] marks a phrase that appears on the bingo card. Each door has 12 marked phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'fr', label: 'Français', locale: 'fr-FR', voice: ['fr'],
  tagline: 'Calendrier d’entraînement avec six cases déjà ouvertes. Testez les jeux quand vous voulez, en solo ou en équipe.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Club de foot des enfants : le goûter de Noël', 'qui apporte les gobelets ?', ['Match annulé', 'Terrain gelé', 'Maillot perdu', 'Carton rouge'], [
      ['Coach Karim', 'Bonsoir les parents ! [[Dernier entraînement samedi]] ⚽'], ['Coach Karim', 'et après, [[goûter de Noël au club-house]]'], ['Sandrine', 'Super ! [[Je fais un gâteau au yaourt]]'],
      ['Julien', '§react 👍'], ['Julien', 'moi [[des mandarines]] 🍊'], ['Nadia', '[[qui apporte les gobelets ?]]'], ['Coach Karim', 'Le club a [[des jus de pomme]] aussi'],
      ['Sandrine', '§photo 🧁'], ['Nadia', 'trop beau !! [[c’est fait maison ?]]'], ['Sandrine', 'oui avec [[ma fille de 8 ans]] 😊'], ['Julien', '§voice 0:31'],
      ['Julien', 'pardon, [[mon fils a enregistré]] 😅'], ['Coach Karim', 'Les enfants peuvent [[venir avec un bonnet de Noël]]'], ['Nadia', '§deleted'], ['Nadia', 'oups mauvaise conv'],
      ['Coach Karim', 'On finit par [[un match parents-enfants]] 😎'], ['Sandrine', '[[J’amène mes baskets]] alors !']]), start: '20:10' },
    2: emoji('Jeux de société en famille', 'Mille Bornes', ['Échecs', 'Dames', 'Belote', 'Dominos'], [
      ['🚗🛣️🏁', 'Mille Bornes'], ['🐴🐴🎲', 'Petits Chevaux'], ['🔴🟡4️⃣', 'Puissance 4'], ['🎩🏠💶', 'Monopoly'], ['🃏🔴🟢🔵', 'Uno'], ['🔤🔢🟫', 'Scrabble'],
      ['🔍🕵️🏚️', 'Cluedo'], ['👀⭕⭕', 'Dobble'], ['🚢💥🌊', 'Bataille navale'], ['🧱🧱🫳', 'Jenga'], ['❓🥧', 'Trivial Pursuit'], ['🪿🎲🌀', 'Jeu de l’oie']]),
    3: listen('Annonce à la patinoire', 'passage de la surfaceuse', ['Hockey sur glace', 'Lames aiguisées', 'Casiers pleins', 'Triple saut'], [
      'Bonjour à tous, [[la patinoire est ouverte]] !', 'Merci de [[tourner dans le même sens]], comme indiqué par les flèches.', 'Dans dix minutes, [[passage de la surfaceuse]] : merci de quitter la piste.',
      'La [[location de patins]] se fait à l’accueil.', 'Pour les petits, il y a [[des pingouins pour s’aider]] près de la barrière.', 'On a retrouvé [[une moufle rose]] près des vestiaires.',
      'À 18 heures, [[soirée disco sur glace]] !', 'Merci de [[ne pas faire la course]] sur la piste.', 'Au snack : [[chocolat chaud et crêpes]].',
      'Le [[cours pour débutants]] commence à 17 heures.', 'En cas de chute, [[l’équipe vous aide]] à l’entrée.', 'Bonne glisse et [[gardez vos distances]] !']),
    4: { ...chat('Les colocs : on met l’appart en mode Noël', 'le sapin tient dans un seau', ['Boule cassée', 'Neige artificielle', 'Couronne sur la porte', 'Plombs qui sautent'], [
      ['Inès', 'Ce soir [[on décore l’appart]] ?? 🎄'], ['Hugo', 'grave ! [[j’ai trouvé un petit sapin]]'], ['Lucas', 'il est où ? [[je vois rien]]'],
      ['Hugo', '§photo 🌲'], ['Lucas', '[[il fait 40 centimètres]] 😂'], ['Inès', '§react 😂'], ['Hugo', 'au moins [[le sapin tient dans un seau]]'],
      ['Inès', 'j’ai [[trois guirlandes lumineuses]]'], ['Lucas', '[[une seule marche]] 🙃'], ['Inès', '§voice 0:24'], ['Hugo', 'résumé : [[elle part en acheter une]]'],
      ['Lucas', 'prends aussi [[du scotch double face]]'], ['Hugo', '§deleted'], ['Hugo', 'rien rien 😇'], ['Inès', '[[c’est trop mignon]] en vrai'],
      ['Lucas', 'on fait [[une photo pour nos parents]] ?'], ['Hugo', '[[chocolat chaud offert]] par moi ☕']]), start: '21:30' },
    5: listen('Médiathèque : l’heure du conte de Noël', 'un ours qui ne dort pas', ['Silence svp', 'Photocopieuse', 'Livre audio', 'Lunettes oubliées'], [
      'Bonjour à tous, [[l’heure du conte commence]] dans cinq minutes.', 'Les enfants sont attendus [[dans l’espace jeunesse]], au premier étage.', 'Merci d’[[enlever vos chaussures]] avant de vous asseoir sur les coussins.',
      'Aujourd’hui, l’histoire d’[[un ours qui ne dort pas]] de tout l’hiver.', 'Ensuite, [[on fabrique des marque-pages]] étoilés.', 'Les parents peuvent [[flâner dans les rayons]] pendant ce temps.',
      'Les [[albums d’hiver]] sont exposés à l’entrée.', 'Rappel : [[retours à la borne]] uniquement.', 'Vous pouvez [[vous inscrire gratuitement]] à l’accueil.',
      'Pendant les fêtes, [[horaires réduits]], affichés sur la porte.', 'Pensez à [[la date de retour]] de vos livres.', 'Et maintenant, [[bonne écoute à tous]] !']),
    6: emoji('Au chaud à la maison', 'Bouillotte', ['Raclette', 'Sauna', 'Radiateur', 'Pull en laine'], [
      ['🛋️🧶', 'Plaid sur le canapé'], ['🥛🍯', 'Lait chaud au miel'], ['💧🔥🛏️', 'Bouillotte'], ['🥿🥿', 'Chaussons'], ['🕯️🌸', 'Bougies parfumées'], ['🍲🥕', 'Soupe de légumes'],
      ['🫖🌿', 'Tisane'], ['📖🕯️', 'Lecture aux bougies'], ['🎬🍿🛋️', 'Soirée film'], ['🍎🔥', 'Pommes au four'], ['🥞', 'Crêpes'], ['❄️🪟', 'Givre sur la vitre']]),
  },
};
