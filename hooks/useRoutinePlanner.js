'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { get, set, keys, onUpdate } from '../lib/storage';

function todayKey(){ return new Date().toISOString().slice(0,10); }
function ensureDay(obj){
  const base = { morning: [], afternoon: [], evening: [], done: false };
  if (!obj || typeof obj !== 'object') return base;
  return { morning: Array.isArray(obj.morning)?obj.morning:[], afternoon: Array.isArray(obj.afternoon)?obj.afternoon:[], evening: Array.isArray(obj.evening)?obj.evening:[], done: !!obj.done };
}
function computeDone(day){
  const all = [...(day.morning||[]), ...(day.afternoon||[]), ...(day.evening||[])];
  if (all.length === 0) return false;
  return all.every(t => !!t.done);
}
function uid(){ return Date.now()+"_"+Math.random().toString(36).slice(2); }

export default function useRoutinePlanner(dateKey){
  const key = dateKey || todayKey();
  const [state, setState] = useState(()=>{
    const map = get(keys.routine, {});
    return ensureDay(map?.[key]);
  });

  const persist = useCallback((updater)=>{
    const map = get(keys.routine, {});
    const day = ensureDay(map?.[key]);
    const nextDay = updater(day);
    const finalDay = { ...nextDay, done: computeDone(nextDay) };
    const nextMap = { ...(map||{}), [key]: finalDay };
    set(keys.routine, nextMap);
    setState(finalDay);
  }, [key]);

  const addTask = useCallback((section, text)=>{
    const sec = ['morning','afternoon','evening'].includes(section) ? section : 'morning';
    const value = String(text||'').trim(); if (!value) return;
    persist((day)=>{
      const item = { id: uid(), text: value, prio: 1, done: false };
      const list = Array.isArray(day[sec]) ? day[sec].slice() : [];
      list.push(item);
      return { ...day, [sec]: list };
    });
  }, [persist]);

  const toggle = useCallback((section, id)=>{
    const sec = ['morning','afternoon','evening'].includes(section) ? section : 'morning';
    persist((day)=>{
      const list = Array.isArray(day[sec]) ? day[sec].map(it => it.id===id ? { ...it, done: !it.done } : it) : [];
      return { ...day, [sec]: list };
    });
  }, [persist]);

  useEffect(()=>{
    const off = onUpdate((changedKey)=>{
      if (changedKey === keys.routine) {
        const map = get(keys.routine, {});
        setState(ensureDay(map?.[key]));
      }
    });
    return () => { try { off && off(); } catch{} };
  }, [key]);

  return useMemo(()=>({ data: state, addTask, toggle }), [state, addTask, toggle]);
}
