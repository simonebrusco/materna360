import Home from "../page.jsx";
import Cuidar from "../cuidar/page.jsx";
import Descobrir from "../descobrir/page.jsx";
import Eu360 from "../eu360/page.jsx";

const tabs=[
  { href:"/", label:"Meu Dia", icon:"🏠" },
  { href:"/cuidar", label:"Cuidar", icon:"🌿" },
  { href:"/descobrir", label:"Descobrir", icon:"✨" },
  { href:"/eu360", label:"Eu360", icon:"💫" }
];

function TabBarMock({active}){
  return (
    <nav className="bottom-nav" style={{position:"static"}}>
      {tabs.map(t=>{
        const isActive = active===t.href;
        return (
          <div key={t.href} className={`tab ${isActive?"tab-active":""}`} style={{textDecoration:"none"}}>
            <div className="icon" aria-hidden>{t.icon}</div>
            {t.label}
          </div>
        );
      })}
    </nav>
  );
}

function PhoneFrame({children,activeHref}){
  return (
    <div style={{
      width:360,maxWidth:"100%",minHeight:720,display:"flex",flexDirection:"column",justifyContent:"space-between",
      background:"linear-gradient(to top, #fff7fa 0%, #ffffff 60%)",borderRadius:24,boxShadow:"0 14px 34px rgba(12,26,43,.08)",
      overflow:"hidden",border:"1px solid rgba(12,26,43,.06)"
    }}>
      <div style={{padding:24}}>
        {children}
      </div>
      <TabBarMock active={activeHref} />
    </div>
  );
}

export const metadata={title:"Materna360 • Design Board"};

export default function DesignBoard(){
  return (
    <div className="container" style={{maxWidth:"100%"}}>
      <h1 className="h1" style={{marginBottom:16}}>Materna360 • Board</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4, minmax(260px, 1fr))",gap:16}}>
        <PhoneFrame activeHref="/">
          <Home />
        </PhoneFrame>
        <PhoneFrame activeHref="/cuidar">
          <Cuidar />
        </PhoneFrame>
        <PhoneFrame activeHref="/descobrir">
          <Descobrir />
        </PhoneFrame>
        <PhoneFrame activeHref="/eu360">
          <Eu360 />
        </PhoneFrame>
      </div>
    </div>
  );
}
