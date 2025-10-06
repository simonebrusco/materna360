"use client";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import useMessageOfDay from "../../hooks/useMessageOfDay";

export default function MessageOfDayCard({ nameHint = null }) {
  const { motd, refresh } = useMessageOfDay(nameHint);

  return (
    <Card>
      <strong className="motd-title">“Mensagem do dia”</strong>
      <p className="small motd-text">{motd?.body ?? 'Com você, por você. Força.'}</p>
      <Btn onClick={refresh}>Nova mensagem</Btn>
    </Card>
  );
}
