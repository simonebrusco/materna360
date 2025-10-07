import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import DevErrorSuppressor from '../components/DevErrorSuppressor';
import Image from 'next/image';
import Link from 'next/link';
import ClientMigrator from '../components/ClientMigrator';
import NextDynamic from 'next/dynamic';

const ToastHost = NextDynamic(() => import('../components/ToastHost'), { ssr: false });
const ReminderToasts = NextDynamic(() => import('../components/ReminderToasts'), { ssr: false });
// ❌ comente temporariamente
// import dynamic from 'next/dynamic';
// const AnalyticsBinder = dynamic(() => import('../components/AnalyticsBinder'), { ssr:false });
// const RemindersAgent = dynamic(() => import('../components/RemindersAgent'), { ssr:false });

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
        {/* <AnalyticsBinder /> */}
        {/* <RemindersAgent /> */}
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
        <ToastHost />
        <ReminderToasts />
        <DevErrorSuppressor />
        <BottomTabBar />
      </body>
    </html>
  );
}
