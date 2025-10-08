// Simple fallback suggestions for "Atividade do Dia"
const base = [
  "Piquenique de livros por 10 min",
  "Caça às cores pela casa",
  "Desenhar o clima de hoje",
  "Dançar 2 músicas juntos",
  "Separar brinquedos por formas",
  "Brincar de estátua sorridente",
];
export function pickSuggestion() {
  return base[Math.floor(Math.random() * base.length)];
}
