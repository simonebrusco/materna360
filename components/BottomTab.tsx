import Link from 'next/link';

export default function BottomTab() {
  return (
    <nav className="sticky bottom-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t border-gray-200 [padding-bottom:calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <ul className="grid grid-cols-4 gap-2 py-2 text-sm">
          <li><Link href="/" className="inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">Hoje</Link></li>
          <li><Link href="/atividades" className="inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">Atividades</Link></li>
          <li><Link href="/bem-estar" className="inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">Bem-estar</Link></li>
          <li><Link href="/perfil" className="inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">Perfil</Link></li>
        </ul>
      </div>
    </nav>
  );
}
