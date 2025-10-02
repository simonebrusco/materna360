import Header from '../../components/Header';
import BottomTab from '../../components/BottomTab';
import Container from '../../components/Container';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pt-14 pb-20">
        <Container>
          {children}
        </Container>
      </main>
      <BottomTab />
    </div>
  );
}
