import * as React from "react";

export function ProgressRing({ size=28, stroke=3, value=62, track="rgba(47,58,86,.15)", bar="var(--brand-coral)"}:{
  size?:number; stroke?:number; value?:number; track?:string; bar?:string;
}){
  const r = (size - stroke) / 2; const c = 2*Math.PI*r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped/100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Progresso ${clamped}%`}>
      <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={bar} strokeWidth={stroke} fill="none"
        strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  );
}

export default ProgressRing;
