"use client";
import { readJSON, writeJSON } from "./storage";

export function grantBadge(id, label){
  try{
    const bid = String(id||"");
    const blabel = String(label||"");
    if (!bid) return;
    const list = Array.isArray(readJSON("m360:badges", [])) ? readJSON("m360:badges", []) : [];
    const exists = list.some(b => String(b?.id) === bid);
    const next = exists ? list : [...list, { id: bid, label: blabel }];
    writeJSON("m360:badges", next);
    try { window.dispatchEvent(new CustomEvent("m360:badges:leveled", { detail: { id: bid } })); } catch {}
  } catch {}
}

export default { grantBadge };
