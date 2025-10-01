import Link from 'next/link';

export default function BottomTab() {
  return (
    <nav className="sticky bottom-0 z-40 bg-white rounded-t-2xl shadow-[0_-1px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 sm:px-6 lg:px-8 py-3 supports-[padding:max(0px,env(safe-area-inset-bottom))]:pb-[max(0px,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-2xl">
        <ul className="mt-6 sm:mt-8 flex items-center justify-center gap-6 text-sm text-gray-700 list-none">
          <li>
            <Link href="/" className="hover:text-indigo-600 transition-colors">Hoje</Link>
          </li>
          <li>
            <Link href="/atividades" className="hover:text-indigo-600 transition-colors">Atividades</Link>
          </li>
          <li>
            <Link href="/bem-estar" className="hover:text-indigo-600 transition-colors">Bem-Estar</Link>
          </li>
          <li>
            <Link href="/perfil" className="hover:text-indigo-600 transition-colors">Perfil</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
