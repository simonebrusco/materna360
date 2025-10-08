"use client";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { ensureMessage } from "../../lib/messages";

export default function MessageOfDayCard({ nameHint = null, showTitle = true, showButton = true, className = "", message }) {
  const [motd, setMotd] = useState("");

  function sanitizeMessage(text) {
    if (!text || typeof text !== "string") return "";
    const lines = String(text)
      .replace(/^ai_main.*$/gim, "")
      .replace(/^main$/gim, "")
      .replace(/#[0-9a-f]{7,}/gi, "")
      .split(/\r?\n+/);
    const pick = lines.map(l => l.trim()).filter(Boolean).find(l => /[A-Za-zÀ-ÿ]/.test(l));
    return (pick || "").trim();
  }

  function todayKey() {
    try {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return { key: "m360:motd:today", iso: `${y}-${m}-${day}` };
    } catch {
      return { key: "m360:motd:today", iso: "" };
    }
  }

  function readStored() {
    const { key, iso } = todayKey();
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (obj && obj.date === iso && typeof obj.text === "string" && obj.text.trim()) {
        return sanitizeMessage(obj.text);
      }
      return null;
    } catch {
      return null;
    }
  }

  function writeStored(text) {
    const { key, iso } = todayKey();
    try {
      const payload = { date: iso, text: text || "" };
      window.localStorage.setItem(key, JSON.stringify(payload));
    } catch {}
  }

  function computeMessage() {
    const candidate = ensureMessage(nameHint)?.body ?? "";
    const cleaned = sanitizeMessage(candidate);
    const finalText = cleaned || "Hoje pode ser mais leve. Um passo de cada vez.";
    writeStored(finalText);
    return finalText;
  }

  useEffect(() => {
    try {
      const stored = readStored();
      if (stored) {
        setMotd(stored);
        return;
      }
    } catch {}
    setMotd(computeMessage());
  }, [nameHint]);

  function refresh() {
    const next = computeMessage();
    setMotd(next);
  }

  const provided = typeof message === "string" ? sanitizeMessage(message) : "";
  const display = provided || motd;

  return (
    <Card className={className}>
      {showTitle ? <strong className="motd-title">“Mensagem do dia”</strong> : null}
      <p className="small motd-text">
        <span className="motd-quote" aria-hidden>“</span>
        <i>{display}</i>
      </p>
      {showButton && !provided ? <Btn onClick={refresh}>Nova mensagem</Btn> : null}
    </Card>
  );
}
