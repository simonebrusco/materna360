import "./globals.css";

export const metadata = {
  title: "Materna360",
  description: "App para mães reais — que organiza, inspira e acolhe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
        <div aria-hidden="true" className="sr-only">
          BUILD: {new Date().toISOString()}
        </div>
      </body>
    </html>
  );
}
