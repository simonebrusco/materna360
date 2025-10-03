export default function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={[
        "font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)] mb-2 sm:mb-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h2>
  );
}
