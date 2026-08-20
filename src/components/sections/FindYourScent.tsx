import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "../icons";
import { ctaHover, fadeFromLeft, fadeFromRight, staggerContainer, viewportOnce } from "../../lib/motion";

const MotionLink = motion.create(Link);

export function FindYourScent() {
  return (
    <section id="find-your-scent" className="depth-glow-warm relative border-y border-gold/15 bg-mahogany py-[104px]">
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-site relative z-10 flex items-center justify-between gap-16"
      >
        <motion.div variants={fadeFromLeft} className="max-w-[520px]">
          <h2 className="font-display text-[2rem] text-ivory">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-ivory/70">
            Start with the house flagship. Eleganz Solaris is our most-worn
            fragrance — fresh citrus and aromatic notes over a deep woody
            base, built for warm Indian days and cool evenings alike.
          </p>
        </motion.div>

        <motion.div variants={fadeFromRight}>
          <MotionLink
            to="/solaris"
            {...ctaHover}
            className="group label-caps flex shrink-0 items-center gap-3 border border-ivory/40 px-8 py-4 text-ivory transition-[background-color,border-color] duration-300 hover:border-gold hover:bg-cognac"
          >
            Discover Eleganz Solaris
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
