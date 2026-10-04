import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-ferias — sem import do post completo. */
export const path = "/blog/como-calcular-ferias";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-ferias",
  title: "Como calcular férias",
  description: "Como calcular férias: 30 dias + 1/3, proporcionais, faltas, abono, rescisão, coletivas e prazo de pagamento.",
  publishedAt: "2026-05-18",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Como calcular férias de 30 dias?", a: "Férias = salário + 1/3 do salário. Com R$ 3.000,00, o total bruto é R$ 4.000,00." }, { q: "Qual é o prazo para pagar as férias?", a: "Até dois dias antes do início do respectivo período de férias." }, { q: "Férias podem ser parceladas?", a: "Sim, em até três períodos com concordância do empregado: um com pelo menos 14 dias corridos e os demais com pelo menos 5 dias corridos cada." }, { q: "Como calcular férias proporcionais?", a: "Salário ÷ 12 × número de avos, depois acrescente o adicional de 1/3. Fração igual ou superior a 15 dias conta como um mês." }, { q: "O que é abono pecuniário?", a: "É a conversão em dinheiro de até 1/3 do período de férias. Com 30 dias de direito, o limite costuma ser 10 dias." }],
  aboutIds: ["ferias", "folhaDePagamento"],
  mentionIds: ["inss"],
  relatedArticlePaths: [
    "/blog/como-calcular-ferias-coletivas",
    "/blog/como-calcular-ferias-empregada-domestica",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
