import dynamic from "next/dynamic";
const GreetingLine = dynamic(() => import("../components/GreetingLine"), { ssr: false });

export default function Home(){
  return (
    <main style={{padding:24, fontFamily:"system-ui, Poppins, Arial"}}>
      <h1 style={{margin:0}}>Materna360</h1>
      <div style={{height:12}} />
      <GreetingLine name="Simone" />
      <div style={{height:12}} />
      <p style={{margin:0}}>Home is up with a safe greeting block.</p>
    </main>
  );
}
