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
        <script dangerouslySetInnerHTML={{__html: `(function(){try{const handleRej=(ev)=>{try{const reason=ev&&(ev.reason||ev.detail||null);const message=reason&&(reason.message||String(reason)||"");const stack=reason&&reason.stack?String(reason.stack):"";if(message&&message.toLowerCase().includes("failed to fetch")&&(stack.toLowerCase().includes("fullstory")||String(reason).toLowerCase().includes("fullstory"))){ev.preventDefault&&ev.preventDefault();ev.stopPropagation&&ev.stopPropagation();console.debug("Suppressed FullStory fetch error (early):",reason);}}catch(e){} };const handleErr=(ev)=>{try{const msg=ev&&ev.message?String(ev.message):"";const src=ev&&ev.filename?String(ev.filename):(ev&&ev.target&&ev.target.src)||"";if(msg.toLowerCase().includes("failed to fetch")&&src.toLowerCase().includes("fullstory")){ev.preventDefault&&ev.preventDefault();ev.stopPropagation&&ev.stopPropagation();console.debug("Suppressed FullStory fetch error (early error):",msg,src);} }catch(e){} };window.addEventListener('unhandledrejection',handleRej,true);window.addEventListener('error',handleErr,true);}catch(e){} })();`}} />
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
