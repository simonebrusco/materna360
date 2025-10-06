"use client";

"use client";
import { useEffect, useState } from "react";
import { getLastAgeGroup, setLastAgeGroup } from "../../lib/storage.js";

const allowed = ["0-2","3-4","5-7","8+"];

function labelFromAge(age) {
  if (age === "8+") return "8+ anos";
  const [a,b] = age.split("-");
  return `${a} a ${b} anos`;
}

export default function AgeTitle(){
  const [age, setAge] = useState(getLastAgeGroup("3-4"));

  useEffect(() => {
    if (!allowed.includes(age)) return;
    setLastAgeGroup(age);
  }, [age]);

  return (
    <div style={{fontWeight:800,marginBottom:6}}>Atividades para {labelFromAge(age)}</div>
  );
}
