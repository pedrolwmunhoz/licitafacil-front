import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaTransportesContent } from "@/content/seo-landings/ponto-eletronico-para-transportes";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-transportes";

const PontoEletronicoParaTransportesPage = () => <SeoLandingPageView content={pontoEletronicoParaTransportesContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaTransportesPage;
