import MaternalHome from "@/components/MaternalHome";
import LegacyHome from "@/components/LegacyHome";
import { flags } from "@/lib/flags";

export default function Page({ searchParams = {} }) {
  const enableNew = String((searchParams?.newHome ?? "")).trim() === "1";
  const useNew = enableNew || flags.newHomeMaternal === true;

  return (
    <main>
      {useNew ? <MaternalHome /> : <LegacyHome />}
    </main>
  );
}
