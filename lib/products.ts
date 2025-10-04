export type Product = {
  type: "book" | "toy";
  title: string;
  blurb: string;
  links: { amazon: string; shopee: string };
};

export const sampleProducts: { book: Product; toy: Product } = {
  book: {
    type: "book",
    title: "Mindful Parenting (PT)",
    blurb: "Dicas práticas para dias mais leves.",
    links: {
      amazon: "https://www.amazon.com/",
      shopee: "https://shopee.com/"
    }
  },
  toy: {
    type: "toy",
    title: "Blocos de Montar Criativos",
    blurb: "Desenvolve coordenação e imaginação.",
    links: {
      amazon: "https://www.amazon.com/",
      shopee: "https://shopee.com/"
    }
  }
};
