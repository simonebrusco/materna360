// lib/badges.js

/**
 * Returns true if an action type belongs to the Descobrir (discover) domain.
 * Recognized types: 'idea_done', 'play', 'learn'.
 */
export function isDescobrirAction(type){
  return ['idea_done','play','learn'].includes(String(type || ''));
}

export default { isDescobrirAction };
