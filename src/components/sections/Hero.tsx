import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { TextureBlock } from "../placeholder/TextureBlock";
import { BottleStage } from "../placeholder/BottleStage";
import { SculptedBottle } from "../placeholder/SculptedBottle";
import { ChevronRight } from "../icons";

const HEADLINE_LINES = ["Confidence,", "worn quietly."];
const solaris = products.find((p) => p.slug === "solaris")!;

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden bg-espresso">
      <div className="absolute inset-0 h-full w-full">
        <TextureBlock variant="atelier" className="h-full w-full opacity-70">
          <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-espresso/40" />
        </TextureBlock>
      </div>

      {/* Hero bottle — large, warm, campaign-style */}
      <div
        className={`absolute inset-y-0 right-0 w-[46%] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ transitionDelay: "180ms" }}
      >
        <BottleStage className="h-full w-full" glow="#c9863f">
          {solaris.photoImage ? (
            <img
              src={solaris.photoImage}
              alt="Eleganz Solaris — sculptural amber glass bottle with an engraved profile relief, photographed in warm studio light"
              className="h-full w-full object-contain p-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          ) : (
            <SculptedBottle variant="amber" className="h-[86%] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
          )}
        </BottleStage>
      </div>

      <div className="container-site relative z-10 flex h-full flex-col justify-end pb-[112px]">
        <p
          className={`label-caps mb-6 text-sand transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Eleganz — The Field Notes Collection
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
          Eleganz Solaris — a long-lasting luxury perfume for men, built for
          warm Indian summers: fresh citrus and aromatic notes over a deep
          woody base.
        </p>

        <div
          className={`mt-11 flex items-center gap-8 transition-all duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: "620ms" }}
        >
          <Link
            to="/solaris"
            className="group label-caps inline-flex items-center gap-3 border border-parchment/70 px-8 py-4 text-parchment transition-colors duration-200 hover:border-cognac hover:bg-cognac"
          >
            Discover Solaris
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/#shop"
            className="label-caps text-parchment/70 underline-offset-4 transition-colors hover:text-parchment hover:underline"
          >
            Browse the full collection
          </Link>
        </div>
      </div>
    </section>
  );
}
