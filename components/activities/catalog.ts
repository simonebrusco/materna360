export type DemoActivity = {
  id: string;
  title: string;
  minutes?: number;
  materials?: string[];
  summary?: string;
  category?: "brincadeira" | "aprendizado" | "movimento" | "vínculo";
};

export const CATALOG: Record<string, DemoActivity[]> = {
  "0–6m": [
    { id: "t0", title: "Caras e caretas", minutes: 5, summary: "Expressões simples em frente ao bebê", category: "vínculo" },
  ],
  "6–9m": [
    { id: "t1", title: "Brincar de esconder", minutes: 5, materials: ["Fralda"], summary: "Esconde e aparece com sorriso", category: "brincadeira" },
  ],
  "9–12m": [
    { id: "t2", title: "Bater palmas", minutes: 5, summary: "Imitar ritmos simples", category: "movimento" },
  ],
  "12–18m": [
    { id: "t3", title: "Empilhar potes", minutes: 8, materials: ["Potes"], summary: "Empilhar e derrubar", category: "aprendizado" },
  ],
  "18–24m": [
    { id: "t4", title: "Sons dos animais", minutes: 6, materials: ["Figuras"], summary: "Imitar sons e apontar", category: "aprendizado" },
  ],
  "2–3a": [
    { id: "b1", title: "Torre de blocos", minutes: 10, materials: ["Blocos"], summary: "Construa uma torre juntos", category: "brincadeira" },
    { id: "h1", title: "História curta", minutes: 5, materials: ["Livro"], summary: "Leitura com perguntas simples", category: "vínculo" },
  ],
  "3–4a": [
    { id: "c1", title: "Cores na mesa", minutes: 8, materials: ["Lápis de cor", "Papel"], summary: "Classificar por cor", category: "aprendizado" },
  ],
  "4–5a": [
    { id: "m1", title: "Siga o líder", minutes: 10, summary: "Movimentos e imitações", category: "movimento" },
  ],
  "5–6a": [
    { id: "a1", title: "Caça às letras", minutes: 12, materials: ["Papéis", "Caneta"], summary: "Procurar letras pela casa", category: "aprendizado" },
  ],
};
