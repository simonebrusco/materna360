'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { get, set, keys, onUpdate } from '../lib/storage';

const DEFAULTS = {
  breathe:   { on: true,  everyMin: 180 },
  gratitude: { on: true,  at: ['20:00'] },
};

function readPrefs(){ return { ...DEFAULTS, ...(get(keys.reminders, {})||{}) }; }
function savePrefs(p){ set(keys.reminders, p); return p; }
function readLast(){ return get(keys.lastSeen, {}) || {}; }
function writeLast(v){ set(keys.lastSeen, v); }

function nowHM(){
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

export default function useReminders(){
  const [prefs, setPrefs] = useState(readPrefs);
  const [last, setLast] = useState(readLast);
  const timers = useRef([]);

  const update = useCallback((next) => { setPrefs(savePrefs(next)); }, []);
  const setBreatheEvery = useCallback((min) => update({ ...prefs, breathe:{...prefs.breathe, everyMin: min, on:true} }), [prefs, update]);
  const setGratitudeAt = useCallback((times) => update({ ...prefs, gratitude:{...prefs.gratitude, at: times, on:true} }), [prefs, update]);
  const toggle = useCallback((key, on) => update({ ...prefs, [key]:{...prefs[key], on} }), [prefs, update]);

  useEffect(() => {
    timers.current.forEach(clearTimeout); timers.current = [];
    if (typeof window === 'undefined') return;

    if (prefs.breathe?.on && prefs.breathe.everyMin > 0) {
      const ms = prefs.breathe.everyMin * 60 * 1000;
      const tick = () => {
        window.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'breathe' } }));
        timers.current.push(setTimeout(tick, ms));
      };
      timers.current.push(setTimeout(tick, ms));
    }

    if (prefs.gratitude?.on && Array.isArray(prefs.gratitude.at)) {
      const check = () => {
        const hm = nowHM();
        if (prefs.gratitude.at.includes(hm)) {
          const mem = readLast();
          const dayKey = new Date().toISOString().slice(0,10);
          const stampKey = `${dayKey}:${hm}`;
          if (mem.gratitude !== stampKey) {
            window.dispatchEvent(new CustomEvent('m360:reminder', { detail:{ type:'gratitude' } }));
            mem.gratitude = stampKey; writeLast(mem); setLast(mem);
          }
        }
        timers.current.push(setTimeout(check, 60*1000));
      };
      timers.current.push(setTimeout(check, 5*1000));
    }

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [prefs]);

  useEffect(() => onUpdate((key)=>{ if (key===keys.reminders||key===keys.lastSeen) { setPrefs(readPrefs()); setLast(readLast()); } }), []);

  return { prefs, last, update, setBreatheEvery, setGratitudeAt, toggle };
}
