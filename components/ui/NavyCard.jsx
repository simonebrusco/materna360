"use client";
export default function NavyCard({children, className = "", style, ...props}) {
  return <div className={`card-navy card-press pressable-card-center ${className}`} style={style} {...props}>
    <div className="iconStack">{children}</div>
  </div>;
}
