import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-domingo-trabalhado — sem import do post completo. */
export const path = "/blog/como-calcular-domingo-trabalhado";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-domingo-trabalhado",
  title: "Como calcular domingo trabalhado",
  description: "Como calcular domingo trabalhado: Súmula 146, folga compensatória, mensalista e horista, escalas 6x1, 5x1 e 12x36, com exemplos.",
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Quanto vale um domingo trabalhado?", a: "Para um mensalista, calcula-se o valor do dia dividindo o salário por 30. Se o domingo não for compensado, aplica-se a dobra prevista para o trabalho em domingo não compensado." }, { q: "Domingo trabalhado é 100%?", a: "Não necessariamente. Sem folga compensatória, a Súmula 146 manda pagar em dobro — o que é diferente de tratar o dia só como hora extra de 100%. Com folga compensatória, não há essa dobra." }, { q: "Domingo trabalhado com folga compensatória tem pagamento em dobro?", a: "Não. Com folga compensatória, não há a dobra da Súmula 146. A dobra vale para o domingo trabalhado sem compensação." }, { q: "Como calcular domingo trabalhado com salário de R$ 2.000?", a: "R$ 2.000 ÷ 30 = R$ 66,67. Se o domingo não foi compensado: R$ 66,67 × 2 = R$ 133,34. Para o mensalista, o salário já contempla o repouso; a parcela adicional da dobra corresponde a mais um dia." }, { q: "Domingo trabalhado pode ser compensado?", a: "Sim, desde que a compensação seja válida e respeite as regras aplicáveis ao regime de trabalho e aos instrumentos coletivos." }, { q: "Como calcular domingo trabalhado na escala 6x1?", a: "Identifique o dia de descanso semanal. Se o domingo foi trabalhado e houve outro dia de descanso que compensou o repouso, não há dobra. Sem essa folga, aplica-se o pagamento em dobro." }],
  aboutIds: ["domingoTrabalhado", "horaExtra"],
  mentionIds: ["feriadoTrabalhado"],
  relatedArticlePaths: [
    "/blog/como-calcular-feriado-trabalhado",
    "/blog/como-calcular-hora-extra",
  ],
});
