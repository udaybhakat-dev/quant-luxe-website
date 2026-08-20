import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { useReveal } from "../hooks/useReveal";
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

const solaris = products.find((p) => p.slug === "solaris")!;

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function SolarisPage() {
  const { addItem } = useCart();
  const { ref: notesRef, revealed: notesRevealed } = useReveal<HTMLDivElement>(0.15);
  const { ref: journalRef, revealed: journalRevealed } = useReveal<HTMLDivElement>(0.1);

  useSeo({
    title: "Eleganz Solaris | Fresh Woody Luxury Perfume for Men",
    description:
      "Eleganz Solaris — a long lasting perfume for men with fresh citrus, aromatic lavender and a deep woody base. ₹2,999 for 100ml. The luxury perfume for men built for Indian summer.",
    path: "/solaris",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: solaris.name,
      description: solaris.description,
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
          <Breadcrumbs
            trail={[{ label: "Home", to: "/" }, { label: "Eleganz Solaris" }]}
          />

          <div className="mt-10 grid grid-cols-12 gap-16">
            <div className="col-span-6">
              <BottleStage className="aspect-[4/5] w-full" glow={VARIANT_SWATCH[solaris.bottleVariant]}>
                <span className="label-caps absolute left-6 top-6 text-parchment/90">
                  Flagship
                </span>
                <SculptedBottle
                  variant={solaris.bottleVariant}
                  className="h-[78%] w-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
                />
              </BottleStage>
            </div>

            <div className="col-span-6 flex flex-col justify-center">
              <p className="label-caps mb-4 text-cognac">Eleganz — The House Flagship</p>
              <h1 className="font-display text-[3rem] leading-[1.05] text-espresso">
                {solaris.name}
              </h1>
              <p className="mt-4 max-w-[46ch] font-display text-[1.35rem] italic leading-snug text-cognac">
                {solaris.tagline}
              </p>

              <p className="mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-ink-soft">
                {solaris.description}
              </p>

              <dl className="mt-8 flex items-center gap-10 border-y border-sand-line py-6">
                <div>
                  <dt className="label-caps text-ink-soft">Price</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-espresso">
                    {priceFormatter.format(solaris.price)}
                  </dd>
                </div>
                <div>
                  <dt className="label-caps text-ink-soft">Size</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-espresso">
                    {solaris.volumeMl} ml
                  </dd>
                </div>
                <div>
                  <dt className="label-caps text-ink-soft">Concentration</dt>
                  <dd className="mt-1 font-display text-[1.6rem] text-espresso">EDP</dd>
                </div>
              </dl>

              <div className="mt-8 flex items-center gap-8">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="label-caps inline-flex items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
                >
                  Add to Bag
                </button>
                <a
                  href="#fragrance-notes"
                  className="label-caps text-espresso underline-offset-4 transition-colors hover:text-cognac hover:underline"
                >
                  View fragrance notes
                </a>
              </div>

              <p className="mt-6 text-[0.85rem] leading-relaxed text-ink-soft">
                Free shipping on prepaid orders &middot; 7-day easy returns &middot;
                Cash on delivery available &middot; This is an academic prototype —
                checkout is a functional demo, not a real payment gateway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-parchment-deep py-[104px]">
        <div className="container-site grid grid-cols-12 gap-16">
          <div className="col-span-5">
            <p className="label-caps mb-4 text-cognac">Why Solaris</p>
            <h2 className="max-w-[16ch] font-display text-[2.2rem] text-espresso">
              A luxury perfume for men, built for Indian summer
            </h2>
            <p className="mt-5 max-w-[50ch] text-[0.98rem] leading-relaxed text-ink-soft">
              Most fresh fragrances fade within a couple of hours in heat and
              humidity, and most long-lasting ones feel too heavy to wear
              before noon. Solaris is formulated for exactly that trade-off —
              a fresh-woody perfume for men that opens light and dries down
              into a deep, long-lasting base, so it holds up through an
              Indian summer day without turning into a headache.
            </p>
          </div>
          <div className="col-span-7">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-8">
              {solaris.benefits?.map((benefit) => (
                <li key={benefit} className="border-t border-sand-line pt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fragrance notes */}
      <section id="fragrance-notes" className="py-[128px]">
        <div className="container-site">
          <p className="label-caps mb-4 text-cognac">Fragrance Notes</p>
          <h2 className="max-w-[24ch] font-display text-[2.2rem] text-espresso">
            Fresh citrus, aromatic sophistication, a deep woody finish
          </h2>

          <div ref={notesRef} className="mt-16 grid grid-cols-3 gap-10">
            {(
              [
                { label: "Top Notes", key: "top", texture: "linen" as const },
                { label: "Heart Notes", key: "heart", texture: "spice" as const },
                { label: "Base Notes", key: "base", texture: "wood" as const },
              ] as const
            ).map((group, i) => (
              <div
                key={group.key}
                className="reveal"
                data-revealed={notesRevealed}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <TextureBlock variant={group.texture} className="mb-6 aspect-[4/3]" />
                <p className="label-caps mb-3 text-sand">{group.label}</p>
                <ul className="flex flex-col gap-1.5">
                  {solaris.notesDetail?.[group.key].map((note) => (
                    <li key={note} className="font-display text-[1.15rem] text-espresso">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="bg-parchment-deep py-[104px]">
        <div className="container-site">
          <p className="label-caps mb-4 text-cognac">Best Occasions to Wear It</p>
          <h2 className="max-w-[24ch] font-display text-[2.2rem] text-espresso">
            One bottle, from the office to the evening
          </h2>
          <ul className="mt-12 grid grid-cols-4 gap-8">
            {solaris.occasions?.map((occasion) => (
              <li key={occasion} className="border-t border-cognac pt-4 font-display text-[1.15rem] text-espresso">
                {occasion}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-[128px]">
        <div className="container-site grid grid-cols-12 gap-16">
          <div className="col-span-5">
            <p className="label-caps mb-4 text-cognac">How to Apply</p>
            <h2 className="max-w-[16ch] font-display text-[2.2rem] text-espresso">
              How to apply Eleganz Solaris
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.98rem] leading-relaxed text-ink-soft">
              How you apply perfume changes how long it lasts as much as the
              formula itself. A few habits make the biggest difference.
            </p>
          </div>
          <div className="col-span-7">
            <ol className="flex flex-col gap-6">
              {solaris.howToApply?.map((step, i) => (
                <li key={step} className="flex gap-6 border-t border-sand-line pt-5">
                  <span className="label-caps shrink-0 text-cognac">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.98rem] leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-parchment-deep py-[128px]">
        <div className="container-site max-w-[860px]">
          <p className="label-caps mb-4 text-cognac">Questions</p>
          <h2 className="mb-14 font-display text-[2.2rem] text-espresso">
            Frequently asked questions
          </h2>
          {solaris.faqs && <Faq items={solaris.faqs} />}
        </div>
      </section>

      {/* Related journal content */}
      <section className="py-[128px]">
        <div className="container-site">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="label-caps mb-4 text-cognac">Read Before You Buy</p>
              <h2 className="font-display text-[2.2rem] text-espresso">From the Journal</h2>
            </div>
            <Link
              to="/journal"
              className="label-caps flex items-center gap-2 text-espresso transition-colors hover:text-cognac"
            >
              View all articles
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div ref={journalRef} className="grid grid-cols-3 gap-10">
            {relatedArticles.map((article, i) => (
              <Link
                key={article.id}
                to={`/journal/${article.slug}`}
                className="reveal group flex flex-col"
                data-revealed={journalRevealed}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <TextureBlock
                  variant={article.texture}
                  className="mb-6 aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
                <h3 className="font-display text-[1.2rem] leading-snug text-espresso transition-colors group-hover:text-cognac">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-espresso py-[104px] text-parchment">
        <div className="container-site flex items-center justify-between gap-16">
          <div>
            <h2 className="font-display text-[2rem] text-parchment">
              Eleganz Solaris — {priceFormatter.format(solaris.price)} for {solaris.volumeMl}ml
            </h2>
            <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-parchment/70">
              Fresh citrus. Aromatic sophistication. A deep woody finish.
              Ready to buy a luxury perfume for men that's built to last the
              day? Add Solaris to your bag and see the full demo checkout
              flow.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddToBag}
            className="label-caps inline-flex shrink-0 items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
          >
            Add to Bag
          </button>
        </div>
      </section>
    </>
  );
}
