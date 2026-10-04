import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { comprovanteDeRegistroDePontoOQueEParaQueServeEQuaisSaoAsRegras as post } from "@/content/blog/posts/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras";

/** JSON-LD exclusivo de /blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras */
export const path = "/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["comprovanteDePonto", "pontoEletronico"],
  mentionIds: ["portaria671", "repP", "afd", "aej", "espelhoDePonto"],
  relatedArticlePaths: [
    "/blog/o-que-e-espelho-de-ponto",
    "/blog/o-que-e-afd-e-aej",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
