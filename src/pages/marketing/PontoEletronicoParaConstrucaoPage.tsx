import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaConstrucaoContent } from "@/content/seo-landings/ponto-eletronico-para-construcao";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-construcao";

const PontoEletronicoParaConstrucaoPage = () => <SeoLandingPageView content={pontoEletronicoParaConstrucaoContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaConstrucaoPage;
