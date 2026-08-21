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
    backgroundColor: "#3b2418",
    backgroundImage: `
      repeating-linear-gradient(100deg, rgba(11,9,8,0.28) 0px, rgba(11,9,8,0.28) 2px, transparent 2px, transparent 14px),
      repeating-linear-gradient(100deg, rgba(214,194,168,0.06) 0px, rgba(214,194,168,0.06) 1px, transparent 1px, transparent 26px),
      linear-gradient(160deg, #4a2118 0%, #2a1810 70%, #1a100c 100%)
    `,
  },
  leather: {
    backgroundColor: "#2a1810",
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(0,0,0,0.35) 0, transparent 40%),
      radial-gradient(circle at 70% 65%, rgba(0,0,0,0.3) 0, transparent 45%),
      radial-gradient(circle at 45% 80%, rgba(214,194,168,0.05) 0, transparent 35%),
      linear-gradient(150deg, #3b2418 0%, #1a100c 100%)
    `,
  },
  paper: {
    backgroundColor: "#3b2418",
    backgroundImage: `
      repeating-linear-gradient(0deg, rgba(166,124,69,0.07) 0px, transparent 1px, transparent 27px, rgba(166,124,69,0.07) 28px),
      linear-gradient(135deg, #4a2118 0%, #2a1810 100%)
    `,
  },
  spice: {
    backgroundColor: "#2a1810",
    backgroundImage: `
      radial-gradient(circle at 15% 20%, rgba(214,194,168,0.1) 0, transparent 3%),
      radial-gradient(circle at 40% 60%, rgba(214,194,168,0.08) 0, transparent 2.5%),
      radial-gradient(circle at 70% 30%, rgba(11,9,8,0.5) 0, transparent 3%),
      radial-gradient(circle at 85% 75%, rgba(214,194,168,0.09) 0, transparent 2%),
      radial-gradient(circle at 55% 85%, rgba(11,9,8,0.45) 0, transparent 2.5%),
      linear-gradient(160deg, #3b2418 0%, #1a100c 100%)
    `,
  },
  glass: {
    backgroundColor: "#2a1810",
    backgroundImage: `
      linear-gradient(115deg, transparent 40%, rgba(166,124,69,0.22) 48%, transparent 56%),
      linear-gradient(150deg, #3b2418 0%, #1a100c 100%)
    `,
  },
  atelier: {
    backgroundColor: "#0b0908",
    backgroundImage: `
      radial-gradient(circle at 30% 20%, rgba(122,67,40,0.55) 0, transparent 55%),
      radial-gradient(circle at 75% 70%, rgba(0,0,0,0.5) 0, transparent 60%),
      linear-gradient(160deg, #1a100c 0%, #0b0908 100%)
    `,
  },
  linen: {
    backgroundColor: "#2a1810",
    backgroundImage: `
      repeating-linear-gradient(45deg, rgba(11,9,8,0.12) 0px, rgba(11,9,8,0.12) 1px, transparent 1px, transparent 6px),
      repeating-linear-gradient(-45deg, rgba(214,194,168,0.05) 0px, rgba(214,194,168,0.05) 1px, transparent 1px, transparent 6px),
      linear-gradient(135deg, #3b2418 0%, #1a100c 100%)
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
