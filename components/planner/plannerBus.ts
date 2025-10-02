export const openPlannerAdd = () => {
  document.dispatchEvent(new CustomEvent('planner:add'));
};

export const onPlannerAdd = (handler: () => void) => {
  document.addEventListener('planner:add', handler);
  return () => document.removeEventListener('planner:add', handler);
};

export type PlannerProposedItem = {
  title: string;
  category?: 'brincadeira' | 'aprendizado' | 'movimento' | 'vínculo';
  durationMin?: number;
  notes?: string;
};

export const proposePlannerItem = (payload: PlannerProposedItem) => {
  document.dispatchEvent(new CustomEvent('planner:propose', { detail: payload }));
};

export const onPlannerPropose = (handler: (p: PlannerProposedItem) => void) => {
  const wrapped = (e: Event) => handler((e as CustomEvent).detail as PlannerProposedItem);
  document.addEventListener('planner:propose', wrapped as EventListener);
  return () => document.removeEventListener('planner:propose', wrapped as EventListener);
};
