const recipes = [
  { title: 'Omelete de espinafre', quick: 'proteína e ferro', steps: ['Bata 2 ovos', 'Refogue espinafre', 'Junte e tempere'] },
  { title: 'Iogurte com frutas', quick: 'rápido e leve', steps: ['Iogurte natural', 'Morangos em fatias', 'Finalize com granola'] },
  { title: 'Aveia com banana', quick: 'sustenta a manhã', steps: ['Cozinhe aveia em leite/água', 'Adicione banana em rodelas', 'Canela por cima'] },
  { title: 'Smoothie verde', quick: 'refrescante e nutritivo', steps: ['Bata couve e maçã', 'Adicione água ou leite', 'Gelo e sirva'] },
  { title: 'Salada colorida', quick: 'fibra e vitaminas', steps: ['Folhas e tomate', 'Cenoura ralada', 'Azeite e limão'] },
  { title: 'Wrap de frango', quick: 'prático e saboroso', steps: ['Aqueça tortilla', 'Adicione frango desfiado', 'Folhas e molho leve'] },
  { title: 'Arroz integral com legumes', quick: 'energia equilibrada', steps: ['Cozinhe arroz integral', 'Salteie legumes', 'Misture e ajuste sal'] }
];

export function recipeOfTheDay() {
  const d = new Date();
  const idx = (d.getFullYear() + d.getMonth() + d.getDate()) % recipes.length;
  return recipes[idx];
}

export function moreRecipes() { return recipes.slice(0, 3); }
