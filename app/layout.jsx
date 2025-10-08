import './globals.css';
import dynamic from 'next/dynamic';
const BottomTabBar = dynamic(() => import('../components/BottomTabBar'), { ssr: false });
const Toaster = dynamic(() => import('../lib/ui/toast').then(mod => ({ default: mod.Toaster })), { ssr: false });
const DevErrorSuppressor = dynamic(() => import('../components/DevErrorSuppressor'), { ssr: false });
import Image from 'next/image';
import Link from 'next/link';
const ClientMigrator = dynamic(() => import('../components/ClientMigrator'), { ssr: false });
// ❌ comente temporariamente
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
        {process.env.NODE_ENV === 'development' && (
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              try{
                if(typeof window === 'undefined') return;
                function filterConsole(fn,args){
                  try{
                    var joined = args.map(function(a){return typeof a === 'string' ? a : String(a);}).join(' ');
                    if(joined.toLowerCase().includes('failed to fetch') && joined.toLowerCase().includes('fullstory')){
                      return;
                    }
                  }catch(e){}
                  fn.apply(console, args);
                }
                var origErr = console.error, origWarn = console.warn;
                console.error = function(){ filterConsole(origErr, Array.prototype.slice.call(arguments)); };
                console.warn = function(){ filterConsole(origWarn, Array.prototype.slice.call(arguments)); };
                function onUnhandledRejection(ev){
                  try{
                    var reason = ev && (ev.reason || ev.detail || null);
                    var message = reason && (reason.message || String(reason));
                    var stack = reason && reason.stack ? String(reason.stack) : '';
                    if(message && message.toLowerCase().includes('failed to fetch') && stack.toLowerCase().includes('fullstory')){
                      ev.preventDefault && ev.preventDefault();
                      ev.stopPropagation && ev.stopPropagation();
                      console.debug('Suppressed FullStory fetch error (dev):', reason);
                    }
                  }catch(e){}
                }
                function onError(ev){
                  try{
                    var msg = ev && ev.message ? String(ev.message) : '';
                    var src = ev && ev.filename ? String(ev.filename) : '';
                    if(msg.toLowerCase().includes('failed to fetch') && src.toLowerCase().includes('fullstory')){
                      ev.preventDefault && ev.preventDefault();
                      ev.stopPropagation && ev.stopPropagation();
                      console.debug('Suppressed FullStory fetch error (dev error event):', msg, src);
                    }
                  }catch(e){}
                }
                window.addEventListener('unhandledrejection', onUnhandledRejection);
                window.addEventListener('error', onError);
                window.__devErrorSuppressor_restore = function(){ console.error = origErr; console.warn = origWarn; window.removeEventListener('unhandledrejection', onUnhandledRejection); window.removeEventListener('error', onError); };
              }catch(e){}
            })();
          ` }} />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div data-build-stamp className="sr-only">BUILD: {new Date().toISOString()}</div>
        <DevErrorSuppressor />
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
        <Toaster />
        <DevErrorSuppressor />
        <BottomTabBar />
      </body>
    </html>
  );
}
