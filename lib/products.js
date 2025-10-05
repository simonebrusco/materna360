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
    img: "https://images.placeholders.dev/?width=640&height=420&text=Caderno%20de%20gratid%C3%A3o",
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

// ====== Multi-category (subfilters + badges) API (idempotent extension) ======
// Ensure existing cat object is reused if this file is hot-reloaded by the editor
// eslint-disable-next-line no-undef
const cat = (typeof cat !== "undefined") ? cat : {};

// Seed cat.* from BASE (non-destructive)
function fromBase(filterCategory){
  return BASE.filter(p => p.category === filterCategory).map(p => ({
    id: p.id,
    title: p.title,
    age: p.age,
    img: p.img,
    amazon: p.links?.amazon,
    shopee: p.links?.shopee,
    desc: p.desc,
    brand: p.brand,
    price: p.price,
    sub: p.sub,
    badges: p.badges,
    links: p.links || (p.links || undefined)
  }));
}
if (!cat.books)      cat.books = fromBase("livros");
if (!cat.toys)       cat.toys = fromBase("brinquedos");
if (!cat.selfcare)   cat.selfcare = fromBase("selfcare");

// --- NEW: Practical care category (Cuidado prático) ---
if (!cat.practical) {
  cat.practical = [
    { id:"pr-stroller", title:"Capa de carrinho impermeável", age:"0-2",
      img:"https://images.placeholders.dev/?w=640&h=420&text=Capa%20de%20carrinho",
      amazon:"#", shopee:"#",
      desc:"Proteção leve para vento e garoa.", sub:"Transporte", badges:["Popular"] },
    { id:"pr-babycarrier", title:"Canguru ergonômico", age:"0-2",
      img:"https://images.placeholders.dev/?w=640&h=420&text=Canguru%20ergon%C3%B4mico",
      amazon:"#", shopee:"#",
      desc:"Apoio lombar e postura correta.", sub:"Transporte", badges:["Editor’s pick"] },
    { id:"pr-lunchbox", title:"Lancheira térmica", age:"5-7",
      img:"https://images.placeholders.dev/?w=640&h=420&text=Lancheira%20t%C3%A9rmica",
      amazon:"#", shopee:"#",
      desc:"Mantém os alimentos na temperatura ideal.", sub:"Escola", badges:["New"] },
    { id:"pr-bottle", title:"Garrafa com marcador", age:"parent",
      img:"https://images.placeholders.dev/?w=640&h=420&text=Garrafa%20com%20marcador",
      amazon:"#", shopee:"#",
      desc:"Lembretes visuais de hidratação.", sub:"Autocuidado", badges:["Eco"] },
  ];
}

// --- Enrich existing categories with sub/badges (non-breaking) ---
if (cat.books) {
  cat.books = cat.books.map((p,i)=>({
    ...p,
    sub: p.sub || (i%2===0 ? "Picture books" : "Activity books"),
    badges: p.badges || (i%3===0 ? ["Popular"] : [])
  }));
}
if (cat.toys) {
  cat.toys = cat.toys.map((p,i)=>({
    ...p,
    sub: p.sub || (i%2===0 ? "STEM" : "Montessori"),
    badges: p.badges || (i%4===0 ? ["Editor’s pick"] : [])
  }));
}
if (cat.selfcare) {
  cat.selfcare = cat.selfcare.map((p,i)=>({
    ...p,
    sub: p.sub || (i%2===0 ? "Relax" : "Journaling"),
    badges: p.badges || (i%3===0 ? ["New"] : [])
  }));
}

// --- NEW: subfilters meta per category (for chips) ---
const meta = {
  books: ["Picture books","Activity books","Learning"],
  toys: ["STEM","Montessori","Creative"],
  selfcare: ["Relax","Journaling","Routine"],
  practical: ["Transporte","Escola","Autocuidado"]
};

export function getCategories(){
  return [
    { key:"books", label:"Livros" },
    { key:"toys", label:"Brinquedos" },
    { key:"selfcare", label:"Autocuidado" },
    { key:"practical", label:"Cuidado prático" }
  ];
}

export function getSubfilters(category){
  return meta[category] || [];
}

// Returns items filtered by category, age, and optional subfilter.
// Items with age === "parent" always pass the age filter.
export function getProducts(category="books", age="3-4", subfilter=null){
  const list = (cat[category] || []);
  let out = list.filter(p => p.age === age || p.age === "parent");
  if (subfilter && typeof subfilter === "string") {
    out = out.filter(p => (p.sub || "").toLowerCase() === subfilter.toLowerCase());
  }
  // normalize links for modal compatibility
  out = out.map(p => ({
    ...p,
    links: p.links || { ...(p.amazon ? { amazon: p.amazon } : {}), ...(p.shopee ? { shopee: p.shopee } : {}) }
  }));
  return out;
}

export { cat as __catalog }; // optional debug export
