"use client";

import { useState } from "react";
import { getRandomMessage } from "../data/messages";
import Button from "./ui/Button";

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
        <Button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
        >
          Nova mensagem
        </Button>
      </div>
    </div>
  );
}
