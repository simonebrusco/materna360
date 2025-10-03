import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Materna360",
  description: "Bem-estar, atividades e planner para mães ocupadas",
};
export const viewport: Viewport = { themeColor: "#f7f5f2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full bg-stone-50">
      <body className="min-h-dvh bg-stone-50 text-stone-800 antialiased">
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
