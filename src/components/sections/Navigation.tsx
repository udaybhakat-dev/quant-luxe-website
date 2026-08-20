import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useScrolled } from "../../hooks/useScrolled";
import { useCart } from "../../context/CartContext";
import { AccountIcon, BagIcon, SearchIcon } from "../icons";
import { EASE_PREMIUM } from "../../lib/motion";

const NAV_LINKS = [
  { label: "Shop", href: "/#shop", match: (p: string, h: string) => p === "/" && h === "#shop" },
  { label: "Solaris", href: "/solaris", match: (p: string) => p === "/solaris" },
  {
    label: "Find Your Scent",
    href: "/#find-your-scent",
    match: (p: string, h: string) => p === "/" && h === "#find-your-scent",
  },
  { label: "The House", href: "/#the-craft", match: (p: string, h: string) => p === "/" && h === "#the-craft" },
  { label: "Journal", href: "/journal", match: (p: string) => p.startsWith("/journal") },
];

export function Navigation() {
  const scrolled = useScrolled(32);
  const { itemCount } = useCart();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-espresso/95 border-b border-bronze/25 text-ivory backdrop-blur-sm"
          : "bg-transparent border-b border-transparent text-ivory"
      }`}
    >
      <div className="container-site flex h-[84px] items-center justify-between">
        <Link to="/" className="font-display text-[1.55rem] tracking-wide">
          Eleganz
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ label, href, match }) => {
              const active = match(location.pathname, location.hash);
              return (
                <li key={label}>
                  <Link
                    to={href}
                    aria-current={active ? "page" : undefined}
                    className={`group label-caps relative inline-block py-1 transition-colors duration-300 hover:text-gold ${
                      active ? "text-gold" : ""
                    }`}
                  >
                    {label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute -bottom-1 left-0 h-px w-full bg-gold"
                        transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <button type="button" aria-label="Search" className="transition-colors hover:text-gold">
            <SearchIcon className="h-[19px] w-[19px]" />
          </button>
          <button type="button" aria-label="Account" className="transition-colors hover:text-gold">
            <AccountIcon className="h-[19px] w-[19px]" />
          </button>
          <Link
            to="/bag"
            aria-label={`Bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative transition-colors hover:text-gold"
          >
            <BagIcon className="h-[19px] w-[19px]" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-cognac px-1 font-body text-[10px] font-semibold leading-none text-ivory">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
