import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { quantoTempoGuardarRegistroDePonto as post } from "@/content/blog/posts/quanto-tempo-guardar-registro-de-ponto";

/** JSON-LD exclusivo de /blog/quanto-tempo-guardar-registro-de-ponto */
export const path = "/blog/quanto-tempo-guardar-registro-de-ponto";
export const jsonLd = articleJsonLd({
  path: "/blog/quanto-tempo-guardar-registro-de-ponto",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "afd", "aej", "espelhoDePonto", "comprovanteDePonto", "repP"],
  relatedArticlePaths: [
    "/blog/comprovante-de-registro-de-ponto-o-que-e-para-que-serve-e-quais-sao-as-regras",
    "/blog/o-que-e-afd-e-aej",
    "/blog/o-que-e-espelho-de-ponto",
  ],
});
