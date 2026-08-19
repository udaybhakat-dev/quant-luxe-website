import { useEffect, useRef, useState } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and flips
 * `revealed` to true once the element enters the viewport. Combined with
 * the `.reveal` utility class (see index.css), which is a no-op under
 * prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    // Positive bottom margin triggers reveal slightly before the element
    // is fully in view, and guards against a section that's already
    // in/near the viewport on mount never firing a fresh intersection.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px 120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
