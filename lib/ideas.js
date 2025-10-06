// lib/ideas.js

// Deterministic stub: picks from curated pools by age & place.
const pools = {
  '0-2': {
    home: [
      'Brinque de esconde-esconde com paninhos coloridos.',
      'Cesta de texturas: tecidos macios e seguros para explorar.',
      'Música suave + balanço no colo (ritmo lento).'
    ],
    park: [
      'Passeio no carrinho observando árvores e pássaros.',
      'Bolhas de sabão gigantes (olhar e estourar).',
      'Tapete no gramado: rolar e alcançar brinquedos.'
    ],
    outdoor: [
      'Explorar sombras e luz do sol com chapéu e protetor.',
      'Caminhar de mãos dadas sentindo o vento.',
      'Fotos de rostinhos: expressões e risadas.'
    ]
  },
  '3-4': {
    home: [
      'Caça às cores pela casa (ache 3 coisas vermelhas).',
      'Engenheiro de blocos: ponte que aguenta o carrinho.',
      'Histórias curtas com fantoches improvisados.'
    ],
    park: [
      'Circuito motor: pular 3 folhas, contornar 2 árvores.',
      'Dança livre com música no celular.',
      'Pintura com água no chão (pincel e balde).'
    ],
    outdoor: [
      'Caça de sons: pássaros, carros, vento (conte juntos).',
      'Desenhar com gravetos na terra (formas e letras).',
      'Corrida de sombras no fim da tarde.'
    ]
  },
  '5-7': {
    home: [
      'Teatro em 3 cenas (início, meio, fim) — filme no celular.',
      'Desafio LEGO: torre estável de 30 cm.',
      'Receita simples: sanduíche criativo (cuidar de facas!).'
    ],
    park: [
      'Mapa do parque: desenhar pontos e inventar rotas.',
      'Corrida do equilíbrio (um pé só 10s).',
      'Jogo das pistas: encontre o “tesouro”.'
    ],
    outdoor: [
      'Fotossafari: 5 fotos de coisas redondas.',
      'Observação de nuvens: inventar criaturas.',
      'Medir sombras com fita e comparar tamanhos.'
    ]
  },
  '8+': {
    home: [
      'Experimento: ponte de papel (testar peso).',
      'Stop/criativo: temas de ciências e arte.',
      'Stop-motion simples com massinha.'
    ],
    park: [
      'Desafio de orientação: ache 3 pontos cardeais.',
      'Circuito com tempo (pular, correr, rastejar).',
      'Fotografia macro de folhas e flores.'
    ],
    outdoor: [
      'Diário de campo: anotar 3 descobertas do dia.',
      'Trilha curta com checklist de observação.',
      'Caça ao lixo (coleta segura + descarte correto).'
    ]
  }
};

export function generateIdeas(age, place, limit = 6) {
  // Pick pool by exact age/place; fallback sensibly.
  const byAge = pools[age] ?? pools['3-4'];
  const list = byAge?.[place] ?? byAge?.home ?? [];
  // Deterministic shuffle by seed age+place
  const seed = (age + place).split('').reduce((a,c)=>a+c.charCodeAt(0), 0) || 1;
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, limit);
}
