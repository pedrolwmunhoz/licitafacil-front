import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { pontoPorAppVsRelogioDePontoQualADiferencaEComoEscolher as post } from "@/content/blog/posts/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher";

/** JSON-LD exclusivo de /blog/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher */
export const path = "/blog/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-por-app-vs-relogio-de-ponto-qual-a-diferenca-e-como-escolher",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  aboutIds: ["pontoEletronico", "repP"],
  mentionIds: ["portaria671", "geolocalizacao", "controleDeJornada"],
  relatedArticlePaths: [
    "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
    "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet",
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
  ],
});
