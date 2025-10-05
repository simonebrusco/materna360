// /lib/ideas.js
export async function generateIdeas(age, place) {
  const bank = {
    '0-2': ['Brincar de texturas com paninhos', 'Peek-a-boo com cobertorzinho', 'Música suave com palmas'],
    '3-4': ['Dança das cores no ' + place, 'Caça ao tesouro de formas', 'Construir pistas com blocos'],
    '5-7': ['Desafio de equilíbrio no ' + place, 'Mini-jardim em potes', 'Contar histórias em quadrinhos'],
    '8+':  ['Kahoot caseiro', 'Stop de temas do dia', 'Oficina de dobraduras ao ar livre']
  };
  const key = bank[age] ? age : '3-4';
  await new Promise(r => setTimeout(r, 450));
  return bank[key];
}
