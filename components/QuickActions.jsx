import Btn from "./ui/Btn";
import Card from "./ui/Card";
const items=[
  {icon:"◐",label:"Respirar"},
  {icon:"♡",label:"Refletir"},
  {icon:"✧",label:"Inspirar"},
  {icon:"Ⅱ",label:"Pausar"},
];
export default function QuickActions(){
  return (
    <div className="grid-2">
      {items.map((it,i)=>(
        <Card key={i} style={{background:"#0C1A2B",color:"#fff",display:"grid",placeItems:"center",minHeight:120}}>
          <div style={{display:"grid",placeItems:"center",gap:10}}>
            <div className="icon" style={{borderColor:"#fff",color:"#fff"}} aria-hidden>{it.icon}</div>
            <div style={{fontWeight:700}}>{it.label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
