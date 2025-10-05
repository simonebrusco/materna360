const bank = {
  "0-2": {
    "Casa": [
      {id:"02c1", title:"Texturas mágicas", desc:"Cesto com tecidos e esponjas para explorar sensações.", duration:"5–10 min"},
      {id:"02c2", title:"Sons da casa", desc:"Sons suaves com potes e colheres de silicone."}
    ],
    "Parque":[{id:"02p1", title:"Folhas e cores", desc:"Colete folhas e compare formatos e cores."}],
    "Ar livre":[{id:"02a1", title:"Bolhas de sabão", desc:"Acompanhe bolhas; coordenação e foco."}],
    "Escola":[{id:"02e1", title:"Roda de cantigas", desc:"Gestos simples em músicas curtas."}]
  },
  "3-4": {
    "Casa":[
      {id:"34c1", title:"Dança livre", desc:"Música calma + movimentos inventados."},
      {id:"34c2", title:"Encaixar e empilhar", desc:"Blocos/argolas para coordenação fina."}
    ],
    "Parque":[{id:"34p1", title:"Caça ao tesouro simples", desc:"Procure objetos por cor e forma."}],
    "Ar livre":[{id:"34a1", title:"Pintura com água", desc:"Pincel + água para 'pintar' chão/muro."}],
    "Escola":[{id:"34e1", title:"Histórias curtas", desc:"Livros com figuras grandes e contrastes."}]
  },
  "5-7": {
    "Casa":[{id:"57c1", title:"Teatro de fantoches", desc:"Criem personagens e uma mini-história."}],
    "Parque":[{id:"57p1", title:"Corrida de formas", desc:"Estações desenhadas no chão com desafios."}],
    "Ar livre":[{id:"57a1", title:"Desafio das sombras", desc:"Mudar e seguir sombras."}],
    "Escola":[{id:"57e1", title:"Tangram simples", desc:"Montar figuras e contar a história."}]
  },
  "8+": {
    "Casa":[{id:"8c1", title:"Chef júnior", desc:"Receita fria simples (iogurte com frutas)."}],
    "Parque":[{id:"8p1", title:"Mapa do parque", desc:"Desenhar mapa e esconder pistas."}],
    "Ar livre":[{id:"8a1", title:"Fotografia natureba", desc:"Caça a padrões com o celular."}],
    "Escola":[{id:"8e1", title:"Quadrinhos", desc:"Crie uma tirinha com começo, meio e fim."}]
  }
};

export function generateIdeas(age, context){
  const ctx = bank?.[age]?.[context] || [];
  // Future: swap to AI keeping same signature
  return ctx.slice(0, 6);
}
