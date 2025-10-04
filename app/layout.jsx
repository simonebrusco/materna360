import './globals.css';

export const metadata = { title: 'Materna360' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
