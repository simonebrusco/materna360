"use client";
export default function FabAddNote(){
  const open = () => {
    try{
      const iso = new Date().toISOString().split("T")[0];
      window.dispatchEvent(new CustomEvent("m360:planner:newEntry", { detail:{ date: iso } }));
      dispatchEvent(new CustomEvent("m360:win", { detail:{ type:"planner" } }));
    }catch{}
  };
  return <button className="fab" onClick={open} aria-label="Nova anotação">＋</button>;
}
