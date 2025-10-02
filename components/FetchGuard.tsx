'use client';
import { useEffect } from 'react';
import { IS_DEV } from '@/lib/runtime';

export default function FetchGuard() {
  useEffect(() => {
    if (!IS_DEV) return;
    const original = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;
        if (url && url.includes('edge.fullstory.com')) {
          try { return await original(input as any, init); } catch { return new Response(null, { status: 204 }); }
        }
        return await original(input as any, init);
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return () => { window.fetch = original; };
  }, []);
  return null;
}
