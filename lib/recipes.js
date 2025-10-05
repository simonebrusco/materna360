// /lib/recipes.js
export async function generateHealthyRecipe(opts = {}) {
  const { diet = "geral", time = 15 } = opts;
  const bank = {
    geral: [
      { title: "Omelete de espinafre", kcal: 280,
        ingredients: ["2 ovos", "1 xíc. espinafre", "1 col. azeite", "sal e pimenta"],
        steps: ["Bata os ovos.", "Refogue o espinafre no azeite.", "Junte tudo e cozinhe até firmar."] },
      { title: "Iogurte com frutas e aveia", kcal: 220,
        ingredients: ["1 copo de iogurte", "1/2 xíc. frutas", "2 col. aveia", "mel (opcional)"],
        steps: ["Misture iogurte e aveia.", "Adicione as frutas por cima.", "Finalize com mel."] },
    ],
    vegetariana: [
      { title: "Wrap de grão-de-bico", kcal: 320,
        ingredients: ["1 tortilha", "1/2 xíc. grão-de-bico", "folhas", "tomate", "molho tahine"],
        steps: ["Amasse o grão-de-bico.", "Monte o wrap com folhas e tomate.", "Regue com tahine e feche."] },
    ],
    sem_lactose: [
      { title: "Salada morna de quinoa", kcal: 300,
        ingredients: ["1/2 xíc. quinoa", "legumes picados", "azeite", "limão", "sal"],
        steps: ["Cozinhe a quinoa.", "Salteie os legumes rapidamente.", "Misture tudo e tempere."] },
    ],
  };
  const pool = bank[diet] && bank[diet].length ? bank[diet] : bank.geral;
  const recipe = pool[Math.floor(Math.random() * pool.length)];
  const timeNote = time <= 10 ? "pronta em até 10 minutos" : time <= 20 ? "pronta em ~15 minutos" : "pronta em ~20–30 minutos";
  return { ...recipe, timeNote };
}
