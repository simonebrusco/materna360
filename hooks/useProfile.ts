"use client";
import { useEffect, useState } from "react";

type Profile = { motherName: string };

const KEY = "materna360:profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({ motherName: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (next: Partial<Profile>) => {
    const merged = { ...profile, ...next };
    setProfile(merged);
    try {
      localStorage.setItem(KEY, JSON.stringify(merged));
    } catch {}
  };

  return { profile, save };
}
