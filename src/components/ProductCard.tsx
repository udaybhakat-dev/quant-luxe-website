import type { Product } from "../data/types";
import { TextureBlock } from "./placeholder/TextureBlock";
import { BottleGlyph } from "./placeholder/BottleGlyph";

interface ProductCardProps {
  product: Product;
  revealed: boolean;
  delayMs?: number;
}

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ProductCard({ product, revealed, delayMs = 0 }: ProductCardProps) {
  return (
    <article
      className="reveal group flex flex-col"
      data-revealed={revealed}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <TextureBlock
        variant={product.texture}
        className="mb-6 flex aspect-[4/5] items-center justify-center"
      >
        <BottleGlyph
          className="h-[62%] w-auto opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          stroke="#f1e8d8"
        />
      </TextureBlock>

      <div className="flex items-baseline justify-between gap-4 border-t border-sand-line pt-4">
        <div>
          <h3 className="font-display text-[1.35rem] text-espresso">{product.name}</h3>
          <p className="label-caps mt-1.5 text-ink-soft">{product.noteTag}</p>
        </div>
        <p className="whitespace-nowrap font-display text-[1.15rem] text-espresso">
          {priceFormatter.format(product.price)}
        </p>
      </div>
    </article>
  );
}
