import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/inss */
export const path = "/calculadoras/inss";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/inss",
  title: "Calculadora de INSS | SegPonto",
  description: "Calculadora de INSS do empregado 2026: informe o salário de contribuição e veja o desconto progressivo até o teto. Estimativa para conferência.",
  faqs: [{ q: "A tabela é de 2026?", a: "Sim — faixas da Portaria MPS/MF nº 13/2026 (competência janeiro/2026). Confirme sempre com o contador se houver nova portaria." }, { q: "Vale para autônomo ou MEI?", a: "Não. Esta tool é a tabela progressiva de empregado/doméstico/avulso. Autônomo e MEI têm regras próprias." }, { q: "O teto limita o desconto?", a: "Sim. Acima de R$ 8.475,55 a base para essa tabela para no teto." }, { q: "Quero só o IRRF", a: "Use /calculadoras/imposto-de-renda — ela já estima o INSS e aplica a tabela/redução do IR 2026." }],
  aboutIds: ["inss"],
  mentionIds: ["folhaDePagamento", "impostoDeRenda"],
  relatedArticlePaths: [
    "/blog/como-calcular-inss",
    "/blog/como-calcular-imposto-de-renda",
  ],
});
