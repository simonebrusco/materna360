"use client";
import { PropsWithChildren } from "react";
export default function SafeBoundary({ children }: PropsWithChildren) {
  try { return <>{children}</>; }
  catch (e) { console.error("SafeBoundary:", e); return null; }
}
