import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-imposto-de-renda — sem import do post completo. */
export const path = "/blog/como-calcular-imposto-de-renda";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-imposto-de-renda",
  title: "Como calcular imposto de renda",
  description: "Como calcular Imposto de Renda (IRRF) 2026: base de cálculo, tabela progressiva, desconto simplificado, redução até R$ 5.000 e exemplos.",
  publishedAt: "2026-04-05",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O Imposto de Renda é calculado sobre o salário bruto?", a: "Não necessariamente. O cálculo considera a base de cálculo depois das deduções permitidas ou do desconto simplificado aplicável." }, { q: "Qual é o desconto simplificado do IRRF em 2026?", a: "O desconto simplificado mensal é de **R$ 607,20**." }, { q: "Quem ganha R$ 5.000 paga Imposto de Renda em 2026?", a: "A regra de redução de 2026 pode zerar o imposto devido para rendimentos tributáveis mensais de até R$ 5.000." }, { q: "Quanto é a dedução por dependente em 2026?", a: "A dedução mensal por dependente é de **R$ 189,59**." }, { q: "Qual é a maior alíquota do Imposto de Renda?", a: "A maior alíquota da tabela mensal é de **27,5%**." }, { q: "Horas extras aumentam o Imposto de Renda?", a: "Podem aumentar, porque as horas extras podem integrar os rendimentos tributáveis utilizados no cálculo." }],
  aboutIds: ["impostoDeRenda", "inss"],
  mentionIds: ["folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-calcular-inss",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
