import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ctaHover, fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

interface FooterLink {
  label: string;
  to?: string;
}

const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Eleganz Solaris", to: "/solaris" },
      { label: "All Fragrances", to: "/#shop" },
      { label: "Gifting", to: "/#shop" },
      { label: "Find Your Scent", to: "/#find-your-scent" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "Our Story", to: "/#the-craft" },
      { label: "The Craft", to: "/#the-craft" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact" },
      { label: "Shipping & Returns" },
      { label: "Track an Order" },
    ],
  },
  {
    heading: "Legal",
    links: [{ label: "Privacy Policy" }, { label: "Terms of Service" }],
  },
];

const MotionButton = motion.create("button");

export function NewsletterFooter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="bg-void text-ivory">
      <div className="depth-glow-dark relative border-b border-bronze/20 py-[88px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="container-site relative z-10 flex flex-col items-center text-center"
        >
          <h2 className="max-w-[24ch] font-display text-[2rem] text-ivory">
            Private updates on new fragrances, before they're public.
          </h2>

          {submitted ? (
            <p className="mt-8 text-[0.95rem] text-gold">
              You're on the list — welcome to the house.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-9 flex w-full max-w-[440px] gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email address"
                className="w-full border border-ivory/25 bg-transparent px-5 py-3.5 text-[0.95rem] text-ivory placeholder:text-ivory/40 focus-visible:border-gold"
              />
              <MotionButton
                type="submit"
                {...ctaHover}
                className="label-caps shrink-0 border border-cognac bg-cognac px-6 py-3.5 text-ivory transition-colors duration-300 hover:bg-mahogany"
              >
                Join
              </MotionButton>
            </form>
          )}
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-site grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 py-[72px]"
      >
        <motion.div variants={fadeUp}>
          <p className="font-display text-[1.4rem] text-ivory">Eleganz</p>
          <p className="mt-4 max-w-[30ch] text-[0.88rem] leading-relaxed text-ivory/50">
            A premium fragrance house by Quant Luxe Lifestyle Pvt. Ltd., built
            in small batches for those who already understand restraint.
          </p>
        </motion.div>

        {FOOTER_COLUMNS.map((col) => (
          <motion.div variants={fadeUp} key={col.heading}>
            <p className="label-caps mb-5 text-bronze">{col.heading}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="text-[0.9rem] text-ivory/60 transition-colors hover:text-ivory">
                      {link.label}
                    </Link>
                  ) : (
                    <a href="#" className="text-[0.9rem] text-ivory/60 transition-colors hover:text-ivory">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="container-site flex items-center justify-between border-t border-bronze/20 py-7 text-[0.8rem] text-ivory/40">
        <p>&copy; {new Date().getFullYear()} Quant Luxe Lifestyle Pvt. Ltd. — Eleganz is a registered brand.</p>
        <p>Made in India</p>
      </div>
    </footer>
  );
}
