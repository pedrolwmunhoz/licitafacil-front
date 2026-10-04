import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-inss — sem import do post completo. */
export const path = "/blog/como-calcular-inss";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-inss",
  title: "Como calcular INSS",
  description: "Como calcular INSS 2026: contribuição progressiva por faixas (7,5% a 14%), salário de contribuição, teto, horas extras e salário líquido.",
  publishedAt: "2026-03-28",
  updatedAt: "2026-09-19",
  faqs: [{ q: "O INSS é calculado sobre o salário bruto?", a: "O cálculo utiliza o **salário de contribuição**, que pode incluir diversas verbas da remuneração, conforme sua natureza e as regras previdenciárias." }, { q: "O INSS é calculado com uma única alíquota?", a: "Não. Para empregados, o cálculo é progressivo. Cada faixa da remuneração possui uma alíquota específica." }, { q: "Horas extras têm desconto de INSS?", a: "As horas extras podem integrar o salário de contribuição e, quando sujeitas à contribuição, entram no cálculo do INSS." }, { q: "Existe limite para o desconto do INSS?", a: "Sim. A contribuição do empregado é limitada ao teto do salário de contribuição do INSS vigente." }, { q: "O INSS é descontado do salário líquido?", a: "Sim. O INSS é um dos descontos realizados sobre a remuneração para chegar ao salário líquido." }, { q: "O INSS influencia o cálculo do Imposto de Renda?", a: "Sim. A contribuição previdenciária pode ser considerada na determinação da base de cálculo do IRRF, conforme as regras tributárias aplicáveis." }],
  aboutIds: ["inss", "folhaDePagamento"],
  mentionIds: ["impostoDeRenda"],
  relatedArticlePaths: [
    "/blog/como-calcular-imposto-de-renda",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
