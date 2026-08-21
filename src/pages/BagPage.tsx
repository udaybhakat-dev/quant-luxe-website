import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { useCart } from "../context/CartContext";
import { trackEvent } from "../lib/analytics";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ChevronRight } from "../components/icons";
import { ctaHover, fadeUp } from "../lib/motion";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const MotionLink = motion.create(Link);
const MotionButton = motion.create("button");

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
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="container-site max-w-[860px]">
        <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Bag" }]} />

        <h1 className="mb-14 mt-10 font-display text-[2.4rem] text-ivory">Your Bag</h1>

        {items.length === 0 ? (
          <div className="border-t border-bronze/20 py-16 text-center">
            <p className="text-[1rem] text-ivory/60">Your bag is empty.</p>
            <MotionLink
              to="/solaris"
              {...ctaHover}
              className="group label-caps mt-8 inline-flex items-center gap-3 border border-cognac bg-cognac px-8 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
            >
              Discover Eleganz Solaris
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </MotionLink>
          </div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-bronze/20 border-y border-bronze/20">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between gap-6 py-6">
                  <div>
                    <p className="font-display text-[1.25rem] text-ivory">{item.name}</p>
                    <p className="label-caps mt-1.5 text-ivory/55">
                      {item.volumeMl}ml &middot; Qty {item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <p className="font-display text-[1.15rem] text-ivory">
                      {priceFormatter.format(item.price * item.qty)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="label-caps text-ivory/55 transition-colors hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="label-caps text-ivory/55">Subtotal</p>
              <p className="font-display text-[1.5rem] text-ivory">
                {priceFormatter.format(subtotal)}
              </p>
            </div>

            <div className="mt-10 flex justify-end">
              <MotionButton
                type="button"
                onClick={handleBeginCheckout}
                {...ctaHover}
                className="group label-caps inline-flex items-center gap-3 border border-cognac bg-cognac px-9 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
              >
                Begin Checkout
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </MotionButton>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
