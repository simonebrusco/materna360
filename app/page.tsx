import dynamic from "next/dynamic";
import { COLORS, FONT_STACK, SPACING } from "../lib/ui/tokens";

const GreetingLine = dynamic(()=>import("../components/GreetingLine"),{ssr:false});
const MessageOfTheDay = dynamic(()=>import("../components/MessageOfTheDay"),{ssr:false});
const MoodCheck = dynamic(()=>import("../components/MoodCheck"),{ssr:false});
const DailyActivity = dynamic(()=>import("../components/DailyActivity"),{ssr:false});
const WeeklyPlanner = dynamic(()=>import("../components/WeeklyPlanner"),{ssr:false});

export default function Page(){
  return (
    <main style={{
      padding:SPACING,
      fontFamily:FONT_STACK,
      background:COLORS.light,
      minHeight:"100vh"
    }}>
      <div style={{maxWidth:720,margin:"0 auto",display:"grid",gap:SPACING}}>
        <GreetingLine name="Simone" />
        <MessageOfTheDay />
        <MoodCheck />
        <DailyActivity />
        <WeeklyPlanner />
      </div>
    </main>
  );
}
