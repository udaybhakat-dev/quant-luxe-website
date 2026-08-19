import { products } from "../../data/products";
import { useReveal } from "../../hooks/useReveal";
import { ProductCard } from "../ProductCard";

export function SignatureScents() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="shop" className="bg-parchment py-[128px]">
      <div className="container-site">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="label-caps mb-4 text-cognac">The Collection</p>
            <h2 className="font-display text-[2.4rem] text-espresso">Signature Scents</h2>
          </div>
          <p className="max-w-[34ch] text-right text-[0.95rem] leading-relaxed text-ink-soft">
            Six fragrances. No seasonal drops, no seventeen variants — just
            the six we believe in.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-3 gap-x-10 gap-y-16">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              revealed={revealed}
              delayMs={i * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
