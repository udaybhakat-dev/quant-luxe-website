import type { Product } from "../data/types";
import { VARIANT_SWATCH } from "./placeholder/SculptedBottle";

interface CollectionRowProps {
  product: Product;
  active: boolean;
  onSelect: () => void;
}

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CollectionRow({ product, active, onSelect }: CollectionRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex w-full items-center gap-4 border-t border-sand-line py-4 text-left transition-colors duration-200 first:border-t-0 ${
        active ? "text-espresso" : "text-ink-soft hover:text-espresso"
      }`}
    >
      <span
        className="h-3 w-3 shrink-0 rounded-full border border-black/10 transition-transform duration-200"
        style={{
          backgroundColor: VARIANT_SWATCH[product.bottleVariant],
          transform: active ? "scale(1.25)" : "scale(1)",
        }}
        aria-hidden="true"
      />
      <span className="flex-1">
        <span className={`font-display text-[1.1rem] transition-colors duration-200 ${active ? "text-cognac" : ""}`}>
          {product.name}
        </span>
        <span className="label-caps ml-3 text-ink-soft">{product.noteTag}</span>
      </span>
      <span className="whitespace-nowrap text-[0.92rem]">{priceFormatter.format(product.price)}</span>
    </button>
  );
}
