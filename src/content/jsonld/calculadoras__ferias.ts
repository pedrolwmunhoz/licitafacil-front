import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/ferias */
export const path = "/calculadoras/ferias";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/ferias",
  title: "Calculadora de férias | SegPonto",
  description: "Calculadora de férias: 15, 20 ou 30 dias, proporcional, terço constitucional e abono. Estimativa bruta para RH e conferência.",
  faqs: [{ q: "Quantos dias posso vender no abono?", a: "Até um terço dos dias de direito (máximo 10 quando o direito é 30), com concordância do empregado." }, { q: "Posso informar 30 de gozo e 10 de abono ao mesmo tempo?", a: "Não. Com direito a 30, se vender 10 goza 20. A calculadora aplica isso automaticamente." }, { q: "A calculadora já desconta impostos?", a: "Não. Mostra valores brutos. INSS e IRRF entram na folha de férias." }],
  aboutIds: ["ferias"],
  mentionIds: ["folhaDePagamento", "inss"],
  relatedArticlePaths: [
    "/blog/como-calcular-ferias",
    "/blog/como-calcular-ferias-coletivas",
  ],
});
