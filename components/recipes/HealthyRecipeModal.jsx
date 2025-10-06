"use client";
import { useEffect, useState, useCallback } from "react";
import BaseModal from "../modals/BaseModal";
import Btn from "../ui/Btn";
import { generateHealthyRecipe } from "../../lib/recipes";
import { emitEu360Refresh } from "../../lib/clientEvents";

export default function HealthyRecipeModal({ isOpen, onClose = () => {}, ageRange = "3-4", place = "home" }){
  const [recipe, setRecipe] = useState(null);

  useEffect(()=>{
    if (isOpen) {
      try { setRecipe(generateHealthyRecipe(ageRange, place)); }
      catch { setRecipe(generateHealthyRecipe()); }
    }
  }, [isOpen, ageRange, place]);

  useEffect(()=>{
    function onKey(e){ if (e.key === "Escape") onClose(); }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeBadge = recipe ? `${recipe.timeMinutes} min` : "";

  const handleSave = useCallback(()=>{
    try { window.dispatchEvent(new CustomEvent("recipe_saved", { detail: { recipe } })); } catch {}
    try { emitEu360Refresh(); } catch {}
    onClose();
  }, [recipe, onClose]);

  return (
    <BaseModal open={isOpen} onClose={onClose}>
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12, marginBottom:6}}>
          <div className="m360-modal-title">Receita saudável</div>
          {recipe && <span className="small" style={{background:"var(--rose-1)",border:"1px solid var(--magenta-20)",color:"var(--navy)", padding:"6px 10px", borderRadius:12, fontWeight:700}}>{timeBadge}</span>}
        </div>
        {recipe && <div className="m360-modal-text" style={{fontWeight:700}}>{recipe.title}</div>}

        <div style={{display:"grid", gap:12, marginTop:12}}>
          <div className="grid-activities">
            <div className="card" style={{padding:16}}>
              <div style={{fontWeight:800, marginBottom:8}}>Ingredientes</div>
              <ul style={{paddingLeft:18, lineHeight:1.6}}>
                {recipe?.ingredients?.map((ing, i)=>(<li key={i}>{ing}</li>))}
              </ul>
            </div>
            <div className="card" style={{padding:16}}>
              <div style={{fontWeight:800, marginBottom:8}}>Preparo</div>
              <ol style={{paddingLeft:18, lineHeight:1.6}}>
                {recipe?.steps?.map((stp, i)=>(<li key={i}>{stp}</li>))}
              </ol>
            </div>
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10}}>
            <div className="small m360-soft">
              {recipe && `${recipe.kcal} kcal • ${recipe.note}`}
            </div>
            <div className="m360-actions">
              <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
              <Btn onClick={handleSave}>Salvar</Btn>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
