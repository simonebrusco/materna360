"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SectionTitle from '@/components/ui/SectionTitle';
import ActivitiesList from '@/components/activities/ActivitiesList';
import AgeFilter from '@/components/activities/AgeFilter';

export default function ActivitiesClient({ initialAge }: { initialAge: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [age, setAge] = useState(initialAge);

  useEffect(() => {
    const urlAge = sp.get('age');
    if (urlAge && urlAge !== age) setAge(urlAge);
  }, [sp, age]);

  const onChange = (next: string) => {
    setAge(next);
    router.replace(`${pathname}?age=${encodeURIComponent(next)}`, { scroll: false });
  };

  return (
    <>
      <SectionTitle>Atividades</SectionTitle>
      <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-4">
        <AgeFilter value={age} onChange={onChange} />
      </div>
      <ActivitiesList age={age} />
    </>
  );
}
