'use client';
import { showToast as baseShowToast } from './ui/toast';

export function showToast(arg, opts) {
  if (typeof arg === 'string') return baseShowToast(arg, opts || {});
  const o = arg && typeof arg === 'object' ? arg : {};
  const message = typeof o.message === 'string' && o.message ? o.message : (typeof o.title === 'string' ? o.title : '');
  const duration = typeof o.duration === 'number' ? o.duration : (opts && typeof opts.duration === 'number' ? opts.duration : undefined);
  return baseShowToast(message, { duration });
}
