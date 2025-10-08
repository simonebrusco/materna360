"use client";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { allMessages } from "../../lib/messages";

export default function MessageOfDayCard({ nameHint = null, showTitle = true, showButton = true }) {
  const [motd, setMotd] = useState("");

  useEffect(() => {
    const msgs = allMessages();
    const dayIndex = Math.floor(Date.now() / 86400000);
    const idx = msgs.length ? (dayIndex % msgs.length) : 0;
    const body = msgs[idx] || "";
    const safeName = typeof nameHint === "string" ? nameHint.trim() : "";
    const personalized = safeName ? `${safeName}, ${body.charAt(0).toLowerCase()}${body.slice(1)}` : body;
    setMotd(personalized);
  }, [nameHint]);

  function refresh() {
    const msgs = allMessages();
    const dayIndex = Math.floor(Date.now() / 86400000);
    const idx = msgs.length ? (dayIndex % msgs.length) : 0;
    const body = msgs[idx] || "";
    const safeName = typeof nameHint === "string" ? nameHint.trim() : "";
    const personalized = safeName ? `${safeName}, ${body.charAt(0).toLowerCase()}${body.slice(1)}` : body;
    setMotd(personalized);
  }

  return (
    <Card>
      {showTitle ? <strong className="motd-title">“Mensagem do dia”</strong> : null}
ai_main_7d7878c4bdcc
      <p className="small motd-text"><span aria-hidden className="motd-quote">“</span>{motd?.body ?? "..."}</p>

      <p className="small motd-text" style={{fontStyle:"italic", color:"#1E1E1E"}}>
        <span className="motd-quote" aria-hidden>“</span>{motd || "..."}<span className="motd-quote" aria-hidden>”</span>
      </p>
main
      {showButton ? <Btn onClick={refresh}>Nova mensagem</Btn> : null}
    </Card>
  );
}
