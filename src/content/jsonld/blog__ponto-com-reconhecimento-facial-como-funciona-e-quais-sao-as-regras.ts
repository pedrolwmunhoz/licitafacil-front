import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { pontoComReconhecimentoFacialComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras";

/** JSON-LD exclusivo de /blog/ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras */
export const path = "/blog/ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-com-reconhecimento-facial-como-funciona-e-quais-sao-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["geolocalizacao", "portaria671"],
  relatedArticlePaths: [
    "/blog/ponto-eletronico-com-biometria-como-funciona-e-quais-sao-as-regras",
    "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet",
    "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
  ],
});
