'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { record } from '../lib/actions';

const FREE_DAILY_LIMIT = 3;
const QUOTA_KEY = 'm360:downloads:quota:v1';
const PLAN_KEY = 'm360:plan:v1';
const HISTORY_KEY = 'm360:downloads:history:v1';

function todayKey(){
  try {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  } catch { return '1970-01-01'; }
}

function readQuota(){
  if (typeof window === 'undefined') return { day: todayKey(), used: 0 };
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    const v = raw ? JSON.parse(raw) : null;
    if (!v || v.day !== todayKey()) return { day: todayKey(), used: 0 };
    return { day: v.day, used: Math.max(0, Number(v.used) || 0) };
  } catch { return { day: todayKey(), used: 0 }; }
}

function writeQuota(q){
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(QUOTA_KEY, JSON.stringify(q)); } catch {}
}

function readPlan(){
  if (typeof window === 'undefined') return { premium: false };
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    if (!raw) return { premium: false };
    const v = JSON.parse(raw);
    return { premium: !!v?.premium };
  } catch { return { premium: false }; }
}

function readHistory(){
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const v = raw ? JSON.parse(raw) : null;
    if (!v || !Array.isArray(v.items)) return { items: [] };
    return { items: v.items };
  } catch { return { items: [] }; }
}

function writeHistory(h){
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch {}
}

export default function usePremiumDownloads(){
  const [premium, setPremium] = useState(false);
  const [quota, setQuota] = useState({ limit: FREE_DAILY_LIMIT, remaining: FREE_DAILY_LIMIT, used: 0 });
  const [history, setHistory] = useState({ items: [] });

  useEffect(() => {
    const p = readPlan();
    setPremium(!!p.premium);
    const q = readQuota();
    const remaining = Math.max(0, FREE_DAILY_LIMIT - q.used);
    setQuota({ limit: FREE_DAILY_LIMIT, remaining, used: q.used });
    setHistory(readHistory());
  }, []);

  const freeList = useMemo(() => [
    { id: 'dl-free-01', title: 'Guia de Rotina Semanal (PDF)', type: 'pdf', tier: 'free', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'dl-free-02', title: 'Checklist de Cuidados (PDF)', type: 'pdf', tier: 'free', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?#2' },
    { id: 'dl-free-03', title: 'Template de Planejamento (TXT)', type: 'txt', tier: 'free', url: 'https://www.w3.org/TR/PNG/iso_8859-1.txt' },
  ], []);

  const premList = useMemo(() => [
    { id: 'dl-prem-01', title: 'E-book Completo de Rotinas', type: 'pdf', tier: 'premium', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?#premium1' },
    { id: 'dl-prem-02', title: 'Pack de Cartazes Imprimíveis', type: 'zip', tier: 'premium', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?#premium2' },
  ], []);

  const requestDownload = useCallback((itemId) => {
    const all = [...freeList, ...premList];
    const item = all.find(x => x.id === itemId);
    if (!item) return { ok: false };

    const plan = readPlan();
    const isPremiumUser = !!plan.premium;

    if (isPremiumUser) {
      try { record('download', { id: itemId, tier: item.tier }); } catch {}
      const entry = { id: item.id, title: item.title, type: item.type, at: Date.now() };
      const current = readHistory();
      const items = [entry, ...(current.items || [])].slice(0, 50);
      const next = { items };
      writeHistory(next);
      setHistory(next);
      return { ok: true };
    }

    if (item.tier === 'premium') {
      try { window.dispatchEvent(new Event('m360:upgrade:prompt')); } catch {}
      try { record('download_blocked', { id: itemId, reason: 'premium_required' }); } catch {}
      return { ok: false };
    }

    const q = readQuota();
    if (q.day !== todayKey()) { q.day = todayKey(); q.used = 0; }
    if (q.used >= FREE_DAILY_LIMIT) {
      try { window.dispatchEvent(new Event('m360:downloads:limit')); } catch {}
      try { record('download_blocked', { id: itemId, reason: 'daily_limit' }); } catch {}
      return { ok: false };
    }

    const nextQuota = { day: q.day, used: q.used + 1 };
    writeQuota(nextQuota);
    const remaining = Math.max(0, FREE_DAILY_LIMIT - nextQuota.used);
    setQuota({ limit: FREE_DAILY_LIMIT, remaining, used: nextQuota.used });
    try { record('download', { id: itemId, tier: item.tier }); } catch {}

    const entry = { id: item.id, title: item.title, type: item.type, at: Date.now() };
    const current = readHistory();
    const items = [entry, ...(current.items || [])].slice(0, 50);
    const next = { items };
    writeHistory(next);
    setHistory(next);

    return { ok: true };
  }, [freeList, premList]);

  return { premium, freeList, premList, quota, requestDownload, history };
}
