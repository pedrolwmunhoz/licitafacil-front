import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve */
export const path = "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve";
export const jsonLd = articleJsonLd({
  path: "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve",
  title: "Geolocalização no ponto: como funciona e para que serve",
  description:
    "Geolocalização no ponto: como funciona, para que serve, diferença de rastreamento, LGPD, celular, equipes externas e home office.",
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  aboutIds: ["geolocalizacao", "pontoEletronico"],
  mentionIds: ["controleDeJornada", "portaria671", "repP"],
  relatedArticlePaths: [
    "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
    "/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
