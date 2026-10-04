import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaAdvocaciaContent } from "@/content/seo-landings/ponto-eletronico-para-advocacia";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-advocacia";

const PontoEletronicoParaAdvocaciaPage = () => <SeoLandingPageView content={pontoEletronicoParaAdvocaciaContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaAdvocaciaPage;
