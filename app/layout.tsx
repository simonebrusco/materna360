import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Materna360',
  description: 'Next.js + Tailwind starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} h-full bg-stone-50`}>
      <body className="text-gray-900 antialiased">
        <div data-build-stamp className="sr-only">BUILD: {new Date().toISOString()}</div>
        <header className="mx-auto max-w-2xl px-4 pt-4">
          {/* Inline Materna1000_300.svg logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 300"
            className="block h-7 md:h-8 w-auto object-contain opacity-95"
            role="img"
            aria-label="Materna360"
          >
            <g fill="none" fillRule="evenodd">
              <path fill="#2F3A56" d="M0 0h1000v300H0z" />
              <path fill="#FF6F61" d="M100 150c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50" />
              <text x="180" y="170" fill="#FFF" fontFamily="Inter, system-ui, sans-serif" fontSize="72" fontWeight="600">
                Materna360
              </text>
            </g>
          </svg>

          <p className="mt-1 text-[15px] text-[color:var(--brand-navy)]/80">
            Que bom ter você aqui, vamos juntos criar momentos especiais hoje.
          </p>
        </header>
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
