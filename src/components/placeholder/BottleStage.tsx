import type { CSSProperties, ReactNode } from "react";

interface BottleStageProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Warm glow tint behind the bottle — matches the active variant for a cohesive campaign look. */
  glow?: string;
}

/**
 * Dark cinematic backdrop for displaying a SculptedBottle — a warm radial
 * glow, soft vignette edges and a grounded shadow ellipse, standing in for
 * studio lighting/photography. Used anywhere the bottle is the hero visual
 * (Hero, PDP, Collection Showcase, product cards).
 */
export function BottleStage({ className = "", style, children, glow = "#c9863f" }: BottleStageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(60% 55% at 50% 38%, ${glow}33 0%, transparent 70%),
          radial-gradient(120% 90% at 50% 100%, #000000 0%, transparent 60%),
          linear-gradient(180deg, #100d0b 0%, #050403 100%)
        `,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-[6%] w-[46%] -translate-x-1/2 rounded-full blur-md"
        style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent)" }}
      />
      {children}
    </div>
  );
}
