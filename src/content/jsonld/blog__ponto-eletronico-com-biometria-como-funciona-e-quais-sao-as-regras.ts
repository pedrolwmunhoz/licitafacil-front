import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { pontoEletronicoComBiometriaComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras";

/** JSON-LD exclusivo de /blog/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras */
export const path = "/blog/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["portaria671", "geolocalizacao"],
  relatedArticlePaths: [
    "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet",
    "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
