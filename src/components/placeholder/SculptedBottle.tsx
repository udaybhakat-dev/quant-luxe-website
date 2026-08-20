import { useId } from "react";
import type { BottleVariant } from "../../data/types";

interface GlassStops {
  edge: string;
  highlight: string;
  mid: string;
  shade: string;
  deep: string;
}

const GLASS: Record<BottleVariant, GlassStops> = {
  amber: { edge: "#e8a355", highlight: "#c9863f", mid: "#8a5726", shade: "#5c3814", deep: "#2c1a09" },
  smokedCharcoal: { edge: "#5a564f", highlight: "#3a3630", mid: "#242119", shade: "#151310", deep: "#0a0908" },
  deepBrown: { edge: "#8a5a35", highlight: "#6b4426", mid: "#4a2f1a", shade: "#2e1c10", deep: "#160d07" },
  nearBlack: { edge: "#3a3936", highlight: "#232220", mid: "#141312", shade: "#0a0908", deep: "#020202" },
  burgundy: { edge: "#7a2530", highlight: "#5c1a22", mid: "#3a1015", shade: "#220a0c", deep: "#100405" },
  forestGreen: { edge: "#3d5c3f", highlight: "#2a4530", mid: "#1a2e1d", shade: "#0f1c11", deep: "#070f09" },
  warmAmber: { edge: "#d99a52", highlight: "#b87a3a", mid: "#7a4f24", shade: "#4a2f15", deep: "#241608" },
};

/** Consistent gold/brass across the whole collection — matches the campaign reference. */
const METAL = { shade: "#7a6423", highlight: "#f5e0a3", mid: "#d4af37", deep: "#5c4a1a" };

/** Representative swatch colour per variant, for selector dots/chips. */
export const VARIANT_SWATCH: Record<BottleVariant, string> = {
  amber: GLASS.amber.highlight,
  smokedCharcoal: GLASS.smokedCharcoal.highlight,
  deepBrown: GLASS.deepBrown.highlight,
  nearBlack: GLASS.nearBlack.highlight,
  burgundy: GLASS.burgundy.highlight,
  forestGreen: GLASS.forestGreen.highlight,
  warmAmber: GLASS.warmAmber.highlight,
};

export const VARIANT_LABEL: Record<BottleVariant, string> = {
  amber: "Amber",
  smokedCharcoal: "Smoked Charcoal",
  deepBrown: "Deep Brown",
  nearBlack: "Near-Black",
  burgundy: "Burgundy",
  forestGreen: "Forest Green",
  warmAmber: "Warm Amber",
};

/** Smooth, symmetric rounded-shoulder decanter silhouette. */
const BODY_PATH = `
  M 80,130
  C 75.67,145 48.33,153 44,168
  C 39.67,183 51.33,202.17 54,220
  C 56.67,237.83 60.33,256.67 60,275
  C 59.67,293.33 52.33,310 52,330
  C 51.67,350 55.33,378 58,395
  C 60.67,412 65.33,415 68,432
  L 172,432
  C 174.67,415 179.33,412 182,395
  C 184.67,378 188.33,350 188,330
  C 187.67,310 180.33,293.33 180,275
  C 179.67,256.67 183.33,237.83 186,220
  C 188.67,202.17 200.33,183 196,168
  C 191.67,153 164.33,145 160,130
  Z
`;

/** The house's original face-profile path, reused at ~50% scale as an inset carved relief. */
const RELIEF_PATH = `
  M 95,125
  C 95,135.5 63,147.5 60,158
  C 57,168.5 82.67,177.33 80,188
  C 77.33,198.67 43.67,211.67 44,222
  C 44.33,232.33 78.67,241.67 82,250
  C 85.33,258.33 63.33,263.67 64,272
  C 64.67,280.33 87,291.67 86,300
  C 85,308.33 57,312.83 58,322
  C 59,331.17 86.67,342.83 92,355
  C 97.33,367.17 90,382.17 90,395
  C 90,407.83 92,419.17 92,432
  L 150,432
  C 168,432 176,412 176,392
  C 180,370 180,350 176,330
  C 184,322 190,312 188,302
  C 186,292 178,286 176,278
  C 172,255 168,225 158,195
  C 148,168 136,148 124,132
  C 118,127 108,124 100,124
  C 98,124 96,124 95,125
  Z
`;

interface SculptedBottleProps {
  variant: BottleVariant;
  className?: string;
  /** Fill level of the liquid line, 0 (empty) to 1 (full). Defaults to a natural ~62% fill. */
  fillLevel?: number;
}

/**
 * Hand-authored sculptural bottle — a smooth, symmetric decanter silhouette
 * (not a jagged edge) with a human profile carved in relief on the front
 * glass, topped with a fluted gold cap and an engraved collar band.
 * Deterministic SVG, no raster assets, so every variant renders identically
 * everywhere and swaps cleanly for real product photography later. See
 * README "Remaining placeholders".
 */
