import { useState, type FormEvent } from "react";
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

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useSeo({
    title: "Checkout | Eleganz",
    description: "Demo checkout for Eleganz fragrance orders.",
    path: "/checkout",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    const orderId = `ELG-${Math.floor(100000 + Math.random() * 900000)}`;
    trackEvent("purchase", { transaction_id: orderId, value: subtotal, items: items.length });

    const orderSummary = { orderId, items, subtotal };
    clearCart();
    navigate("/order-confirmation", { state: orderSummary });
  }

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] pt-[152px] pb-[128px]">
        <div className="container-site max-w-[760px] text-center">
          <h1 className="font-display text-[2rem] text-ivory">Checkout</h1>
          <p className="mt-4 text-[1rem] text-ivory/60">
            Your bag is empty — add Eleganz Solaris before checking out.
          </p>
          <MotionLink
            to="/solaris"
            {...ctaHover}
            className="group label-caps mt-8 inline-flex items-center gap-3 border border-cognac bg-cognac px-8 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
          >
            Discover Eleganz Solaris
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </MotionLink>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[152px] pb-[128px]">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="container-site max-w-[960px]">
        <Breadcrumbs
          trail={[{ label: "Home", to: "/" }, { label: "Bag", to: "/bag" }, { label: "Checkout" }]}
        />

        <h1 className="mb-4 mt-10 font-display text-[2.4rem] text-ivory">Checkout</h1>
        <p className="mb-14 max-w-[60ch] text-[0.9rem] leading-relaxed text-ivory/55">
          This is an academic prototype — no real payment is processed. Submitting
          this form completes a demo purchase for the assignment's conversion journey.
        </p>

        <div className="grid grid-cols-12 gap-16">
          <form onSubmit={handleSubmit} className="col-span-7 flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="label-caps mb-2 block text-ivory/55">
                Full name
              </label>
              <input
                id="name"
                required
                type="text"
                placeholder="Aditya Rao"
                className="w-full border border-bronze/25 bg-transparent px-4 py-3 text-[0.95rem] text-ivory placeholder:text-ivory/35 focus-visible:border-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="label-caps mb-2 block text-ivory/55">
                Email
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="you@example.com"
                className="w-full border border-bronze/25 bg-transparent px-4 py-3 text-[0.95rem] text-ivory placeholder:text-ivory/35 focus-visible:border-gold"
              />
            </div>
            <div>
              <label htmlFor="address" className="label-caps mb-2 block text-ivory/55">
                Delivery address
              </label>
              <textarea
                id="address"
                required
                rows={3}
                placeholder="Address, city, PIN code"
                className="w-full resize-none border border-bronze/25 bg-transparent px-4 py-3 text-[0.95rem] text-ivory placeholder:text-ivory/35 focus-visible:border-gold"
              />
            </div>

            <MotionButton
              type="submit"
              disabled={submitting}
              {...ctaHover}
              className="group label-caps mt-4 inline-flex items-center justify-center gap-3 border border-cognac bg-cognac px-9 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany disabled:opacity-60"
            >
              Complete Demo Purchase
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </MotionButton>
          </form>

          <div className="col-span-5">
            <p className="label-caps mb-5 text-gold">Order Summary</p>
            <div className="flex flex-col divide-y divide-bronze/20 border-y border-bronze/20">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-display text-[1.05rem] text-ivory">{item.name}</p>
                    <p className="label-caps mt-1 text-ivory/55">
                      {item.volumeMl}ml &middot; Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-[0.95rem] text-ivory">
                    {priceFormatter.format(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="label-caps text-ivory/55">Total</p>
              <p className="font-display text-[1.4rem] text-ivory">
                {priceFormatter.format(subtotal)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
