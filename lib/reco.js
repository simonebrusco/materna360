export const picks = {
  book: { title: 'Maternidade Real', desc: 'Leve e acolhedor', amazon: null, shopee: null },
  toy:  { title: 'Blocos sensoriais', desc: 'Coordenação & foco', amazon: null, shopee: null },
};

export function getPick(kind) {
  return picks[kind] || null;
}
