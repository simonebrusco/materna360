"use client";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { ensureMessage } from "../../lib/messages";

export default function MessageOfDayCard({ nameHint = null }) {
  const [motd, setMotd] = useState(null);

  useEffect(() => {
    const next = ensureMessage(nameHint);
    setMotd(next);
  }, [nameHint]);

  function refresh() {
    const next = ensureMessage(nameHint);
    setMotd(next);
  }

  return (
    <Card>
      <strong className="motd-title">“Mensagem do dia”</strong>
      <p className="small motd-text">{motd?.body ?? "..."}</p>
      <Btn onClick={refresh}>Nova mensagem</Btn>
    </Card>
  );
}
