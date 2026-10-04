import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto — sem import do post completo. */
export const path = "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto";
export const jsonLd = articleJsonLd({
  path: "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
  title: "Empresa com menos de 20 funcionários precisa de ponto?",
  description: "Empresa com menos de 20 funcionários precisa de ponto? Art. 74, §2º da CLT: limite de mais de 20 trabalhadores, o caso dos 20 exatos, horas extras e quando usar ponto eletrônico mesmo sem obrigação.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-17",
  faqs: [{ q: "Empresa com menos de 20 funcionários é obrigada a bater ponto?", a: "Não pela regra geral do artigo 74, §2º, da CLT. A obrigatoriedade de registro de entrada e saída prevista nesse dispositivo alcança estabelecimentos com mais de 20 trabalhadores." }, { q: "Empresa com exatamente 20 funcionários precisa de ponto?", a: "O artigo 74, §2º, fala em estabelecimentos com mais de 20 trabalhadores. Portanto, exatamente 20 não se enquadra nesse limite." }, { q: "Empresa com 19 funcionários pode não ter ponto?", a: "Sim, não há obrigatoriedade geral de registro de entrada e saída pelo critério do artigo 74, §2º." }, { q: "Empresa pequena pode usar ponto eletrônico?", a: "Sim. Estar abaixo do limite de obrigatoriedade não impede a empresa de adotar um sistema de ponto eletrônico." }, { q: "Com quantos funcionários o ponto passa a ser obrigatório?", a: "Pela regra geral do artigo 74, §2º, a obrigatoriedade ocorre para estabelecimentos com mais de 20 trabalhadores." }, { q: "É obrigatório usar relógio de ponto?", a: "Não. Quando o registro de entrada e saída é obrigatório, a CLT admite registro manual, mecânico ou eletrônico, conforme as regras aplicáveis." }, { q: "Empresa com menos de 20 funcionários precisa registrar horas extras?", a: "A dispensa do registro obrigatório pelo limite de trabalhadores não elimina as regras trabalhistas relativas à jornada e às horas extras." }],
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["portaria671", "horaExtra"],
  relatedArticlePaths: [
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
    "/blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
