import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";
import { SeoLandingFaqBlock } from "@/components/marketing/SeoLandingSections";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { precosFaqs, precosSeoMeta } from "@/content/seo-landings/precos";
import { jsonLd } from "@/content/jsonld/precos";

const PrecosSeoPage = () => (
  <div className="min-h-screen bg-white text-landing-ink antialiased">
    <PageSeo {...precosSeoMeta} />
    <JsonLdScript routeKey={precosSeoMeta.path} graph={jsonLd} />
    <Navbar />
    <main id="conteudo-principal" tabIndex={-1}>
      <PricingSection tituloDaPagina />
      <SeoLandingFaqBlock title="Perguntas frequentes" items={precosFaqs} />
    </main>
    <Footer />
  </div>
);

export default PrecosSeoPage;
