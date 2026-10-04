import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-feriado-trabalhado — sem import do post completo. */
export const path = "/blog/como-calcular-feriado-trabalhado";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-feriado-trabalhado",
  title: "Como calcular feriado trabalhado",
  description: "Como calcular feriado trabalhado: Súmula 146, folga compensatória, mensalista e horista, jornada 12x36 e exemplos de cálculo.",
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-20",
  faqs: [{ q: "Quanto vale um feriado trabalhado?", a: "Para um mensalista, o valor diário é obtido dividindo o salário por 30. Se o feriado não for compensado, aplica-se a remuneração em dobro." }, { q: "Feriado trabalhado é 100%?", a: "Sem folga compensatória, o feriado trabalhado deve ser pago em dobro (Súmula 146). Com compensação válida, não há essa dobra. Regimes como 12x36 têm regra própria." }, { q: "Como calcular feriado trabalhado com salário de R$ 3.000?", a: "R$ 3.000 ÷ 30 = R$ 100 por dia. Feriado trabalhado sem compensação: R$ 100 × 2 = R$ 200. Para o mensalista, a remuneração normal do feriado já está no salário mensal." }, { q: "Quem trabalha 12x36 recebe feriado em dobro?", a: "A jornada 12x36 possui regra específica. O art. 59-A da CLT estabelece que a remuneração mensal pactuada nesse regime abrange os pagamentos relativos ao descanso semanal remunerado e aos feriados, considerados compensados." }, { q: "Feriado trabalhado pode ser compensado?", a: "Sim, desde que a compensação seja válida e respeite as regras aplicáveis ao regime de trabalho e aos instrumentos coletivos." }],
  aboutIds: ["feriadoTrabalhado", "horaExtra"],
  mentionIds: ["domingoTrabalhado"],
  relatedArticlePaths: [
    "/blog/como-calcular-domingo-trabalhado",
    "/blog/como-calcular-hora-extra",
  ],
});
