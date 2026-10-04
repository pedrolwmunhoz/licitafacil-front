import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import type { HelpDocTopic } from "@/content/help/types";

type HelpDocTopicsBlockProps = {
  topics: HelpDocTopic[];
};

export function HelpDocTopicsBlock({ topics }: HelpDocTopicsBlockProps) {
  return (
    <div className="space-y-16 md:space-y-20">
      {topics.map((topic, topicIndex) => (
        <section key={topic.id} id={topic.id} className="scroll-mt-28">
          <RevealOnScroll delayMs={topicIndex * 40}>
            <LandingSectionHeader
              align="left"
              compact
              eyebrow={`Tópico ${topicIndex + 1}`}
              title={topic.title}
              subtitle={topic.intro}
            />
          </RevealOnScroll>
          <div className="mt-6 space-y-8">
            {topic.sections.map((section, sectionIndex) => (
              <RevealOnScroll key={section.title} delayMs={topicIndex * 40 + sectionIndex * 50}>
                <article className="rounded-xl border border-landing-ink/10 bg-white px-6 py-6 md:px-8 md:py-7 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-landing-ink mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-3 text-[15px] leading-relaxed text-landing-muted">
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] text-landing-muted">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
