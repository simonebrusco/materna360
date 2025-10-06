"use client";
export default function CircleGauge({ value=350, max=1000, size=180, label="Eu360" }){
  const pct = Math.max(0, Math.min(1, value/max));
  const stroke = 10;
  const r = (size/2) - stroke;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <div className="relative" style={{width:size, height:size}}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={r} stroke="#FFE3EC" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke="#FF2B6A" strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${c-dash}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-extrabold" style={{color:"#0D1B2A"}}>{value}</div>
        <div className="text-xs" style={{color:"#0D1B2A", opacity:.6}}>{label}</div>
      </div>
    </div>
  );
}
