import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

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

export function NewsletterFooter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="bg-espresso text-parchment">
      <div className="container-site border-b border-parchment/12 py-[88px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-[24ch] font-display text-[2rem] text-parchment">
            Private updates on new fragrances, before they're public.
          </h2>

          {submitted ? (
            <p className="mt-8 text-[0.95rem] text-sand">
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
                className="w-full border border-parchment/30 bg-transparent px-5 py-3.5 text-[0.95rem] text-parchment placeholder:text-parchment/45 focus-visible:border-cognac"
              />
              <button
                type="submit"
                className="label-caps shrink-0 border border-cognac bg-cognac px-6 py-3.5 text-parchment transition-colors duration-200 hover:bg-cognac-dark"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container-site grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 py-[72px]">
        <div>
          <p className="font-display text-[1.4rem] text-parchment">Eleganz</p>
          <p className="mt-4 max-w-[30ch] text-[0.88rem] leading-relaxed text-parchment/55">
            A premium fragrance house by Quant Luxe Lifestyle Pvt. Ltd., built
            in small batches for those who already understand restraint.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <p className="label-caps mb-5 text-sand">{col.heading}</p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-[0.9rem] text-parchment/70 transition-colors hover:text-parchment"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-[0.9rem] text-parchment/70 transition-colors hover:text-parchment"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-site flex items-center justify-between border-t border-parchment/12 py-7 text-[0.8rem] text-parchment/45">
        <p>&copy; {new Date().getFullYear()} Quant Luxe Lifestyle Pvt. Ltd. — Eleganz is a registered brand.</p>
        <p>Made in India</p>
      </div>
    </footer>
  );
}
