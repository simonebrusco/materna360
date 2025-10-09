import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Materna360",
  description: "App para mães reais — que organiza, inspira e acolhe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
        <div aria-hidden="true" className="sr-only" suppressHydrationWarning>
          BUILD: {new Date().toISOString()}
        </div>
      </body>
    </html>
  );
}
