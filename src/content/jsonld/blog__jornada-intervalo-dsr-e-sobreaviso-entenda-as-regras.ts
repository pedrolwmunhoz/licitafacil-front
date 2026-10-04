import { articleJsonLd } from "@/components/seo/jsonld/templates";
import { jornadaIntervaloDsrESobreavisoEntendaAsRegras as post } from "@/content/blog/posts/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras";

/** JSON-LD exclusivo de /blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras */
export const path = "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras";
export const jsonLd = articleJsonLd({
  path: "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
  title: post.title,
  description: post.description,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  faqs: post.faqs,
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "horaExtra", "bancoDeHoras", "domingoTrabalhado", "folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
    "/blog/como-calcular-hora-extra",
  ],
});
