export default function Card({children,className="",soft=false,style={}}){
  return <div className={soft?"card-soft":"card"+" "+className} style={style}>{children}</div>;
}
