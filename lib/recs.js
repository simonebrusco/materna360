const existing = (typeof globalThis !== "undefined" && globalThis.__m360ProductCatalog) ? globalThis.__m360ProductCatalog : {};

export const productCatalog = {
  ...existing,
  "Livros": {
    ...(existing?.Livros || {}),
    "0-2":[{title:"Livro de tecido", image:"/images/books/tecido.jpg", url:"#", tag:"tato/sensações"}],
    "3-4":[{title:"Figuras grandes", image:"/images/books/figuras.jpg", url:"#", tag:"curto e visual"}],
    "5-7":[{title:"Primeira aventura", image:"/images/books/aventura.jpg", url:"#"}],
    "8+":[{title:"Ciência divertida", image:"/images/books/ciencia.jpg", url:"#"}]
  },
  "Brinquedos": {
    ...(existing?.Brinquedos || {}),
    "0-2":[{title:"Chocalho macio", image:"/images/toys/chocalho.jpg", url:"#"}],
    "3-4":[{title:"Argolas de encaixe", image:"/images/toys/argolas.jpg", url:"#"}],
    "5-7":[{title:"Blocos criativos", image:"/images/toys/blocos.jpg", url:"#"}],
    "8+":[{title:"Quebra-cabeça 300pç", image:"/images/toys/puzzle.jpg", url:"#"}]
  },
  "Cuidado": {
    ...(existing?.Cuidado || {}),
    "0-2":[{title:"Tapete de atividades", image:"/images/care/tapete.jpg", url:"#"}],
    "3-4":[{title:"Garrafa kids", image:"/images/care/garrafa.jpg", url:"#"}],
    "5-7":[{title:"Capinha protetora", image:"/images/care/capinha.jpg", url:"#"}],
    "8+":[{title:"Lancheira térmica", image:"/images/care/lancheira.jpg", url:"#"}]
  }
};

try { if (typeof globalThis !== 'undefined') globalThis.__m360ProductCatalog = productCatalog; } catch {}
