import { useReveal } from "../../hooks/useReveal";
import { BottleStage } from "../placeholder/BottleStage";
import { VARIANT_SWATCH } from "../placeholder/SculptedBottle";
import { products } from "../../data/products";

const solaris = products.find((p) => p.slug === "solaris")!;

const CHAPTERS = [
  {
    index: "01",
    title: "Sourcing",
    photo: "/images/products/craft-sourcing.jpg",
    objectPosition: "50% 58%",
    copy: "We work with a small group of growers and distillers across Karnataka, Kannauj and Grasse — vetiver roots, sandalwood, and the black pepper that anchors half the collection. Nothing is sourced because it is cheaper. Only because it is right.",
  },
  {
    index: "02",
    title: "Blending",
    photo: "/images/products/craft-blending.jpg",
    objectPosition: "68% 48%",
    copy: "Every formula goes through eleven revisions before it earns a name. Our perfumer blends in small batches, by hand, testing how each note wears over a fourteen-hour day — not how it performs in the first ten minutes on a paper strip.",
  },
  {
    index: "03",
    title: "The Bottle",
    photo: solaris.photoImage!,
    copy: "Weighted glass, a brushed cap, and a label you can actually read. The bottle is designed to survive a desk drawer and a travel bag for years — built to be refilled, not replaced.",
  },
] as const;

export function TheCraft() {
  return (
    <section id="the-craft" className="bg-parchment-deep py-[140px]">
      <div className="container-site">
        <p className="label-caps mb-4 text-cognac">The House</p>
        <h2 className="max-w-[20ch] font-display text-[2.4rem] text-espresso">
          From root to bottle, nothing here is outsourced to guesswork.
        </h2>
        <p className="mb-24 mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-ink-soft">
          Eleganz is the fragrance house of Quant Luxe Lifestyle Pvt. Ltd. —
          everything below is how we actually make what we sell.
        </p>

        <div className="flex flex-col gap-[104px]">
          {CHAPTERS.map((chapter, i) => (
            <Chapter key={chapter.index} {...chapter} reverse={i % 2 === 1} standout={i === 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ChapterProps {
  index: string;
  title: string;
  photo: string;
  objectPosition?: string;
  copy: string;
  reverse: boolean;
  standout: boolean;
}

function Chapter({ index, title, photo, objectPosition, copy, reverse, standout }: ChapterProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.25);

  const stageStyle = standout
    ? {
        borderRadius: revealed ? "4px" : "28px",
        transform: revealed ? "scale(1)" : "scale(0.94)",
        transitionDuration: "1000ms",
        transitionProperty: "border-radius, transform",
      }
    : {
        borderRadius: "4px",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
      };

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 items-center gap-16 ${reverse ? "" : ""}`}
    >
      <div className={`col-span-7 ${reverse ? "order-2 col-start-6" : "col-start-1"}`}>
        {standout ? (
          <BottleStage
            className="aspect-[16/10] w-full ease-[cubic-bezier(0.16,1,0.3,1)]"
            glow={VARIANT_SWATCH.amber}
            style={stageStyle}
          >
            <img
              src={photo}
              alt="Eleganz Solaris — the finished bottle, photographed in warm studio light"
              className="h-[80%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </BottleStage>
        ) : (
          <div
            className="grain relative aspect-[16/10] w-full overflow-hidden ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={stageStyle}
          >
            <img
              src={photo}
              alt={`Eleganz — ${title.toLowerCase()}`}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition }}
            />
          </div>
        )}
      </div>

      <div className={`col-span-4 ${reverse ? "order-1 col-start-1" : "col-start-9"}`}>
        <span className="label-caps text-sand">{index}</span>
        <h3 className="mb-5 mt-3 font-display text-[1.9rem] text-espresso">{title}</h3>
        <p className="text-[1rem] leading-relaxed text-ink-soft">{copy}</p>
      </div>
    </div>
  );
}
