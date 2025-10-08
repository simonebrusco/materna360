export const flags = {
  // Core toggles
  newHomeMaternal: true,
  oldHomeWellness: false,

  // Planner & core
  plannerFamily: true,
  todayChecklist: true,
  microtasksToday: true,
  floatingQuickNote: true,

  // Gamification
  gamification: true,

  // Meu Dia Hub modules (enable/disable summary cards)
  careMeditation: true,
  careBreathwork: true,
  careJoy: true,

  // Discover & shop
  discoverIdeas: true,
  discoverShop: true,
  recipesSection: true,

  // Feelings & gratitude
  moodTracker: true,
  gratitudeModule: true,
  affirmations: true,

  // Family & mentoring
  houseRoutine: true,
  childrenProfiles: true,
  professionalsMentoria: true,
};

export function resolveFlagsFromSearch(searchParams){
  const f = { ...flags };
  const hub = searchParams?.get?.('hub');
  const nh = searchParams?.get?.('newHome');
  if (hub === 'full') {
    Object.keys(f).forEach(k => (f[k] = true));
  }
  if (nh === '1') {
    f.newHomeMaternal = true;
  }
  return f;
}

export default flags;
