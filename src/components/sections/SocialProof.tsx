import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "../../data/testimonials";
import { QuoteMark } from "../icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const AUTO_ADVANCE_MS = 7000;

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
      className="bg-espresso py-[136px] text-parchment"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-site flex flex-col items-center text-center">
        <QuoteMark className="mb-10 h-9 w-11 text-cognac" />

        <div className="min-h-[168px] max-w-[760px]" aria-live="polite">
          <p className="font-display text-[1.9rem] font-normal italic leading-[1.4] text-parchment">
            “{current.quote}”
          </p>
          <p className="label-caps mt-8 text-sand">
            {current.name} &mdash; {current.occasion}
          </p>
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
                className={`block h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  i === active ? "bg-cognac" : "bg-parchment/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
