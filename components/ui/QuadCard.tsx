"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type QuadCardProps = {
  id: string;
  title: string;
  microcopy: string;
  icon: ReactNode;
  progressText?: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

export default function QuadCard({
  id,
  title,
  microcopy,
  icon,
  progressText,
  children,
  isOpen,
  onToggle,
}: QuadCardProps) {
  return (
    <div className="w-full">
      <motion.div
        layout
        className={[
          "group relative w-full rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
          "transition-[box-shadow] duration-200",
        ].join(" ")}
        initial={false}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        {/* HEADER */}
        <button
          type="button"
          onClick={() => onToggle(id)}
          className="w-full p-4 md:p-5 text-left flex items-center gap-4"
          aria-controls={`${id}-content`}
          aria-expanded={isOpen}
        >
          <div className="shrink-0 text-4xl">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] md:text-[20px] font-semibold text-[#1E1E1E]">
                {title}
              </h3>
              {progressText ? (
                <span className="text-xs text-[#6C4AB6] font-medium">{progressText}</span>
              ) : null}
            </div>
            <p className="mt-1 text-[13px] text-[#2F3A56]/80">{microcopy}</p>
          </div>
        </button>

        {/* CONTENT */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`${id}-content`}
              key="content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4 md:px-5 md:pb-5"
              role="region"
              aria-label={`${title} actions`}
            >
              <div
                className={[
                  "grid gap-4 pt-2",
                  "grid-cols-3 xs:grid-cols-3 sm:grid-cols-4",
                ].join(" ")}
              >
                {children}
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  className="text-[12px] px-3 py-1.5 rounded-full text-[#2F3A56] hover:bg-black/5"
                  onClick={() => onToggle(id)}
                  aria-label={`Collapse ${title}`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
