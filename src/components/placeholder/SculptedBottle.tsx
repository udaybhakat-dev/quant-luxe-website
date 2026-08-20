import { useId } from "react";
import type { BottleVariant } from "../../data/types";

interface GlassStops {
  edge: string;
  highlight: string;
  mid: string;
  shade: string;
  deep: string;
}

interface MetalStops {
  shade: string;
  highlight: string;
  mid: string;
  deep: string;
}

const GLASS: Record<BottleVariant, GlassStops> = {
  obsidian: { edge: "#0a0908", highlight: "#4a443f", mid: "#24211f", shade: "#131110", deep: "#050404" },
  noir: { edge: "#170a0a", highlight: "#7a3230", mid: "#3d1a19", shade: "#22100f", deep: "#0f0707" },
  amber: { edge: "#3a230e", highlight: "#c9863f", mid: "#8a5726", shade: "#5c3814", deep: "#2c1a09" },
  azure: { edge: "#0a1218", highlight: "#4a6d82", mid: "#22384a", shade: "#141f28", deep: "#070d11" },
  verdant: { edge: "#0d150e", highlight: "#4a6e4f", mid: "#223a26", shade: "#131f15", deep: "#070b08" },
};

const METAL: Record<BottleVariant, MetalStops> = {
  obsidian: { shade: "#6b551c", highlight: "#f0d78c", mid: "#d4af37", deep: "#4a3a14" },
  noir: { shade: "#4a3322", highlight: "#c98a5a", mid: "#9c6a3f", deep: "#3a2818" },
  amber: { shade: "#6b551c", highlight: "#f0d78c", mid: "#d4af37", deep: "#4a3a14" },
  azure: { shade: "#3d434a", highlight: "#c7d0d8", mid: "#8a95a0", deep: "#2c3136" },
  verdant: { shade: "#4a4222", highlight: "#c4b46e", mid: "#8a7a3c", deep: "#332c15" },
};

/** Representative swatch colour per variant, for selector dots/chips. */
export const VARIANT_SWATCH: Record<BottleVariant, string> = {
  obsidian: GLASS.obsidian.highlight,
  noir: GLASS.noir.highlight,
  amber: GLASS.amber.highlight,
  azure: GLASS.azure.highlight,
  verdant: GLASS.verdant.highlight,
};

export const VARIANT_LABEL: Record<BottleVariant, string> = {
  obsidian: "Obsidian",
  noir: "Noir",
  amber: "Amber",
  azure: "Azure",
  verdant: "Verdant",
};

const BODY_PATH = `
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
  showWordmark?: boolean;
}

/**
 * Hand-authored sculptural bottle silhouette — a face profile (brow, eye,
 * nose, lips, chin) carved into one side of the glass, topped with a
 * fluted metal cap. Deterministic SVG, no raster assets, so every variant
 * renders identically everywhere and swaps cleanly for real product
 * photography later. See README "Remaining placeholders".
 */
export function SculptedBottle({ variant, className = "", fillLevel = 0.62, showWordmark = true }: SculptedBottleProps) {
  const uid = useId().replace(/:/g, "");
  const glassId = `glass-${uid}`;
  const metalId = `metal-${uid}`;
  const clipId = `clip-${uid}`;
  const g = GLASS[variant];
  const m = METAL[variant];

  const liquidTopY = 124 + (432 - 124) * (1 - fillLevel);

  return (
    <svg viewBox="0 0 220 460" className={className} role="img" aria-label={`Quant Luxe bottle — ${variant} glass`}>
      <defs>
        {/* stop-color set via style (not the attribute) so switching variant
            on the same mounted instance cross-fades smoothly via CSS
            transition instead of snapping instantly. */}
        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="0.1">
          <stop offset="0%" style={{ stopColor: g.edge, transition: "stop-color 500ms ease" }} />
          <stop offset="20%" style={{ stopColor: g.highlight, transition: "stop-color 500ms ease" }} />
          <stop offset="45%" style={{ stopColor: g.mid, transition: "stop-color 500ms ease" }} />
          <stop offset="72%" style={{ stopColor: g.shade, transition: "stop-color 500ms ease" }} />
          <stop offset="100%" style={{ stopColor: g.deep, transition: "stop-color 500ms ease" }} />
        </linearGradient>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: m.shade, transition: "stop-color 500ms ease" }} />
          <stop offset="35%" style={{ stopColor: m.highlight, transition: "stop-color 500ms ease" }} />
          <stop offset="55%" style={{ stopColor: m.mid, transition: "stop-color 500ms ease" }} />
          <stop offset="100%" style={{ stopColor: m.deep, transition: "stop-color 500ms ease" }} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* Neck — drawn first, extends behind the body's top seam */}
      <path fill={`url(#${glassId})`} d="M 86,86 L 134,86 L 127,130 L 93,130 Z" />

      {/* Body / sculpted face profile */}
      <path fill={`url(#${glassId})`} stroke="#1a1108" strokeWidth={1.5} strokeLinejoin="round" d={BODY_PATH} />

      {/* Neck side edges, drawn on top so they read cleanly against the body */}
      <path d="M 86,86 L 93,124" fill="none" stroke="#1a1108" strokeWidth={1.5} />
      <path d="M 134,86 L 122,130" fill="none" stroke="#1a1108" strokeWidth={1.5} />

      {/* Subtle engraved brow + closed eye */}
      <path d="M 68,182 C 73,178 80,178 85,182" fill="none" stroke="#1a1108" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
      <path d="M 70,195 C 75,199 82,199 87,195" fill="none" stroke="#1a1108" strokeWidth={1} opacity={0.38} strokeLinecap="round" />

      {/* Liquid fill line + glass highlight streaks, clipped to the body silhouette */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="40" y={liquidTopY} width="150" height={432 - liquidTopY} fill="#000000" opacity={0.16} />
        <line x1="40" y1={liquidTopY} x2="190" y2={liquidTopY} stroke="#f1e8d8" strokeWidth={1} opacity={0.3} />
        <path d="M 150,140 C 160,220 158,320 150,420" fill="none" stroke="#f1e8d8" strokeWidth={7} opacity={0.14} strokeLinecap="round" />
        <path d="M 158,160 C 166,230 164,310 158,400" fill="none" stroke="#f1e8d8" strokeWidth={2.5} opacity={0.2} strokeLinecap="round" />
        {showWordmark && (
          <text
            x="131"
            y="412"
            textAnchor="middle"
            fontFamily="'Cormorant', Georgia, serif"
            fontSize="9.5"
            letterSpacing="1.4"
            fill="#f1e8d8"
            opacity={0.55}
          >
            ELEGANZ
          </text>
        )}
      </g>

      {/* Cap */}
      <rect x="85" y="15" width="50" height="60" rx="6" fill={`url(#${metalId})`} stroke="#1a1108" strokeWidth={1} />
      <rect x="80" y="72" width="60" height="20" rx="3" fill={`url(#${metalId})`} stroke="#1a1108" strokeWidth={1} />
      {/* Fluting on the cap */}
      {[93, 101, 109, 117, 125].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="68" stroke="#1a1108" strokeWidth={0.6} opacity={0.35} />
      ))}
    </svg>
  );
}
