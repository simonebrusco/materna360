import dynamic from "next/dynamic";
import { COLORS, FONT_STACK } from "../lib/ui/tokens";
const GreetingLine = dynamic(() => import("../components/GreetingLine"), { ssr: false });

export default function Page(){
  return (
    <main style={{
      padding:24,
      fontFamily: FONT_STACK,
      background: COLORS.light,
      color: COLORS.secondary,
      borderTop: `4px solid ${COLORS.primary}`,
    }}>
      <h1 style={{margin:0, color: COLORS.secondary}}>Materna360</h1>
      <div style={{height:12}} />
      <GreetingLine name="Simone" />
      <div style={{height:12}} />
      <p style={{margin:0}}>Home is up with a safe greeting block (App Router).</p>
    </main>
  );
}
