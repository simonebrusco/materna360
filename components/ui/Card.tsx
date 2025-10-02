export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={["rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 p-4 sm:p-6", className].filter(Boolean).join(" ")}>{children}</section>;
}
