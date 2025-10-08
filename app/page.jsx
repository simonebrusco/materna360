import { flags } from "../lib/flags";
import MaternalHome from "@/components/MaternalHome";
import { resolveFlagsFromSearch } from "@/lib/flags";

export default async function Page({ searchParams }) {
  const resolvedFlags = resolveFlagsFromSearch?.(searchParams) ?? null;
  return <MaternalHome flags={resolvedFlags} />;
}
