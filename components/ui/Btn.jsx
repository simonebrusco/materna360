"use client";
export default function Btn({variant="primary",children,style,...rest}){
  const base={border:0,borderRadius:999,padding:"12px 16px",fontWeight:700,cursor:"pointer"};
  const map={
    primary:{background:"#FF005E",color:"#fff"},
    ghost:{background:"#fff",color:"#FF005E",border:"1px solid #FF005E"}
  };
  return <button {...rest} style={{...base,...map[variant],...style}}>{children}</button>;
}
