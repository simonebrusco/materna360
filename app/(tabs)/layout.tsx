import '../globals.css';
import Header from '../../components/Header';
import BottomTab from '../../components/BottomTab';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <BottomTab />
    </>
  );
}
