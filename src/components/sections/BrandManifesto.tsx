import { motion } from "framer-motion";
import { EASE_PREMIUM, staggerContainer, viewportOnce } from "../../lib/motion";

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_PREMIUM } },
};

export function BrandManifesto() {
  return (
    <section className="depth-glow-warm relative bg-umber py-[140px]">
      <motion.div
        variants={staggerContainer(0.35)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-site relative z-10 max-w-[980px]"
      >
        <motion.p variants={lineVariants} className="font-display text-[2.6rem] font-normal leading-[1.22] text-ivory">
          We built Quant Luxe on a simple bet: that a man who has already
          learned restraint in how he dresses will recognise it in how he
          smells.
        </motion.p>
        <motion.p variants={lineVariants} className="mt-8 font-display text-[2.6rem] font-normal leading-[1.22] text-gold">
          No fragrance here is designed to fill a room. Each is designed to
          be discovered.
        </motion.p>
      </motion.div>
    </section>
  );
}
