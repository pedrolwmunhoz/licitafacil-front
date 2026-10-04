import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaCallCenterContent } from "@/content/seo-landings/ponto-eletronico-para-call-center";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-call-center";

const PontoEletronicoParaCallCenterPage = () => <SeoLandingPageView content={pontoEletronicoParaCallCenterContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaCallCenterPage;
