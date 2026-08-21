import type { CSSProperties, ReactNode } from "react";

interface BottleStageProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Warm glow tint behind the bottle — matches the active variant for a cohesive campaign look. */
  glow?: string;
  /** Enables a slow, ambient drift of the warm glow — reserved for the hero, where the bottle is the sole focal point. */
  animated?: boolean;
}

/**
 * Dark cinematic backdrop for displaying a SculptedBottle — a warm radial
 * glow, soft vignette edges and a grounded shadow ellipse, standing in for
 * studio lighting/photography. Used anywhere the bottle is the hero visual
 * (Hero, PDP, Collection Showcase, product cards).
 */
export function BottleStage({ className = "", style, children, glow = "#a67c45", animated = false }: BottleStageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(120% 90% at 50% 100%, #000000 0%, transparent 60%),
          linear-gradient(180deg, #1a100c 0%, #0b0908 100%)
        `,
        ...style,
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-[background] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${animated ? "ambient-glow" : ""}`}
        style={{ background: `radial-gradient(60% 55% at 50% 38%, ${glow}38 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-[6%] w-[46%] -translate-x-1/2 rounded-full blur-md"
        style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.6), transparent)" }}
      />
      {children}
    </div>
  );
}
