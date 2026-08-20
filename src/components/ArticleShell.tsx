import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import type { JournalArticle } from "../data/types";
import { journalArticles } from "../data/journal";

interface ArticleShellProps {
  article: JournalArticle;
  children: ReactNode;
}

export function ArticleShell({ article, children }: ArticleShellProps) {
  const moreArticles = journalArticles.filter((a) => a.id !== article.id);

  return (
    <article className="pt-[152px] pb-[128px]">
      <div className="container-site max-w-[760px]">
        <Breadcrumbs
          trail={[
            { label: "Home", to: "/" },
            { label: "Journal", to: "/journal" },
            { label: article.title },
          ]}
        />

        <p className="label-caps mb-4 mt-10 text-cognac">
          {article.category} &middot; {article.readTime}
        </p>
        <h1 className="font-display text-[2.6rem] leading-[1.1] text-espresso">
          {article.title}
        </h1>

        <div className="article-body mt-10 flex flex-col gap-6 text-[1.02rem] leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>

      <div className="container-site mt-24 max-w-[760px] border-t border-sand-line pt-16">
        <p className="label-caps mb-8 text-cognac">Continue Reading</p>
        <div className="flex flex-col gap-6">
          {moreArticles.map((a) => (
            <Link
              key={a.id}
              to={`/journal/${a.slug}`}
              className="group flex items-baseline justify-between gap-6 border-t border-sand-line pt-5 first:border-t-0 first:pt-0"
            >
              <span className="font-display text-[1.3rem] text-espresso transition-colors group-hover:text-cognac">
                {a.title}
              </span>
              <span className="label-caps shrink-0 text-ink-soft">{a.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
