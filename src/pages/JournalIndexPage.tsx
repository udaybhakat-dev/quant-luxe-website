import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";
import { journalArticles } from "../data/journal";
import { TextureBlock } from "../components/placeholder/TextureBlock";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const MotionLink = motion.create(Link);

const breadcrumbTrail = [{ label: "Home", to: "/" }, { label: "Journal" }];

export function JournalIndexPage() {
  useSeo({
    title: "Eleganz Journal | Fragrance Guides for Men",
    description:
      "Practical guides on choosing, wearing and understanding men's fragrance — from the house behind Eleganz Solaris, a luxury perfume for men built for Indian summer.",
    path: "/journal",
    breadcrumb: breadcrumbTrail,
  });

  return (
    <section className="pt-[152px] pb-[128px]">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="container-site">
        <Breadcrumbs trail={breadcrumbTrail} />

        <p className="label-caps mb-4 mt-10 text-gold">The Journal</p>
        <h1 className="max-w-[20ch] font-display text-[2.6rem] text-ivory">
          Field notes on fragrance
        </h1>
        <p className="mt-5 max-w-[60ch] text-[1rem] leading-relaxed text-ivory/65">
          Guides on choosing, wearing and understanding men's fragrance —
          written to be useful before a purchase, not just around one.
        </p>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-3 gap-10"
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
              <h2 className="font-display text-[1.35rem] leading-snug text-ivory transition-colors group-hover:text-gold">
                {article.title}
              </h2>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ivory/60">
                {article.excerpt}
              </p>
            </MotionLink>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
