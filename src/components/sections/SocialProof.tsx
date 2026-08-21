import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../../data/testimonials";
import { QuoteMark } from "../icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { EASE_PREMIUM, fadeUp, viewportOnce } from "../../lib/motion";

const AUTO_ADVANCE_MS = 7000;

const quoteVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE_PREMIUM } },
};

export function SocialProof() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback((i: number) => {
    setActive((i + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = window.setTimeout(() => goTo(active + 1), AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [active, paused, reducedMotion, goTo]);

  const current = testimonials[active];

  return (
    <section
      className="depth-glow-dark relative bg-void py-[136px] text-ivory"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-site relative z-10 flex flex-col items-center text-center"
      >
        <QuoteMark className="mb-10 h-9 w-11 text-gold" />

        <div className="min-h-[168px] max-w-[760px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="font-display text-[1.9rem] font-normal italic leading-[1.4] text-ivory"
            >
              “{current.quote}”
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${active}-byline`}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="label-caps mt-8 text-bronze"
            >
              {current.name} &mdash; {current.occasion}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === active}
              className="p-1.5"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-gold" : "bg-ivory/25"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
