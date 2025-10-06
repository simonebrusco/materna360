import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import { Toaster } from '../lib/ui/toast';
import DevErrorSuppressor from '../components/DevErrorSuppressor';

export const metadata = {
  title: 'Materna360',
  description: 'Bem-vinda ao seu espaço de autocuidado e equilíbrio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="https://cdn.builder.io/api/v1/image/assets%2F0b0c3be682294df99b4cbd228a5a9c53%2Ffavicon.ico" type="image/x-icon" />
      </head>
      <body>
        <header className="brand-header">
          <a href="/" className="brand-logo-link" aria-label="Materna360">
            <img
              className="brand-logo"
              src="https://cdn.builder.io/api/v1/image/assets%2F0b0c3be682294df99b4cbd228a5a9c53%2F1.png"
              alt="Materna360"
            />
          </a>
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
