"use client";
import { useEffect, useState } from "react";

export default function Logo({
  width = 132,
  height = 28,
  className = "",
}: { width?: number; height?: number; className?: string }) {
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const url = "/materna360-logo.svg";
    fetch(url, { method: "HEAD" })
      .then(res => setOk(res.ok))
      .catch(() => setOk(false));
  }, []);

  if (!ok) {
    return (
      <span className={`font-semibold tracking-tight text-[#2F3A56] ${className}`}>
        Materna<span className="text-[#FF005E]">❤</span>360
      </span>
    );
  }

  return (
    <img
      src="/materna360-logo.svg"
      alt="Materna360"
      width={width}
      height={height}
      className={`block select-none ${className}`}
      style={{ height: "auto" }}
      onError={() => setOk(false)}
    />
  );
}
