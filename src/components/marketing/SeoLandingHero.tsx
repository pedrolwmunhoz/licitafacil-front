import { LandingHireCta } from "@/components/landing/LandingHireCta";
import { LandingHeroHighlight } from "@/components/landing/LandingHeroHighlight";

export type SeoLandingHeroProps = {
  eyebrow?: string;
  titleBefore: string;
  highlight: string;
  subtitle?: string;
  showCta?: boolean;
};

/** Hero de landing — mesma tipografia, chip e CTA da home. */
export function SeoLandingHero({
  eyebrow,
  titleBefore,
  highlight,
  subtitle,
  showCta = true,
}: SeoLandingHeroProps) {
  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-landing-canvas text-landing-ink">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Espelha a coluna de texto da home: space-y-6, sem Reveal no CTA (LCP estável). */}
        <div className="max-w-3xl space-y-6 z-10">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-landing-muted">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-landing-ink leading-snug">
            <span className="flex flex-col items-start gap-4 max-w-full">
              <span className="block max-w-full">{titleBefore}</span>
              <LandingHeroHighlight>{highlight}</LandingHeroHighlight>
            </span>
          </h1>
          {subtitle ? (
            <p className="text-lg text-landing-muted max-w-xl leading-relaxed">{subtitle}</p>
          ) : null}
          {showCta ? <LandingHireCta /> : null}
        </div>
      </div>
    </section>
  );
}
