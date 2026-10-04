import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaFranquiasContent } from "@/content/seo-landings/ponto-eletronico-para-franquias";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-franquias";

const PontoEletronicoParaFranquiasPage = () => <SeoLandingPageView content={pontoEletronicoParaFranquiasContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaFranquiasPage;
