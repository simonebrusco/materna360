import { flags } from "../lib/flags";
import MaternalHome from "../components/MaternalHome";
import SafeBoundary from "../components/SafeBoundary";
import { resolveFlagsFromSearch } from "@/lib/flags";

export default async function HomePage({ searchParams }) {
  const resolvedFlags = resolveFlagsFromSearch?.(searchParams) ?? null;
  return (
    <SafeBoundary>
      <MaternalHome flags={resolvedFlags} />
    </SafeBoundary>
  );
}
