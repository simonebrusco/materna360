"use client";

import { useCallback, useEffect, useState } from "react";
import { getActions, getGratitudes, getMoodHistory } from "../lib/storage";
import { calcScore } from "../lib/score";

/**
 * Reads current score data from localStorage and returns helper to refresh
 * @returns {{score:number, weeklyMood:number, actionsToday:number, refresh: () => void}}
 */
export function useScore() {
  const [score, setScore] = useState(0);
  const [weeklyMood, setWeeklyMood] = useState(0);
  const [actionsToday, setActionsToday] = useState(0);

  const compute = useCallback(() => {
    if (typeof window === "undefined") return;
    const actions = getActions();
    const moodHistory = getMoodHistory();
    const gratitudes = getGratitudes();
    const { score, weeklyMood, actionsToday } = calcScore({ actions, moodHistory, gratitudes });
    setScore(score);
    setWeeklyMood(weeklyMood);
    setActionsToday(actionsToday);
  }, []);

  useEffect(() => {
    compute();
  }, [compute]);

  return { score, weeklyMood, actionsToday, refresh: compute };
}
