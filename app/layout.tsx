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
          <div>
            {/* Inline logo (navy background + coral dot + wordmark) */}
            <svg viewBox="0 0 106 32" aria-label="Materna360" role="img" className="block h-7 md:h-8 w-auto opacity-95">
              <rect rx="6" width="106" height="32" fill="#2F3A56" />
              <circle cx="12" cy="16" r="5" fill="#FF6F61" />
              <text x="24" y="20" fill="#FFFFFF" fontSize="12" fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif">
                Materna360
              </text>
            </svg>

            {/* keep the subline below */}
            <p className="mt-1 text-[15px] text-[color:var(--brand-navy)]/80">
              Que bom ter você aqui, vamos juntos criar momentos especiais hoje.
            </p>
          </div>
        </header>
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
