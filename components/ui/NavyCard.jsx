export default function NavyCard({children, style, ...props}) {
  return <div className="card-navy" style={{minHeight:110,display:"grid",placeItems:"center",...style}} {...props}>
    <div className="iconStack">{children}</div>
  </div>;
}
