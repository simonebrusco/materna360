import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Materna360',
  description: 'Next.js + Tailwind starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
