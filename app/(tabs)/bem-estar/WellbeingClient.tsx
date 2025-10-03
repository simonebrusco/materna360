"use client";
import CheckinCard from '@/components/wellbeing/CheckinCard';

export default function WellbeingClient() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Bem-estar</h1>
      <CheckinCard />
    </div>
  );
}
