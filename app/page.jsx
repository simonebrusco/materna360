// app/page.jsx  (SERVER)
import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('./HomeClient'), { ssr: false });

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}
