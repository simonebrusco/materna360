// Content recommendations for Discover page
// Exported as plain objects keyed by age group: "0-2", "3-4", "5-7", "8+"

/** @typedef {{ id: string, title: string, desc: string }} Activity */
/** @typedef {{ type: "book"|"toy", title: string, blurb: string, amazon?: string, shopee?: string }} ProductRec */

/** @type {Record<"0-2"|"3-4"|"5-7"|"8+", Activity[]>} */
export const activitiesByAge = {
  "0-2": [
    { id: "tummy-time", title: "Brincar de barriga para baixo", desc: "Pequenas sessões para fortalecer o pescoço e costas com supervisão." },
    { id: "sons-suaves", title: "Sons suaves", desc: "Ouça canções de ninar e ruído branco para acalmar." },
    { id: "texturas", title: "Descobrir texturas", desc: "Apresente tecidos e objetos macios para exploração tátil." },
    { id: "rimas", title: "Rimas simples", desc: "Cante rimas com gestos para estimular vínculo e ritmo." }
  ],
  "3-4": [
    { id: "encaixe", title: "Encaixar e empilhar", desc: "Brinque com blocos e argolas para coordenação motora fina." },
    { id: "historias-curtas", title: "Histórias curtas", desc: "Leia livrinhos com figuras grandes e cores contrastantes." },
    { id: "movimento", title: "Dança livre", desc: "Coloque uma música calma e convide para mexer o corpo." },
    { id: "esconde-esconde", title: "Esconde-esconde com objetos", desc: "Cubra brinquedos e incentive a procura de forma lúdica." }
  ],
  "5-7": [
    { id: "faz-de-conta", title: "Faz de conta", desc: "Use bonecos e cenários simples para imaginar histórias." },
    { id: "pintura-dedo", title: "Pintura com os dedos", desc: "Explore cores com tintas laváveis e papel grosso." },
    { id: "musica", title: "Música e ritmo", desc: "Bata palmas e explore instrumentos simples como chocalhos." },
    { id: "passeio", title: "Passeio sensorial", desc: "Observe folhas, texturas e cheiros no quintal ou parque." }
  ],
  "8+": [
    { id: "quebra-cabeca", title: "Quebra-cabeça simples", desc: "Comece com poucas peças grandes e evolua gradualmente." },
    { id: "contar-historias", title: "Contar histórias com figuras", desc: "Monte sequências de imagens e crie narrativas curtas." },
    { id: "arte-colagem", title: "Colagem criativa", desc: "Use papéis coloridos, revistas e cola atóxica com supervisão." },
    { id: "jogo-memoria", title: "Jogo da memória", desc: "Cartas com imagens grandes para treinar atenção e memória." }
  ]
};

/** @type {Record<"0-2"|"3-4"|"5-7"|"8+", ProductRec[]>} */
export const productRecs = {
  "0-2": [
    { type: "book", title: "Livro de alto contraste", blurb: "Imagens em preto e branco para foco visual desde cedo." },
    { type: "toy", title: "Móbile suave", blurb: "Movimento delicado que acalma e estimula o olhar." }
  ],
  "3-4": [
    { type: "book", title: "Livro de tecido", blurb: "Páginas macias e seguras para mãos curiosas." },
    { type: "toy", title: "Argolas de encaixe", blurb: "Coordenação e noção de cores com peças grandes." }
  ],
  "5-7": [
    { type: "book", title: "Livro com abas", blurb: "Descobertas atrás de cada aba para estimular a curiosidade." },
    { type: "toy", title: "Blocos de montar", blurb: "Criação livre para desenvolver imaginação e coordenação." }
  ],
  "8+": [
    { type: "book", title: "Histórias ilustradas", blurb: "Textos curtos e ilustrações para ampliar vocabulário." },
    { type: "toy", title: "Quebra-cabeça", blurb: "Desafio progressivo que desenvolve atenção e lógica." }
  ]
};
