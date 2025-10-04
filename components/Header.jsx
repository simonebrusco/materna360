export default function Header({name="Simone"}){
  return (
    <div style={{marginBottom:16}}>
      <h1 className="h1">Bom dia, {name} <span>💛</span></h1>
      <p className="sub">Como você está hoje?</p>
    </div>
  );
}
