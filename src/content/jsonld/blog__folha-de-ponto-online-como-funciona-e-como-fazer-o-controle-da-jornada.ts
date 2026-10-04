import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { folhaDePontoOnlineComoFuncionaEComoFazerOControleDaJornada as post } from "@/content/blog/posts/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada";

/** JSON-LD exclusivo de /blog/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada */
export const path = "/blog/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada";
export const jsonLd = articleJsonLd({
  path: "/blog/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["espelhoDePonto", "controleDeJornada"],
  mentionIds: ["pontoEletronico", "folhaDePagamento", "portaria671"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "/blog/app-de-ponto-eletronico-como-funciona-e-como-usar",
    "/blog/o-que-e-espelho-de-ponto",
  ],
});
