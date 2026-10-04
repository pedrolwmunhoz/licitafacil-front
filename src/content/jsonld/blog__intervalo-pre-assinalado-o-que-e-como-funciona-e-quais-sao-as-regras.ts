import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { intervaloPreAssinaladoOQueEComoFuncionaEQuaisSaoAsRegras as post } from "@/content/blog/posts/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras";

/** JSON-LD exclusivo de /blog/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras */
export const path = "/blog/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "portaria671"],
  mentionIds: ["pontoEletronico", "espelhoDePonto", "aej", "afd"],
  relatedArticlePaths: [
    "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
    "/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras",
    "/blog/o-que-e-afd-e-aej",
  ],
});
