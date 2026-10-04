import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { comoImplantarPontoEletronicoNaEmpresaPassoAPasso as post } from "@/content/blog/posts/como-implantar-ponto-eletronico-na-empresa-passo-a-passo";

/** JSON-LD exclusivo de /blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo */
export const path = "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo";
export const jsonLd = articleJsonLd({
  path: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["portaria671", "repP", "afd", "aej", "espelhoDePonto"],
  relatedArticlePaths: [
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
    "/blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto",
    "/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras",
  ],
});
