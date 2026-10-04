import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { pontoPorExcecaoComoFuncionaQuemPodeUsarEQuaisSaoAsRegras as post } from "@/content/blog/posts/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras";

/** JSON-LD exclusivo de /blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras */
export const path = "/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "repP", "horaExtra", "espelhoDePonto"],
  relatedArticlePaths: [
    "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt",
    "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
  ],
});
