import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { TextureBlock } from "../placeholder/TextureBlock";
import { BottleStage } from "../placeholder/BottleStage";
import { SculptedBottle } from "../placeholder/SculptedBottle";
import { ChevronRight } from "../icons";
import { EASE_PREMIUM, ctaHover, lineReveal, staggerContainer } from "../../lib/motion";

const HEADLINE_LINES = ["Confidence,", "worn quietly."];
const solaris = products.find((p) => p.slug === "solaris")!;

const MotionLink = motion.create(Link);

const contentVariants = staggerContainer(0.16, 0.25);
const eyebrowVariants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } } };
const headlineVariants = staggerContainer(0.14);
const copyVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } } };
const ctaVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } } };

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Restrained parallax: small spring-damped offset, capped well under the
  // margins that keep the bottle inside its frame.
  const parallaxX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * 18);
    rawY.set(relY * 14);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-void"
    >
      <div className="absolute inset-0 h-full w-full">
        <TextureBlock variant="atelier" className="h-full w-full opacity-80">
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-void/40" />
        </TextureBlock>
      </div>

      {/* Hero bottle — large, warm, campaign-style, with restrained mouse parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.7, ease: EASE_PREMIUM, delay: 0.35 }}
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-y-0 right-0 w-[46%]"
      >
        <BottleStage className="h-full w-full" glow="#a67c45" animated>
          {solaris.photoImage ? (
            <img
              src={solaris.photoImage}
              alt="Eleganz Solaris — sculptural amber glass bottle with an engraved profile relief, photographed in warm studio light"
              className="h-full w-full object-contain p-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
            />
          ) : (
            <SculptedBottle variant="amber" className="h-[86%] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]" />
          )}
        </BottleStage>
      </motion.div>

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="container-site relative z-10 flex h-full flex-col justify-end pb-[112px]"
      >
        <motion.p variants={eyebrowVariants} className="label-caps mb-6 text-gold">
          Eleganz — The Field Notes Collection
        </motion.p>

        <motion.h1
          variants={headlineVariants}
          className="max-w-[16ch] font-display text-[5.2rem] font-normal leading-[0.98] text-ivory"
        >
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span variants={lineReveal} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p variants={copyVariants} className="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-ivory/75">
          Eleganz Solaris — a long-lasting luxury perfume for men, built for
          warm Indian summers: fresh citrus and aromatic notes over a deep
          woody base.
        </motion.p>

        <motion.div variants={ctaVariants} className="mt-11 flex items-center gap-8">
          <MotionLink
            to="/solaris"
            {...ctaHover}
            className="group label-caps inline-flex items-center gap-3 border border-bronze/50 px-8 py-4 text-ivory transition-[background-color,border-color] duration-300 hover:border-gold hover:bg-cognac"
          >
            Discover Solaris
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </MotionLink>
          <Link
            to="/#shop"
            className="group label-caps relative text-ivory/65 transition-colors duration-300 hover:text-ivory after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:after:w-full"
          >
            Browse the full collection
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
