import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { multasPorIrregularidadesNoPontoEletronicoQuandoAEmpresaPodeSerAutuada as post } from "@/content/blog/posts/multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada";

/** JSON-LD exclusivo de /blog/multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada */
export const path = "/blog/multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada";
export const jsonLd = articleJsonLd({
  path: "/blog/multas-por-irregularidades-no-ponto-eletronico-quando-a-empresa-pode-ser-autuada",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "portaria671"],
  mentionIds: ["pontoEletronico", "afd", "aej", "espelhoDePonto", "horaExtra"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "/blog/o-que-e-afd-e-aej",
  ],
});
