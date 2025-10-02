export type ProposedPlannerItem = {
  title: string;
  durationMin?: number;
  category?: "brincadeira" | "aprendizado" | "movimento" | "vínculo";
  notes?: string;
};

export const openPlannerAdd = () => {
  document.dispatchEvent(new CustomEvent('planner:add'));
};

export const onPlannerAdd = (handler: () => void) => {
  document.addEventListener('planner:add', handler);
  return () => document.removeEventListener('planner:add', handler);
};

export const proposePlannerItem = (proposal: ProposedPlannerItem) => {
  document.dispatchEvent(new CustomEvent<ProposedPlannerItem>('planner:propose', { detail: proposal }));
};

export const onPlannerPropose = (handler: (proposal: ProposedPlannerItem) => void) => {
  const wrapped = (e: Event) => handler((e as CustomEvent<ProposedPlannerItem>).detail);
  document.addEventListener('planner:propose', wrapped as EventListener);
  return () => document.removeEventListener('planner:propose', wrapped as EventListener);
};
