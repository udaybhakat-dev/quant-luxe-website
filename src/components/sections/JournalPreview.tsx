import { Link } from "react-router-dom";
import { journalArticles } from "../../data/journal";
import { useReveal } from "../../hooks/useReveal";
import { TextureBlock } from "../placeholder/TextureBlock";
import { ChevronRight } from "../icons";

export function JournalPreview() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="journal" className="bg-parchment py-[128px]">
      <div className="container-site">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="label-caps mb-4 text-cognac">The Journal</p>
            <h2 className="font-display text-[2.4rem] text-espresso">Field Notes</h2>
          </div>
          <Link
            to="/journal"
            className="label-caps flex items-center gap-2 text-espresso transition-colors hover:text-cognac"
          >
            View all articles
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-3 gap-10">
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
              <h3 className="font-display text-[1.35rem] leading-snug text-espresso transition-colors group-hover:text-cognac">
                {article.title}
              </h3>
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
