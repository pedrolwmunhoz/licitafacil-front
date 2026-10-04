import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaContabilidadesContent } from "@/content/seo-landings/ponto-eletronico-para-contabilidades";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-contabilidades";

const PontoEletronicoParaContabilidadesPage = () => <SeoLandingPageView content={pontoEletronicoParaContabilidadesContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaContabilidadesPage;
