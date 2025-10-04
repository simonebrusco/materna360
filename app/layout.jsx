import './globals.css';

export const metadata = {
  title: 'Materna360',
  description: 'Bem-vinda ao seu espaço de bem-estar e equilíbrio.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
