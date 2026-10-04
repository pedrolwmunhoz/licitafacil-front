import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas — sem import do post completo. */
export const path = "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas";
export const jsonLd = articleJsonLd({
  path: "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
  title: "REP-C, REP-A e REP-P: entenda as diferenças",
  description: "Diferença entre REP-C, REP-A e REP-P na Portaria 671: o que é cada modalidade, acordo coletivo, INPI, ponto pelo celular e requisitos do REP-P.",
  publishedAt: "2026-09-19",
  updatedAt: "2026-09-19",
  faqs: [{ q: "O que significa REP-C?", a: "REP-C significa Registrador Eletrônico de Ponto Convencional. É o modelo baseado em equipamento físico destinado ao registro da jornada." }, { q: "O que significa REP-A?", a: "REP-A significa Registrador Eletrônico de Ponto Alternativo. Sua utilização depende de autorização por convenção coletiva ou acordo coletivo de trabalho." }, { q: "O que significa REP-P?", a: "REP-P significa Registrador Eletrônico de Ponto via Programa. É uma modalidade baseada em software, formada pelo registrador, coletores, armazenamento dos registros e programa de tratamento." }, { q: "REP-P precisa de acordo coletivo?", a: "Não. O REP-P não depende de autorização por convenção ou acordo coletivo como ocorre com o REP-A. Ele precisa atender aos requisitos técnicos previstos na Portaria nº 671 e possuir registro do programa de computador no INPI." }, { q: "Ponto pelo celular pode ser REP-P?", a: "Sim. O REP-P pode utilizar dispositivos móveis como coletores de marcação, desde que o sistema cumpra os requisitos previstos na regulamentação." }, { q: "REP-A e REP-P são a mesma coisa?", a: "Não. A principal diferença é que o REP-A depende de autorização por instrumento coletivo, enquanto o REP-P possui requisitos técnicos próprios e não depende dessa autorização coletiva específica." }, { q: "REP-C ainda pode ser utilizado?", a: "Sim. O REP-C continua previsto na regulamentação como uma das modalidades de registro eletrônico de ponto." }],
  aboutIds: ["repP", "portaria671"],
  mentionIds: ["pontoEletronico", "afd", "comprovanteDePonto"],
  relatedArticlePaths: [
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "/blog/ponto-por-celular-e-legal-entenda-as-regras-para-bater-ponto-pelo-celular",
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
  ],
});
