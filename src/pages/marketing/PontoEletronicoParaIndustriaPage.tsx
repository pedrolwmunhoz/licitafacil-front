import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaIndustriaContent } from "@/content/seo-landings/ponto-eletronico-para-industria";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-industria";

const PontoEletronicoParaIndustriaPage = () => <SeoLandingPageView content={pontoEletronicoParaIndustriaContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaIndustriaPage;
