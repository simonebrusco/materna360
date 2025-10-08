"use client";
import { flags } from "../lib/flags";
import MaternalHome from "../components/MaternalHome";
import LegacyHome from "../components/LegacyHome";
import SafeBoundary from "../components/SafeBoundary";
import ReleaseStamp from "../components/ReleaseStamp";

export default function HomePage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const forceNew = search?.get("newHome") === "1";
  const useNew = forceNew || flags.newHomeMaternal;

  console.log("[Materna360] resolvedHome:", useNew ? "MaternalHome" : "LegacyHome", { newHomeFlag: flags?.newHomeMaternal, href: typeof window!=="undefined" ? location.href : "" });

  if (useNew) {
    return (
      <SafeBoundary>
        <MaternalHome />
        <ReleaseStamp />
      </SafeBoundary>
    );
  }

  return (
    <SafeBoundary>
      <LegacyHome />
      <ReleaseStamp />
    </SafeBoundary>
  );
}
