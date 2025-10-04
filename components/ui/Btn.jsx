"use client";
ai_main_76441ebb1c05
export default function Btn({children,variant="solid",className="",...rest}){
  const classes = `btn ${variant==="ghost" ? "btn-ghost" : "btn-primary"} ${className}`.trim();
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );

export default function Btn({children,variant="solid",style,...rest}){
  return <button {...rest} className={`btn ${variant==="ghost"?"btn-ghost":""}`} style={style}>
    {children}
  </button>;
main
}
