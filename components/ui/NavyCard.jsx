"use client";

export default function NavyCard({children,style, onClick}) {
  return <div className="card-navy" style={{minHeight:110,display:"grid",placeItems:"center",...style}} onClick={onClick}>
    <div className="iconStack">{children}</div>
  </div>;
}
