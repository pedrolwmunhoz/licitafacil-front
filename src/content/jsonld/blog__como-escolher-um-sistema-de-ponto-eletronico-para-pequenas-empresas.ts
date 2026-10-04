import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas — sem import do post completo. */
export const path = "/blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas";
export const jsonLd = articleJsonLd({
  path: "/blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas",
  title: "Como escolher um sistema de ponto eletrônico para pequenas empresas",
  description: "Como escolher um sistema de ponto eletrônico para pequenas empresas: o que avaliar, ponto pelo celular, custo, comparação com planilha e checklist antes de contratar.",
  publishedAt: "2026-01-15",
  updatedAt: "2026-09-17",
  faqs: [{ q: "Quando uma pequena empresa precisa de um sistema de ponto?", a: "A necessidade costuma aumentar conforme cresce o número de funcionários e a complexidade das jornadas, especialmente com horários diferentes, equipes externas ou trabalho remoto." }, { q: "Ponto eletrônico pelo celular funciona para pequenas empresas?", a: "Sim. Pode ser alternativa quando a empresa não quer instalar equipamento físico, inclusive para equipes externas, híbridas ou com poucos funcionários." }, { q: "O que avaliar antes de contratar?", a: "Facilidade de registro, horas extras, banco de horas, relatórios, justificativas e ajustes, acesso pelo celular e custo em relação aos recursos realmente necessários." }, { q: "Sistema de ponto ou planilha?", a: "A planilha pode funcionar em rotina muito simples. Com mais funcionários ou horários diferentes, o sistema automatiza registros, horas extras, banco e relatórios com menos trabalho manual." }, { q: "Vale a pena contratar?", a: "Sim quando já há dificuldade para controlar horários, extras, faltas ou banco. Para PME, priorize simplicidade, recursos necessários, quantidade de funcionários e custo mensal." }],
  aboutIds: ["pontoEletronico", "controleDeJornada"],
  mentionIds: ["repP", "bancoDeHoras"],
  relatedArticlePaths: [
    "/blog/quanto-custa-um-sistema-de-ponto-eletronico",
    "/blog/o-que-e-um-sistema-de-ponto-eletronico",
    "/blog/empresa-com-menos-de-20-funcionarios-precisa-de-ponto",
  ],
});
