import { Suspense } from 'react';
import WellbeingClient from './WellbeingClient';

export const dynamic = 'force-static';

export default async function Page() {
  return (
    <Suspense fallback={<> </>}>
      <WellbeingClient />
    </Suspense>
  );
}
