// Lightweight planner helpers built on top of lib/storage
import { get, set, keys } from './storage';

function isValidISO(iso){
  return typeof iso === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

function normalizePlanner(value){
  // Accept array (legacy weekly plan), object with days, or plain object
  if (Array.isArray(value)) return { days: value, dates: {} };
  if (value && typeof value === 'object') {
    const days = Array.isArray(value.days) ? value.days : undefined;
    const dates = value.dates && typeof value.dates === 'object' ? value.dates : {};
    const rest = { ...value };
    return { ...rest, days, dates };
  }
  return { days: undefined, dates: {} };
}

export function setDayDone(iso, done){
  const flag = !!done;
  if (!isValidISO(iso)) return;
  const current = normalizePlanner(get(keys.planner, {}));
  const next = {
    ...current,
    dates: {
      ...(current.dates || {}),
      [iso]: { ...(current.dates?.[iso] || {}), done: flag }
    },
    // optional timestamp for audit
    updatedAt: Date.now(),
  };
  set(keys.planner, next);
  return next;
}

export function getDay(iso){
  if (!isValidISO(iso)) return { done: false };
  const current = normalizePlanner(get(keys.planner, {}));
  return current.dates?.[iso] || { done: false };
}
