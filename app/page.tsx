import React from "react";
import BottomNav from "@/components/shell/BottomNav";

// Try to import the Today page from (tabs)
let Today: React.ComponentType | null = null;
try { Today = require("./(tabs)/page").default; } catch {}

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {Today ? (
          <Today />
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <h1 className="text-2xl font-semibold">Hoje</h1>
            <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
              <h2 className="text-lg font-medium">Conteúdo indisponível no preview</h2>
              <p className="mt-2 text-gray-600">A página de Hoje não pôde ser importada. Verifique app/(tabs)/page.tsx.</p>
            </section>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
