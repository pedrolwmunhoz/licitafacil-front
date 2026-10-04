import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/ferias-empregada-domestica */
export const path = "/calculadoras/ferias-empregada-domestica";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/ferias-empregada-domestica",
  title: "Calculadora de férias da empregada doméstica | SegPonto",
  description: "Calculadora de férias da empregada doméstica: salário + 1/3, 10 a 30 dias, abono pecuniário. Estimativa bruta para eSocial Doméstico.",
  faqs: [{ q: "Qual a diferença para a calculadora de férias geral?", a: "A matemática do terço é a mesma. Esta versão foca no cenário da empregada doméstica (salário, dias e abono), sem a tabela de faltas da CLT de empresa." }, { q: "Posso simular 15 ou 10 dias?", a: "Sim. Informe os dias de férias (ou use os atalhos) e, se for o caso, os dias de abono." }, { q: "A calculadora já desconta INSS?", a: "Não. Mostra valores brutos. Os descontos entram na folha / eSocial Doméstico." }],
  aboutIds: ["ferias"],
  mentionIds: ["folhaDePagamento", "inss"],
  relatedArticlePaths: [
    "/blog/como-calcular-ferias-empregada-domestica",
    "/blog/como-calcular-ferias",
  ],
});
