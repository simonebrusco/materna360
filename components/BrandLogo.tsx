"use client";
export default function BrandLogo({
  className = "block h-7 md:h-8 w-auto object-contain opacity-95",
}: { className?: string }) {
  const src = process.env.NEXT_PUBLIC_BRAND_LOGO || "";
  if (!src) return null;
  return (
    <img
      src={src}
      alt="Materna360"
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      referrerPolicy="no-referrer"
    />
  );
}
