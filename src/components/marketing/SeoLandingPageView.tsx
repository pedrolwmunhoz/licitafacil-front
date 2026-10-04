import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SeoLandingHero } from "@/components/marketing/SeoLandingHero";
import { SeoLandingPageBody } from "@/components/marketing/SeoLandingSections";
import type { SeoLandingContent } from "@/content/seo-landings/types";

type SeoLandingPageViewProps = {
  content: SeoLandingContent;
  /** Grafo JSON-LD exclusivo desta URL (arquivo em content/jsonld/). */
  jsonLd: Record<string, unknown>;
};

export function SeoLandingPageView({ content, jsonLd }: SeoLandingPageViewProps) {
  return (
    <div className="min-h-screen bg-white text-landing-ink antialiased">
      <PageSeo {...content.seo} />
      <JsonLdScript routeKey={content.seo.path} graph={jsonLd} />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1}>
        <SeoLandingHero
          eyebrow={content.hero.eyebrow}
          titleBefore={content.hero.titleBefore}
          highlight={content.hero.highlight}
          subtitle={content.opening?.length ? undefined : content.hero.subtitle}
        />
        {content.opening?.length ? (
          <section className="py-12 md:py-16 bg-white border-t border-landing-ink/10">
            <div className="container mx-auto px-4 max-w-3xl space-y-4 text-lg leading-relaxed text-landing-muted">
              {content.opening.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}
        <SeoLandingPageBody content={content} />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
