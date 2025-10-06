import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import { Toaster } from '../lib/ui/toast';
import DevErrorSuppressor from '../components/DevErrorSuppressor';
import Image from 'next/image';
import Link from 'next/link';
import ClientMigrator from '../components/ClientMigrator';
import BadgesLevelToast from '../components/BadgesLevelToast';

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
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              function shouldSuppress(msg, src, stack){
                if(!msg) return false;
                var m = String(msg).toLowerCase();
                if(!m.includes('failed to fetch')) return false;
                if(src && String(src).toLowerCase().includes('fullstory')) return true;
                if(stack && String(stack).toLowerCase().includes('fullstory')) return true;
                return false;
              }
              window.addEventListener('error', function(ev){
                try{
                  var msg = ev && ev.message ? String(ev.message) : '';
                  var src = ev && ev.filename ? String(ev.filename) : '';
                  var stack = ev && ev.error && ev.error.stack ? String(ev.error.stack) : '';
                  if(shouldSuppress(msg, src, stack)){
                    ev.preventDefault && ev.preventDefault();
                    ev.stopPropagation && ev.stopPropagation();
                    console.debug('Suppressed FullStory fetch error (early):', msg, src);
                  }
                }catch(e){}
              }, true);

              window.addEventListener('unhandledrejection', function(ev){
                try{
                  var reason = ev && (ev.reason || ev.detail || null);
                  var msg = reason && (reason.message || String(reason)) || '';
                  var stack = reason && reason.stack ? String(reason.stack) : '';
                  if(shouldSuppress(msg, '', stack)){
                    ev.preventDefault && ev.preventDefault();
                    ev.stopPropagation && ev.stopPropagation();
                    console.debug('Suppressed FullStory fetch rejection (early):', reason);
                  }
                }catch(e){}
              }, true);
            }catch(e){}
          })();
        ` }} />
      </head>
      <body>
        <ClientMigrator />
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
        <BadgesLevelToast />
        <DevErrorSuppressor />
        <BottomTabBar />
      </body>
    </html>
  );
}
