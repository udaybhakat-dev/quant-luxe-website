import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { journalArticles } from "../../data/journal";
import { TextureBlock } from "../placeholder/TextureBlock";
import { ChevronRight } from "../icons";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

const MotionLink = motion.create(Link);

export function JournalPreview() {
  return (
    <section id="journal" className="relative bg-espresso py-[128px]">
      <div className="container-site relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="label-caps mb-4 text-gold">The Journal</p>
            <h2 className="font-display text-[2.4rem] text-ivory">Field Notes</h2>
          </div>
          <Link
            to="/journal"
            className="label-caps flex items-center gap-2 text-ivory transition-colors hover:text-gold"
          >
            View all articles
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-3 gap-10"
        >
          {journalArticles.map((article) => (
            <MotionLink
              key={article.id}
              to={`/journal/${article.slug}`}
              variants={fadeUp}
              whileHover="hover"
              className="group flex flex-col"
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[4px]">
                <motion.div
                  variants={{ hover: { scale: 1.045 } }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  {article.photoImage ? (
                    <img
                      src={article.photoImage}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <TextureBlock variant={article.texture} className="h-full w-full" />
                  )}
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
              </div>
              <p className="label-caps mb-3 text-bronze">
                {article.category} &middot; {article.readTime}
              </p>
              <h3 className="font-display text-[1.35rem] leading-snug text-ivory transition-colors group-hover:text-gold">
                {article.title}
              </h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ivory/60">
                {article.excerpt}
              </p>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
