import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-folha-de-pagamento — sem import do post completo. */
export const path = "/blog/como-calcular-folha-de-pagamento";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-folha-de-pagamento",
  title: "Como calcular folha de pagamento",
  description: "Como calcular folha de pagamento: salário bruto, horas extras, adicional noturno, faltas, INSS, IRRF e salário líquido.",
  publishedAt: "2026-04-22",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Como calcular uma folha de pagamento?", a: "Some o salário e os demais proventos, como horas extras e adicionais, e depois desconte os valores aplicáveis ao trabalhador." }, { q: "O que é salário bruto?", a: "É a remuneração antes dos descontos." }, { q: "O que é salário líquido?", a: "É o valor que o trabalhador recebe depois dos descontos." }, { q: "Quais descontos podem aparecer na folha?", a: "Podem existir descontos de INSS, IRRF, vale-transporte, faltas, atrasos, pensão alimentícia e outros valores previstos em lei ou autorizados." }, { q: "Hora extra entra na folha de pagamento?", a: "Sim. As horas extras devidas devem ser incluídas na remuneração da competência correspondente." }, { q: "Adicional noturno entra na folha?", a: "Sim. Quando devido, o adicional noturno deve ser considerado no cálculo da remuneração." }, { q: "Quando o salário deve ser pago?", a: "Na regra geral, o salário mensal deve ser pago até o **5º dia útil do mês seguinte ao trabalhado**." }],
  aboutIds: ["folhaDePagamento", "inss"],
  mentionIds: ["horaExtra", "horasNoturnas", "impostoDeRenda"],
  relatedArticlePaths: [
    "/blog/como-fechar-o-ponto-do-mes",
    "/blog/como-calcular-hora-extra",
    "/blog/como-calcular-inss",
  ],
});
