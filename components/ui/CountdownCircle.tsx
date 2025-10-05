"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  duration: number; // seconds
  onComplete?: () => void;
  label?: string;
};

export default function CountdownCircle({ duration, onComplete, label }: Props) {
  const timeoutRef = useRef<any>(null);
  const C = 140; // svg size
  const R = 64;
  const circumference = useMemo(() => 2 * Math.PI * R, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => { onComplete && onComplete(); }, duration * 1000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [duration, onComplete]);

  return (
    <div className="m360-breath-wrap">
      <svg className="m360-breath-svg" viewBox={`0 0 ${C} ${C}`} aria-hidden="true">
        <circle className="m360-breath-track" cx={C/2} cy={C/2} r={R} />
        <circle
          className="m360-breath-progress"
          cx={C/2}
          cy={C/2}
          r={R}
          style={{ strokeDasharray: circumference, strokeDashoffset: "var(--circ)", ["--circ" as any]: circumference, animationDuration: `${duration}s` }}
        />
      </svg>
      {label && <div className="m360-breath-label">{label}</div>}
    </div>
  );
}
