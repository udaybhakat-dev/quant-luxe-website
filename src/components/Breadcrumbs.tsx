import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label-caps flex items-center gap-2 text-ivory/50">
      {trail.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-2">
          {crumb.to ? (
            <Link to={crumb.to} className="transition-colors hover:text-gold">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-ivory" aria-current="page">
              {crumb.label}
            </span>
          )}
          {i < trail.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  );
}
