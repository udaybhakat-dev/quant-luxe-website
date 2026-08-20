import type { ElementType } from "react";
import { Link } from "react-router-dom";
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
  const Wrapper: ElementType = product.slug ? Link : "div";
  const wrapperProps = product.slug ? { to: `/${product.slug}` } : {};

  return (
    <article
      className="reveal group flex flex-col"
      data-revealed={revealed}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <Wrapper {...wrapperProps} className="flex flex-col">
        <TextureBlock
          variant={product.texture}
          className="relative mb-6 flex aspect-[4/5] items-center justify-center"
        >
          {product.isFlagship && (
            <span className="label-caps absolute left-4 top-4 text-parchment/90">Flagship</span>
          )}
          <BottleGlyph
            className="h-[62%] w-auto opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            stroke="#f1e8d8"
          />
        </TextureBlock>

        <div className="flex items-baseline justify-between gap-4 border-t border-sand-line pt-4">
          <div>
            <h3 className="font-display text-[1.35rem] text-espresso transition-colors group-hover:text-cognac">
              {product.name}
            </h3>
            <p className="label-caps mt-1.5 text-ink-soft">{product.noteTag}</p>
          </div>
          <p className="whitespace-nowrap font-display text-[1.15rem] text-espresso">
            {priceFormatter.format(product.price)}
          </p>
        </div>
      </Wrapper>
    </article>
  );
}
