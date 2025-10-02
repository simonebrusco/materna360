export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={["mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-3xl space-y-6", className].filter(Boolean).join(" ")}>{children}</div>;
}
