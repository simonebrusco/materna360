"use client";
import React from "react";
import CheckinCard from "@/components/wellbeing/CheckinCard";

export default function WellbeingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="sm:hidden">
        <a href="/" className="text-xs text-gray-500 underline">← Voltar à Home</a>
      </div>
      <h1 className="text-2xl font-semibold">Bem-estar</h1>
      <CheckinCard />
    </div>
  );
}
