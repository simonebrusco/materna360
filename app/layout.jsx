import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import { Toaster } from '../lib/ui/toast';
import DevErrorSuppressor from '../components/DevErrorSuppressor';
import Image from 'next/image';
import Link from 'next/link';
import ClientMigrator from '../components/ClientMigrator';
import AnalyticsBinder from '../components/AnalyticsBinder';

export const metadata = {
  title: "Materna360",
  description: "Bem-vinda ao Materna360 — seu espaço de autocuidado e maternidade consciente.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Materna360",
    description: "Cuidado, acolhimento e conexão.",
    images: ["/1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ff005e" />
      </head>
      <body>
        <ClientMigrator />
        <AnalyticsBinder />
        <header className="brand-header">
          <Link href="/" className="brand-logo-link" aria-label="Materna360">
            <Image
              className="brand-logo"
              src="/1.png"
              alt="Logo Materna360"
              width={180}
              height={60}
              priority
            />
          </Link>
        </header>
        <main className="app-main">
          {children}
        </main>
        <Toaster />
        <DevErrorSuppressor />
        <BottomTabBar />
      </body>
    </html>
  );
}
