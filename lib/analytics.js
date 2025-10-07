let enabled = true;

// --- Adaptadores (todos opcionais; só disparam se existirem) ---
function sinkConsole(evt, props) {
  if (!enabled) return;
  try { console.info('[m360][analytics]', evt, props || {}); } catch {}
}
function sinkGA4(evt, props) {
  if (!enabled) return;
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // GA4: event(name, params)
    window.gtag('event', evt, props || {});
  }
}
function sinkAmplitude(evt, props) {
  if (!enabled) return;
  const amp = (typeof window !== 'undefined' && window.amplitude && window.amplitude.getInstance) ? window.amplitude.getInstance() : null;
  if (amp && amp.logEvent) amp.logEvent(evt, props || {});
}

// --- Normalizador (garante padrão nos nomes) ---
function norm(name = '') {
  return String(name).toLowerCase().replace(/\s+/g, '_').replace(/[^\w:._-]/g, '');
}

// --- API pública ---
export function trackEvent(name, props = {}) {
  const evt = norm(name);
  // não enviar PII
  const safe = scrub(props);
  sinkConsole(evt, safe);
  sinkGA4(evt, safe);
  sinkAmplitude(evt, safe);
}

export function trackRoute(path, props = {}) {
  trackEvent('route:view', { path, ...props });
}

export function setEnabled(v) { enabled = !!v; }

// remove campos sensíveis
function scrub(obj = {}) {
  const ban = ['email','phone','cpf','token','address'];
  const out = {};
  for (const k of Object.keys(obj || {})) {
    if (ban.includes(k.toLowerCase())) continue;
    out[k] = obj[k];
  }
  return out;
}

// Expor debug manual
if (typeof window !== 'undefined') {
  window.m360 = window.m360 || {};
  window.m360.track = trackEvent;
  window.m360.analyticsEnabled = () => enabled;
}
