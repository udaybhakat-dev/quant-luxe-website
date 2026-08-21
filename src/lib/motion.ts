import type { Transition, Variants } from "framer-motion";

/**
 * Shared Framer Motion vocabulary for the site. Every section pulls from
 * this file rather than inventing its own easing/duration/distance, so the
 * cinematic feel stays consistent even as the specific choreography varies
 * per section (per "vary animations between sections so the site doesn't
 * feel repetitive" — the *values* here are the constant, the *composition*
 * of them is what's allowed to differ).
 */

/** The site's signature easing — slow to start, settles without overshoot. */
export const EASE_PREMIUM: Transition["ease"] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.6,
};

export const transitionBase: Transition = {
  duration: DURATION.base,
  ease: EASE_PREMIUM,
};

export const transitionSlow: Transition = {
  duration: DURATION.slow,
  ease: EASE_PREMIUM,
};

export const transitionCinematic: Transition = {
  duration: DURATION.cinematic,
  ease: EASE_PREMIUM,
};

/** Viewport options for scroll reveals — fire slightly before full entry, once. */
export const viewportOnce = { once: true, margin: "0px 0px -120px 0px" };

/** Generic fade + rise, the workhorse for most scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transitionSlow },
};

/** Wider rise for hero-scale headline elements. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: transitionCinematic },
};

/** Fade with a very slight scale — for imagery, not text. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitionSlow },
};

/** Horizontal reveal, for alternating left/right editorial compositions. */
export const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: transitionSlow },
};

export const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: transitionSlow },
};

/** Stagger container — wrap groups of fadeUp/fadeScale children in this. */
export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Underline mask reveal for headline lines (clip-path style line-by-line). */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: DURATION.slow, ease: EASE_PREMIUM } },
};

/** Shared premium hover/tap for buttons and CTAs — restrained lift + glow, never a bounce. */
export const ctaHover = {
  whileHover: {
    y: -3,
    boxShadow: "0 18px 36px -16px rgba(166, 124, 69, 0.55)",
    transition: { duration: 0.35, ease: EASE_PREMIUM },
  },
  whileTap: { y: 0, transition: { duration: 0.15, ease: EASE_PREMIUM } },
};

/** Subtle card lift for hoverable rows/cards — smaller than ctaHover. */
export const cardHover = {
  whileHover: { y: -2, transition: { duration: 0.3, ease: EASE_PREMIUM } },
};

/** Campaign-style product image transition for AnimatePresence swaps. */
export const productImageVariants: Variants = {
  enter: { opacity: 0, scale: 1.04, filter: "blur(6px)" },
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(6px)",
    transition: { duration: DURATION.fast, ease: EASE_PREMIUM },
  },
};

/** Coordinated copy block that follows the product image swap by a beat. */
export const productCopyVariants: Variants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_PREMIUM, delay: 0.1 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE_PREMIUM } },
};
