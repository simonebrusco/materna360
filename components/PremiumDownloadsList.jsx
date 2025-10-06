'use client';
import usePremiumDownloads from '../hooks/usePremiumDownloads';

export default function PremiumDownloadsList(){
  const { premium, freeList, premList, quota, requestDownload } = usePremiumDownloads();

  const list = premium ? [...freeList, ...premList] : [...freeList];

  return (
    <div className="space-y-2">
      {!premium && (
        <div className="text-xs opacity-70">
          Free: {quota.remaining} download(s) hoje. Conteúdos Premium requerem upgrade ✨
        </div>
      )}

      {list.map(item => (
        <div key={item.id} className="rounded-2xl p-3 bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="font-medium">{item.title}</div>
            <div className="text-xs opacity-70">{item.type.toUpperCase()} · {item.tier === 'premium' ? 'Premium' : 'Free'}</div>
          </div>
          <a
            href={item.url}
            download
            onClick={(e) => {
              const res = requestDownload(item.id);
              if (!res.ok) {
                e.preventDefault();
              }
            }}
            className="px-3 py-1 rounded-full text-sm bg-black text-white"
          >
            Baixar
          </a>
        </div>
      ))}
    </div>
  );
}
