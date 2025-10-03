"use client";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";

export default function ProfileClient() {
  const { profile, save } = useProfile();
  const [name, setName] = useState(profile.motherName);

  useEffect(() => setName(profile.motherName), [profile.motherName]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <SectionTitle>Perfil</SectionTitle>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900">Dados da mãe</h3>
        <label htmlFor="motherName" className="sr-only">Nome</label>
        <input
          id="motherName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="mt-3">
          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={() => save({ motherName: name.trim() })}
            disabled={!name.trim()}
          >
            Salvar
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-gray-600">No futuro: filhos, preferências, plano e configurações.</p>
      </Card>
    </div>
  );
}
