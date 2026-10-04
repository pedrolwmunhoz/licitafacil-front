import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico — sem import do post completo. */
export const path = "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico";
export const jsonLd = articleJsonLd({
  path: "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  title: "Portaria 671: o que é, requisitos e regras para o ponto eletrônico",
  description: "Portaria 671 do MTE: o que é, requisitos para ponto eletrônico, diferença entre REP-C, REP-A e REP-P, Espelho de Ponto, AEJ, Atestado Técnico e checklist antes de contratar.",
  publishedAt: "2026-03-10",
  updatedAt: "2026-09-17",
  faqs: [{ q: "O que é a Portaria 671 do ponto eletrônico?", a: "É a regulamentação do Ministério do Trabalho que estabelece regras para diferentes formas de registro eletrônico de jornada, incluindo REP-C, REP-A e REP-P." }, { q: "Qual REP é usado em sistemas de ponto online?", a: "Sistemas baseados em software podem utilizar o modelo REP-P, desde que cumpram os requisitos estabelecidos pela Portaria 671." }, { q: "REP-P precisa de homologação?", a: "O MTE informa que o REP-P não precisa de certificação e homologação como equipamento junto ao Ministério. Ele precisa de registro de programa de computador no INPI e atender aos requisitos previstos na Portaria 671." }, { q: "REP-A precisa de acordo coletivo?", a: "Sim. A utilização do REP-A depende de autorização por convenção ou acordo coletivo de trabalho." }, { q: "O ponto pelo celular pode ser utilizado?", a: "Pode existir uma solução de ponto pelo celular estruturada como REP-P, desde que o sistema cumpra os requisitos aplicáveis ao registro eletrônico de ponto." }, { q: "O sistema precisa fornecer Atestado Técnico?", a: "O empregador somente pode utilizar o sistema de registro eletrônico de ponto e o programa de tratamento se possuir o Atestado Técnico e Termo de Responsabilidade emitido pelo fabricante ou desenvolvedor, conforme o art. 89." }],
  aboutIds: ["portaria671", "pontoEletronico"],
  mentionIds: ["repP", "afd", "aej", "espelhoDePonto"],
  relatedArticlePaths: [
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
    "/blog/o-que-e-afd-e-aej",
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
  ],
});
