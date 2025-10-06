"use client";
import Card from "../ui/Card";
import Btn from "../ui/Btn";

export default function MentoringCard(){
  function track(label){
    try { window.dispatchEvent(new CustomEvent("mentoring_cta_clicked", { detail: { label } })); } catch {}
  }
  return (
    <Card className="card-navy">
      <div style={{fontWeight:800, marginBottom:6}}>Mentoria</div>
      <div className="small" style={{opacity:.9, marginBottom:12}}>Converse com uma mentora e tire suas dúvidas.</div>
      <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
        <Btn href="https://wa.me/00000000000" target="_blank" rel="noopener" onClick={()=>track("whatsapp")}>
          Falar no WhatsApp
        </Btn>
        <Btn variant="ghost" href="https://calendly.com/" target="_blank" rel="noopener" onClick={()=>track("calendar")}>
          Ver agenda
        </Btn>
      </div>
    </Card>
  );
}
