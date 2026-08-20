import { Link, useNavigate } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { useCart } from "../context/CartContext";
import { trackEvent } from "../lib/analytics";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ChevronRight } from "../components/icons";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function BagPage() {
  const { items, subtotal, removeItem } = useCart();
  const navigate = useNavigate();

  useSeo({
    title: "Your Bag | Eleganz",
    description: "Review your Eleganz fragrance selection before checkout.",
    path: "/bag",
  });

  function handleBeginCheckout() {
    trackEvent("begin_checkout", { value: subtotal, items: items.length });
    navigate("/checkout");
  }

  return (
    <section className="min-h-[60vh] pt-[152px] pb-[128px]">
      <div className="container-site max-w-[860px]">
        <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Bag" }]} />

        <h1 className="mb-14 mt-10 font-display text-[2.4rem] text-espresso">Your Bag</h1>

        {items.length === 0 ? (
          <div className="border-t border-sand-line py-16 text-center">
            <p className="text-[1rem] text-ink-soft">Your bag is empty.</p>
            <Link
              to="/solaris"
              className="group label-caps mt-8 inline-flex items-center gap-3 border border-cognac bg-cognac px-8 py-4 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
            >
              Discover Eleganz Solaris
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-sand-line border-y border-sand-line">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-6 py-6">
                  <div>
                    <p className="font-display text-[1.25rem] text-espresso">{item.name}</p>
                    <p className="label-caps mt-1.5 text-ink-soft">
                      {item.volumeMl}ml &middot; Qty {item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <p className="font-display text-[1.15rem] text-espresso">
                      {priceFormatter.format(item.price * item.qty)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="label-caps text-ink-soft transition-colors hover:text-cognac"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="label-caps text-ink-soft">Subtotal</p>
              <p className="font-display text-[1.5rem] text-espresso">
                {priceFormatter.format(subtotal)}
              </p>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleBeginCheckout}
                className="group label-caps inline-flex items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
              >
                Begin Checkout
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
