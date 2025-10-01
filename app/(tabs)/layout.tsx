import Header from '../../components/Header';
import BottomTab from '../../components/BottomTab';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6">{children}</main>
      <BottomTab />
    </>
  );
}
