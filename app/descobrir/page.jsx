"use client";

import { useState } from "react";
import IdeasForm from "../../components/discover/IdeasForm";
import { getLastAge, getLastPlace } from "../../lib/storage";

export default function Descobrir(){
  const [age, setAge] = useState(getLastAge() || "3-4");
  const [place, setPlace] = useState(getLastPlace() || "Home");

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>
      <IdeasForm age={age} place={place} onChangeAge={setAge} onChangePlace={setPlace} />
    </div>
  );
}
