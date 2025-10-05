"use client";
import { useState } from "react";
import AgeTabs from "../../components/discover/AgeTabs";
import PlaceChips from "../../components/discover/PlaceChips";
import IdeasPanel from "../../components/discover/IdeasPanel";
import Vitrine from "../../components/discover/Vitrine";
import { getLastAge, setLastAge, getLastPlace, setLastPlace } from "../../lib/storage";
import { productCatalog } from "../../lib/products";

export default function Descobrir(){
  const [age, setAge] = useState(getLastAge());
  const [place, setPlace] = useState(getLastPlace());

  function onAge(next){ setAge(next); setLastAge(next); }
  function onPlace(next){ setPlace(next); setLastPlace(next); }

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <AgeTabs value={age} onChange={onAge} />
      <PlaceChips value={place} onChange={onPlace} />

      <div className="space"></div>

      <IdeasPanel age={age} place={place} />

      <div className="space"></div>

      <Vitrine categories={Object.keys(productCatalog)} productsByCategory={productCatalog} />
    </div>
  );
}
