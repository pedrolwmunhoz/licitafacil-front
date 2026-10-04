import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaEscolasContent } from "@/content/seo-landings/ponto-eletronico-para-escolas";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-escolas";

const PontoEletronicoParaEscolasPage = () => <SeoLandingPageView content={pontoEletronicoParaEscolasContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaEscolasPage;
