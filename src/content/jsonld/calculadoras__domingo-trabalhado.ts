import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/domingo-trabalhado */
export const path = "/calculadoras/domingo-trabalhado";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/domingo-trabalhado",
  title: "Calculadora de domingo trabalhado | SegPonto",
  description: "Calculadora de domingo trabalhado: mensalista (salário ÷ 30, Súmula 146) ou horista (hora × horas × 2), sem folga compensatória.",
  faqs: [{ q: "Por que mensalista usa ÷ 30 e não o divisor 220?", a: "Porque a remuneração do domingo do mensalista é calculada pelo valor do dia (salário ÷ 30), conforme a jurisprudência do TST sobre a dobra do repouso não compensado — não pelo valor da hora da jornada." }, { q: "E se houve folga compensatória?", a: "Com folga compensatória adequada, a dobra da Súmula 146 não se aplica automaticamente. Confirme escala e política antes de lançar." }, { q: "Qual a diferença para a calculadora de hora extra?", a: "Hora extra remunera tempo além da jornada (50% ou 100% sobre a hora). Esta calculadora trata o domingo trabalhado sem compensação pela regra do dia (mensalista) ou da dobra horária (horista)." }, { q: "E feriado trabalhado?", a: "A lógica da Súmula 146 é a mesma, mas há uma calculadora específica de feriado trabalhado." }],
  aboutIds: ["domingoTrabalhado"],
  mentionIds: ["horaExtra", "feriadoTrabalhado"],
  relatedArticlePaths: [
    "/blog/como-calcular-domingo-trabalhado",
    "/blog/como-calcular-feriado-trabalhado",
  ],
});
