import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SeoLandingHero } from "@/components/marketing/SeoLandingHero";
import { HelpFaqTopicsBlock } from "@/components/marketing/HelpFaqTopicsBlock";
import { HelpTopicsNav } from "@/components/marketing/HelpTopicsNav";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { FAQ_TOPICS } from "@/content/help/faq-topics";
import { CONTACT_EMAIL, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { cn } from "@/lib/utils";
import { jsonLd } from "@/content/jsonld/perguntas-frequentes";

const faqNavItems = FAQ_TOPICS.map((t) => ({ id: t.id, label: t.title }));

const PerguntasFrequentesPage = () => (
  <div className="min-h-screen bg-white text-landing-ink antialiased">
    <PageSeo {...PUBLIC_PAGE_SEO.perguntasFrequentes} />
    <JsonLdScript routeKey={PUBLIC_PAGE_SEO.perguntasFrequentes.path} graph={jsonLd} />
    <Navbar />
    <main id="conteudo-principal" tabIndex={-1}>
      <SeoLandingHero
        eyebrow="Ajuda"
        titleBefore="Perguntas frequentes sobre ponto, jornada e fechamento no SegPonto"
        highlight="por tópico"
        subtitle="Conta, batida, espelho, geolocalização, planos e dados — respostas diretas, sem enrolação."
        showCta={false}
      />
      <section className="py-12 md:py-16 bg-landing-canvas border-t border-landing-ink/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
            <HelpTopicsNav
              items={faqNavItems}
              className="lg:sticky lg:top-28"
              crossLink={{ to: "/documentacao", label: "guia de uso" }}
            />
            <HelpFaqTopicsBlock topics={FAQ_TOPICS} />
          </div>
          <p className="mt-12 text-sm text-landing-muted text-center max-w-xl mx-auto">
            Não achou a resposta? Escreva para{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
              {CONTACT_EMAIL}
            </a>{" "}
            ou veja o{" "}
            <Link to="/documentacao" className={cn(LANDING_PROSE_LINK_CLASS, "whitespace-nowrap")}>
              guia de uso
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PerguntasFrequentesPage;
