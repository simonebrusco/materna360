'use client';
import useIdeaDone from '../hooks/useIdeaDone';

export default function IdeaCard({ idea, age, place }) {
  const { done } = useIdeaDone({ age, place });

  function onComplete(){
    done(idea.id);
  }

  return (
    <div className="rounded-2xl p-3 bg-white shadow-sm">
      <div className="font-medium mb-1">{idea.title}</div>
      <p className="text-sm opacity-80 mb-2">{idea.summary}</p>
      <button className="px-3 py-1 rounded-full bg-black text-white text-sm" onClick={onComplete}>
        Concluir
      </button>
    </div>
  );
}