export function SculptedBottle({ variant, className = "", fillLevel = 0.58 }: SculptedBottleProps) {
  const uid = useId().replace(/:/g, "");
  const glassId = `glass-${uid}`;
  const metalId = `metal-${uid}`;
  const clipId = `clip-${uid}`;
  const g = GLASS[variant];

  const liquidTopY = 130 + (432 - 130) * (1 - fillLevel);

  return (
    <svg viewBox="0 0 240 480" className={className} role="img" aria-label={`Eleganz bottle — ${VARIANT_LABEL[variant]} glass`}>
      <defs>
        {/* stop-color set via style (not the attribute) so switching variant
            on the same mounted instance cross-fades smoothly via CSS
            transition instead of snapping instantly. */}
        <linearGradient id={glassId} x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" style={{ stopColor: g.edge, transition: "stop-color 500ms ease" }} />
          <stop offset="18%" style={{ stopColor: g.highlight, transition: "stop-color 500ms ease" }} />
          <stop offset="42%" style={{ stopColor: g.mid, transition: "stop-color 500ms ease" }} />
          <stop offset="70%" style={{ stopColor: g.shade, transition: "stop-color 500ms ease" }} />
          <stop offset="100%" style={{ stopColor: g.deep, transition: "stop-color 500ms ease" }} />
        </linearGradient>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={METAL.shade} />
          <stop offset="30%" stopColor={METAL.highlight} />
          <stop offset="50%" stopColor={METAL.mid} />
          <stop offset="75%" stopColor={METAL.shade} />
          <stop offset="100%" stopColor={METAL.deep} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Neck — drawn first, behind the body's top seam */}
      <path fill={`url(#${glassId})`} d="M 96,92 L 144,92 L 160,130 L 80,130 Z" />

      {/* Body — smooth rounded decanter */}
      <path fill={`url(#${glassId})`} stroke="#1a1108" strokeWidth={1.5} strokeLinejoin="round" d={BODY_PATH} />

      {/* Neck side edges, drawn on top so they read cleanly against the body */}
      <path d="M 96,92 L 80,130" fill="none" stroke="#1a1108" strokeWidth={1.5} />
      <path d="M 144,92 L 160,130" fill="none" stroke="#1a1108" strokeWidth={1.5} />

      <g clipPath={`url(#${clipId})`}>
        {/* Liquid fill line */}
        <rect x="30" y={liquidTopY} width="180" height={432 - liquidTopY} fill="#000000" opacity={0.14} />
        <line x1="30" y1={liquidTopY} x2="210" y2={liquidTopY} stroke="#d6c2a8" strokeWidth={1} opacity={0.35} />

        {/* Warm key-light highlight streaks (light from upper right) */}
        <path d="M 175,150 C 190,220 188,320 178,420" fill="none" stroke="#ffe6b8" strokeWidth={10} opacity={0.16} strokeLinecap="round" />
        <path d="M 182,165 C 194,230 192,310 184,400" fill="none" stroke="#fff3d6" strokeWidth={3} opacity={0.28} strokeLinecap="round" />

        {/* Face relief — carved profile inset on the front glass, not the outer edge */}
        <g transform="translate(58,150) scale(0.5)">
          <path
            fill="#000000"
            fillOpacity={0.13}
            stroke="#d6c2a8"
            strokeWidth={1.4}
            strokeOpacity={0.3}
            d={RELIEF_PATH}
          />
          <path d="M 68,182 C 73,178 80,178 85,182" fill="none" stroke="#3a2410" strokeWidth={1.8} opacity={0.4} strokeLinecap="round" />
          <path d="M 60,158 C 55,152 52,160 56,166" fill="none" stroke="#d6c2a8" strokeWidth={2} opacity={0.32} strokeLinecap="round" />
        </g>

        {/* Base engraving */}
        <text
          x="120"
          y="410"
          textAnchor="middle"
          fontFamily="'Cormorant', Georgia, serif"
          fontSize="11"
          letterSpacing="2"
          fill="#d6c2a8"
          opacity={0.55}
        >
          ELEGANZ
        </text>
      </g>

      {/* Collar band with engraved wordmark */}
      <rect x="86" y="80" width="68" height="16" rx="2" fill={`url(#${metalId})`} stroke="#1a1108" strokeWidth={1} />
      <text x="120" y="91.5" textAnchor="middle" fontFamily="'Cormorant', Georgia, serif" fontSize="8" letterSpacing="1.5" fill="#3a2f0f" opacity={0.7}>
        ELEGANZ
      </text>

      {/* Cap */}
      <rect x="90" y="10" width="60" height="70" rx="4" fill={`url(#${metalId})`} stroke="#1a1108" strokeWidth={1} />
      <g opacity={0.4}>
        {[98, 106, 114, 120, 126, 134, 142].map((x) => (
          <line key={x} x1={x} y1="18" x2={x} y2="72" stroke="#1a1108" strokeWidth={0.7} />
        ))}
      </g>
    </svg>
  );
}
