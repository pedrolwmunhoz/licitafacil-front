import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/imposto-de-renda */
export const path = "/calculadoras/imposto-de-renda";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/imposto-de-renda",
  title: "Calculadora de imposto de renda (IRRF) | SegPonto",
  description: "Calculadora de imposto de renda mensal (IRRF 2026): salário, dependentes, INSS, tabela progressiva e redução da Lei 15.270. Estimativa para conferência.",
  faqs: [{ q: "Quem ganha até R$ 5.000 não paga IRRF?", a: "Na retenção mensal de 2026, a redução da Lei 15.270 costuma zerar o imposto para rendimentos até R$ 5.000. Confirme a base tributável com o contador." }, { q: "A tabela progressiva mudou em 2026?", a: "As faixas (7,5% a 27,5%) seguem os valores de 2025. O que mudou foi o redutor adicional da Lei 15.270/2025." }, { q: "Preciso informar o INSS?", a: "Não. A calculadora estima o INSS 2026 a partir do salário informado e usa esse valor na base do IR." }, { q: "Substitui o holerite?", a: "Não. É ferramenta de conferência. A folha oficial fica com o contador." }],
  aboutIds: ["impostoDeRenda"],
  mentionIds: ["inss", "folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-calcular-imposto-de-renda",
    "/blog/como-calcular-inss",
  ],
});
