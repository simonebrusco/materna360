export type Idea = { id: string; title: string; desc: string; duration?: string };

const bank: Record<string, Record<string, Idea[]>> = {
  "0-2": {
    Casa: [
      { id: "02c1", title: "Texturas mágicas", desc: "Monte um cesto com tecidos e esponjas para explorar sensações.", duration: "5–10 min" },
      { id: "02c2", title: "Sons da casa", desc: "Descubram sons suaves com potes e colheres de silicone." },
    ],
    Parque: [{ id: "02p1", title: "Folhas e cores", desc: "Colete folhas e compare formatos, tamanhos e cores." }],
    "Ar livre": [{ id: "02a1", title: "Bolhas de sabão", desc: "Estimule o olhar e a coordenação acompanhando bolhas." }],
    Escola: [{ id: "02e1", title: "Roda de cantigas", desc: "Brinque com gestos simples em músicas curtas." }],
  },
  "3-4": {
    Casa: [
      { id: "34c1", title: "Dança livre", desc: "Escolha uma música calma e inventem movimentos." },
      { id: "34c2", title: "Encaixar e empilhar", desc: "Use blocos/argolas para coordenação motora fina." },
    ],
    Parque: [{ id: "34p1", title: "Caça ao tesouro simples", desc: "Procure objetos por cor e forma no gramado." }],
    "Ar livre": [{ id: "34a1", title: "Pintura com água", desc: "Pincéis + água para 'pintar' muros/chão." }],
    Escola: [{ id: "34e1", title: "Histórias curtas", desc: "Livrinhos com figuras grandes e contrastes." }],
  },
  "5-7": {
    Casa: [{ id: "57c1", title: "Teatro de fantoches", desc: "Criem personagens e uma mini-história." }],
    Parque: [{ id: "57p1", title: "Corrida de formas", desc: "Desenhe estações no chão e cumpra desafios." }],
    "Ar livre": [{ id: "57a1", title: "Desafio das sombras", desc: "Brinque de seguir e mudar sombras." }],
    Escola: [{ id: "57e1", title: "Tangram simples", desc: "Monte figuras e conte a história delas." }],
  },
  "8+": {
    Casa: [{ id: "8c1", title: "Chef júnior", desc: "Receita fria simples (iogurte com frutas)." }],
    Parque: [{ id: "8p1", title: "Mapa do parque", desc: "Desenhe um mapa e esconda pistas." }],
    "Ar livre": [{ id: "8a1", title: "Fotografia natureba", desc: "Caça a padrões de natureza com celular." }],
    Escola: [{ id: "8e1", title: "Quadrinhos", desc: "Crie uma tirinha com começo, meio e fim." }],
  },
};

export function generateIdeas(age: string, context: string): Idea[] {
  const ctx = (bank as any)?.[age]?.[context] || [];
  // Future: call AI here
  return ctx.slice(0, 6);
}
