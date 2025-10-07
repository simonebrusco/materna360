'use client';
import { useEffect, useRef } from 'react';
import { get, set, keys, onUpdate } from '../lib/storage';

// Defaults (idempotentes)
const DEFAULTS = {
  breathe:   { on: true,  everyMin: 180 }, // 3h
  gratitude: { on: true,  at: ['20:00'] }, // 20:00
};

function readPrefs() {
  const p = get(keys.reminders, {});
  return { ...DEFAULTS, ...(p || {}) };
}
function savePrefs(p) { set(keys.reminders, p); return p; }

function readLast() { return get(keys.lastSeen, {}) || {}; }
function writeLast(v) { set(keys.lastSeen, v); }

function todayISO(d = new Date()){
  const z = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return z.toISOString().slice(0,10);
}
function nowHM(){
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export default function RemindersAgent() {
  const timers = useRef([]);

  useEffect(() => {
    const win = typeof window !== 'undefined' ? window : null;
    if (!win) return;

    const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

    const scheduleBreathe = (prefs) => {
      if (!prefs.breathe?.on || !prefs.breathe.everyMin) return;
      const ms = Math.max(1, Number(prefs.breathe.everyMin)) * 60 * 1000;
      const tick = () => {
        try { win.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'breathe' } })); } catch {}
        timers.current.push(setTimeout(tick, ms));
      };
      timers.current.push(setTimeout(tick, ms));
    };

    const scheduleGratitude = (prefs) => {
      if (!prefs.gratitude?.on || !Array.isArray(prefs.gratitude.at)) return;
      const check = () => {
        const hm = nowHM();
        if (prefs.gratitude.at.includes(hm)) {
          const mem = readLast();
          const stampKey = `${todayISO()}:${hm}`;
          if (mem.gratitude !== stampKey) {
            try { win.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'gratitude' } })); } catch {}
            mem.gratitude = stampKey;
            writeLast(mem);
          }
        }
        timers.current.push(setTimeout(check, 60 * 1000)); // checa por minuto
      };
      timers.current.push(setTimeout(check, 5 * 1000));
    };

    const setup = () => {
      clearAll();
      const prefs = savePrefs(readPrefs()); // persiste defaults se faltar algo
      scheduleBreathe(prefs);
      scheduleGratitude(prefs);
    };

    // Reagenda quando prefs mudarem
    const off = onUpdate((key) => {
      if (key === keys.reminders || key === keys.lastSeen) setup();
    });

    setup();
    return () => { clearAll(); off?.(); };
  }, []);

  return null; // invisível
}
