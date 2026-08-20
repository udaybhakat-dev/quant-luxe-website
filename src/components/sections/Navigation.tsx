import { Link } from "react-router-dom";
import { useScrolled } from "../../hooks/useScrolled";
import { useCart } from "../../context/CartContext";
import { AccountIcon, BagIcon, SearchIcon } from "../icons";

const NAV_LINKS = [
  { label: "Shop", href: "/#shop" },
  { label: "Solaris", href: "/solaris" },
  { label: "Find Your Scent", href: "/#find-your-scent" },
  { label: "The House", href: "/#the-craft" },
  { label: "Journal", href: "/journal" },
];

export function Navigation() {
  const scrolled = useScrolled(32);
  const { itemCount } = useCart();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-200 ease-out ${
        scrolled
          ? "bg-parchment/95 border-b border-sand-line text-espresso backdrop-blur-sm"
          : "bg-transparent border-b border-transparent text-parchment"
      }`}
    >
      <div className="container-site flex h-[84px] items-center justify-between">
        <Link to="/" className="font-display text-[1.55rem] tracking-wide">
          Eleganz
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  className="label-caps relative transition-colors hover:text-cognac after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cognac after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <button type="button" aria-label="Search" className="transition-colors hover:text-cognac">
            <SearchIcon className="h-[19px] w-[19px]" />
          </button>
          <button type="button" aria-label="Account" className="transition-colors hover:text-cognac">
            <AccountIcon className="h-[19px] w-[19px]" />
          </button>
          <Link
            to="/bag"
            aria-label={`Bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative transition-colors hover:text-cognac"
          >
            <BagIcon className="h-[19px] w-[19px]" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-cognac px-1 font-body text-[10px] font-semibold leading-none text-parchment">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
