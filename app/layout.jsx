import './globals.css';
import BottomTabBar from '../components/BottomTabBar';
import { Toaster } from '../lib/ui/toast';

export const metadata = {
  title: 'Materna360',
  description: 'Bem-vinda ao seu espaço de autocuidado e equilíbrio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          {children}
        </main>
        <Toaster />
        <BottomTabBar />
      </body>
    </html>
  );
}
