export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={["bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 space-y-4", className].filter(Boolean).join(" ")}>{children}</section>;
}
