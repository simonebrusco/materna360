// /lib/recs.js
/** Simple in-memory recommendations and activities by age group */

/** @typedef {{ id: string, title: string, desc: string }} Activity */
/** @typedef {{ type: 'book'|'toy', title: string, blurb: string, amazon?: string, shopee?: string }} ProductRec */

/** @type {Record<'0-2'|'3-4'|'5-7'|'8+', Activity[]>} */
export const activitiesByAge = {
  '0-2': [
    { id: '02-1', title: 'Explorar Texturas', desc: 'Toque tecidos diferentes (macio, áspero) e descreva as sensações.' },
    { id: '02-2', title: 'Música Suave', desc: 'Cante canções de ninar e balançe suavemente para acalmar.' },
    { id: '02-3', title: 'Olhar as Cores', desc: 'Mostre cartões coloridos com contrastes fortes.' },
    { id: '02-4', title: 'Brincar no Tapete', desc: 'Deite no tapete com brinquedos macios ao alcance.' },
  ],
  '3-4': [
    { id: '34-1', title: 'História Curta', desc: 'Leia uma história curta e peça para apontar personagens.' },
    { id: '34-2', title: 'Caça às Cores', desc: 'Procure objetos de uma cor pela casa.' },
    { id: '34-3', title: 'Dança Livre', desc: 'Coloque uma música e dance juntos por 5 minutos.' },
    { id: '34-4', title: 'Montar Blocos', desc: 'Construa torres e conte as peças em voz alta.' },
  ],
  '5-7': [
    { id: '57-1', title: 'Desenho Guiado', desc: 'Desenhe uma cena simples (casa, árvore) e pinte juntos.' },
    { id: '57-2', title: 'Histórias em Sequência', desc: 'Conte 3 eventos em ordem e peça para repetir.' },
    { id: '57-3', title: 'Pequenas Tarefas', desc: 'Organizem brinquedos por categoria, tornando uma brincadeira.' },
    { id: '57-4', title: 'Pequenos Experimentos', desc: 'Misture água e corante para explorar cores.' },
  ],
  '8+': [
    { id: '8p-1', title: 'Leitura em Dupla', desc: 'Leiam um capítulo juntos e conversem sobre os personagens.' },
    { id: '8p-2', title: 'Projeto Simples', desc: 'Monte um pequeno terrário ou experimento de ciências.' },
    { id: '8p-3', title: 'Diário Criativo', desc: 'Escreva 3 coisas boas do dia e uma meta para amanhã.' },
    { id: '8p-4', title: 'Receita Fácil', desc: 'Preparem um lanche simples medindo ingredientes.' },
  ],
};

/** @type {Record<'0-2'|'3-4'|'5-7'|'8+', ProductRec[]>} */
export const productRecs = {
  '0-2': [
    { type: 'book', title: 'Livro de Banho', blurb: 'Páginas resistentes e coloridas para a hora do banho.', amazon: '#', shopee: '#' },
    { type: 'toy',  title: 'Chocalho Macio', blurb: 'Estimula tato e audição com segurança.', amazon: '#', shopee: '#' },
  ],
  '3-4': [
    { type: 'book', title: 'Meu Primeiro ABC', blurb: 'Introduz letras com ilustrações divertidas.', amazon: '#', shopee: '#' },
    { type: 'toy',  title: 'Blocos Coloridos', blurb: 'Ajuda coordenação e criatividade.', amazon: '#', shopee: '#' },
  ],
  '5-7': [
    { type: 'book', title: 'Contos Curtos', blurb: 'Histórias fáceis para leitura compartilhada.', amazon: '#', shopee: '#' },
    { type: 'toy',  title: 'Kit Cientista', blurb: 'Experimentos simples e seguros.', amazon: '#', shopee: '#' },
  ],
  '8+': [
    { type: 'book', title: 'Aventura Mirim', blurb: 'Capítulos curtos e empolgantes.', amazon: '#', shopee: '#' },
    { type: 'toy',  title: 'Quebra-cabeça 300pçs', blurb: 'Desafio em família para foco e paciência.', amazon: '#', shopee: '#' },
  ],
};
