import type { FaqEntry } from "../data/types";

interface FaqProps {
  items: FaqEntry[];
}

/** Native <details>/<summary> accordion — accessible and keyboard-operable with zero JS. */
export function Faq({ items }: FaqProps) {
  return (
    <div className="flex flex-col divide-y divide-sand-line border-y border-sand-line">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.15rem] text-espresso marker:content-none">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-[1.3rem] leading-none text-cognac transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-[68ch] text-[0.95rem] leading-relaxed text-ink-soft">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
