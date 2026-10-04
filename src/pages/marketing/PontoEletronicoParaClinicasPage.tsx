import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaClinicasContent } from "@/content/seo-landings/ponto-eletronico-para-clinicas";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-clinicas";

const PontoEletronicoParaClinicasPage = () => <SeoLandingPageView content={pontoEletronicoParaClinicasContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaClinicasPage;
