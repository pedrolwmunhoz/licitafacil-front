import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SeoLandingHero } from "@/components/marketing/SeoLandingHero";
import { HelpDocTopicsBlock } from "@/components/marketing/HelpDocTopicsBlock";
import { HelpTopicsNav } from "@/components/marketing/HelpTopicsNav";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { DOCUMENTACAO_TOPICS } from "@/content/help/documentacao-topics";
import { CONTACT_EMAIL, LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import { cn } from "@/lib/utils";
import { jsonLd } from "@/content/jsonld/documentacao";

const docNavItems = DOCUMENTACAO_TOPICS.map((t) => ({ id: t.id, label: t.title }));

const DocumentacaoPage = () => (
  <div className="min-h-screen bg-white text-landing-ink antialiased">
    <PageSeo {...PUBLIC_PAGE_SEO.documentacao} />
    <JsonLdScript routeKey={PUBLIC_PAGE_SEO.documentacao.path} graph={jsonLd} />
    <Navbar />
    <main id="conteudo-principal" tabIndex={-1}>
      <SeoLandingHero
        eyebrow="Documentação"
        titleBefore="Como usar o SegPonto: painel da empresa e app do colaborador"
        highlight="passo a passo"
        subtitle="Configuração inicial, menu do painel, batida no celular e fechamento do mês — o que cada tela faz."
        showCta={false}
      />
      <section className="py-12 md:py-16 bg-landing-canvas border-t border-landing-ink/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
            <HelpTopicsNav
              items={docNavItems}
              className="lg:sticky lg:top-28"
              crossLink={{ to: "/perguntas-frequentes", label: "perguntas frequentes" }}
            />
            <HelpDocTopicsBlock topics={DOCUMENTACAO_TOPICS} />
          </div>
          <p className="mt-12 text-sm text-landing-muted text-center max-w-xl mx-auto">
            Travou na implantação? Fale com o suporte em{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={LANDING_PROSE_LINK_CLASS}>
              {CONTACT_EMAIL}
            </a>
            . Dúvidas pontuais em{" "}
            <Link to="/perguntas-frequentes" className={cn(LANDING_PROSE_LINK_CLASS, "whitespace-nowrap")}>
              perguntas frequentes
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default DocumentacaoPage;
