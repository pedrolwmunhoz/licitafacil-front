import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-fgts — sem import do post completo. */
export const path = "/blog/como-calcular-fgts";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-fgts",
  title: "Como calcular FGTS",
  description: "Como calcular FGTS: depósito de 8% (ou 2% no aprendiz), proporcional, horas extras, férias, 13º e multa de 40%. Não é descontado do salário.",
  publishedAt: "2026-09-18",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O FGTS é descontado do salário?", a: "Não. O FGTS é pago pelo empregador e depositado na conta vinculada do trabalhador." }, { q: "Quanto é o FGTS de um salário de R$ 2.000?", a: "Considerando a alíquota de 8%: **R$ 2.000 × 8% = R$ 160**." }, { q: "Quanto é o FGTS de um salário de R$ 3.000?", a: "Considerando a alíquota de 8%: **R$ 3.000 × 8% = R$ 240**." }, { q: "Quanto é o FGTS de um salário de R$ 5.000?", a: "Considerando a alíquota de 8%: **R$ 5.000 × 8% = R$ 400**." }, { q: "Horas extras entram no cálculo do FGTS?", a: "Sim. As horas extras podem integrar a remuneração utilizada para o cálculo do FGTS." }, { q: "O 13º salário tem FGTS?", a: "Sim. O 13º salário também gera depósito de FGTS." }, { q: "Férias têm FGTS?", a: "A remuneração das férias está sujeita ao FGTS, observadas as regras aplicáveis às parcelas que compõem a base de cálculo." }, { q: "Como calcular o FGTS proporcional?", a: "Primeiro, calcule a remuneração correspondente aos dias trabalhados e depois aplique a alíquota de 8%. Com salário de R$ 3.000 e 15 dias: R$ 1.500 × 8% = R$ 120." }, { q: "Qual é a diferença entre FGTS e INSS?", a: "O **FGTS** é um depósito do empregador na conta vinculada. O **INSS** é contribuição previdenciária descontada da remuneração do empregado, conforme as regras aplicáveis." }],
  aboutIds: ["fgts", "folhaDePagamento"],
  mentionIds: ["inss", "horaExtra"],
  relatedArticlePaths: [
    "/blog/como-calcular-folha-de-pagamento",
    "/blog/como-calcular-inss",
  ],
});
