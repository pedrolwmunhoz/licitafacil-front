import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-horas-noturnas — sem import do post completo. */
export const path = "/blog/como-calcular-horas-noturnas";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-horas-noturnas",
  title: "Como calcular horas noturnas",
  description: "Como calcular horas noturnas: período 22h–5h, hora de 52min30s, adicional de 20%, exemplos com salários e prorrogação após as 5h.",
  publishedAt: "2026-05-20",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Qual horário é considerado noturno?", a: "No trabalho urbano, o período noturno é aquele realizado entre **22h e 5h do dia seguinte**." }, { q: "Quanto vale uma hora noturna?", a: "A hora noturna tem duração reduzida para **52 minutos e 30 segundos** e, no trabalho urbano, possui adicional de pelo menos **20%** sobre a hora diurna." }, { q: "Quantos minutos tem a hora noturna?", a: "A hora noturna urbana corresponde a **52 minutos e 30 segundos**." }, { q: "Quem trabalha à noite ganha quanto a mais?", a: "No trabalho urbano, o adicional noturno é de pelo menos **20% sobre o valor da hora diurna**, salvo percentual mais favorável previsto em norma coletiva." }, { q: "Das 22h às 5h são quantas horas noturnas?", a: "São 7 horas no relógio, mas esse período corresponde a **8 horas noturnas** devido à redução da hora noturna." }, { q: "O adicional noturno é obrigatório?", a: "Sim, para o trabalho urbano realizado no período noturno definido pela legislação, é devido adicional de pelo menos **20%**, observadas as regras aplicáveis à categoria." }],
  aboutIds: ["horasNoturnas", "horaExtra"],
  mentionIds: ["folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-calcular-hora-extra",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
