const msgs = [
  "Hoje pode ser mais leve. Um passo de cada vez.",
  "Respire. Você não precisa dar conta de tudo hoje.",
  "Você está fazendo o seu melhor — e isso é suficiente.",
];
export function messageOfDay(seedDate = new Date()): string {
  const day = Math.floor(seedDate.getTime() / 86400000);
  return msgs[day % msgs.length];
}
