import { pontoEletronicoParaFranquiasContent as content } from "@/content/seo-landings/ponto-eletronico-para-franquias";
import { landingJsonLd } from "@/components/seo/jsonld/templates";

const crumbTitle = content.seo.title.split(" | ")[0] ?? content.seo.title;

/** JSON-LD exclusivo de /ponto-eletronico-para-franquias */
export const path = content.seo.path;
export const jsonLd = landingJsonLd({
  path: content.seo.path,
  title: content.seo.title,
  description: content.seo.description,
  faqs: content.faqs?.items,
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["geolocalizacao", "folhaDePagamento"],
  breadcrumb: [
    { name: "Home", path: "/" },
    { name: "Segmentos", path: "/segmentos" },
    { name: crumbTitle, path: content.seo.path },
  ],
});
