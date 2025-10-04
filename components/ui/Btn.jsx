"use client";
export default function Btn({children,variant="solid",className="",...rest}){
  const classes = `btn ${variant==="ghost" ? "btn-ghost" : "btn-primary"} ${className}`.trim();
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
