import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaSaloesContent } from "@/content/seo-landings/ponto-eletronico-para-saloes";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-saloes";

const PontoEletronicoParaSaloesPage = () => <SeoLandingPageView content={pontoEletronicoParaSaloesContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaSaloesPage;
