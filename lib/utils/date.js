export function formatDateISO(date) {
  try {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  } catch (e) {
    console.error("Date format error:", e);
    return "";
  }
}
