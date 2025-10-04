export type AgeGroup = "0–2" | "3–4" | "5–7" | "8+";
export type Activity = { id: string; title: string; blurb: string; icon?: string };

const DATA: Record<AgeGroup, Activity[]> = {
  "0–2": [
    { id: "tummy-time", title: "Tummy time", blurb: "Fortalece pescoço e costas.", icon: "🐣" },
    { id: "soft-sounds", title: "Sons suaves", blurb: "Estimule com chocalho leve.", icon: "🎵" }
  ],
  "3–4": [
    { id: "color-match", title: "Cores e pares", blurb: "Combine cores com objetos.", icon: "🎨" },
    { id: "story-time", title: "Hora da história", blurb: "Leia e pergunte sobre figuras.", icon: "📚" },
    { id: "balance-steps", title: "Passos de equilíbrio", blurb: "Caminhe sobre linha no chão.", icon: "⚖️" }
  ],
  "5–7": [
    { id: "paper-crafts", title: "Arte em papel", blurb: "Corte e monte formas simples.", icon: "✂️" },
    { id: "number-hunt", title: "Caça aos números", blurb: "Encontre números em casa.", icon: "🔍" }
  ],
  "8+": [
    { id: "mini-garden", title: "Mini horta", blurb: "Plante e acompanhe o crescimento.", icon: "🌱" },
    { id: "simple-recipes", title: "Receitas simples", blurb: "Prepare um lanche com segurança.", icon: "🍪" }
  ]
};

export function getActivitiesByAge(ageGroup: AgeGroup): Activity[] {
  return DATA[ageGroup] ?? [];
}
