"use client";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import AgeFilter, { getDefaultAge } from "./AgeFilter";
import { CATALOG } from "./catalog";
import { openPlannerAdd, proposePlannerItem } from "@/components/planner/plannerBus";
import { useEffect, useMemo } from "react";

export default function ActivitiesList() {
  const router = useRouter();
  const params = useSearchParams();
  const ageParam = params.get("age");
  const age = ageParam ?? getDefaultAge();

  useEffect(() => {
    if (!ageParam) {
      const q = new URLSearchParams(Array.from(params.entries()));
      q.set("age", age);
      router.replace(`?${q.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageParam]);

  const list = useMemo(() => CATALOG[age] ?? [], [age]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl ring-1 ring-gray-200 p-4">
        <AgeFilter
          value={age}
          onChange={(v) => {
            const q = new URLSearchParams(Array.from(params.entries()));
            q.set("age", v);
            router.replace(`?${q.toString()}`);
          }}
        />
      </div>

      <SectionTitle>Brincadeiras para hoje</SectionTitle>

      {list.length === 0 ? (
        <Card>
          <p className="text-sm text-gray-600">Nenhuma atividade cadastrada para {age} ainda.</p>
          <div className="mt-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => router.replace(`?age=${getDefaultAge()}`)}
            >
              Ver outra faixa
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((act) => (
            <Card key={act.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{act.title}</h3>
                  <div className="mt-1 text-sm text-gray-600">
                    {act.minutes ? <span className="mr-3">⏱ {act.minutes} min</span> : null}
                    {act.summary ? <span>{act.summary}</span> : null}
                  </div>
                  {Array.isArray(act.materials) && act.materials.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {act.materials.map((m, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-white px-2 py-0.5 text-xs text-gray-600 ring-1 ring-gray-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="sm" type="button" onClick={() => openPlannerAdd()}>
                    Start
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() =>
                      proposePlannerItem({
                        title: act.title,
                        durationMin: act.minutes,
                        category: act.category,
                        notes: "Atividade da aba Atividades",
                      })
                    }
                  >
                    Save to Planner
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
