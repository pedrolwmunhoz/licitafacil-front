import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar — sem import do post completo. */
export const path = "/blog/tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar";
export const jsonLd = articleJsonLd({
  path: "/blog/tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar",
  title: "Tolerância de ponto na CLT: quantos minutos o funcionário pode atrasar?",
  description: "Tolerância de ponto na CLT (art. 58, §1º): 5 minutos por marcação e 10 minutos por dia, o que acontece se passar do limite e como configurar no sistema de ponto.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-17",
  faqs: [{ q: "Quantos minutos de tolerância existem no ponto?", a: "São até 5 minutos por registro, respeitando o limite máximo de 10 minutos no total do dia." }, { q: "A tolerância é de 5 ou 10 minutos?", a: "Os dois números são importantes: 5 minutos por registro e 10 minutos por dia." }, { q: "Posso chegar 10 minutos atrasado no trabalho?", a: "A CLT não estabelece uma tolerância de 10 minutos para cada atraso. O limite de 10 minutos é diário e deve ser analisado junto ao limite de 5 minutos por registro." }, { q: "Os 5 minutos de tolerância são descontados do salário?", a: "As variações que não excedam 5 minutos, observado o limite de 10 minutos diários, não são tratadas como atraso descontável nos termos do artigo 58, §1º, da CLT." }, { q: "A tolerância também vale na saída?", a: "Sim. A regra trata das variações nos registros de horário, abrangendo as marcações de entrada e saída." }, { q: "A empresa pode criar uma tolerância maior?", a: "Uma política interna não deve ser usada para afastar as regras legais aplicáveis ao controle da jornada. Eventuais regras mais específicas devem ser analisadas conforme a legislação, contrato e normas coletivas aplicáveis." }],
  aboutIds: ["controleDeJornada", "pontoEletronico"],
  mentionIds: ["horaExtra", "bancoDeHoras"],
  relatedArticlePaths: [
    "/blog/como-fechar-o-ponto-do-mes",
    "/blog/como-calcular-hora-extra",
    "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
  ],
});
