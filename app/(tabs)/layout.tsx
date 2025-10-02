import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import BottomTab from '../../components/BottomTab';
import Container from '../../components/Container';

const FetchGuard = dynamic(() => import('../../components/FetchGuard'), { ssr: false });

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <FetchGuard />
      <main className="flex-1 pt-14 pb-24">
        <Container>
          <div className="space-y-6 sm:space-y-8">
            {children}
          </div>
        </Container>
      </main>
      <BottomTab />
    </div>
  );
}
