import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaHoteisContent } from "@/content/seo-landings/ponto-eletronico-para-hoteis";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-hoteis";

const PontoEletronicoParaHoteisPage = () => <SeoLandingPageView content={pontoEletronicoParaHoteisContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaHoteisPage;
