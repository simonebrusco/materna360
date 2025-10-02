"use client";
import React from "react";

let CheckinCard: React.ComponentType | null = null;
let RelaxingAudios: React.ComponentType | null = null;
let GuidedBreathing: React.ComponentType | null = null;
try { CheckinCard = require("@/components/wellbeing/CheckinCard").default; } catch {}
try { RelaxingAudios = require("@/components/wellbeing/RelaxingAudios").default; } catch {}
try { GuidedBreathing = require("@/components/wellbeing/GuidedBreathing").default; } catch {}

export default function WellbeingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Bem-estar</h1>

      {CheckinCard ? <CheckinCard /> : (
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
          <h2 className="text-lg font-medium">Como você está hoje?</h2>
          <p className="mt-2 text-gray-600">Check-in indisponível no preview.</p>
        </section>
      )}

      {RelaxingAudios ? <RelaxingAudios /> : null}
      {GuidedBreathing ? <GuidedBreathing /> : null}
    </div>
  );
}
