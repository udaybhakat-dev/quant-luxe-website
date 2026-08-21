import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Breadcrumbs } from "./Breadcrumbs";
import type { JournalArticle } from "../data/types";
import { journalArticles } from "../data/journal";
import { fadeUp, viewportOnce } from "../lib/motion";

interface ArticleShellProps {
  article: JournalArticle;
  children: ReactNode;
}

/**
 * Single source of truth for the journal-article breadcrumb trail — used
 * both for the visual <Breadcrumbs> here and for the BreadcrumbList schema
 * each article page passes to useSeo, so the two can never drift apart.
 */
export function getArticleBreadcrumbTrail(article: JournalArticle) {
  return [
    { label: "Home", to: "/" },
    { label: "Journal", to: "/journal" },
    { label: article.title },
  ];
}

export function ArticleShell({ article, children }: ArticleShellProps) {
  const moreArticles = journalArticles.filter((a) => a.id !== article.id);

  return (
    <article className="pt-[152px] pb-[128px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="container-site max-w-[760px]"
      >
        <Breadcrumbs trail={getArticleBreadcrumbTrail(article)} />

        <p className="label-caps mb-4 mt-10 text-gold">
          {article.category} &middot; {article.readTime}
        </p>
        <h1 className="font-display text-[2.6rem] leading-[1.1] text-ivory">
          {article.title}
        </h1>

        <div className="article-body mt-10 flex flex-col gap-6 text-[1.02rem] leading-relaxed text-ivory/70">
          {children}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-site mt-24 max-w-[760px] border-t border-bronze/20 pt-16"
      >
        <p className="label-caps mb-8 text-gold">Continue Reading</p>
        <div className="flex flex-col gap-6">
          {moreArticles.map((a) => (
            <Link
              key={a.id}
              to={`/journal/${a.slug}`}
              className="group flex items-baseline justify-between gap-6 border-t border-bronze/20 pt-5 first:border-t-0 first:pt-0"
            >
              <span className="font-display text-[1.3rem] text-ivory transition-colors group-hover:text-gold">
                {a.title}
              </span>
              <span className="label-caps shrink-0 text-ivory/50">{a.readTime}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </article>
  );
}
