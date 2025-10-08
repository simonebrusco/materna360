// Helper utilities for Materna360 actions
export type PlannerEntry = {
  id: string;
  dateISO: string;
  title: string;
  kind: "note" | "task" | "event";
  scope?: "casa" | "filhos" | "eu";
  tags?: string[];
  done?: boolean;
};

const STORE = "m360:planner";

export const todayISO = () => new Date().toISOString().split("T")[0];
export const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export function readPlanner(): PlannerEntry[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || "[]");
    return Array.isArray(raw) ? (raw as any)?.flat?.() ?? raw : [];
  } catch {
    return [];
  }
}

export function writePlanner(entries: PlannerEntry[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(entries));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("m360:planner:refresh"));
  } catch {}
}

export function addPlannerEntry(e: Omit<PlannerEntry, "id" | "dateISO"> & { dateISO?: string }) {
  const entry: PlannerEntry = { id: uid(), dateISO: e.dateISO || todayISO(), ...e } as PlannerEntry;
  const all = readPlanner();
  writePlanner([entry, ...all]);
  return entry;
}

// UI helpers
export function openPlanner(scope?: "casa" | "filhos" | "eu") {
  try {
    window.dispatchEvent(new CustomEvent("m360:planner:open", { detail: { tab: scope } }));
  } catch {}
}
export function toast(msg: string) {
  try {
    window.dispatchEvent(new CustomEvent("m360:toast", { detail: { msg } }));
  } catch {}
}
export function badge(key: string, label?: string) {
  try {
    window.dispatchEvent(new CustomEvent("m360:badge", { detail: { key, label: label || key } }));
  } catch {}
}
