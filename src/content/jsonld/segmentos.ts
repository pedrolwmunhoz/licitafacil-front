import { segmentosIndexJsonLd } from "@/components/seo/jsonld/templates";
import { SEGMENTOS_LINKS } from "@/content/segmentos-links";

export const path = "/segmentos";
export const jsonLd = segmentosIndexJsonLd({
  title: "Segmentos | SegPonto",
  description:
    "Ponto eletrônico por segmento: construção, clínicas, varejo, indústria, contabilidades e outros nichos.",
  items: SEGMENTOS_LINKS.map((l) => ({ name: l.label, path: l.to })),
});
