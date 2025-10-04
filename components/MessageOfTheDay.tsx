import { useState } from "react";
import { getRandomMessage } from "../data/messages";
import Button from "./ui/Button";
import { COLORS, FONT_STACK } from "../lib/ui/tokens";

type MessageOfTheDayProps = {
  initial: string;
  textClassName?: string;
  buttonClassName?: string;
};

export default function MessageOfTheDay({ initial, textClassName = "", buttonClassName = "" }: MessageOfTheDayProps) {
  const [message, setMessage] = useState<string>(initial);

  const handleNew = (): void => {
    const next = getRandomMessage(message);
    setMessage(next);
  };

  return (
    <div style={{ color: COLORS.secondary }}>
      <div className="flex items-start gap-3">
        <div className="text-3xl leading-none select-none" aria-hidden>
          ❝
        </div>
        <div className="flex-1">
          <p
            className={["mt-0.5 text-sm sm:text-base leading-relaxed", textClassName].filter(Boolean).join(" ")}
            style={{ color: COLORS.secondary }}
          >
            {message}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          aria-label="Nova mensagem"
          onClick={handleNew}
          variant="primary"
          size="md"
          className={["w-full sm:w-auto", "rounded-md shadow-sm", buttonClassName].filter(Boolean).join(" ")}
          style={{
            background: COLORS.primary,
            color: COLORS.white,
            borderRadius: 999,
            fontFamily: FONT_STACK,
            fontWeight: 600,
          }}
        >
          Nova mensagem
        </Button>
      </div>
    </div>
  );
}
