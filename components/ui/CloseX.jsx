"use client";
export default function CloseX({ className = "", ...props }) {
  return (
    <button
      type="button"
      aria-label="Fechar"
      {...props}
      className={`btn-ghost rounded-full w-9 h-9 flex items-center justify-center text-[20px] leading-none ${className}`}
    >
      <span aria-hidden>×</span>
    </button>
  );
}
