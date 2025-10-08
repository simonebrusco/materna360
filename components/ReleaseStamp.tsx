"use client";
export default function ReleaseStamp() {
  const hash = process.env.NEXT_PUBLIC_COMMIT_SHA || "unknown";
  const date = new Date().toISOString().slice(0,16).replace("T"," ");
  return (
    <div style={{
      position:"fixed", left:12, bottom:10, fontSize:11, opacity:.55,
      background:"#fff", border:"1px solid #eee", borderRadius:8, padding:"4px 8px",
      boxShadow:"0 4px 12px rgba(0,0,0,.06)", zIndex:10
    }}>
      build: {hash.slice(0,7)} • {date}
    </div>
  );
}
