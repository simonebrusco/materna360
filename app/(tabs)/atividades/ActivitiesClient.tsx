"use client";
import { useSearchParams } from 'next/navigation';
import ActivitiesClientImpl from '@/app/activities/ActivitiesClient';

export default function ActivitiesClient() {
  const sp = useSearchParams();
  const age = sp.get('age') ?? '2–3a';
  return <ActivitiesClientImpl initialAge={age} />;
}
