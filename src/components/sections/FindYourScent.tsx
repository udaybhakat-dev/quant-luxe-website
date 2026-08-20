import { Link } from "react-router-dom";
import { ChevronRight } from "../icons";
import { useReveal } from "../../hooks/useReveal";

export function FindYourScent() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section id="find-your-scent" className="depth-glow-warm relative border-y border-cognac/15 bg-sand py-[104px]">
      <div
        ref={ref}
        data-revealed={revealed}
        className="reveal container-site relative z-10 flex items-center justify-between gap-16"
      >
        <div className="max-w-[520px]">
          <h2 className="font-display text-[2rem] text-espresso">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-espresso/80">
            Start with the house flagship. Eleganz Solaris is our most-worn
            fragrance — fresh citrus and aromatic notes over a deep woody
            base, built for warm Indian days and cool evenings alike.
          </p>
        </div>

        <Link
          to="/solaris"
          className="btn-premium group label-caps flex shrink-0 items-center gap-3 border border-espresso/60 px-8 py-4 text-espresso hover:border-cognac hover:bg-cognac hover:text-parchment"
        >
          Discover Eleganz Solaris
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
