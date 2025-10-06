"use client";
import { useEffect } from "react";
import { migrateV1 } from "../lib/storage";

export default function ClientMigrator() {
  useEffect(() => {
    try {
      migrateV1();
    } catch (e) {
      console.warn('m360:migration error', e);
    }
  }, []);
  return null;
}
