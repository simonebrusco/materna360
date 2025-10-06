// lib/recipes.js
export function generateHealthyRecipe(ageRange = "3-4", place = "home") {
  // Deterministic, friendly, safe stub. No network calls.
  return {
    title: "Omelete de espinafre suave",
    timeMinutes: 12,
    kcal: 180,
    ingredients: [
      "2 ovos",
      "1 punhado de espinafre picado",
      "1 colher (chá) de azeite",
      "Sal a gosto"
    ],
    steps: [
      "Bata os ovos rapidamente.",
      "Refogue o espinafre no azeite por 1–2 min.",
      "Adicione os ovos e cozinhe até firmar.",
      "Ajuste o sal e sirva morno."
    ],
    note: "Leve, simples e rica em ferro. Ajuste a textura conforme a idade."
  };
}
