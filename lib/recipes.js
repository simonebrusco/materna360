const RECIPES = [
  {
    id: "omelete-espinafre",
    title: "Omelete de espinafre",
    steps: [
      "Bata 2 ovos com pitada de sal.",
      "Refogue espinafre com fio de azeite.",
      "Despeje os ovos e cozinhe até firmar.",
      "Dobre e sirva quente.",
    ],
  },
  {
    id: "iogurte-frutas",
    title: "Iogurte com frutas e granola",
    steps: [
      "Pique frutas de sua preferência.",
      "Misture com iogurte natural.",
      "Finalize com granola e mel.",
    ],
  },
  {
    id: "macarrao-integral",
    title: "Macarrão integral ao molho de tomate",
    steps: [
      "Cozinhe o macarrão integral al dente.",
      "Aqueça molho de tomate com ervas.",
      "Misture tudo e ajuste o sal.",
    ],
  },
  {
    id: "salada-colorida",
    title: "Salada colorida",
    steps: [
      "Higienize e pique legumes variados.",
      "Tempere com azeite, limão e sal.",
      "Adicione sementes para crocância.",
    ],
  },
];

export function recipeOfTheDay(date = new Date()) {
  const idx = Math.floor((date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate()) % RECIPES.length);
  return RECIPES[idx];
}
