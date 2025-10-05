// Client-only simple pagination utility
export function clientPaginate(items, page, pageSize = 6) {
  const safe = Array.isArray(items) ? items : [];
  const p = Math.max(1, Number(page) || 1);
  const end = p * Math.max(1, Number(pageSize) || 6);
  return { items: safe.slice(0, end), hasMore: safe.length > end };
}
