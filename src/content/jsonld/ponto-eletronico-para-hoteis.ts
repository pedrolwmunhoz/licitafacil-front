import { pontoEletronicoParaHoteisContent as content } from "@/content/seo-landings/ponto-eletronico-para-hoteis";
import { landingJsonLd } from "@/components/seo/jsonld/templates";

const crumbTitle = content.seo.title.split(" | ")[0] ?? content.seo.title;

/** JSON-LD exclusivo de /ponto-eletronico-para-hoteis */
export const path = content.seo.path;
export const jsonLd = landingJsonLd({
  path: content.seo.path,
  title: content.seo.title,
  description: content.seo.description,
  faqs: content.faqs?.items,
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["horasNoturnas", "feriadoTrabalhado"],
  breadcrumb: [
    { name: "Home", path: "/" },
    { name: "Segmentos", path: "/segmentos" },
    { name: crumbTitle, path: content.seo.path },
  ],
});
