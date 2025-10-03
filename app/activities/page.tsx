export const dynamic = 'force-static';
export const revalidate = 60;

import { Suspense } from 'react';
import ActivitiesClient from './ActivitiesClient';
import ActivitiesSkeleton from './skeleton';

type PageProps = { searchParams?: { age?: string } };

export default async function ActivitiesPage({ searchParams }: PageProps) {
  const age = searchParams?.age ?? '2–3a';
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Suspense fallback={<ActivitiesSkeleton />}> 
        <ActivitiesClient initialAge={age} />
      </Suspense>
    </div>
  );
}
