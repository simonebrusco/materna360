export type Product = { title: string; image: string; url: string; tag?: string; blurb?: string };

export const productCatalog: Record<string, Record<string, Product[]>> = {
  Livros: {
    "0-2": [{ title: "Livro de tecido", image: "/images/books/tecido.jpg", url: "#", tag: "tato/sensações" }],
    "3-4": [{ title: "Histórias em figuras", image: "/images/books/figuras.jpg", url: "#", tag: "curto e visual" }],
    "5-7": [{ title: "Primeira aventura", image: "/images/books/aventura.jpg", url: "#" }],
    "8+": [{ title: "Ciência divertida", image: "/images/books/ciencia.jpg", url: "#" }],
  },
  Brinquedos: {
    "0-2": [{ title: "Chocalho macio", image: "/images/toys/chocalho.jpg", url: "#" }],
    "3-4": [{ title: "Argolas de encaixe", image: "/images/toys/argolas.jpg", url: "#" }],
    "5-7": [{ title: "Kit blocos criativos", image: "/images/toys/blocos.jpg", url: "#" }],
    "8+": [{ title: "Quebra-cabeça 300pç", image: "/images/toys/puzzle.jpg", url: "#" }],
  },
  Cuidado: {
    "0-2": [{ title: "Tapete de atividades", image: "/images/care/tapete.jpg", url: "#" }],
    "3-4": [{ title: "Garrafa térmica kids", image: "/images/care/garrafa.jpg", url: "#" }],
    "5-7": [{ title: "Capinha protetora", image: "/images/care/capinha.jpg", url: "#" }],
    "8+": [{ title: "Lancheira", image: "/images/care/lancheira.jpg", url: "#" }],
  },
};
