"use client";
export default function ReminderBell(){
  const ask = async () => {
    try{
      if (typeof window === 'undefined') return;
      if (!("Notification" in window)) { alert("Seu navegador não suporta lembretes."); return; }
      if (Notification.permission !== "granted") await Notification.requestPermission();
      new Notification("Lembrete ativado 💗",{ body:"O Materna360 vai te lembrar de pausar e respirar hoje."});
      dispatchEvent(new CustomEvent("m360:win", { detail:{ type:"task" } }));
    }catch{}
  };
  return <button className="icon-btn" aria-label="Lembretes" onClick={ask}>🔔</button>;
}
