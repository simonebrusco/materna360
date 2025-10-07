"use client";

export default function Icon({ name = "dot", size = 24, className = "", color, title }){
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", role: title ? "img" : "presentation", "aria-label": title || undefined };
  const stroke = "currentColor";
  const fill = color || "currentColor";

  switch (name) {
    case "breath":
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="12" r="9" fill={fill} opacity=".12" />
          <path d="M4 12h16M12 4v16" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "reflect":
      return (
        <svg {...props} className={className}>
          <rect x="4" y="5" width="16" height="14" rx="4" fill={fill} opacity=".12" />
          <path d="M8 9h8M8 13h5" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "inspire":
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="12" r="9" fill={fill} opacity=".12" />
          <path d="M12 7v6m0 4h.01" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "pause":
      return (
        <svg {...props} className={className}>
          <rect x="6" y="5" width="4" height="14" rx="2" fill={fill || stroke} />
          <rect x="14" y="5" width="4" height="14" rx="2" fill={fill || stroke} />
        </svg>
      );
    case "mood":
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="12" r="9" fill={fill} opacity=".12" />
          <circle cx="9" cy="10" r="1.5" fill={stroke} />
          <circle cx="15" cy="10" r="1.5" fill={stroke} />
          <path d="M8.5 14c1 .9 2.2 1.4 3.5 1.4S14.5 14.9 15.5 14" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...props} className={className}>
          <circle cx="12" cy="12" r="3" fill={fill} />
        </svg>
      );
  }
}
