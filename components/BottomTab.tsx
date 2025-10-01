import Link from 'next/link';

export default function BottomTab() {
  return (
    <nav className="sticky bottom-0 z-40 bg-white rounded-t-2xl shadow-[0_-1px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 sm:px-6 lg:px-8 py-3 supports-[padding:max(0px,env(safe-area-inset-bottom))]:pb-[max(0px,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-2xl">
        <ul className="grid grid-cols-4 gap-2 text-sm text-gray-700">
          <li>
            <Link href="/" className="flex items-center justify-center py-2 hover:text-gray-900">Hoje</Link>
          </li>
          <li>
            <Link href="/atividades" className="flex items-center justify-center py-2 hover:text-gray-900">Atividades</Link>
          </li>
          <li>
            <Link href="/bem-estar" className="flex items-center justify-center py-2 hover:text-gray-900">Bem-Estar</Link>
          </li>
          <li>
            <Link href="/perfil" className="flex items-center justify-center py-2 hover:text-gray-900">Perfil</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
