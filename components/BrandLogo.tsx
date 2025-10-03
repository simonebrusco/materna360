"use client";

const PRIMARY = process.env.NEXT_PUBLIC_BRAND_LOGO || ""; // e.g. ...export=view&id=...
const FALLBACK = PRIMARY ? PRIMARY.replace("export=view", "export=download") : "";

export default function BrandLogo({
  className = "block h-7 md:h-8 w-auto object-contain opacity-95",
}: { className?: string }) {
  if (!PRIMARY) return null;
  return (
    <img
      src={PRIMARY}
      alt="Materna360"
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      referrerPolicy="no-referrer"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        if (FALLBACK && el.src !== FALLBACK) el.src = FALLBACK;
      }}
    />
  );
}
