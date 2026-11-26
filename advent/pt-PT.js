// Calendário de treino (pt-PT): 6 portas abertas para praticar. [[...]] marca uma frase do cartão.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'pt-PT', label: 'Português (Portugal)', locale: 'pt-PT', voice: ['pt-PT', 'pt'],
  tagline: 'Calendário de treino: 6 portas abertas para jogares quando quiseres, sozinho ou com a tua equipa.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Casa partilhada: limpezas antes de ir à terra', 'iogurtes de outubro', ['Máquina da loiça', 'Contas da luz', 'Estendal cheio', 'Senhorio'], [
      ['Mariana', 'pessoal, [[antes de irmos à terra]] temos de limpar a casa 🧹'], ['Duarte', '[[eu vou dia 21]] de manhã'], ['Beatriz', 'eu só vou no 22, [[tenho turno no café]]'],
      ['Mariana', 'então [[fazemos tudo no sábado]]?'], ['Duarte', '§react 👍'], ['Beatriz', '[[quem esvazia o frigorífico?]]'], ['Duarte', 'há [[iogurtes de outubro]] lá dentro 😬'],
      ['Mariana', '§photo 🥛'], ['Mariana', 'confirmo. [[não fui eu]]'], ['Beatriz', '§voice 0:33'], ['Beatriz', 'resumindo o áudio: [[eu trato da casa de banho]]'],
      ['Duarte', 'e eu [[aspiro a sala]]'], ['Mariana', '[[desliguem o esquentador]] antes de sair'], ['Duarte', '§deleted'], ['Duarte', 'ups 😅'],
      ['Beatriz', '[[deixem a chave à vizinha]] para regar as plantas'], ['Mariana', '[[boa viagem, malta]] ❤️']]), start: '21:10' },
    2: emoji('Comida de conforto no inverno', 'Caldo verde', ['Sopa de legumes', 'Alheira', 'Rojões', 'Canja'], [
      ['🥬🍲🟢', 'Caldo verde'], ['🪨🍲', 'Sopa da pedra'], ['🥩🥕🥔🍲', 'Cozido à portuguesa'], ['🫘🍖', 'Feijoada'], ['🦆🍚', 'Arroz de pato'], ['🐖🥖', 'Bifana'],
      ['🥪🧀🌶️🍳', 'Francesinha'], ['🐙🫒🥔', 'Polvo à lagareiro'], ['🐟🥚🍟', 'Bacalhau à Brás'], ['🥚🥧☕', 'Pastel de nata'], ['🍞🧈☕', 'Torradas'], ['🥛☕📏', 'Galão']]),
    3: listen('Mensagem da avó: o cachecol que te estou a fazer', 'azul-escuro', ['Agulhas de tricô', 'Gorro de lã', 'Camisola', 'Malha'], [
      'Olá, meu querido, é a avó, [[estás a ouvir-me bem]]?', 'Estou a fazer-te [[um cachecol de lã]] para o Natal.', 'Já vai [[a meio do novelo]], mas ainda é curto.',
      'Escolhi [[azul-escuro]], que combina com o teu casaco.', 'Diz-me [[se preferes com franjas]] ou sem franjas.', 'A tua prima quer [[um igual ao teu]], vê lá tu.',
      'Faço [[um bocadinho todas as noites]], ao pé da lareira.', 'O gato [[brinca com a lã]] e desfaz-me as voltas.', 'Se sobrar lã, faço-te [[umas luvas a condizer]].',
      'Não contes nada à tua mãe, [[é surpresa]].', 'Liga-me [[quando saíres da faculdade]], está bem?', '[[Um beijinho grande]] da avó.']),
    4: { ...chat('Equipa: o lanche partilhado de sexta', 'o bolo de bolacha', ['Sumo de laranja', 'Tosta mista', 'Pastéis de bacalhau', 'Café da máquina'], [
      ['Sofia', 'Bom dia! Sexta há [[lanche partilhado]] na copa 🎄'], ['Nuno', '[[trazemos o quê?]]'], ['Sofia', '[[vou fazer uma folha]] no Teams'],
      ['Carla', 'eu levo [[salgadinhos da pastelaria]]'], ['Nuno', '§react 😋'], ['Pedro', 'e eu [[o bolo de bolacha]] da minha mãe'], ['Sofia', '🤤'],
      ['Nuno', 'eu não sei cozinhar… [[levo os guardanapos]]'], ['Carla', '§react 😂'], ['Pedro', '§voice 0:19'], ['Pedro', 'esquece o áudio, [[já está na folha]]'],
      ['Carla', '[[a que horas começa?]]'], ['Sofia', '[[às quatro em ponto]]'], ['Nuno', '§photo 🍰'], ['Nuno', 'afinal [[comprei pão de ló]] 😎'],
      ['Sofia', '§deleted'], ['Sofia', '[[levem os vossos copos]], para não gastar plástico'], ['Pedro', '[[vai ser espetacular]]']]), start: '11:20' },
    5: listen('Altifalante do hipermercado: sábado de dezembro', 'que se dirija à caixa 12', ['Promoção relâmpago', 'Talho', 'Peixaria', 'Carrinho de compras'], [
      'Caros clientes, [[bem-vindos ao hipermercado]].', 'Hoje temos [[degustação de queijos]] junto à charcutaria.', 'A [[padaria tem broa quentinha]] acabada de sair do forno.',
      'Pedimos a um colaborador [[que se dirija à caixa 12]].', 'Informamos que [[as caixas rápidas]] estão abertas junto à entrada.', 'Os [[brinquedos estão no corredor 9]], ao lado das pilhas.',
      'Temos um menino chamado Tomás [[à espera do pai]] no balcão de informações.', 'Atenção, [[há chão molhado]] no corredor dos lacticínios.', 'O [[estacionamento do piso -1]] está quase cheio.',
      'Não se esqueça do [[seu cartão de cliente]] para acumular descontos.', 'Temos [[sacos reutilizáveis]] à venda em todas as caixas.', 'Obrigado pela preferência e [[bom fim de semana]].']),
    6: emoji('Brincadeiras no recreio', 'Macaca', ['Elástico', 'Rabia', 'Mata', 'Bola ao cesto'], [
      ['🙈🔢🌳', 'Escondidas'], ['🏃‍♀️✋🏃', 'Apanhada'], ['1️⃣2️⃣3️⃣⬜🦶', 'Macaca'], ['🔵🟢⚪🫳', 'Berlinde'], ['🌀🪢', 'Pião'], ['🪢🦘', 'Saltar à corda'],
      ['🐐🙈', 'Cabra-cega'], ['🧣🏃‍♂️', 'Jogo do lenço'], ['🪁🌬️', 'Papagaio de papel'], ['⚽🥅', 'Futebol no recreio'], ['🛍️🦵🏁', 'Corrida de sacos'], ['🗿🎶', 'Estátua']]),
  },
};
