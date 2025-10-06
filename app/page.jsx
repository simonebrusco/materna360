import MessageOfDayCard from "../components/motd/MessageOfDayCard";
import HomeClient from "../components/HomeClient";

export default function Page(){
  // Render deterministic static HTML on the server to avoid hydration mismatches.
  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje?</p>

      <HomeClient />
    </div>
  );
}
