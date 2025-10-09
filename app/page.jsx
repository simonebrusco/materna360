import MaternalHome from "@/components/MaternalHome";
import { resolveFlagsFromSearch } from "@/lib/flags";
import MaternalHome from "@/components/MaternalHome";

export default async function Page({ searchParams }) {
  const resolvedFlags = resolveFlagsFromSearch?.(searchParams) ?? null;
  return (
    <main>
      <MaternalHome flags={resolvedFlags} />
    </main>
  );
}
