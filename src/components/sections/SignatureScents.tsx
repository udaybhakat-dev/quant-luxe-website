import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { trackEvent } from "../../lib/analytics";
import { CollectionRow } from "../CollectionRow";
import { BottleStage } from "../placeholder/BottleStage";
import { SculptedBottle, VARIANT_LABEL, VARIANT_SWATCH } from "../placeholder/SculptedBottle";
import { ChevronRight } from "../icons";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const flagship = products.find((p) => p.isFlagship) ?? products[0];

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
    <section id="shop" className="bg-parchment py-[128px]">
      <div className="container-site">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="label-caps mb-4 text-cognac">The Collection</p>
            <h2 className="font-display text-[2.4rem] text-espresso">Signature Scents</h2>
          </div>
          <p className="max-w-[34ch] text-right text-[0.95rem] leading-relaxed text-ink-soft">
            One bottle silhouette, seven glass finishes. Select a fragrance to
            see its own colour, notes and mood.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-7">
            <BottleStage className="aspect-[4/5] w-full" glow={VARIANT_SWATCH[selected.bottleVariant]}>
              {selected.isFlagship && (
                <span className="label-caps absolute left-6 top-6 text-parchment/90">Flagship</span>
              )}
              <span className="label-caps absolute right-6 top-6 text-parchment/60">
                {VARIANT_LABEL[selected.bottleVariant]} Glass
              </span>
              <SculptedBottle
                variant={selected.bottleVariant}
                className="h-[82%] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
              />
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

            <div className="mt-10 border-t border-cognac pt-8">
              <h3 className="font-display text-[1.7rem] text-espresso">{selected.name}</h3>
              <p className="mt-2 font-display text-[1.05rem] italic leading-snug text-cognac">
                {selected.mood}
              </p>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-soft">
                {selected.description}
              </p>

              <div className="mt-6">
                <p className="label-caps mb-2 text-ink-soft">Notes</p>
                {selected.notesDetail ? (
                  <p className="text-[0.9rem] leading-relaxed text-espresso">
                    <strong className="font-medium">Top</strong> {selected.notesDetail.top.join(", ")}
                    {" — "}
                    <strong className="font-medium">Heart</strong> {selected.notesDetail.heart.join(", ")}
                    {" — "}
                    <strong className="font-medium">Base</strong> {selected.notesDetail.base.join(", ")}
                  </p>
                ) : (
                  <p className="text-[0.9rem] leading-relaxed text-espresso">{selected.notes.join(", ")}</p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-sand-line pt-6">
                <p className="font-display text-[1.3rem] text-espresso">
                  {priceFormatter.format(selected.price)}
                  <span className="ml-2 text-[0.85rem] font-normal text-ink-soft">
                    / {selected.volumeMl}ml
                  </span>
                </p>

                {selected.slug ? (
                  <div className="flex items-center gap-6">
                    <button
                      type="button"
                      onClick={handleAddToBag}
                      className="label-caps border border-cognac bg-cognac px-6 py-3 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
                    >
                      Add to Bag
                    </button>
                    <Link
                      to={`/${selected.slug}`}
                      className="group label-caps flex items-center gap-2 text-espresso transition-colors hover:text-cognac"
                    >
                      Full details
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                ) : (
                  <p className="label-caps text-ink-soft">Part of the core collection</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
