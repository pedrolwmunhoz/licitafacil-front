import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt */
export const path = "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt";
export const jsonLd = articleJsonLd({
  path: "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt",
  title: "Exceções ao controle de jornada: o que diz o artigo 62 da CLT",
  description:
    "Exceções ao controle de jornada no artigo 62 da CLT: atividade externa, cargo de gestão, teletrabalho por produção ou tarefa e o que a empresa deve observar.",
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "geolocalizacao"],
  relatedArticlePaths: [
    "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
