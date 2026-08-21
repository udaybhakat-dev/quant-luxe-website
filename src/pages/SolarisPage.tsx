import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";
import { SITE_URL } from "../lib/siteConfig";
import { useCart } from "../context/CartContext";
import { trackEvent } from "../lib/analytics";
import { products } from "../data/products";
import { journalArticles } from "../data/journal";
import { TextureBlock } from "../components/placeholder/TextureBlock";
import { BottleStage } from "../components/placeholder/BottleStage";
import { SculptedBottle, VARIANT_SWATCH } from "../components/placeholder/SculptedBottle";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Faq } from "../components/Faq";
import { ChevronRight } from "../components/icons";
import { ctaHover, EASE_PREMIUM, fadeFromLeft, fadeFromRight, fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const solaris = products.find((p) => p.slug === "solaris")!;

const NOTE_IMAGES = {
  top: {
    src: "/images/products/solaris-top-notes.png",
    alt: "Solaris perfume top notes: Sicilian bergamot, pink grapefruit and cardamom",
  },
  heart: {
    src: "/images/products/solaris-heart-notes.png",
    alt: "Solaris perfume heart notes: lavender, geranium and aromatic accord",
  },
  base: {
    src: "/images/products/solaris-base-notes.png",
    alt: "Solaris perfume base notes: vetiver, cedarwood and amberwood",
  },
} as const satisfies Record<"top" | "heart" | "base", { src: string; alt: string }>;

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const MotionButton = motion.create("button");
const MotionLink = motion.create(Link);

const breadcrumbTrail = [{ label: "Home", to: "/" }, { label: "Eleganz Solaris" }];

export function SolarisPage() {
  const { addItem } = useCart();

  useSeo({
    title: "Eleganz Solaris | Fresh Woody Luxury Perfume for Men",
    description:
      "Eleganz Solaris — a long lasting perfume for men with fresh citrus, aromatic lavender and a deep woody base. ₹2,999 for 100ml. The luxury perfume for men built for Indian summer.",
    path: "/solaris",
    image: solaris.photoImage,
    breadcrumb: breadcrumbTrail,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: solaris.name,
      description: solaris.description,
      image: solaris.photoImage ? `${SITE_URL}${solaris.photoImage}` : undefined,
      brand: { "@type": "Brand", name: "Eleganz" },
      manufacturer: { "@type": "Organization", name: "Quant Luxe Lifestyle Pvt. Ltd." },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: solaris.price,
        availability: "https://schema.org/InStock",
      },
    },
  });

  useEffect(() => {
    trackEvent("view_item", { item_id: solaris.id, item_name: solaris.name, price: solaris.price });
  }, []);

  function handleAddToBag() {
    addItem({
      productId: solaris.id,
      name: solaris.name,
      price: solaris.price,
      volumeMl: solaris.volumeMl,
    });
    trackEvent("add_to_cart", { item_id: solaris.id, item_name: solaris.name, price: solaris.price });
  }

  const relatedArticles = journalArticles;

  return (
    <>
      {/* Product intro */}
      <section className="pt-[152px] pb-[96px]">
        <div className="container-site">
          <Breadcrumbs trail={breadcrumbTrail} />

          <div className="mt-10 grid grid-cols-12 gap-16">
            <motion.div variants={fadeFromLeft} initial="hidden" animate="visible" className="col-span-6">
              <BottleStage className="aspect-[4/5] w-full" glow={VARIANT_SWATCH[solaris.bottleVariant]}>
                <span className="label-caps absolute left-6 top-6 text-ivory/90">
                  Flagship
                </span>
                {solaris.photoImage ? (
                  <img
                    src={solaris.photoImage}
                    alt="Eleganz Solaris — sculptural amber glass bottle with an engraved profile relief, photographed in warm studio light"
                    className="h-full w-full object-contain p-10 drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                  />
                ) : (
                  <SculptedBottle
                    variant={solaris.bottleVariant}
                    className="h-[78%] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                  />
                )}
              </BottleStage>
            </motion.div>

            <motion.div
              variants={fadeFromRight}
              initial="hidden"
              animate="visible"
              className="col-span-6 flex flex-col justify-center"
            >
              <p className="label-caps mb-4 text-gold">Eleganz — The House Flagship</p>
              <h1 className="font-display text-[3rem] leading-[1.05] text-ivory">
                {solaris.name}
              </h1>
              <p className="mt-4 max-w-[46ch] font-display text-[1.35rem] italic leading-snug text-gold">
                {solaris.tagline}
              </p>

              <p className="mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-ivory/65">
                {solaris.description}
              </p>

              <dl className="mt-8 flex items-center gap-10 border-y border-bronze/20 py-6">
                <div>
                  <dt className="label-caps text-ivory/50">Price</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-ivory">
                    {priceFormatter.format(solaris.price)}
                  </dd>
                </div>
                <div>
                  <dt className="label-caps text-ivory/50">Size</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-ivory">
                    {solaris.volumeMl} ml
                  </dd>
                </div>
                <div>
                  <dt className="label-caps text-ivory/50">Concentration</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-ivory">EDP</dd>
                </div>
              </dl>

              <div className="mt-8 flex items-center gap-8">
                <MotionButton
                  type="button"
                  onClick={handleAddToBag}
                  {...ctaHover}
                  className="label-caps inline-flex items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
                >
                  Add to Bag
                </MotionButton>
                <a
                  href="#fragrance-notes"
                  className="label-caps text-ivory underline-offset-4 transition-colors hover:text-gold hover:underline"
                >
                  View fragrance notes
                </a>
              </div>

              <p className="mt-6 text-[0.85rem] leading-relaxed text-ivory/50">
                Free shipping on prepaid orders &middot; 7-day easy returns &middot;
                Cash on delivery available &middot; This is an academic prototype —
                checkout is a functional demo, not a real payment gateway.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-chocolate py-[104px]">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site grid grid-cols-12 gap-16"
        >
          <motion.div variants={fadeUp} className="col-span-5">
            <p className="label-caps mb-4 text-gold">Why Solaris</p>
            <h2 className="max-w-[16ch] font-display text-[2.2rem] text-ivory">
              A luxury perfume for men, built for Indian summer
            </h2>
            <p className="mt-5 max-w-[50ch] text-[0.98rem] leading-relaxed text-ivory/65">
              Most fresh fragrances fade within a couple of hours in heat and
              humidity, and most long-lasting ones feel too heavy to wear
              before noon. Solaris is formulated for exactly that trade-off —
              a fresh-woody perfume for men that opens light and dries down
              into a deep, long-lasting base, so it holds up through an
              Indian summer day without turning into a headache.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-7">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-8">
              {solaris.benefits?.map((benefit) => (
                <li key={benefit} className="border-t border-bronze/20 pt-4 text-[0.95rem] leading-relaxed text-ivory/70">
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Fragrance notes */}
      <section id="fragrance-notes" className="py-[128px]">
        <div className="container-site">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="label-caps mb-4 text-gold">Fragrance Notes</p>
            <h2 className="max-w-[24ch] font-display text-[2.2rem] text-ivory">
              Fresh citrus, aromatic sophistication, a deep woody finish
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10"
          >
            {(
              [
                { label: "Top Notes", key: "top" },
                { label: "Heart Notes", key: "heart" },
                { label: "Base Notes", key: "base" },
              ] as const
            ).map((group) => (
              <motion.div key={group.key} variants={fadeUp}>
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-[4px]">
                  <motion.img
                    src={NOTE_IMAGES[group.key].src}
                    alt={NOTE_IMAGES[group.key].alt}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                </div>
                <p className="label-caps mb-3 text-bronze">{group.label}</p>
                <ul className="flex flex-col gap-1.5">
                  {solaris.notesDetail?.[group.key].map((note) => (
                    <li key={note} className="font-display text-[1.15rem] text-ivory">
                      {note}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Occasions */}
      <section className="relative bg-umber py-[104px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site"
        >
          <p className="label-caps mb-4 text-gold">Best Occasions to Wear It</p>
          <h2 className="max-w-[24ch] font-display text-[2.2rem] text-ivory">
            One bottle, from the office to the evening
          </h2>
          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid grid-cols-4 gap-8"
          >
            {solaris.occasions?.map((occasion) => (
              <motion.li
                variants={fadeUp}
                key={occasion}
                className="border-t border-cognac pt-4 font-display text-[1.15rem] text-ivory"
              >
                {occasion}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* How to apply */}
      <section className="py-[128px]">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site grid grid-cols-12 gap-16"
        >
          <motion.div variants={fadeUp} className="col-span-5">
            <p className="label-caps mb-4 text-gold">How to Apply</p>
            <h2 className="max-w-[16ch] font-display text-[2.2rem] text-ivory">
              How to apply Eleganz Solaris
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-relaxed text-ivory/65">
              How you apply perfume changes how long it lasts as much as the
              formula itself. A few habits make the biggest difference.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-7">
            <ol className="flex flex-col gap-6">
              {solaris.howToApply?.map((step, i) => (
                <li key={step} className="flex gap-6 border-t border-bronze/20 pt-5">
                  <span className="label-caps shrink-0 text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.98rem] leading-relaxed text-ivory/65">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="relative bg-chocolate py-[128px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site max-w-[860px]"
        >
          <p className="label-caps mb-4 text-gold">Questions</p>
          <h2 className="mb-14 font-display text-[2.2rem] text-ivory">
            Frequently asked questions
          </h2>
          {solaris.faqs && <Faq items={solaris.faqs} />}
        </motion.div>
      </section>

      {/* Related journal content */}
      <section className="py-[128px]">
        <div className="container-site">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <p className="label-caps mb-4 text-gold">Read Before You Buy</p>
              <h2 className="font-display text-[2.2rem] text-ivory">From the Journal</h2>
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
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-3 gap-10"
          >
            {relatedArticles.map((article) => (
              <MotionLink
                key={article.id}
                to={`/journal/${article.slug}`}
                variants={fadeUp}
                whileHover="hover"
                className="group flex flex-col"
              >
                <div className="mb-6 overflow-hidden rounded-[4px]">
                  <motion.div variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                    <TextureBlock variant={article.texture} className="aspect-[4/3]" />
                  </motion.div>
                </div>
                <h3 className="font-display text-[1.2rem] leading-snug text-ivory transition-colors group-hover:text-gold">
                  {article.title}
                </h3>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="depth-glow-dark relative bg-void py-[104px] text-ivory">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site relative z-10 flex items-center justify-between gap-16"
        >
          <div>
            <h2 className="font-display text-[2rem] text-ivory">
              Eleganz Solaris — {priceFormatter.format(solaris.price)} for {solaris.volumeMl}ml
            </h2>
            <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-ivory/65">
              Fresh citrus. Aromatic sophistication. A deep woody finish.
              Ready to buy a luxury perfume for men that's built to last the
              day? Add Solaris to your bag and see the full demo checkout
              flow.
            </p>
          </div>
          <MotionButton
            type="button"
            onClick={handleAddToBag}
            {...ctaHover}
            className="label-caps inline-flex shrink-0 items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
          >
            Add to Bag
          </MotionButton>
        </motion.div>
      </section>
    </>
  );
}
