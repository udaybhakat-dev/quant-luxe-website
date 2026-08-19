interface IconProps {
  className?: string;
}

export function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="14.3" y1="14.3" x2="20" y2="20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function AccountIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="7.2" r="3.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.6 19c1.3-3.4 4.1-5.2 7.4-5.2s6.1 1.8 7.4 5.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function BagIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <path d="M6 8.2h10l-0.7 10.3a1.6 1.6 0 0 1-1.6 1.5H8.3a1.6 1.6 0 0 1-1.6-1.5L6 8.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8.2 8.2V6.4a2.8 2.8 0 0 1 5.6 0v1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ChevronRight({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M5.5 3.5 10.5 8l-5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function QuoteMark({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 40 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M17.3 0 9.8 15.4a13.6 13.6 0 0 0-1.5 6.1c0 5.8 4 10.5 10 10.5V27c-2.9 0-4.9-2-4.9-5 0-1.1.2-2.1.7-3.1L20 0h-2.7ZM37.3 0l-7.5 15.4a13.6 13.6 0 0 0-1.5 6.1c0 5.8 4 10.5 10 10.5V27c-2.9 0-4.9-2-4.9-5 0-1.1.2-2.1.7-3.1L40 0h-2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
