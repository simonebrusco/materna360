"use client";
import { useEffect } from "react";
import { migrateV1 } from "../lib/storage";

export default function ClientMigrator() {
  useEffect(() => {
    try { migrateV1(); } catch {}
  }, []);
  return null;
}
