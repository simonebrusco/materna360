"use client";
import { useProfile } from "@/hooks/useProfile";

export default function HeaderGreeting() {
  const { profile } = useProfile();
  const name = (profile.motherName || "").trim() || "Simone";
  return <div className="text-2xl font-semibold">Olá, {name} 💛</div>;
}
