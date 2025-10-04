import './globals.css';
import TabBar from '../components/TabBar';

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
        <TabBar />
      </body>
    </html>
  );
}
