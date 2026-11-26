// Calendário de treino (pt-BR): 6 portas abertas para praticar. [[...]] marca uma frase da cartela.
const chat = (title, star, decoys, lines) => ({ type: 'chat', title, star, decoys, lines });
const listen = (title, star, decoys, text) => ({ type: 'listen', title, star, decoys, text });
const emoji = (title, star, decoys, riddles) => ({ type: 'emoji', title, star, decoys, riddles });

export default {
  code: 'pt-BR', label: 'Português (Brasil)', locale: 'pt-BR', voice: ['pt-BR', 'pt'],
  tagline: 'Calendário de treino: 6 portas abertas para jogar quando quiser, sozinho ou com seu time.',
  dates: Object.fromEntries(Array.from({ length: 6 }, (_, i) => [i + 1, [12, i + 1]])),
  doors: {
    1: { ...chat('Amigos: a pelada de fim de ano', 'eu fico no gol', ['Prorrogação', 'Placar apertado', 'Protetor solar', 'Gol de bicicleta'], [
      ['Diego', 'e aí galera, [[pelada de fim de ano]] confirmada? ⚽'], ['Caio', 'bora, [[conta comigo]]'], ['Léo', 'sábado de manhã? [[antes que esquente]] ☀️'],
      ['Diego', '[[às 7 na quadra]] do clube'], ['Caio', '7 da manhã?? 😴'], ['Léo', '§react 😂'], ['Diego', 'depois tem [[churrasco na casa do Rafa]]'],
      ['Rafa', 'opa, ninguém me perguntou kkkk'], ['Rafa', 'mas [[pode vir todo mundo]]'], ['Léo', '§voice 0:38'], ['Léo', 'resumindo: [[eu levo a bola nova]]'],
      ['Caio', '[[camisa clara x escura]]?'], ['Diego', '§photo 👕'], ['Diego', 'achei os [[coletes da última vez]]'], ['Gui', '§deleted'],
      ['Gui', 'foi mal, grupo errado 😅 [[eu fico no gol]]'], ['Caio', '[[sem carrinho, hein]] 🙏'], ['Rafa', '[[cada um traz uma coisa]] pro churrasco']]), start: '20:15' },
    2: emoji('Brincadeiras de família e de rua', 'Adedonha', ['Dominó', 'Cabo de guerra', 'Bolinha de gude', 'Peteca'], [
      ['🃏🗣️', 'Truco'], ['🃏🔴🟢🔵', 'Uno'], ['🔢📣🎉', 'Bingo'], ['🙈🔢🏃', 'Esconde-esconde'], ['🏃‍♂️👋🏃', 'Pega-pega'], ['🔤✍️⏱️', 'Adedonha'],
      ['❌⭕', 'Jogo da velha'], ['🥔🔥👐', 'Batata quente'], ['🪁🌬️', 'Soltar pipa'], ['1️⃣2️⃣3️⃣🦶⬜', 'Amarelinha'], ['🏐🤾‍♀️', 'Queimada'], ['🗿🤫', 'Estátua']]),
    3: listen('Aviso na praia: domingo de dezembro', 'bandeira vermelha', ['Mar calmo', 'Água de coco', 'Cadeira de praia', 'Biquíni'], [
      'Bom dia, banhistas, aqui é o [[posto de guarda-vidas]] número 4.', 'Hoje o mar está agitado e tem [[bandeira vermelha]] perto das pedras.',
      'Por favor, [[tome banho na área sinalizada]], em frente ao posto.', 'Temos uma menina chamada Júlia, de maiô amarelo, [[procurando a mãe]].',
      'Ela está aqui com a gente, [[bem tranquila]], tomando água.', 'Lembramos que o [[sol forte vai até as 16h]].',
      'Passe [[protetor a cada duas horas]], principalmente nas crianças.', 'Não deixe [[lixo na areia]]: tem lixeiras na calçada.',
      'Os ambulantes de [[milho e picolé]] ficam na parte de trás.', 'Às cinco começa a [[aula de vôlei de praia]] gratuita.',
      'E à noite tem [[luzinhas de Natal no calçadão]].', 'Bom domingo e [[cuidem uns dos outros]]!']),
    4: { ...chat('Trabalho: a planilha de férias do time', 'quem fica no plantão?', ['Reunião de alinhamento', 'Banco de horas', 'Hora extra', 'Feriado prolongado'], [
      ['Patrícia', 'bom dia, time ☕ [[preencham a planilha de férias]] até sexta, por favor'], ['Bruno', '[[já coloquei meu nome]]'], ['Juliana', 'eu vou [[do dia 20 ao dia 5]]'],
      ['Marcos', '§react 😮'], ['Marcos', 'e [[quem fica no plantão?]]'], ['Patrícia', '[[revezamento de uma semana]] cada um'], ['Bruno', 'eu pego [[a semana do Ano-Novo]]'],
      ['Juliana', 'você é um anjo, Bruno 🙏'], ['Marcos', '§voice 0:27'], ['Marcos', '[[a planilha tá travada]] aqui 😩'], ['Patrícia', 'é que [[alguém abriu no celular]] kkk'],
      ['Bruno', '§deleted'], ['Bruno', 'fui eu, [[já fechei]] 🙈'], ['Patrícia', '§photo 📊'], ['Patrícia', '[[ficou tudo verdinho]] 👏'],
      ['Juliana', '[[deixa o contato no e-mail]] antes de sair'], ['Marcos', 'perfeito, [[valeu, time]]!']]), start: '10:05' },
    5: listen('Áudio da mãe: faxina antes das visitas', 'lavar a cortina do quarto', ['Aspirador de pó', 'Pano de chão', 'Balde e rodo', 'Lavar a louça'], [
      'Oi, filha, é a mãe, [[manda um joinha]] quando ouvir, tá?', 'Sábado é [[dia de faxina geral]], porque domingo chegam as visitas.',
      'Você fica com [[o banheiro de cima]], seu irmão com a varanda.', 'Seu pai vai [[lavar a cortina do quarto]], já combinei com ele.',
      'Eu cuido da cozinha e [[tiro tudo do armário]].', 'Precisa comprar [[água sanitária e esponja]], está no fim.',
      'Não esquece de [[tirar o pó da estante]], tá cheia de livro.', 'A gente [[arruma o quarto de hóspedes]] com o lençol florido.',
      'Tem [[roupa no varal]] desde ontem, recolhe antes da chuva.', 'Depois a gente [[pede uma pizza]] pra comemorar.',
      'E nada de [[ficar no celular]] no meio da faxina, hein!', '[[Beijo da mãe]], te amo.']),
    6: emoji('Salgadinhos da confraternização', 'Coxinha', ['Pastel de nata', 'Enroladinho de salsicha', 'Croquete', 'Torta salgada'], [
      ['🍗💧', 'Coxinha'], ['🍫⚫🎉', 'Brigadeiro'], ['🥥⚪🍬', 'Beijinho'], ['🧀🍞⚪', 'Pão de queijo'], ['🥧🐔', 'Empadinha'], ['🔺🥩🌿', 'Esfiha'],
      ['🏈🥩🌿', 'Quibe'], ['🥜🍬', 'Cajuzinho'], ['🍰🥄🫙', 'Bolo de pote'], ['🥟🔥🛒', 'Pastel de feira'], ['🍕🤏', 'Mini pizza'], ['🧀⚪🔥', 'Bolinha de queijo']]),
  },
};
