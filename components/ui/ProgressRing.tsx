import * as React from 'react';

export function ProgressRing({ value = 0, size = 40, stroke = 6, className = '' }: { value?: number; size?: number; stroke?: number; className?: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <svg width={size} height={size} className={className} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={radius} fill="transparent" stroke="rgba(20,25,40,.08)" strokeWidth={stroke} />
      <circle
        cx={size/2}
        cy={size/2}
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-[color:var(--brand-coral)] transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
  );
}
export default ProgressRing;
