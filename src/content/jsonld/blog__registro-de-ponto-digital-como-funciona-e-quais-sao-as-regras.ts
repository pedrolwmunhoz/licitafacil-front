import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras */
export const path = "/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/registro-de-ponto-digital-como-funciona-e-quais-sao-as-regras",
  title: "Registro de ponto digital: como funciona e quais são as regras",
  description:
    "Registro de ponto digital: como funciona, Portaria 671, REP-C, REP-A e REP-P, ponto pelo celular, geolocalização, comprovante, AFD, AEJ e tratamento da jornada.",
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  faqs: [],
  aboutIds: ["pontoEletronico", "portaria671"],
  mentionIds: ["repP", "geolocalizacao", "afd", "aej", "comprovanteDePonto"],
  relatedArticlePaths: [
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
    "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
