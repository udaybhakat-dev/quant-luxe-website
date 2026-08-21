import { Link } from "react-router-dom";
import { useSeo } from "../../hooks/useSeo";
import { SITE_URL } from "../../lib/siteConfig";
import { ArticleShell, getArticleBreadcrumbTrail } from "../../components/ArticleShell";
import { Faq } from "../../components/Faq";
import { journalArticles } from "../../data/journal";

const article = journalArticles.find((a) => a.slug === "how-to-apply-perfume")!;

const faqs = [
  {
    question: "How many sprays of perfume should I use?",
    answer:
      "2–3 sprays on pulse points is enough for most Eau de Parfum strength fragrances. More isn't better — it just means the fragrance saturates faster and fades unevenly.",
  },
  {
    question: "Should I rub perfume into my skin?",
    answer:
      "No. Rubbing generates friction heat that breaks down the top notes early, so the fragrance you smell a few minutes later isn't the one that was designed. Spray and let it dry naturally.",
  },
  {
    question: "Can I apply perfume over deodorant?",
    answer:
      "Yes, but use an unscented or neutral deodorant where possible — a heavily scented one will compete with the fragrance's top notes and change how it opens.",
  },
];

export function HowToApplyPage() {
  useSeo({
    title: "How to Apply Perfume for a Better Fragrance Experience | Eleganz Journal",
    description: article.metaDescription,
    path: `/journal/${article.slug}`,
    image: article.photoImage,
    breadcrumb: getArticleBreadcrumbTrail(article),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      image: article.photoImage ? `${SITE_URL}${article.photoImage}` : undefined,
      author: { "@type": "Organization", name: "Eleganz" },
      publisher: { "@type": "Organization", name: "Quant Luxe Lifestyle Pvt. Ltd." },
    },
  });

  return (
    <ArticleShell article={article}>
      <p>
        Buying the right bottle only gets you halfway there.{" "}
        <strong>How to apply perfume</strong> correctly changes how long it
        lasts, how it develops over the day, and whether people notice it at
        all — and it's the part almost nobody gets taught.
      </p>

      <h2>Where to apply perfume</h2>
      <p>
        Pulse points — wrists, neck, behind the ears, inside the elbows —
        run warmer than the rest of your skin, and that heat is what
        releases a fragrance's molecules into the air throughout the day.
        Apply right after a shower, while skin is still slightly damp;
        moisturised skin holds fragrance longer than dry skin.
      </p>

      <h2>How much is too much</h2>
      <p>
        For an Eau de Parfum, 2–3 sprays is a full application. Past that
        point you're not adding longevity, you're just increasing sillage
        (how far it projects) — which in a closed office or a car can tip
        from "pleasant" to "overwhelming" fast.
      </p>

      <h2>The rubbing mistake almost everyone makes</h2>
      <p>
        Spraying both wrists and rubbing them together feels natural, but
        the friction and heat break down the top notes before they've had a
        chance to develop properly. Spray each pulse point directly instead,
        and let it dry in the air.
      </p>

      <h2>Layering for longer wear</h2>
      <p>
        If your fragrance has a matching shower gel or body lotion, layering
        it underneath the perfume gives the scent a second surface to cling
        to, which can meaningfully extend how long it lasts — especially
        useful for lighter, citrus-forward fragrances that fade faster on
        their own.
      </p>

      <h2>Applying in hot weather</h2>
      <p>
        Heat speeds up projection, so you often need less product, not more,
        on a hot day. One extra spray to clothing (not skin) can extend wear
        into the evening without making the fragrance louder in the first
        hour — clothing holds fragrance longer than skin because it doesn't
        have body heat constantly evaporating it.
      </p>

      <h2>Frequently asked questions</h2>
      <Faq items={faqs} />

      <p>
        <Link to="/solaris">Eleganz Solaris</Link> is formulated to wear well
        under exactly this routine — its own application notes are on the{" "}
        <Link to="/solaris">product page</Link>. And if you haven't settled
        on a bottle yet, start with{" "}
        <Link to="/journal/how-to-choose-mens-perfume-for-summer">
          How to Choose a Men's Perfume for Indian Summer
        </Link>{" "}
        or the fresh-vs-woody breakdown in{" "}
        <Link to="/journal/best-perfume-for-men-in-summer">
          Best Perfume for Men in Summer
        </Link>
        .
      </p>
    </ArticleShell>
  );
}
