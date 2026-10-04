import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { SeoLandingHero } from "@/components/marketing/SeoLandingHero";
import {
  SeoLandingFaqBlock,
  SeoLandingRelatedLinks,
} from "@/components/marketing/SeoLandingSections";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { CALCULATORS_INDEX_PATH } from "@/content/calculators/constants";
import type { PublicPageSeoConfig } from "@/content/public-page-seo";

export type CalculatorGuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FaqStructuredItem = { q: string; a: string };

type Props = {
  seo: PublicPageSeoConfig;
  /** Grafo JSON-LD exclusivo desta URL (content/jsonld/calculadoras__*.ts). */
  jsonLd: Record<string, unknown>;
  highlight: string;
  titleBefore?: string;
  form: React.ReactNode;
  guideSections: CalculatorGuideSection[];
  faqs: FaqStructuredItem[];
  related: { label: string; to: string }[];
};

/** Shell compartilhado das páginas de calculadora (anti-duplicação de layout). */
export function CalculatorToolPageView({
  seo,
  jsonLd,
  highlight,
  titleBefore = "Calculadora de",
  form,
  guideSections,
  faqs,
  related,
}: Props) {
  return (
    <div className="min-h-screen bg-white text-landing-ink antialiased">
      <PageSeo {...seo} />
      <JsonLdScript routeKey={seo.path} graph={jsonLd} />
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1}>
        <SeoLandingHero
          eyebrow="Calculadora"
          titleBefore={titleBefore}
          highlight={highlight}
          subtitle={seo.description}
          showCta={false}
        />
        <section id="calculadora" className="py-8 md:py-10 bg-white border-b border-landing-ink/10">
          <div className="container mx-auto px-4 max-w-3xl">{form}</div>
        </section>
        {guideSections.map((section, index) => (
          <section
            key={section.title}
            className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-landing-canvas" : "bg-white"} border-t border-landing-ink/10`}
          >
            <div className="container mx-auto px-4 max-w-3xl">
              <RevealOnScroll delayMs={index * 60}>
                <LandingSectionHeader title={section.title} align="left" gap="prose" />
                <div className="space-y-4 text-lg leading-relaxed text-landing-muted">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
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
        ))}
        <SeoLandingFaqBlock title="Perguntas frequentes" items={faqs} />
        <SeoLandingRelatedLinks
          links={[...related, { label: "Todas as calculadoras", to: CALCULATORS_INDEX_PATH }]}
        />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
