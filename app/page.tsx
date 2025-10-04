import dynamic from "next/dynamic";
import { COLORS, FONT_STACK, SPACING } from "../lib/ui/tokens";

const GreetingLine  = dynamic(()=>import("../components/GreetingLine"),{ssr:false});
const MessageOfTheDay = dynamic(()=>import("../components/MessageOfTheDay"),{ssr:false});
const MoodCheck     = dynamic(()=>import("../components/MoodCheck"),{ssr:false});
const DailyActivity = dynamic(()=>import("../components/DailyActivity"),{ssr:false});
const WeeklyPlanner = dynamic(()=>import("../components/WeeklyPlanner"),{ssr:false});
const WellbeingBlock= dynamic(()=>import("../components/WellbeingBlock"),{ssr:false});
const InsightsCard  = dynamic(()=>import("../components/InsightsCard"),{ssr:false});
const TipCard       = dynamic(()=>import("../components/TipCard"),{ssr:false});
const PremiumBanner = dynamic(()=>import("../components/PremiumBanner"),{ssr:false});
const BottomTabBar = dynamic(()=>import("../components/BottomTabBar"),{ssr:false});

export default function Page(){
  return (
    <main style={{
      padding:SPACING, fontFamily:FONT_STACK, background:COLORS.light, minHeight:"100vh"
    }}>
      <div style={{
        maxWidth: 720,
        margin: "0 auto",
        display: "grid",
        gap: `calc(${SPACING}px + 4px)`,
        paddingBottom: 80,
      }}>
        <GreetingLine name="Simone" />
        <MessageOfTheDay />
        <MoodCheck />
        <DailyActivity />
        <WeeklyPlanner />
        <WellbeingBlock />
        <InsightsCard />
        <TipCard />
        <PremiumBanner />
      </div>
      <BottomTabBar />
    </main>
  );
}
