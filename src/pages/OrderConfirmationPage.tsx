import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import type { CartItem } from "../context/CartContext";
import { ChevronRight } from "../components/icons";
import { ctaHover, fadeUp } from "../lib/motion";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface OrderState {
  orderId: string;
  items: CartItem[];
  subtotal: number;
}

const MotionLink = motion.create(Link);

export function OrderConfirmationPage() {
  const location = useLocation();
  const order = location.state as OrderState | null;

  useSeo({
    title: "Order Confirmed | Eleganz",
    description: "Your demo Eleganz order has been confirmed.",
    path: "/order-confirmation",
  });

  return (
    <section className="min-h-[70vh] pt-[152px] pb-[128px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container-site max-w-[640px] text-center"
      >
        <p className="label-caps mb-4 text-gold">Order Confirmed</p>
        <h1 className="font-display text-[2.4rem] text-ivory">
          Thank you — your order is placed.
        </h1>

        {order ? (
          <>
            <p className="mt-6 text-[0.95rem] text-ivory/60">
              Order <strong className="text-ivory">{order.orderId}</strong> for{" "}
              {priceFormatter.format(order.subtotal)} has been recorded for this
              demo checkout.
            </p>
            <div className="mt-10 flex flex-col divide-y divide-bronze/20 border-y border-bronze/20 text-left">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between py-4">
                  <p className="font-display text-[1.05rem] text-ivory">{item.name}</p>
                  <p className="text-[0.95rem] text-ivory/60">
                    Qty {item.qty} &middot; {priceFormatter.format(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-6 text-[0.95rem] text-ivory/60">
            This is a demo confirmation page — no order details were passed
            directly, but the conversion journey (Add to Bag → Checkout →
            Purchase) completed successfully.
          </p>
        )}

        <p className="mt-10 text-[0.85rem] text-ivory/50">
          This is an academic prototype — no real payment was processed and
          no fragrance will be shipped.
        </p>

        <div className="mt-10 flex items-center justify-center gap-8">
          <MotionLink
            to="/"
            {...ctaHover}
            className="group label-caps inline-flex items-center gap-3 border border-cognac bg-cognac px-8 py-4 text-ivory transition-colors duration-300 hover:bg-mahogany"
          >
            Back to Home
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </MotionLink>
          <Link
            to="/journal"
            className="label-caps text-ivory underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Read the Journal
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
