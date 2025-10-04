export default function NavyCard({children,style}) {
  return <div className="card-navy" style={{minHeight:110,display:"grid",placeItems:"center",...style}}>
    <div className="iconStack">{children}</div>
  </div>;
}
