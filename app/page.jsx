import { flags } from "../lib/flags";
import MaternalHome from "../components/MaternalHome";
import LegacyHome from "../components/LegacyHome";
import SafeBoundary from "../components/SafeBoundary";

export default function HomePage() {
  const isBrowser = typeof window !== "undefined";
  let enableNew = flags.newHomeMaternal;
  if (isBrowser) {
    const q = new URLSearchParams(location.search).get("newHome");
    if (q === "1") enableNew = true;
    if (q === "0") enableNew = false;
  }

  if (enableNew) {
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
