import type { CSSProperties, ReactNode } from "react";
import type { TextureVariant } from "../../data/types";

interface TextureBlockProps {
  variant: TextureVariant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Abstract, palette-locked material texture used as a stand-in for
 * photography. Deterministic CSS/SVG only — no network requests — so
 * every section renders identically and swaps cleanly for real product
 * or lifestyle photography later (see README "Remaining placeholders").
 */
const TEXTURES: Record<TextureVariant, CSSProperties> = {
  wood: {
    backgroundColor: "#7a4b32",
    backgroundImage: `
      repeating-linear-gradient(100deg, rgba(36,30,26,0.16) 0px, rgba(36,30,26,0.16) 2px, transparent 2px, transparent 14px),
      repeating-linear-gradient(100deg, rgba(241,232,216,0.08) 0px, rgba(241,232,216,0.08) 1px, transparent 1px, transparent 26px),
      linear-gradient(160deg, #8a5a3d 0%, #5e3a26 70%, #3f271a 100%)
    `,
  },
  leather: {
    backgroundColor: "#4a3222",
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(0,0,0,0.18) 0, transparent 40%),
      radial-gradient(circle at 70% 65%, rgba(0,0,0,0.16) 0, transparent 45%),
      radial-gradient(circle at 45% 80%, rgba(241,232,216,0.05) 0, transparent 35%),
      linear-gradient(150deg, #5e3f2a 0%, #3a2718 100%)
    `,
  },
  paper: {
    backgroundColor: "#e9dcc4",
    backgroundImage: `
      repeating-linear-gradient(0deg, rgba(122,75,50,0.06) 0px, transparent 1px, transparent 27px, rgba(122,75,50,0.06) 28px),
      linear-gradient(135deg, #f1e8d8 0%, #e3d5b8 100%)
    `,
  },
  spice: {
    backgroundColor: "#5e3a26",
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(241,232,216,0.14) 0, transparent 3%),
      radial-gradient(circle at 40% 60%, rgba(241,232,216,0.10) 0, transparent 2.5%),
      radial-gradient(circle at 70% 30%, rgba(36,30,26,0.35) 0, transparent 3%),
      radial-gradient(circle at 85% 75%, rgba(241,232,216,0.12) 0, transparent 2%),
      radial-gradient(circle at 55% 85%, rgba(36,30,26,0.3) 0, transparent 2.5%),
      linear-gradient(160deg, #7a4b32 0%, #4a2e1d 100%)
    `,
  },
  glass: {
    backgroundColor: "#b7a386",
    backgroundImage: `
      linear-gradient(115deg, transparent 40%, rgba(241,232,216,0.35) 48%, transparent 56%),
      linear-gradient(150deg, #cbb996 0%, #8a755a 100%)
    `,
  },
  atelier: {
    backgroundColor: "#241e1a",
    backgroundImage: `
      radial-gradient(circle at 30% 20%, rgba(122,75,50,0.5) 0, transparent 55%),
      radial-gradient(circle at 75% 70%, rgba(0,0,0,0.4) 0, transparent 60%),
      linear-gradient(160deg, #362a22 0%, #1a1512 100%)
    `,
  },
  linen: {
    backgroundColor: "#d8c9ac",
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(36,30,26,0.05) 0px, rgba(36,30,26,0.05) 1px, transparent 1px, transparent 6px),
      repeating-linear-gradient(-45deg, rgba(241,232,216,0.08) 0px, rgba(241,232,216,0.08) 1px, transparent 1px, transparent 6px),
      linear-gradient(135deg, #e3d5b8 0%, #c3b18e 100%)
    `,
  },
};

export function TextureBlock({ variant, className = "", style, children }: TextureBlockProps) {
  return (
    <div
      className={`grain relative overflow-hidden ${className}`}
      style={{ ...TEXTURES[variant], ...style }}
    >
      {children}
    </div>
  );
}
