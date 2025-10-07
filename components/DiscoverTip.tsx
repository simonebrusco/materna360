"use client";
import { useEffect, useState } from "react";
import { dailyTip } from "../lib/discover";
export default function DiscoverTip(){
  const [tip,setTip]=useState("");
  useEffect(()=>setTip(dailyTip(new Date())),[]);
  return <div className="card"><h3 className="card-title">Descubra</h3><p className="card-sub">{tip}</p></div>;
}
