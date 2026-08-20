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
      className={`group relative flex w-full items-center gap-4 border-t border-sand-line py-4 pl-0 text-left transition-[color,background-color,padding-left] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] first:border-t-0 hover:bg-cognac/[0.06] hover:pl-3 ${
        active ? "bg-cognac/[0.04] pl-3 text-espresso" : "text-ink-soft"
      }`}
    >
      <span
        className="h-3 w-3 shrink-0 rounded-full border border-black/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        style={{
          backgroundColor: VARIANT_SWATCH[product.bottleVariant],
          transform: active ? "scale(1.25)" : undefined,
        }}
        aria-hidden="true"
      />
      <span className="flex-1">
        <span className={`font-display text-[1.1rem] transition-colors duration-300 ${active ? "text-cognac" : "group-hover:text-espresso"}`}>
          {product.name}
        </span>
        <span className="label-caps ml-3 text-ink-soft">{product.noteTag}</span>
      </span>
      <span className="whitespace-nowrap text-[0.92rem]">{priceFormatter.format(product.price)}</span>
    </button>
  );
}
