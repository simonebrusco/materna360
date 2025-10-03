import { Suspense } from 'react';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-static';

export default async function Page() {
  return (
    <Suspense fallback={<> </>}>
      <ProfileClient />
    </Suspense>
  );
}
