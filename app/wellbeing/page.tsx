"use client";

import SectionTitle from "../../components/ui/SectionTitle";
import CheckinCard from "../../components/wellbeing/CheckinCard";

export default function WellbeingPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <SectionTitle>Bem-estar</SectionTitle>
      <CheckinCard />
    </section>
  );
}
