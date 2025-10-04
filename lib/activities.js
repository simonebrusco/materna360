const MAP = {
  "0–2": [
    "Brincar de esconde-achou com objetos coloridos",
    "Música com palmas e movimentos",
    "Livros de figuras grandes",
    "Tapete de atividades sensoriais",
  ],
  "3–4": [
    "Quebra-cabeça simples de 6–12 peças",
    "Pintura com guache não tóxico",
    "Jogo de memória com figuras",
    "Contar histórias curtas e interativas",
  ],
  "5–7": [
    "Construções com blocos mais complexos",
    "Brincar de faz-de-conta com temas",
    "Leitura guiada de livros curtos",
    "Desenho livre com temas do dia",
  ],
  "8+": [
    "Projetos de ciências simples em casa",
    "Diário ilustrado de ideias",
    "Jogos de tabuleiro colaborativos",
    "Desafios de origami iniciante",
  ],
};

function normalize(key) {
  return key.replace(/-/g, "–").trim();
}

export function getForRange(range) {
  const k = normalize(range);
  return MAP[k] ? [...MAP[k]] : [];
}
