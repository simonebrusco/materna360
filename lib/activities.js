const map = {
  '0-2': ['Brincar com texturas', 'Música calma com colo'],
  '3-4': ['Jogo das cores', 'Histórias com fantoches'],
  '5-7': ['Caça ao tesouro em casa', 'Receita simples juntos'],
  '8+': ['Desafio de origami', 'Jardinagem em pote'],
};

export function getForRange(r = '3-4') { return map[r] || []; }

export { map as activitiesMap };
