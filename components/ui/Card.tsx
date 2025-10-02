export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6 ${className}`}>
      {children}
    </section>
  );
}
