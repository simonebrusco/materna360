"use client";

type Props = { width?: number; height?: number; className?: string };

export default function Logo({ width = 140, height = 30, className = "" }: Props) {
  return (
    <img
      src="/brand/materna360-logo.png"
      alt="Materna360"
      width={width}
      height={height}
      className={`block select-none ${className}`}
      style={{ height: "auto" }}
    />
  );
}
