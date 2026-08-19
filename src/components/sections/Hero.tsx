import { useEffect, useState } from "react";
import { TextureBlock } from "../placeholder/TextureBlock";
import { BottleGlyph } from "../placeholder/BottleGlyph";
import { ChevronRight } from "../icons";

const HEADLINE_LINES = ["Confidence,", "worn quietly."];

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <TextureBlock variant="atelier" className="h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-espresso/50" />
          <BottleGlyph
            stroke="#f1e8d8"
            className="pointer-events-none absolute right-[8%] top-1/2 h-[560px] w-auto -translate-y-1/2 opacity-[0.08]"
          />
        </TextureBlock>
      </div>

      <div className="container-site relative z-10 flex h-full flex-col justify-end pb-[112px]">
        <p
          className={`label-caps mb-6 text-sand transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Quant Luxe Lifestyle — The Field Notes Collection
        </p>

        <h1 className="max-w-[16ch] font-display text-[5.2rem] font-normal leading-[0.98] text-parchment">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: `${120 + i * 140}ms`,
                  transform: loaded ? "translateY(0%)" : "translateY(110%)",
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={`mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-parchment/80 transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: "480ms" }}
        >
          Six fragrances, built from wood, leather, spice and paper — for the
          man who would rather be remembered than noticed.
        </p>

        <div
          className={`mt-11 transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: "620ms" }}
        >
          <a
            href="#shop"
            className="group label-caps inline-flex items-center gap-3 border border-parchment/70 px-8 py-4 text-parchment transition-colors duration-200 hover:border-cognac hover:bg-cognac"
          >
            Explore the Collection
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
