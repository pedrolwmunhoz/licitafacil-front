import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaCondominiosContent } from "@/content/seo-landings/ponto-eletronico-para-condominios";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-condominios";

const PontoEletronicoParaCondominiosPage = () => <SeoLandingPageView content={pontoEletronicoParaCondominiosContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaCondominiosPage;
