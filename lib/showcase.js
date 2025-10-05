export function paginate(items, page=1, perPage=6){
  const p = Math.max(1, Number(page)||1);
  const start = (p-1)*perPage;
  const slice = items.slice(start, start+perPage);
  const total = Math.max(1, Math.ceil(items.length/perPage));
  return { page:p, perPage, total, slice };
}
