'use client';
import useFavorites from '../hooks/useFavorites';

export default function IdeaCard({ idea, age, place }) {
  const { check, toggle, quota, premium } = useFavorites('ideas');
  const fav = check(idea.id);

  async function onToggle(){
    const res = await toggle({
      id: idea.id,
      title: idea.title,
      thumb: idea.thumb,
      extra: { age, place }
    });
    if (res.limit) {
      window.dispatchEvent(new CustomEvent('m360:upgrade:prompt', { detail: { reason: 'favorites' } }));
    }
  }

  return (
    <div className="rounded-2xl p-3 bg-white shadow-sm">
      <div className="font-medium mb-1">{idea.title}</div>
      {idea.summary ? <p className="text-sm opacity-80 mb-2">{idea.summary}</p> : null}
      <button
        className={`px-3 py-1 rounded-full text-sm ${fav ? 'bg-black text-white' : 'bg-black/10'}`}
        onClick={onToggle}
        aria-pressed={fav}
      >
        {fav ? 'Favorito' : 'Favoritar'}
      </button>
      {!premium && (
        <div className="text-xs opacity-70 mt-1">
          {quota.used}/{quota.max} hoje (Free)
        </div>
      )}
    </div>
  );
}
