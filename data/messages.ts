export const DAILY_MESSAGES: string[] = [
  "Pequenos momentos se transformam em grandes lembranças.",
  "Você está fazendo um trabalho incrível, um passo de cada vez.",
  "O carinho de hoje é a base das descobertas de amanhã.",
  "Respire fundo: seu melhor já está acontecendo.",
  "A rotina também guarda momentos especiais.",
  "Cuidar de si é cuidar de quem você ama.",
  "Amor, paciência e presença fazem a diferença.",
  "Cada sorriso conta uma história.",
  "Você não precisa ser perfeito, só presente.",
  "Celebre as pequenas conquistas de hoje.",
  "Seu esforço importa mais do que você imagina."
];

export function getRandomMessage(exclude?: string): string {
  const pool: string[] = exclude
    ? DAILY_MESSAGES.filter((m) => m !== exclude)
    : DAILY_MESSAGES.slice();
  if (pool.length === 0) {
    return exclude ?? "";
  }
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
