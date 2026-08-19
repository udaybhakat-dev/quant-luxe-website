interface BottleGlyphProps {
  className?: string;
  stroke?: string;
}

/** Minimal line-art bottle silhouette — placeholder for product photography. */
export function BottleGlyph({ className = "", stroke = "#f1e8d8" }: BottleGlyphProps) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="48" y="8" width="24" height="20" rx="3" stroke={stroke} strokeWidth="1.4" />
      <path d="M52 28 L52 46 L38 66 C34 71 32 77 32 84 L32 190 C32 198 38 204 46 204 L74 204 C82 204 88 198 88 190 L88 84 C88 77 86 71 82 66 L68 46 L68 28"
        stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="32" y1="108" x2="88" y2="108" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <rect x="42" y="130" width="36" height="42" rx="1" stroke={stroke} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
