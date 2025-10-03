import BottomNav from "@/components/shell/BottomNav";
import Container from "../../components/Container";
import FixedHeader from "@/components/shell/FixedHeader";

export const dynamic = "force-static";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <FixedHeader />
      <main className="flex-1 pt-16 pb-24 [padding-bottom:calc(6rem+env(safe-area-inset-bottom))]">
        <Container>
          <div className="space-y-6 sm:space-y-8">
            {children}
          </div>
        </Container>
      </main>
      <BottomNav />
    </div>
  );
}
