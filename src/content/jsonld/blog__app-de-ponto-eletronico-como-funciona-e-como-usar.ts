import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { appDePontoEletronicoComoFuncionaEComoUsar as post } from "@/content/blog/posts/app-de-ponto-eletronico-como-funciona-e-como-usar";

/** JSON-LD exclusivo de /blog/app-de-ponto-eletronico-como-funciona-e-como-usar */
export const path = "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar";
export const jsonLd = articleJsonLd({
  path: "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["pontoEletronico", "repP"],
  mentionIds: ["geolocalizacao", "portaria671", "controleDeJornada"],
  relatedArticlePaths: [
    "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve",
    "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
