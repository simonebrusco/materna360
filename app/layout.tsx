import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Materna360',
  description: 'Next.js + Tailwind starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div data-build-stamp className="sr-only">BUILD: {new Date().toISOString()}</div>
        {children}
      </body>
    </html>
  );
}
