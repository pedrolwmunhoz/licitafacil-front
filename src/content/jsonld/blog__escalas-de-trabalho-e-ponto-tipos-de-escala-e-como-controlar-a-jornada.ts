import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { escalasDeTrabalhoEPontoTiposDeEscalaEComoControlarAJornada as post } from "@/content/blog/posts/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada";

/** JSON-LD exclusivo de /blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada */
export const path = "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada";
export const jsonLd = articleJsonLd({
  path: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "horaExtra", "bancoDeHoras", "horasNoturnas", "domingoTrabalhado"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
  ],
});
