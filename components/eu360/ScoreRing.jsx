"use client";

import { useEffect, useMemo, useState } from "react";
import { getWeek } from "../../lib/planner";
import { hasGratitudeToday } from "../../lib/gratitude";
import { hasMoodToday } from "../../lib/mood";

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function ScoreRing({ size = 120 }) {
  const [score, setScore] = useState(0);

  const compute = () => {
    const mood = hasMoodToday() ? 5 : 0;
    const grat = hasGratitudeToday() ? 10 : 0;
    const week = getWeek();
    const today = week.find((d) => d.isToday);
    const plan = today && today.completed ? 15 : 0;
    const total = clamp((mood + grat + plan) * 5, 0, 500);
    setScore(total);
  };

  useEffect(() => {
    compute();
    const onFocus = () => compute();
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onFocus);
    };
  }, []);

  const radius = useMemo(() => (size - 18) / 2, [size]); // similar inner padding as CSS ring
  const stroke = 12;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score / 500;
  const dash = circumference * pct;

  return (
    <div style={{ width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="#fff"
          stroke="rgba(13,27,42,.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="var(--magenta)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center", fontWeight: 800, color: "var(--navy)" }}>
        {score}
      </div>
    </div>
  );
}
