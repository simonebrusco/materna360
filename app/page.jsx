// app/page.jsx  (SERVER)
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}
