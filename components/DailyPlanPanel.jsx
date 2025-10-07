'use client';
import { useEffect, useState } from 'react';
import { getToday, setToday, doneCountWeek } from '../lib/dailyPlan';
import { onUpdate, keys } from '../lib/storage';
import styles from './DailyPlanPanel.module.css';

export default function DailyPlanPanel() {
  const [plan, setPlan] = useState(() => getToday());
  const [weekCount, setWeekCount] = useState(() => doneCountWeek());

  useEffect(() => {
    setPlan(getToday());
    setWeekCount(doneCountWeek());
    const off = onUpdate((key) => {
      if (key === keys.dailyPlan) {
        setPlan(getToday());
        setWeekCount(doneCountWeek());
      }
    });
    return () => off();
  }, []);

  function toggle(part) {
    const next = setToday(part, !plan[part]);
    setPlan(next);
    setWeekCount(doneCountWeek());
  }

  return (
    <div className={styles.panelContainer}>
      <h3 className={styles.title}>Plano do dia</h3>
      <div className={styles.segments}>
        <button
          type="button"
          aria-pressed={plan.morning}
          className={`${styles.segmentBtn} ${plan.morning ? styles.active : ''}`}
          onClick={() => toggle('morning')}
        >
          Manhã
        </button>
        <button
          type="button"
          aria-pressed={plan.afternoon}
          className={`${styles.segmentBtn} ${plan.afternoon ? styles.active : ''}`}
          onClick={() => toggle('afternoon')}
        >
          Tarde
        </button>
        <button
          type="button"
          aria-pressed={plan.evening}
          className={`${styles.segmentBtn} ${plan.evening ? styles.active : ''}`}
          onClick={() => toggle('evening')}
        >
          Noite
        </button>
      </div>
      <div className={styles.meta}>Últimos 7 dias: {weekCount} períodos concluídos</div>
    </div>
  );
}
