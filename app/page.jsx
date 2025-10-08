"use client";

import SafeBoundary from "../components/SafeBoundary";
import MaternalHome from "../components/MaternalHome";
import LegacyHome from "../components/LegacyHome";
import { flags } from "../lib/flags";

function isTrue(v) { return v === true || v === "true" || v === "1"; }

export default function HomePage() {
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const qsForceNew = search?.get("newHome") === "1";
  const envForceNew = isTrue(process.env.NEXT_PUBLIC_FORCE_NEW_HOME);

  const useNew = qsForceNew || envForceNew || isTrue(flags?.newHomeMaternal);
  const useOld = !useNew && isTrue(flags?.oldHomeWellness);

  if (typeof window !== "undefined") {
    try{
      console.log("[Materna360] home-select", {
        newHomeMaternal_flag: flags?.newHomeMaternal,
        oldHomeWellness_flag: flags?.oldHomeWellness,
        qsForceNew,
        envForceNew,
        resolved: useNew ? "MaternalHome" : useOld ? "LegacyHome" : "Fallback",
      });
    }catch{}
  }

  if (useNew) {
    return (
      <SafeBoundary>
        <MaternalHome />
      </SafeBoundary>
    );
  }

  if (useOld) {
    return (
      <SafeBoundary>
        <LegacyHome />
      </SafeBoundary>
    );
  }

  return <main style={{ padding: 24 }}>Materna360</main>;
}
