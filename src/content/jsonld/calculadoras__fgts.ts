import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/fgts */
export const path = "/calculadoras/fgts";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/fgts",
  title: "Calculadora de FGTS | SegPonto",
  description: "Calculadora de FGTS: depósito de 8% ou 2% (aprendiz), proporcional por dias e estimativa da multa de 40%. Não é descontado do salário.",
  faqs: [{ q: "O FGTS é descontado do salário?", a: "Não. É depósito do empregador na conta vinculada do trabalhador." }, { q: "Qual a alíquota?", a: "8% para a maioria dos empregados CLT; 2% no contrato de aprendizagem." }, { q: "Como calcular proporcional?", a: "Calcule a remuneração dos dias trabalhados (salário ÷ 30 × dias) e aplique a alíquota." }, { q: "O que é a multa de 40%?", a: "Na demissão sem justa causa, há multa rescisória de 40% sobre a base prevista para a rescisão. Informe a base no campo opcional." }],
  aboutIds: ["fgts"],
  mentionIds: ["folhaDePagamento", "inss"],
  relatedArticlePaths: [
    "/blog/como-calcular-fgts",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
