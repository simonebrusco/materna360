"use client";
export default function Btn({children,variant="solid",style,...rest}){
  const solid={background:"#FF005E",color:"#fff"};
  const ghost={background:"#fff",color:"#FF005E",border:"1.5px solid #FF005E"};
  return <button {...rest} className={`btn ${variant==="ghost"?"btn-ghost":""}`} style={{...(variant==="ghost"?ghost:solid),...style}}>
    {children}
  </button>;
}
