"use client";
import React, { useState, useEffect, useRef } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import ProductModal from "./ProductModal";

export default function Vitrine({ age = "3-4" }){
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const anchorRef = useRef(null);

  useEffect(()=>{ if(open) anchorRef.current?.focus?.(); },[open]);

  function openCat(c){ setCategory(c); setOpen(true); }

  return (
    <section>
      <h3 className="h3" style={{marginBottom:8}}>Vitrine</h3>
      <div className="grid-2">
        <Card onClick={()=>openCat("books")} style={{cursor:"pointer",minHeight:120,display:"grid",placeItems:"center"}}>
          <div className="iconStack"><div className="iconToken">📚</div><div>Livros</div></div>
        </Card>
        <Card onClick={()=>openCat("toys")} style={{cursor:"pointer",minHeight:120,display:"grid",placeItems:"center"}}>
          <div className="iconStack"><div className="iconToken">🧸</div><div>Brinquedos</div></div>
        </Card>
      </div>
      <ProductModal open={open} onClose={()=>setOpen(false)} category={category} age={age} closeRef={anchorRef} />
      <button ref={anchorRef} style={{position:'absolute',opacity:0,pointerEvents:'none'}} aria-hidden>
        anchor
      </button>
    </section>
  );
}
