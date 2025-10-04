export const metadata = { title: "Materna360" };
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
