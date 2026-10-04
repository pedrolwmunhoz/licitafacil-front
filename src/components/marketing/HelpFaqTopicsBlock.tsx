import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { HelpFaqTopic } from "@/content/help/types";

type HelpFaqTopicsBlockProps = {
  topics: HelpFaqTopic[];
};

export function HelpFaqTopicsBlock({ topics }: HelpFaqTopicsBlockProps) {
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
          <RevealOnScroll delayMs={topicIndex * 40 + 60} className="mt-6">
            <div className="rounded-xl border border-landing-ink/10 bg-white px-2 py-2 shadow-sm md:px-4">
              <Accordion type="single" collapsible className="w-full">
                {topic.items.map(({ q, a }, i) => (
                  <AccordionItem
                    key={q}
                    value={`${topic.id}-faq-${i}`}
                    className="border-landing-ink/10"
                  >
                    <AccordionTrigger className="text-left font-display text-landing-ink hover:no-underline py-4">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-landing-muted text-[15px] leading-relaxed pb-4">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </RevealOnScroll>
        </section>
      ))}
    </div>
  );
}
