"use client";

import { flags } from "../lib/flags";
import MaternalHome from "../components/MaternalHome";
import LegacyHome from "../components/LegacyHome";
import SafeBoundary from "../components/SafeBoundary";

export default function HomePage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const forceNew = search?.get("newHome") === "1";

  if (forceNew || flags.newHomeMaternal) {
    return (
      <SafeBoundary>
        <MaternalHome />
      </SafeBoundary>
    );
  }

  if (flags.oldHomeWellness) {
    return (
      <SafeBoundary>
        <LegacyHome />
      </SafeBoundary>
    );
  }

  return (
    <main style={{ padding: 32, textAlign: "center" }}>
      <p>Bem-vinda ao Materna360 💗</p>
      <p>Ative uma das homes nas flags para visualizar o conteúdo.</p>
    </main>
  );
}
