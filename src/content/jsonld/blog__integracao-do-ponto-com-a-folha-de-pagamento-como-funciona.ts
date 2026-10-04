import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { integracaoDoPontoComAFolhaDePagamentoComoFunciona as post } from "@/content/blog/posts/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona";

/** JSON-LD exclusivo de /blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona */
export const path = "/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona";
export const jsonLd = articleJsonLd({
  path: "/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["folhaDePagamento", "controleDeJornada"],
  mentionIds: ["pontoEletronico", "afd", "aej", "espelhoDePonto", "horaExtra", "bancoDeHoras"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "/blog/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada",
    "/blog/o-que-e-afd-e-aej",
  ],
});
