export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      {children}
    </section>
  );
}
