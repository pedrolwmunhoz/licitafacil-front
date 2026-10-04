import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaRestaurantesContent } from "@/content/seo-landings/ponto-eletronico-para-restaurantes";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-restaurantes";

const PontoEletronicoParaRestaurantesPage = () => <SeoLandingPageView content={pontoEletronicoParaRestaurantesContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaRestaurantesPage;
