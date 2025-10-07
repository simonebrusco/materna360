"use client";
import { useEffect, useState } from "react";
import { messageOfDay } from "../lib/messageOfDay";
export default function MessageOfDay(){
  const [msg,setMsg]=useState(" ");
  useEffect(()=>setMsg(messageOfDay(new Date())),[]);
  return <p className="small">{msg}</p>;
}
