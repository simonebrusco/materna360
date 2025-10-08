"use client";
import React from "react";

export default function ToastsGateway(){
  React.useEffect(()=>{
    const onToast = (e: any) => {
      const msg = e?.detail?.msg || "Feito!";
      try {
        // @ts-ignore optional global toast
        if (window?.Toast?.show) { window.Toast.show(msg); return; }
      } catch {}
      try { alert(msg); } catch {}
    };
    const onBadge = (e: any) => {
      const { key, label } = e?.detail || {};
      try {
        const storeKey = "m360:badges";
        const raw = localStorage.getItem(storeKey);
        const list = raw ? JSON.parse(raw) : [];
        if (!list.find((b: any) => b?.key === key)) {
          list.push({ key, label: label || key, dateISO: new Date().toISOString() });
          localStorage.setItem(storeKey, JSON.stringify(list));
        }
      } catch {}
      const msg = label ? `Badge conquistada: ${label} ✨` : "Badge registrada ✨";
      try {
        // @ts-ignore optional toast
        if (window?.Toast?.show) { window.Toast.show(msg); return; }
      } catch {}
      try { console.info(msg); } catch {}
    };
    window.addEventListener("m360:toast", onToast as any);
    window.addEventListener("m360:badge", onBadge as any);
    return () => {
      window.removeEventListener("m360:toast", onToast as any);
      window.removeEventListener("m360:badge", onBadge as any);
    };
  },[]);
  return null;
}
