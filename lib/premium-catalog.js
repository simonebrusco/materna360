import { get, set, keys } from './storage';

const BASE = [
  // PDFs (type:'pdf')
  { id:'pdf-planner-rotina',    type:'pdf',   title:'Planner da Rotina',                  tier:'premium', url:'/downloads/planner-rotina.pdf' },
  { id:'pdf-checklist-semculpa', type:'pdf',  title:'Checklist Sem Culpa',                tier:'premium', url:'/downloads/checklist-sem-culpa.pdf' },
  { id:'pdf-100-brincadeiras',  type:'pdf',   title:'Guia 100 Brincadeiras',             tier:'premium', url:'/downloads/guia-100-brincadeiras.pdf' },
  { id:'pdf-desenhos-nino',     type:'pdf',   title:'Desenhos do Nino',                   tier:'premium', url:'/downloads/desenhos-nino.pdf' },
  // Áudios (type:'audio') — apenas referência, o play já está no PR 10
  { id:'audio-relax-01',        type:'audio', title:'Relaxamento Suave 01',               tier:'premium', url:'/audio/relax-01.mp3', durationSec:120 },
  { id:'audio-mind-01',         type:'audio', title:'Mindfulness Leve 01',                tier:'premium', url:'/audio/mind-01.mp3',  durationSec:90  },
  // Free samples (opcional)
  { id:'pdf-sample-gratidao',   type:'pdf',   title:'Mini Diário de Gratidão (sample)',   tier:'free',    url:'/downloads/mini-gratidao.pdf' },
];

export function loadCatalog(){
  return get(keys.premiumContent, BASE) || BASE;
}
export function saveCatalog(list){
  set(keys.premiumContent, list);
  return list;
}
export function listByTier(tier){ // 'free' | 'premium' | 'all'
  const list = loadCatalog();
  if (tier === 'all') return list;
  return list.filter(i => i.tier === tier);
}
export function getItem(id){
  return loadCatalog().find(i => i.id === id) || null;
}
