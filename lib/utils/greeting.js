export function getGreeting(d = new Date()) {
  try {
    const h = d.getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  } catch {
    return "Bom dia";
  }
}
