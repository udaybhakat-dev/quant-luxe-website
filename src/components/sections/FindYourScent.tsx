import { ChevronRight } from "../icons";

export function FindYourScent() {
  return (
    <section id="find-your-scent" className="bg-sand py-[104px]">
      <div className="container-site flex items-center justify-between gap-16">
        <div className="max-w-[520px]">
          <h2 className="font-display text-[2rem] text-espresso">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-espresso/80">
            Answer three short questions about how you dress and where you're
            headed, and we'll point you to two or three fragrances worth
            trying first.
          </p>
        </div>

        <a
          href="#"
          className="group label-caps flex shrink-0 items-center gap-3 border border-espresso/60 px-8 py-4 text-espresso transition-colors duration-200 hover:border-cognac hover:bg-cognac hover:text-parchment"
        >
          Take the Scent Quiz
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
