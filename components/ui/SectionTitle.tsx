export default function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={[
        "font-display text-[clamp(18px,1.8vw,22px)] leading-[1.4] font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)] mb-2 sm:mb-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h2>
  );
}
