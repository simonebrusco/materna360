'use client';
import { useState, useCallback } from 'react';
import PlannerDrawer from './PlannerDrawer';

export default function PlannerCard(){
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  function onKey(e){
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(); }
  }

  return (
    <>
      <div
        className="card-press planner-cta"
        role="button"
        tabIndex={0}
        aria-label="Abrir planner do dia"
        onClick={openDrawer}
        onKeyDown={onKey}
      >
        <strong className="planner-cta-title">Planner</strong>
        <span className="planner-cta-subtle">Anote, salve e agende</span>
      </div>
      <PlannerDrawer open={open} onClose={closeDrawer} />
    </>
  );
}
