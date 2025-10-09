"use client";
import React, { useState } from "react";

export default function QuadCard({
  title, subtitle, icon, children, defaultOpen = false
}: {
  title: string; subtitle?: string; icon?: React.ReactNode;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <section className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                        border border-black/5 p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon ? <div className="text-[20px]">{icon}</div> : null}
          <div>
            <h3 className="text-[18px] font-semibold text-[#2F3A56]">{title}</h3>
            {subtitle ? <p className="text-[13px] text-[#6B7280]">{subtitle}</p> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          className="h-9 px-3 rounded-full bg-white border border-black/10 shadow-sm
                     text-[13px] text-[#2F3A56] hover:bg-black/5 transition"
        >
          {open ? "Fechar" : "Abrir"}
        </button>
      </header>

      <div
        className={`grid transition-all duration-200 ease-out overflow-hidden
                    ${open ? "mt-4 grid-cols-3 gap-4 max-h-[320px] opacity-100"
                           : "mt-0 grid-cols-3 gap-0 max-h-0 opacity-0"}`}
      >
        {children}
      </div>
    </section>
  );
}
