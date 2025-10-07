'use client';
import { get, set } from './storage';

function dayStamp(d = new Date()) {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  return new Date(y, m, day).toISOString().slice(0, 10);
}

const DEFAULT_KEY = 'm360:dailyPlanData';

export function getDayData(k = DEFAULT_KEY) {
  const all = get(k, {}) || {};
  const today = dayStamp();
  const v = all[today];
  if (v && typeof v === 'object') {
    const note = typeof v.note === 'string' ? v.note : '';
    const items = Array.isArray(v.items) ? v.items : [];
    const events = Array.isArray(v.events) ? v.events : [];
    return { note, items, events };
  }
  return { note: '', items: [], events: [] };
}

export function saveDayData(data, k = DEFAULT_KEY) {
  const today = dayStamp();
  const all = get(k, {}) || {};
  const note = typeof data?.note === 'string' ? data.note : '';
  const items = Array.isArray(data?.items) ? data.items : [];
  const events = Array.isArray(data?.events) ? data.events : [];
  const next = { note, items, events };
  all[today] = next;
  set(k, all);
  return all[today];
}

export function setNote(note, k = DEFAULT_KEY) {
  const cur = getDayData(k);
  return saveDayData({ ...cur, note: String(note || '') }, k);
}

export function addItem(txt, k = DEFAULT_KEY) {
  const cur = getDayData(k);
  const item = { id: Date.now(), txt: String(txt || '').trim() };
  const items = item.txt ? [...cur.items, item] : cur.items;
  return saveDayData({ ...cur, items }, k);
}

export function addEvent({ time, txt }, k = DEFAULT_KEY) {
  const cur = getDayData(k);
  const ev = { id: Date.now(), time: String(time || '').trim(), txt: String(txt || '').trim() };
  const events = ev.txt ? [...cur.events, ev] : cur.events;
  return saveDayData({ ...cur, events }, k);
}
