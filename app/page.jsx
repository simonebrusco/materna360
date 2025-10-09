import { resolveFlagsFromSearch } from "@/lib/flags";
import MaternalHome from "@/components/MaternalHome";

export default async function Page({ searchParams }) {
  const resolvedFlags = resolveFlagsFromSearch?.(searchParams) ?? null;
  return (
    <main className="app-main" style={{ overflow: "visible", paddingTop: "5rem" }}>
      <MaternalHome flags={resolvedFlags} />
    </main>
  );
}
