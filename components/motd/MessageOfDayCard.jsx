"use client";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import useMessageOfDay from "../../hooks/useMessageOfDay";

export default function MessageOfDayCard({ nameHint = null }) {
  const { motd, refresh } = useMessageOfDay(nameHint);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timer = null;
    function onUpdated() {
      setBlink(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setBlink(false), 400);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("m360:motd:updated", onUpdated);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (typeof window !== "undefined") {
        window.removeEventListener("m360:motd:updated", onUpdated);
      }
    };
  }, []);

  return (
    <Card className={blink ? "animate-pulse" : ""}>
      <strong className="motd-title">“Mensagem do dia”</strong>
      <p className="small motd-text">{motd?.body ?? 'Com você, por você. Força.'}</p>
      <Btn onClick={refresh}>Nova mensagem</Btn>
    </Card>
  );
}
