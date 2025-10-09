export const flags = {
  // Hub/home
  newHomeMaternal: true,
  oldHomeWellness: true,

  // Planner & core
  plannerFamily: true,
  todayChecklist: true,
  floatingQuickNote: true,
  microtasksToday: true,

  // Gamification
  gamification: true,

  // Meu Dia Hub modules (enable/disable summary cards)
  careMeditation: true,
  careBreathwork: true,
  careJoy: true,
  houseRoutine: true,
  childrenProfiles: true,

  // Wellness & tracking
  moodTracker: true,
  affirmations: true,
  gratitudeModule: true,

  // Discover & shop
  discoverIdeas: true,
  discoverShop: true,
  recipesSection: true,

  // Services
  professionalsMentoria: true,
};

// Resolve flags safely from Next.js searchParams (object) or URLSearchParams
export function resolveFlagsFromSearch(searchParams) {
  const f = { ...flags };
  const get = (key) => {
    if (!searchParams) return undefined;
    if (typeof searchParams.get === "function") return searchParams.get(key);
    return searchParams[key]; // Next 13/14 passes a plain object
  };

  const hub = get("hub");
  const nh = get("newHome");

  if (hub === "full") {
    Object.keys(f).forEach((k) => (f[k] = true));
  }
  if (nh === "1") {
    f.newHomeMaternal = true;
  }
  return f;
}

export default flags;
