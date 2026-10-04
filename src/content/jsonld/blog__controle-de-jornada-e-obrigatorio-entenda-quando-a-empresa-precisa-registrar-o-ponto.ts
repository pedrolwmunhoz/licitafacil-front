import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto */
export const path = "/blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto";
export const jsonLd = articleJsonLd({
  path: "/blog/controle-de-jornada-e-obrigatorio-entenda-quando-a-empresa-precisa-registrar-o-ponto",
  title: "Controle de jornada é obrigatório? Entenda quando a empresa precisa registrar o ponto",
  description:
    "Controle de jornada é obrigatório? Artigo 74 da CLT, mais de 20 trabalhadores, exceções do artigo 62, ponto eletrônico, home office e como a empresa registra o ponto.",
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  aboutIds: ["controleDeJornada", "portaria671"],
  mentionIds: ["pontoEletronico", "bancoDeHoras", "horaExtra"],
  relatedArticlePaths: [
    "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
    "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
