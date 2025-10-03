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
        {children}
      </body>
    </html>
  );
}
