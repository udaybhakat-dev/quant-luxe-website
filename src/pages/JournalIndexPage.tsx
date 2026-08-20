import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { useReveal } from "../hooks/useReveal";
import { journalArticles } from "../data/journal";
import { TextureBlock } from "../components/placeholder/TextureBlock";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function JournalIndexPage() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1);

  useSeo({
    title: "Eleganz Journal | Fragrance Guides for Men",
    description:
      "Practical guides on choosing, wearing and understanding men's fragrance — from the house behind Eleganz Solaris, a luxury perfume for men built for Indian summer.",
    path: "/journal",
  });

  return (
    <section className="pt-[152px] pb-[128px]">
      <div className="container-site">
        <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Journal" }]} />

        <p className="label-caps mb-4 mt-10 text-cognac">The Journal</p>
        <h1 className="max-w-[20ch] font-display text-[2.6rem] text-espresso">
          Field notes on fragrance
        </h1>
        <p className="mt-5 max-w-[60ch] text-[1rem] leading-relaxed text-ink-soft">
          Guides on choosing, wearing and understanding men's fragrance —
          written to be useful before a purchase, not just around one.
        </p>

        <div ref={ref} className="mt-16 grid grid-cols-3 gap-10">
          {journalArticles.map((article, i) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="reveal group flex flex-col"
              data-revealed={revealed}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <TextureBlock
                variant={article.texture}
                className="mb-6 aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
              <p className="label-caps mb-3 text-sand">
                {article.category} &middot; {article.readTime}
              </p>
              <h2 className="font-display text-[1.35rem] leading-snug text-espresso transition-colors group-hover:text-cognac">
                {article.title}
              </h2>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
