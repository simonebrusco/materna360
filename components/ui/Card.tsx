export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={["bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4", className].filter(Boolean).join(" ")}>{children}</section>;
}
