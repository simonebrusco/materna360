// Materna360 — Messages of the day
// SSR-safe helper that rotates through a curated set of short encouragements.
"use client";
import { get, set, keys } from "./storage";

const MESSAGES = [
  "Respire fundo. Você já fez coisas difíceis antes.",
  "Você merece cuidado e gentileza hoje.",
  "Passo a passo também é progresso.",
  "Seu corpo é sábio. Ouça-o com carinho.",
  "Pedir ajuda é força, não fraqueza.",
  "Você está fazendo o melhor que pode neste momento.",
  "Pequenas pausas renovam grandes forças.",
  "Seja doce consigo: tudo tem seu tempo.",
  "Celebrar o pequeno também alimenta a alma.",
  "Confie: você está aprendendo um dia de cada vez.",
  "Hoje, escolha uma coisa que te acolhe.",
  "Você importa. Suas emoções importam.",
  "Cuidar de si é parte do cuidado com quem você ama.",
  "Acolha o cansaço. Ele também passa.",
  "O carinho que você dá também merece voltar para você.",
  "Seu ritmo é único — e isso é perfeito.",
  "Silencie por um minuto e sinta seu coração.",
  "Você é suficiente, exatamente como é agora.",
  "Permita-se recomeçar quantas vezes precisar.",
  "Hoje pode ser mais leve. Um passo de cada vez.",
];

function nextIndex(current) {
  const len = MESSAGES.length;
  if (!Number.isFinite(current) || current < 0) return 0;
  return (current + 1) % len;
}

export function ensureMessage(nameHint = null) {
  // Read current pointer (defaults to 0)
  const idx = Number(get(keys.inspireIndex, 0)) || 0;
  const body = MESSAGES[idx % MESSAGES.length];

  // Advance pointer for next read
  set(keys.inspireIndex, nextIndex(idx));

  // Optional soft personalization: no placeholders, only prefix when safe
  const safeName = typeof nameHint === "string" ? nameHint.trim() : "";
  const personalized = safeName ? `${safeName}, ${body.charAt(0).toLowerCase()}${body.slice(1)}` : body;

  return { id: `motd_${idx}`, body: personalized };
}

export function allMessages() {
  return MESSAGES.slice();
}
