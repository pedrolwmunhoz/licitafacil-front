import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { pontoEletronicoOfflineComoFuncionaQuandoNaoHaInternet as post } from "@/content/blog/posts/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet";

/** JSON-LD exclusivo de /blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet */
export const path = "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["pontoEletronico", "repP"],
  mentionIds: ["portaria671", "controleDeJornada", "geolocalizacao"],
  relatedArticlePaths: [
    "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
    "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
