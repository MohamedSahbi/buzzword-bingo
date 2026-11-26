// Spanish (Spain) practice Advent calendar: 6 open doors to try the games any time.
// [[...]] marks a phrase that appears on the bingo card. Each door has 12 marked phrases + 4 decoys.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'es', label: 'Español (España)', locale: 'es-ES', voice: ['es-ES', 'es'],
  tagline: 'Calendario de práctica con seis ventanas ya abiertas. Prueba los juegos cuando quieras, solo o en equipo.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Grupo de pádel: el torneo de Navidad', 'pista 3 a las diez', ['Lesión de rodilla', 'Pala rota', 'Llueve a cántaros', 'Cambio de pareja'], [
      ['Rubén', 'Chicos, [[torneo de Navidad el sábado]] 🎾'], ['Marta', '¡[[Me apunto fijo]]!'], ['Dani', 'y yo, [[¿a qué hora?]]'],
      ['Rubén', '[[pista 3 a las diez]]'], ['Dani', '§react 😴'], ['Laura', 'jaja [[madrugar en sábado]] 😂'], ['Marta', '§photo 🎽'],
      ['Marta', '[[camisetas navideñas]] para todos'], ['Rubén', '§voice 0:40'], ['Laura', 'Rubén dice que [[cada uno lleve bolas nuevas]]'], ['Dani', '§deleted'],
      ['Dani', 'nada, me he equivocado 😅'], ['Marta', '¿Y después [[un chocolate con churros]]?'], ['Laura', '[[¡Hecho!]]'], ['Rubén', 'El que pierda [[paga los churros]] 😎'],
      ['Dani', '[[Pues ya estoy perdiendo]]'], ['Laura', '[[Nos vemos en la pista]] 💪']]), start: '20:45' },
    2: emoji('Juegos de mesa en familia', 'Hundir la flota', ['Ajedrez', 'Damas', 'Dominó', 'Mus'], [
      ['🔴🟡🟢🔵🎲', 'Parchís'], ['🪿🎲🌀', 'La oca'], ['🚢💥🌊', 'Hundir la flota'], ['🃏🔴🟢🔵', 'Uno'], ['🎩🏠💶', 'Monopoly'], ['✏️🖼️⏳', 'Pictionary'],
      ['❓🧀', 'Trivial'], ['🔍🕵️🏚️', 'Cluedo'], ['🔤🔢🟫', 'Scrabble'], ['🧱🧱🫳', 'Jenga'], ['🧩', 'Puzle'], ['🔴🟡4️⃣', 'Conecta 4']]),
    3: listen('Megafonía de la pista de hielo', 'pasa la máquina pulidora', ['Hockey sobre hielo', 'Taquillas llenas', 'Triple salto', 'Cuchillas afiladas'], [
      'Buenas tardes, [[la pista ya está abierta]].', 'Por favor, [[patinad en el mismo sentido]].', 'En diez minutos [[pasa la máquina pulidora]]; dejad la pista libre.',
      'El [[alquiler de patines]] está en taquilla.', 'Para los peques tenemos [[pingüinos de apoyo]] junto a la valla.', 'Se ha encontrado [[un guante azul]] en los vestuarios.',
      'A las seis empieza [[la sesión de música]] sobre hielo.', 'Os pedimos [[no hacer carreras]] en la pista.', 'En el quiosco hay [[gofres recién hechos]] y chocolate caliente.',
      'La [[clase de iniciación]] empieza a las cinco.', 'Si os caéis, [[el personal os ayuda]] en la entrada.', '¡Pasadlo bien y [[guardad la distancia]]!']),
    4: { ...chat('Familia: videollamada con el abuelo', 'Abuelo, eso es tu oreja', ['Contraseña olvidada', 'Sin batería', 'Altavoz apagado', 'Sin wifi'], [
      ['Lucía', 'Domingo a las 5 [[videollamada con el abuelo]] 📱'], ['Papá', 'Le he [[mandado el enlace]]'], ['Abuelo', 'Hola. [[Qué botón tengo que dar]]. Un abrazo, el abuelo'],
      ['Lucía', '[[el verde, abuelo]] 😊'], ['Abuelo', '§photo 📷'], ['Papá', '[[Eso es una foto de la tele]] 😄'], ['Lucía', '§react 😂'],
      ['Abuela', 'El abuelo dice que [[las gafas están en la cocina]]'], ['Abuelo', '§voice 0:07'], ['Lucía', 'abuelo solo se oye [[un ruido raro]] 🙉'], ['Papá', 'prueba a [[darle la vuelta al móvil]]'],
      ['Abuelo', '§deleted'], ['Abuelo', '¿Y ahora? El abuelo'], ['Lucía', '[[Abuelo, eso es tu oreja]] 😂❤️'], ['Abuela', '¡[[Ya os vemos]]! Hola, cariños 😘'],
      ['Papá', '[[¡Funciona!]] 👏'], ['Abuelo', '[[El domingo, otra vez]]. Un abrazo']]), start: '17:50' },
    5: listen('Biblioteca: cuentacuentos de invierno', 'un oso que no puede dormir', ['Silencio, por favor', 'Fotocopiadora', 'Audiolibro', 'Gafas olvidadas'], [
      'Buenas tardes, [[el cuentacuentos empieza]] en cinco minutos.', 'Los niños pueden ir a [[la sala infantil]], en la primera planta.', 'Por favor, [[quitaos los zapatos]] antes de sentaros en los cojines.',
      'Hoy contamos la historia de [[un oso que no puede dormir]] en todo el invierno.', 'Después, [[haremos marcapáginas]] con estrellas.', 'Mientras tanto, las familias pueden [[echar un vistazo]] a las estanterías.',
      'Los [[cuentos de invierno]] están en la entrada.', 'Recordad que [[se devuelve en la máquina]].', 'Si no lo tenéis, podéis [[haceros el carné]] en el mostrador.',
      'En fiestas tenemos [[horario reducido]].', 'Mirad bien [[la fecha de devolución]] de vuestros libros.', '¡Y ahora, [[a disfrutar del cuento]]!']),
    6: emoji('Tarde de invierno en casa', 'Mesa camilla', ['Calefactor', 'Bufanda', 'Sopa de ajo', 'Radiador'], [
      ['🧣🛋️', 'Manta en el sofá'], ['☕🍫', 'Chocolate caliente'], ['🪑🔥🧺', 'Mesa camilla'], ['🥿🥿', 'Zapatillas de casa'], ['🍲🫘🥕', 'Cocido'], ['🍠🔥', 'Boniatos asados'],
      ['🎬🍿', 'Peli de la tarde'], ['📖☕', 'Un libro y un café'], ['🧦🧦', 'Calcetines gordos'], ['🔥🪵', 'Chimenea'], ['🫖🌿', 'Infusión'], ['🍊🧺', 'Mandarinas']]),
  },
};
