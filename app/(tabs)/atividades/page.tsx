import { Suspense } from 'react';
import ActivitiesClient from './ActivitiesClient';

export const dynamic = 'force-static';

export default async function Page() {
  return (
    <Suspense fallback={<> </>}>
      <ActivitiesClient />
    </Suspense>
  );
}
