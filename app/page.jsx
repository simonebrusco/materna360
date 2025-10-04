"use client";
import { COLORS, FONT_STACK, SPACING } from "../lib/ui/tokens";
import GreetingLine from "../components/GreetingLine";
import MessageOfTheDay from "../components/MessageOfTheDay";

export default function Page() {
  return (
    <main
      style={{
        padding: SPACING,
        fontFamily: FONT_STACK,
        background: COLORS.light,
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gap: SPACING }}>
        <GreetingLine name="Simone" />
        <MessageOfTheDay />
      </div>
    </main>
  );
}
