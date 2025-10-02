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
        <div className="text-neutral text-3xl leading-none select-none" aria-hidden>
          ❝
        </div>
        <div className="flex-1">
          <p className="mt-0.5 text-sm sm:text-base text-grayMid leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          className="inline-flex items-center justify-center rounded-lg bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-hover active:bg-coral-active shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
        >
          Nova mensagem
        </button>
      </div>
    </div>
  );
}
