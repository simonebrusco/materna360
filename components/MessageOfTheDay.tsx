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
          <p className="mt-0.5 text-sm sm:text-base text-gray-600 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end sm:items-center">
        <button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 w-full sm:w-auto h-11 sm:h-auto"
        >
          Nova mensagem
        </button>
      </div>
    </div>
  );
}
