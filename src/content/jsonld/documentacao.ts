import { documentacaoJsonLd } from "@/components/seo/jsonld/templates";

export const path = "/documentacao";
export const jsonLd = documentacaoJsonLd({
  title: "Documentação: como usar | SegPonto",
  description: "Como usar o SegPonto: configurar empresa, convidar time, bater ponto, espelho, áreas de geolocalização e exportar fechamento.",
});
