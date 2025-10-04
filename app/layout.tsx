import React from "react";
export const metadata = { title: "Materna360" };
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{__html: `(() => {
  try {
    window.addEventListener('unhandledrejection', function(e) {
      try {
        const reason = e && e.reason;
        const msg = reason && (reason.message || String(reason));
        if (msg && msg.indexOf('Failed to fetch') !== -1) {
          e.preventDefault();
          console.warn('Suppressed unhandledrejection:', msg);
        }
      } catch (err) {
        // ignore
      }
    });
    window.addEventListener('error', function(ev) {
      try {
        const msg = ev && ev.message;
        if (msg && msg.indexOf('Failed to fetch') !== -1) {
          ev.preventDefault && ev.preventDefault();
          console.warn('Suppressed window error:', msg);
        }
      } catch (err) {}
    });
  } catch (err) {}
})();`}} />
      </head>
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}
