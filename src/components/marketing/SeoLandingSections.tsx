import { Link } from "react-router-dom";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import FAQSection from "@/components/landing/FAQSection";
import type {
  SeoLandingCard,
  SeoLandingContent,
  SeoLandingSection,
  SeoLandingStep,
} from "@/content/seo-landings/types";

function ProseSection({ section, index }: { section: SeoLandingSection; index: number }) {
  const bg = section.variant === "canvas" ? "bg-landing-canvas" : "bg-white";

  return (
    <section className={`py-16 md:py-24 ${bg}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <RevealOnScroll delayMs={index * 60}>
          <LandingSectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            subtitle={section.subtitle}
            align="left"
            gap="prose"
          />
          <div className="space-y-4 text-lg leading-relaxed text-landing-muted">
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          {section.subsections?.length ? (
            <div className="mt-10 space-y-8">
              {section.subsections.map((sub) => (
                <div key={sub.title}>
                  <h3 className="font-display text-xl font-semibold text-landing-ink mb-3">{sub.title}</h3>
                  <div className="space-y-3 text-lg leading-relaxed text-landing-muted">
                    {sub.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {section.bullets?.length ? (
            <ul className="mt-6 list-disc pl-5 space-y-2 text-lg text-landing-muted">
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </RevealOnScroll>
      </div>
    </section>
  );
}

export function SeoLandingCardsBlock({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: SeoLandingCard[];
}) {
  return (
    <section className="py-16 md:py-24 bg-landing-canvas">
      <div className="container mx-auto px-4 max-w-6xl">
        <RevealOnScroll>
          <LandingSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map(({ icon: Icon, title: cardTitle, desc }, i) => (
            <RevealOnScroll key={cardTitle} delayMs={i * 80}>
              <article className="h-full rounded-xl border border-landing-ink/10 bg-white p-6 shadow-sm hover:shadow-md hover:border-landing-ink/20 transition-all">
                <div className="h-11 w-11 rounded-lg bg-landing-cta/20 flex items-center justify-center mb-4 border border-landing-ink/5">
                  <Icon className="h-5 w-5 text-landing-ink" />
                </div>
                <h3 className="font-display font-semibold text-landing-ink mb-2">{cardTitle}</h3>
                <p className="text-sm text-landing-muted leading-relaxed">{desc}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeoLandingStepsBlock({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: SeoLandingStep[];
}) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <RevealOnScroll>
          <LandingSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </RevealOnScroll>
        <div className="max-w-3xl mx-auto">
          {items.map(({ icon: Icon, title: stepTitle, desc }, i) => (
            <RevealOnScroll key={stepTitle} delayMs={i * 100}>
              <div className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-12 w-12 rounded-full bg-landing-ink text-white flex items-center justify-center font-display font-bold text-lg">
                    {i + 1}
                  </div>
                  {i < items.length - 1 ? (
                    <div className="w-px flex-1 min-h-[2rem] bg-landing-ink/15 mt-2" aria-hidden />
                  ) : null}
                </div>
                <div className="pb-10 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-5 w-5 text-landing-ink" strokeWidth={2} />
                    <h3 className="font-display font-semibold text-landing-ink">{stepTitle}</h3>
                  </div>
                  <p className="text-sm text-landing-muted leading-relaxed pl-7">{desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeoLandingFaqBlock({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: { q: string; a: string }[];
}) {
  return (
    <FAQSection
      id=""
      eyebrow={eyebrow ?? "FAQ"}
      title={title}
      subtitle={subtitle}
      items={items}
      showFooterLinks={false}
    />
  );
}

export function SeoLandingRelatedLinks({ links }: { links: { label: string; to: string }[] }) {
  return (
    <section className="py-10 bg-white border-t border-landing-ink/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-sm font-semibold text-landing-ink mb-3">Leia também</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className="text-landing-muted underline underline-offset-4 hover:text-landing-ink">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" className="text-landing-muted underline underline-offset-4 hover:text-landing-ink">
              Visão geral do SegPonto
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function SeoLandingPageBody({ content }: { content: SeoLandingContent }) {
  return (
    <>
      {content.sections.map((section, i) => (
        <ProseSection key={section.title} section={section} index={i} />
      ))}
      {content.cards ? (
        <SeoLandingCardsBlock
          eyebrow={content.cards.eyebrow}
          title={content.cards.title}
          subtitle={content.cards.subtitle}
          items={content.cards.items}
        />
      ) : null}
      {content.steps ? (
        <SeoLandingStepsBlock
          eyebrow={content.steps.eyebrow}
          title={content.steps.title}
          subtitle={content.steps.subtitle}
          items={content.steps.items}
        />
      ) : null}
      {content.faqs ? (
        <SeoLandingFaqBlock
          eyebrow={content.faqs.eyebrow}
          title={content.faqs.title}
          subtitle={content.faqs.subtitle}
          items={content.faqs.items}
        />
      ) : null}
      {content.related?.length ? <SeoLandingRelatedLinks links={content.related} /> : null}
    </>
  );
}
