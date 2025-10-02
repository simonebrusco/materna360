export const openPlannerAdd = () => {
  document.dispatchEvent(new CustomEvent('planner:add'));
};

export const onPlannerAdd = (handler: () => void) => {
  document.addEventListener('planner:add', handler);
  return () => document.removeEventListener('planner:add', handler);
};
