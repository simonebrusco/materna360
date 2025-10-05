// lib/products.js
// Simple in-memory catalog for recommendations vitrine (JS-only)

const img = (path) => path; // replace with real CDN later if needed

const BASE = [
  {
    id: "bk-soft-fabric-0-2",
    age: "0-2",
    category: "livros",
    title: "Livro de tecido",
    brand: "M360",
    price: 59.9,
    img: img("/images/products/book-fabric.jpg"),
    desc: "Páginas macias e seguras para mãos curiosas.",
    links: {
      amazon: "https://www.amazon.com/s?k=livro+de+tecido",
      shopee: "https://shopee.com.br/search?keyword=livro%20tecido"
    }
  },
  {
    id: "toy-rings-3-4",
    age: "3-4",
    category: "brinquedos",
    title: "Argolas de encaixe",
    brand: "M360",
    price: 79.9,
    img: img("/images/products/toy-rings.jpg"),
    desc: "Coordenação e noção de cores com peças grandes.",
    links: {
      amazon: "https://www.amazon.com/s?k=brinquedo+argolas",
      shopee: "https://shopee.com.br/search?keyword=argolas%20encaixe"
    }
  },
  {
    id: "bk-contrasts-3-4",
    age: "3-4",
    category: "livros",
    title: "Histórias de contrastes",
    brand: "M360",
    price: 42.0,
    img: img("/images/products/book-contrasts.jpg"),
    desc: "Figuras grandes e cores contrastantes para atenção.",
    links: {
      amazon: "https://www.amazon.com/s?k=livro+cores+contrastes",
      shopee: "https://shopee.com.br/search?keyword=livro%20contrastes"
    }
  },
  {
    id: "care-foam-5-7",
    age: "5-7",
    category: "cuidados",
    title: "Tapete de espuma",
    brand: "M360",
    price: 129.9,
    img: img("/images/products/mat-foam.jpg"),
    desc: "Conforto e segurança para brincar no chão.",
    links: {
      amazon: "https://www.amazon.com/s?k=tapete+eva+infantil",
      shopee: "https://shopee.com.br/search?keyword=tapete%20eva%20infantil"
    }
  },
  {
    id: "mom-roller-8plus",
    age: "8+",
    category: "para_voce",
    title: "Rolo de massagem",
    brand: "M360",
    price: 89.9,
    img: img("/images/products/roller.jpg"),
    desc: "Bem-estar para o seu momento de autocuidado.",
    links: {
      amazon: "https://www.amazon.com/s?k=massage+roller",
      shopee: "https://shopee.com.br/search?keyword=massage%20roller"
    }
  },
  {
    id: "sc-journal",
    age: "parent",
    category: "selfcare",
    title: "Caderno de gratidão",
    brand: "M360",
    price: 39.9,
    img: "https://images.placeholders.dev/?width=640&height=420&text=Caderno%20de%20gratida%C3%A3o",
    desc: "Cinco minutos por dia para celebrar pequenas vitórias.",
    links: { amazon: "#", shopee: "#" }
  },
  {
    id: "sc-essential-oil",
    age: "parent",
    category: "selfcare",
    title: "Óleo essencial calmante",
    brand: "M360",
    price: 49.9,
    img: "https://images.placeholders.dev/?width=640&height=420&text=%C3%93leo%20essencial%20calmante",
    desc: "Apoio ao relaxamento em pausas rápidas.",
    links: { amazon: "#", shopee: "#" }
  },
  {
    id: "sc-pillow",
    age: "parent",
    category: "selfcare",
    title: "Travesseiro de apoio",
    brand: "M360",
    price: 99.9,
    img: "https://images.placeholders.dev/?width=640&height=420&text=Travesseiro%20de%20apoio",
    desc: "Conforto extra para momentos de descanso.",
    links: { amazon: "#", shopee: "#" }
  },
  {
    id: "sc-water-bottle",
    age: "parent",
    category: "selfcare",
    title: "Garrafa de hidratação",
    brand: "M360",
    price: 59.9,
    img: "https://images.placeholders.dev/?width=640&height=420&text=Garrafa%20de%20hidrata%C3%A7%C3%A3o",
    desc: "Lembretes visuais para beber água ao longo do dia.",
    links: { amazon: "#", shopee: "#" }
  }
];

export function productCatalog({ age = "3-4", category = "livros", page = 1, pageSize = 8 } = {}) {
  const items = BASE.filter(p => p.category === category && (p.age === age || p.age === "parent"));
  const total = items.length;
  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { items: pageItems, total, page, pageSize };
}

export const PRODUCT_CATEGORIES = [
  { key: "livros", label: "Livros", icon: "📚" },
  { key: "brinquedos", label: "Brinquedos", icon: "🧸" },
  { key: "cuidados", label: "Cuidados", icon: "🫧" },
  { key: "para_voce", label: "Para você", icon: "💛" },
  { key: "selfcare", label: "Autocuidado", icon: "💆" }
];
