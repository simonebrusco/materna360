'use client';
import usePremiumDownloads from '../hooks/usePremiumDownloads';

export default function DownloadsHistory(){
  const { history } = usePremiumDownloads();
  const items = history?.items || [];
  if (!items.length) return null;
  return (
    <div className="mt-4 rounded-2xl p-3 bg-white shadow-sm">
      <div className="font-semibold mb-2">Últimos downloads</div>
      <ul className="space-y-1 text-sm">
        {items.slice(0,6).map(it => (
          <li key={`${it.id}-${it.at}`} className="opacity-80">
            {it.title} <span className="opacity-60">· {String(it.type || '').toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
