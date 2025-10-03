"use client";

import Brand from "../Brand";
import { Bell } from "lucide-react";

export default function FixedHeader() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b border-[color:var(--border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      role="banner"
    >
      <div className="container">
        <div className="h-14 flex items-center justify-between gap-3">
          <div className="flex items-center min-w-0">
            <Brand />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-display text-[16px] sm:text-[17px] font-bold tracking-[-0.01em] text-[color:var(--brand-navy)]">
              Today
            </h1>
          </div>
          <div className="shrink-0">
            <button type="button" aria-label="Notificações" className="p-2 rounded-lg text-[color:var(--brand-navy)]/80 hover:bg-gray-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-[color:var(--brand-coral)] focus-visible:outline-offset-2">
              <Bell size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
