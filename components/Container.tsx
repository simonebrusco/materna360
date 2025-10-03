export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={["container space-y-6", className].filter(Boolean).join(" ")}>{children}</div>;
}
