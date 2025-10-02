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
    <div>
      <div className="flex items-start gap-3">
        <div className="text-gray-300 text-3xl leading-none select-none" aria-hidden>
          ❝
        </div>
        <div className="flex-1">
          <p className="mt-0.5 text-lg leading-relaxed text-gray-600 sm:text-xl">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:items-center">
        <button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/50 disabled:opacity-50"
        >
          Nova mensagem
        </button>
      </div>
    </div>
  );
}
