"use client";

import { useState } from "react";
import { getRandomMessage } from "../data/messages";

type MessageOfTheDayProps = {
  initial: string;
};

export default function MessageOfTheDay({ initial }: MessageOfTheDayProps) {
  const [message, setMessage] = useState<string>(initial);

  const handleNew = (): void => {
    const next = getRandomMessage(message);
    setMessage(next);
  };

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="text-gray-300 text-3xl leading-none select-none" aria-hidden>
          ❝
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Mensagem do dia</p>
          <p className="mt-2 text-lg leading-relaxed text-gray-900 sm:text-xl">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:items-center">
        <button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Nova mensagem
        </button>
      </div>
    </section>
  );
}
