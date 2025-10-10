import "@/styles/globals.css";
import "./globals.css";

import dynamic from "next/dynamic";
import AppHeader from "@/components/layout/AppHeader";

export const metadata = {
  title: "Materna360",
  description: "App para mães reais — que organiza, inspira e acolhe.",
};

const Toaster = dynamic(() => import("@/lib/ui/toast").then(m => m.Toaster), { ssr: false });
const BottomTabBar = dynamic(() => import("@/components/BottomTabBar"), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AppHeader />
        {children}
        <Toaster />
        <BottomTabBar />
        <div aria-hidden="true" className="sr-only">
          BUILD: {new Date().toISOString()}
        </div>
      </body>
    </html>
  );
}
