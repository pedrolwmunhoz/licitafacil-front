import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios */
export const path = "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios";
export const jsonLd = articleJsonLd({
  path: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
  title: "Controle de jornada: o que é, como funciona e como registrar a jornada dos funcionários",
  description:
    "Controle de jornada: o que é, como funciona e como registrar a jornada dos funcionários — métodos, artigo 74, ponto eletrônico, home office, celular e espelho.",
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "horaExtra", "bancoDeHoras", "espelhoDePonto"],
  relatedArticlePaths: [
    "/blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto",
    "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt",
    "/blog/ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada",
  ],
});
