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
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 sm:p-5">
        <span className="absolute left-4 top-3 text-orange-500">“</span>
        <p className="pl-5 text-gray-900 text-sm sm:text-base leading-relaxed">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            aria-label="Nova mensagem"
            onClick={handleNew}
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-700 hover:text-gray-900 rounded-md px-3 py-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 hover:bg-gray-100"
          >
            Nova mensagem
          </button>
        </div>
      </div>
    </section>
  );
}
