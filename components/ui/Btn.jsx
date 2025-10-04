"use client";
export default function Btn({children,variant="solid",style,...rest}){
  return <button {...rest} className={`btn ${variant==="ghost"?"btn-ghost":""}`} style={style}>
    {children}
  </button>;
}
