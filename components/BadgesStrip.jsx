'use client';
import useBadges from '../hooks/useBadges';

const LABELS = {
  conexao: 'Conexão',
  cuidado: 'Cuidado',
  equilibrio: 'Equilíbrio',
  gratidao: 'Gratidão',
};

export default function BadgesStrip(){
  const badges = useBadges();
  const ids = ['conexao','cuidado','equilibrio','gratidao'];

  return (
    <div className="grid-2">
      {ids.map(id => {
        const b = badges?.[id] || { progress:0, target:1, level:null };
        const pct = Math.min(100, Math.round((Number(b.progress||0) / Math.max(1, Number(b.target||1))) * 100));
        return (
          <div key={id} className="card" style={{padding:16}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontWeight:600}}>{LABELS[id]}</span>
              <span className="small" style={{opacity:.7}}>{b.level ? String(b.level).toUpperCase() : '—'}</span>
            </div>
            <div className="m360-progress">
              <div className="m360-progress-fill" style={{ width: pct + '%' }} />
            </div>
            <div className="small" style={{marginTop:6,opacity:.7}}>{Number(b.progress||0)} / {Number(b.target||1)}</div>
          </div>
        );
      })}
    </div>
  );
}
