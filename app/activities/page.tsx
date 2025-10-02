"use client";
import SectionTitle from "@/components/ui/SectionTitle";
import ActivitiesList from "@/components/activities/ActivitiesList";

export default function ActivitiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <SectionTitle>Atividades</SectionTitle>
      <ActivitiesList />
    </div>
  );
}
