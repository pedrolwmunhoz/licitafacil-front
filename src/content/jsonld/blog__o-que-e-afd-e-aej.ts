import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/o-que-e-afd-e-aej — sem import do post completo. */
export const path = "/blog/o-que-e-afd-e-aej";
export const jsonLd = articleJsonLd({
  path: "/blog/o-que-e-afd-e-aej",
  title: "O que é AFD e AEJ?",
  description: "O que é AFD e AEJ no ponto eletrônico: Arquivo Fonte de Dados, Arquivo Eletrônico de Jornada, diferença para o espelho, PTRP e Portaria 671.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O que significa AFD no ponto eletrônico?", a: "AFD significa Arquivo Fonte de Dados. É o arquivo relacionado aos dados gerados pelo sistema de registro eletrônico de ponto." }, { q: "O que significa AEJ no ponto eletrônico?", a: "AEJ significa Arquivo Eletrônico de Jornada. É o arquivo gerado pelo Programa de Tratamento de Registro de Ponto após o processamento dos dados da jornada." }, { q: "Qual a diferença entre AFD e AEJ?", a: "O AFD contém os dados provenientes do registro eletrônico de ponto. O AEJ é gerado posteriormente pelo Programa de Tratamento de Registro de Ponto a partir do processamento dessas informações." }, { q: "Quem gera o AFD?", a: "O AFD é gerado pelo sistema de registro eletrônico de ponto, conforme as regras aplicáveis ao REP-C, REP-A ou REP-P." }, { q: "Quem gera o AEJ?", a: "O Programa de Tratamento de Registro de Ponto (PTRP) gera o AEJ." }, { q: "AFD e AEJ são a mesma coisa?", a: "Não. São arquivos diferentes, gerados em etapas diferentes do processo de registro e tratamento da jornada." }, { q: "O AEJ substituiu o ACJEF?", a: "Sim. O AEJ passou a substituir o ACJEF e o AFDT no modelo estabelecido pela Portaria 671." }, { q: "O funcionário recebe o AFD?", a: "Não. O AFD não é o relatório utilizado normalmente pelo funcionário para consultar sua jornada. Para essa finalidade, existe o Espelho de Ponto Eletrônico." }, { q: "O sistema de ponto precisa gerar AFD e AEJ?", a: "Os sistemas eletrônicos submetidos à Portaria 671 possuem requisitos específicos de geração desses arquivos. O AFD é exigido para os sistemas de registro eletrônico de ponto, enquanto o AEJ é gerado pelo Programa de Tratamento de Registro de Ponto." }],
  aboutIds: ["afd", "aej"],
  mentionIds: ["espelhoDePonto", "portaria671", "repP"],
  relatedArticlePaths: [
    "/blog/o-que-e-espelho-de-ponto",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
  ],
});
