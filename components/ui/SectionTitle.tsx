export default function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={[
        "text-lg sm:text-xl font-semibold text-charcoal leading-7 sm:leading-8 mb-2 sm:mb-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </h2>
  );
}
