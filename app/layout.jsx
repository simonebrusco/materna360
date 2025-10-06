import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import { Toaster } from '../lib/ui/toast';
import DevErrorSuppressor from '../components/DevErrorSuppressor';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Materna360",
  description: "Um espaço de cuidado, acolhimento e conexão para mães.",
  icons: {
    icon: "/favicon.ico",
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
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
        <main>
          {children}
        </main>
        <Toaster />
        <DevErrorSuppressor />
        <BottomTabBar />
      </body>
    </html>
  );
}
