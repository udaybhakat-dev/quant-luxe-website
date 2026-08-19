import { useReveal } from "../../hooks/useReveal";

export function BrandManifesto() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-parchment py-[140px]">
      <div
        ref={ref}
        data-revealed={revealed}
        className="reveal container-site max-w-[980px]"
      >
        <p className="font-display text-[2.6rem] font-normal leading-[1.22] text-espresso">
          We built Quant Luxe on a simple bet: that a man who has already
          learned restraint in how he dresses will recognise it in how he
          smells.
        </p>
        <p className="mt-8 font-display text-[2.6rem] font-normal leading-[1.22] text-cognac">
          No fragrance here is designed to fill a room. Each is designed to
          be discovered.
        </p>
      </div>
    </section>
  );
}
