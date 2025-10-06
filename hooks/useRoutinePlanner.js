"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { isBrowser, readJSON, writeJSON } from "../lib/storage";

// Storage key for routine planner (date-keyed)
const ROUTINE_KEY = "m360:routinePlanner:v1";

// Sections supported
const SECTIONS = ["morning","afternoon","evening"];

function todayKey() {
  try {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch { return ""; }
}

function ptBrDayName() {
  try {
    const d = new Date();
    const x = d.getDay(); // 0..6 (Dom..Sáb)
    const names = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
    return names[x] || "";
  } catch { return ""; }
}

function ensureDayShape(day) {
  const base = { done: false, morning: [], afternoon: [], evening: [] };
  if (!day || typeof day !== "object") return base;
  return {
    done: !!day.done,
    morning: Array.isArray(day.morning) ? day.morning : [],
    afternoon: Array.isArray(day.afternoon) ? day.afternoon : [],
    evening: Array.isArray(day.evening) ? day.evening : [],
  };
}

function newTask(text) {
  return { id: Date.now() + "_" + Math.random().toString(36).slice(2), text: String(text || "").trim(), done: false };
}

export default function useRoutinePlanner() {
  const [store, setStore] = useState({}); // { [dateKey]: { done, morning, afternoon, evening } }
  const [key, setKey] = useState("");

  // Initialize
  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const initial = readJSON(ROUTINE_KEY, {}) || {};
      setStore(typeof initial === "object" && initial ? initial : {});
      setKey(todayKey());
    } catch {
      setStore({});
      setKey(todayKey());
    }
  }, []);

  // Persist on changes
  useEffect(() => {
    if (!isBrowser()) return;
    try { writeJSON(ROUTINE_KEY, store); } catch {}
  }, [store]);

  const day = useMemo(() => ptBrDayName(), []);

  const data = useMemo(() => {
    const d = ensureDayShape(store[key]);
    // Guarantee sections exist even if missing
    SECTIONS.forEach((s) => { if (!Array.isArray(d[s])) d[s] = []; });
    return d;
  }, [store, key]);

  const addTask = useCallback((section, text) => {
    const sec = SECTIONS.includes(section) ? section : null;
    const value = String(text || "").trim();
    if (!sec || !value) return;
    setStore((prev) => {
      const next = { ...(prev || {}) };
      const cur = ensureDayShape(next[key]);
      next[key] = {
        ...cur,
        [sec]: [...cur[sec], newTask(value)],
      };
      return next;
    });
  }, [key]);

  const toggle = useCallback((section, id) => {
    const sec = SECTIONS.includes(section) ? section : null;
    if (!sec || !id) return;
    setStore((prev) => {
      const next = { ...(prev || {}) };
      const cur = ensureDayShape(next[key]);
      next[key] = {
        ...cur,
        [sec]: cur[sec].map((t) => t.id === id ? { ...t, done: !t.done } : t),
      };
      return next;
    });
  }, [key]);

  const markDay = useCallback((flag) => {
    const val = !!flag;
    setStore((prev) => {
      const next = { ...(prev || {}) };
      const cur = ensureDayShape(next[key]);
      next[key] = { ...cur, done: val };
      return next;
    });
  }, [key]);

  return { day, data, addTask, toggle, markDay };
}
