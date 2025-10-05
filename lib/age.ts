export const AGE_TABS = ["0-2","3-4","5-7","8+"] as const;
export type AgeKey = typeof AGE_TABS[number];

export const activitiesByAge: Record<AgeKey, { id:string; title:string; desc:string }[]> = {
  "0-2": [
    { id:"tacto_som", title:"Toque & som", desc:"Texturas suaves e sons calmos para explorar." },
    { id:"espelho", title:"Hora do espelho", desc:"Caretas e nomes para vínculo e reconhecimento." },
    { id:"cesta_tesouros", title:"Cesta dos tesouros", desc:"Objetos seguros do dia a dia para investigar." }
  ],
  "3-4": [
    { id:"caca_cores", title:"Caça-cores", desc:"Procure objetos da mesma cor pela casa." },
    { id:"faz_conta", title:"Faz de conta", desc:"Casinha com almofadas e histórias." },
    { id:"hortinha", title:"Mini-horta", desc:"Plante feijão no algodão e observe o crescimento." }
  ],
  "5-7": [
    { id:"chef_junior", title:"Chef júnior", desc:"Sanduíche colorido contando ingredientes." },
    { id:"equilibrio", title:"Desafio do equilíbrio", desc:"Trilha de fita no chão para coordenação." },
    { id:"diario", title:"Diário do dia", desc:"Desenhe o momento favorito de hoje." }
  ],
  "8+": [
    { id:"curta", title:"Projeto curta", desc:"Vídeo de 1 min contando uma história." },
    { id:"vulcao", title:"Missão científica", desc:"Vulcão com bicarbonato e vinagre." },
    { id:"metas", title:"Plano da semana", desc:"Liste 3 metas: escola, casa e diversão." }
  ]
};

export const productRecs: Record<AgeKey, { type:"book"|"toy"; title:string; blurb:string; amazon:string; shopee:string }[]> = {
  "0-2": [
    { type:"book", title:"Meu Primeiro Livrinho de Contrastes", blurb:"Estimula visão e foco.", amazon:"#", shopee:"#"},
    { type:"toy",  title:"Móbile de berço", blurb:"Calma e rastreio visual.", amazon:"#", shopee:"#"}
  ],
  "3-4": [
    { type:"book", title:"A Lagarta Comilona", blurb:"Sequência e contagem.", amazon:"#", shopee:"#"},
    { type:"toy",  title:"Blocos de encaixe grandes", blurb:"Coordenação e imaginação.", amazon:"#", shopee:"#"}
  ],
  "5-7": [
    { type:"book", title:"O Menino que Aprendeu a Ver", blurb:"Percepção e sensibilidade.", amazon:"#", shopee:"#"},
    { type:"toy",  title:"Quebra-cabeça 60–100 peças", blurb:"Foco e estratégia.", amazon:"#", shopee:"#"}
  ],
  "8+": [
    { type:"book", title:"Diário de um Banana", blurb:"Humor que engaja leitura.", amazon:"#", shopee:"#"},
    { type:"toy",  title:"Kit de experiências simples", blurb:"Curiosidade científica.", amazon:"#", shopee:"#"}
  ]
};
