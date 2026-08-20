import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BottleStage } from "../placeholder/BottleStage";
import { VARIANT_SWATCH } from "../placeholder/SculptedBottle";
import { products } from "../../data/products";
import { EASE_PREMIUM, fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

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
    <section id="the-craft" className="depth-glow-warm relative bg-chocolate py-[140px]">
      <div className="container-site relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp} className="label-caps mb-4 text-gold">
            The House
          </motion.p>
          <motion.h2 variants={fadeUp} className="max-w-[20ch] font-display text-[2.4rem] text-ivory">
            From root to bottle, nothing here is outsourced to guesswork.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-24 mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-ivory/65">
            Eleganz is the fragrance house of Quant Luxe Lifestyle Pvt. Ltd. —
            everything below is how we actually make what we sell.
          </motion.p>
        </motion.div>

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
  const containerRef = useRef<HTMLDivElement>(null);
  // Continuous, cheap scroll-linked zoom (transform-only) while the
  // chapter passes through the viewport — the "parallax while scrolling"
  // effect, distinct from the one-time entrance below.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.16]);

  return (
    <div ref={containerRef} className="grid grid-cols-12 items-center gap-16">
      <motion.div
        initial={{ opacity: 0, x: reverse ? 48 : -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: EASE_PREMIUM }}
        className={`col-span-7 ${reverse ? "order-2 col-start-6" : "col-start-1"}`}
      >
        {standout ? (
          <BottleStage className="aspect-[16/10] w-full overflow-hidden rounded-[4px]" glow={VARIANT_SWATCH.amber}>
            <motion.img
              src={photo}
              alt="Eleganz Solaris — the finished bottle, photographed in warm studio light"
              style={{ scale: imageScale }}
              className="h-[80%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </BottleStage>
        ) : (
          <div className="grain relative aspect-[16/10] w-full overflow-hidden rounded-[4px]">
            <motion.img
              src={photo}
              alt={`Eleganz — ${title.toLowerCase()}`}
              style={{ objectPosition, scale: imageScale }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.15 }}
        className={`col-span-4 ${reverse ? "order-1 col-start-1" : "col-start-9"}`}
      >
        <span className="label-caps text-bronze">{index}</span>
        <h3 className="mb-5 mt-3 font-display text-[1.9rem] text-ivory">{title}</h3>
        <p className="text-[1rem] leading-relaxed text-ivory/65">{copy}</p>
      </motion.div>
    </div>
  );
}
