import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { trackEvent } from "../../lib/analytics";
import { CollectionRow } from "../CollectionRow";
import { BottleStage } from "../placeholder/BottleStage";
import { SculptedBottle, VARIANT_LABEL, VARIANT_SWATCH } from "../placeholder/SculptedBottle";
import { ChevronRight } from "../icons";
import { ctaHover, fadeUp, productCopyVariants, productImageVariants, viewportOnce } from "../../lib/motion";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const flagship = products.find((p) => p.isFlagship) ?? products[0];
const MotionButton = motion.create("button");

export function SignatureScents() {
  const [selectedId, setSelectedId] = useState(flagship.id);
  const { addItem } = useCart();
  const selected = products.find((p) => p.id === selectedId) ?? flagship;

  function handleAddToBag() {
    addItem({
      productId: selected.id,
      name: selected.name,
      price: selected.price,
      volumeMl: selected.volumeMl,
    });
    trackEvent("add_to_cart", { item_id: selected.id, item_name: selected.name, price: selected.price });
  }

  return (
    <section id="shop" className="depth-glow-warm relative bg-espresso py-[128px]">
      <div className="container-site relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="label-caps mb-4 text-gold">The Collection</p>
            <h2 className="font-display text-[2.4rem] text-ivory">Signature Scents</h2>
          </div>
          <p className="max-w-[34ch] text-right text-[0.95rem] leading-relaxed text-ivory/60">
            One bottle silhouette, seven glass finishes. Select a fragrance to
            see its own colour, notes and mood.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-12 gap-16"
        >
          <div className="col-span-7">
            <BottleStage className="aspect-[4/5] w-full" glow={VARIANT_SWATCH[selected.bottleVariant]}>
              {selected.isFlagship && (
                <span className="label-caps absolute left-6 top-6 text-ivory/90">Flagship</span>
              )}
              <span className="label-caps absolute right-6 top-6 text-ivory/55">
                {VARIANT_LABEL[selected.bottleVariant]} Glass
              </span>
              <AnimatePresence mode="wait">
                {selected.photoImage ? (
                  <motion.img
                    key={selected.id}
                    src={selected.photoImage}
                    alt={`Eleganz ${selected.name} — photorealistic product bottle`}
                    variants={productImageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full w-full object-contain p-10 drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                  />
                ) : (
                  <motion.div
                    key={selected.id}
                    variants={productImageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex h-full w-full items-center justify-center"
                  >
                    <SculptedBottle
                      variant={selected.bottleVariant}
                      className="h-[82%] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </BottleStage>
          </div>

          <div className="col-span-5 flex flex-col">
            <div className="flex flex-col">
              {products.map((product) => (
                <CollectionRow
                  key={product.id}
                  product={product}
                  active={product.id === selected.id}
                  onSelect={() => setSelectedId(product.id)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                variants={productCopyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="mt-10 border-t border-cognac/60 pt-8"
              >
                <h3 className="font-display text-[1.7rem] text-ivory">{selected.name}</h3>
                <p className="mt-2 font-display text-[1.05rem] italic leading-snug text-gold">
                  {selected.mood}
                </p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ivory/65">
                  {selected.description}
                </p>

                <div className="mt-6">
                  <p className="label-caps mb-2 text-ivory/55">Notes</p>
                  {selected.notesDetail ? (
                    <p className="text-[0.9rem] leading-relaxed text-ivory/85">
                      <strong className="font-medium text-ivory">Top</strong> {selected.notesDetail.top.join(", ")}
                      {" — "}
                      <strong className="font-medium text-ivory">Heart</strong> {selected.notesDetail.heart.join(", ")}
                      {" — "}
                      <strong className="font-medium text-ivory">Base</strong> {selected.notesDetail.base.join(", ")}
                    </p>
                  ) : (
                    <p className="text-[0.9rem] leading-relaxed text-ivory/85">{selected.notes.join(", ")}</p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-bronze/25 pt-6">
                  <p className="font-display text-[1.3rem] text-ivory">
                    {priceFormatter.format(selected.price)}
                    <span className="ml-2 text-[0.85rem] font-normal text-ivory/55">
                      / {selected.volumeMl}ml
                    </span>
                  </p>

                  {selected.slug ? (
                    <div className="flex items-center gap-6">
                      <MotionButton
                        type="button"
                        onClick={handleAddToBag}
                        {...ctaHover}
                        className="label-caps border border-cognac bg-cognac px-6 py-3 text-ivory transition-colors duration-300 hover:bg-mahogany"
                      >
                        Add to Bag
                      </MotionButton>
                      <Link
                        to={`/${selected.slug}`}
                        className="group label-caps flex items-center gap-2 text-ivory transition-colors hover:text-gold"
                      >
                        Full details
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  ) : (
                    <p className="label-caps text-ivory/55">Part of the core collection</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
