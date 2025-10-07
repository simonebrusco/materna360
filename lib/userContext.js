'use client';
import { get, set, keys } from './storage';

export function getContext(){
  const ctx = get(keys.lastCtx, {});
  return ctx && typeof ctx === 'object' ? ctx : {};
}

export function setContext(patch){
  const prev = getContext();
  const next = { ...prev, ...(patch || {}) };
  set(keys.lastCtx, next);
  return next;
}

export function getName(defaultName = 'Mãe'){
  const n = getContext().name;
  return typeof n === 'string' && n.trim() ? n : defaultName;
}

export function setName(name){
  return setContext({ name: String(name || '').trim() });
}
