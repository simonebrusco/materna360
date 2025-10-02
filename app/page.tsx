import React from "react";

// Try to import the Today page from (tabs)
let Today: React.ComponentType | null = null;
try { Today = require("./(tabs)/page").default; } catch {}

export default function RootPage() {
  if (Today) return <Today />;
  // Safe fallback (never 404)
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Hoje</h1>
      <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
        <h2 className="text-lg font-medium">Conteúdo indisponível no preview</h2>
        <p className="mt-2 text-gray-600">A página de Hoje não pôde ser importada. Verifique app/(tabs)/page.tsx.</p>
      </section>
    </div>
  );
}
