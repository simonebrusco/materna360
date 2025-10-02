import BottomNav from "@/components/shell/BottomNav";

export default function WellbeingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
