'use client';
import { useEffect, useRef } from 'react';
import { get, set, keys, onUpdate } from '../lib/storage';

// Defaults seguros (não dependem de nada externo)
const DEFAULTS = {
  breathe:   { on: true,  everyMin: 180 }, // a cada 3h
  gratitude: { on: true,  at: ['20:00'] }, // às 20:00
};

function readPrefs() {
  return { ...DEFAULTS, ...(get(keys.reminders, {}) || {}) };
}
function savePrefs(p) {
  set(keys.reminders, p);
  return p;
}
function readLast() {
  return get(keys.lastSeen, {}) || {};
}
function writeLast(v) {
  set(keys.lastSeen, v);
}

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
    // monta listeners para se atualizar quando alguém mexer nas prefs
    const off = onUpdate((key) => {
      if (key === keys.reminders || key === keys.lastSeen) {
        // reinicia agendamento quando prefs mudarem
        setup();
      }
    });

    function clearAll() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }

    function scheduleBreathe(prefs) {
      if (!prefs.breathe?.on || !prefs.breathe.everyMin) return;
      const ms = Math.max(1, Number(prefs.breathe.everyMin)) * 60 * 1000;
      const tick = () => {
        window.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'breathe' } }));
        timers.current.push(setTimeout(tick, ms));
      };
      timers.current.push(setTimeout(tick, ms));
    }

    function scheduleGratitude(prefs) {
      if (!prefs.gratitude?.on || !Array.isArray(prefs.gratitude.at)) return;
      const check = () => {
        const hm = nowHM();
        if (prefs.gratitude.at.includes(hm)) {
          const mem = readLast();
          const stampKey = `${todayISO()}:${hm}`;
          if (mem.gratitude !== stampKey) {
            window.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'gratitude' } }));
            mem.gratitude = stampKey;
            writeLast(mem);
          }
        }
        timers.current.push(setTimeout(check, 60 * 1000)); // checa a cada minuto
      };
      timers.current.push(setTimeout(check, 5 * 1000));
    }

    function setup() {
      clearAll();
      const prefs = readPrefs();
      // garante defaults persistidos (idempotente)
      savePrefs(prefs);
      scheduleBreathe(prefs);
      scheduleGratitude(prefs);
    }

    setup();
    return () => { clearAll(); off?.(); };
  }, []);

  // agente invisível
  return null;
}
