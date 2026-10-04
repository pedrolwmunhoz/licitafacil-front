import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoEmpregadaDomesticaContent } from "@/content/seo-landings/ponto-eletronico-empregada-domestica";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-empregada-domestica";

const PontoEletronicoEmpregadaDomesticaPage = () => <SeoLandingPageView content={pontoEletronicoEmpregadaDomesticaContent} jsonLd={jsonLd} />;

export default PontoEletronicoEmpregadaDomesticaPage;
