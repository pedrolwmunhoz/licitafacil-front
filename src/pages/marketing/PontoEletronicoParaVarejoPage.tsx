import { SeoLandingPageView } from "@/components/marketing/SeoLandingPageView";
import { pontoEletronicoParaVarejoContent } from "@/content/seo-landings/ponto-eletronico-para-varejo";
import { jsonLd } from "@/content/jsonld/ponto-eletronico-para-varejo";

const PontoEletronicoParaVarejoPage = () => <SeoLandingPageView content={pontoEletronicoParaVarejoContent} jsonLd={jsonLd} />;

export default PontoEletronicoParaVarejoPage;
