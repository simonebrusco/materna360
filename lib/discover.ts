export function dailyTip(seedDate=new Date()){
  const tips=[
    "Dica: transforme tarefas em brincadeira por 5 minutos.",
    "Respiração 4-4: inspire 4s, segure 4s, expire 4s, segure 4s.",
    "Mini pausa consciente: observe 3 coisas que você vê e 2 que você ouve."
  ];
  const day=Math.floor(seedDate.getTime()/86400000);
  return tips[day % tips.length];
}
