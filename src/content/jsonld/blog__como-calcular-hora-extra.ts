import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-hora-extra — sem import do post completo. */
export const path = "/blog/como-calcular-hora-extra";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-hora-extra",
  title: "Como calcular hora extra",
  description: "Como calcular hora extra: hora normal × 1,5 ou × 2, exemplos com salários, jornadas 40h e 36h, noturna, domingo, feriado e reflexos.",
  publishedAt: "2026-05-16",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Como calcular hora extra de 50%?", a: "Hora extra = hora normal × 1,5. A hora normal é salário ÷ divisor mensal (ex.: 220 para 44h semanais)." }, { q: "Como calcular hora extra de 100%?", a: "Hora extra = hora normal × 2. Pode se aplicar em certas situações de domingo e feriado, conforme as regras e eventual compensação." }, { q: "Qual é o limite de horas extras por dia?", a: "Na regra geral da CLT, até 2 horas extras por dia, mediante acordo individual, convenção ou acordo coletivo." }, { q: "Hora extra entra no cálculo das férias?", a: "As horas extras habituais podem integrar a remuneração usada no cálculo das férias." }, { q: "Hora extra tem desconto de INSS e Imposto de Renda?", a: "Sim, em regra possuem natureza salarial e integram a base de contribuições e tributos aplicáveis." }],
  aboutIds: ["horaExtra", "bancoDeHoras"],
  mentionIds: ["horasNoturnas", "folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
    "/blog/como-calcular-horas-noturnas",
    "/blog/como-calcular-domingo-trabalhado",
  ],
});
