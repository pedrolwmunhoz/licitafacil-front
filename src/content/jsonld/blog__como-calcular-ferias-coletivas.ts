import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-calcular-ferias-coletivas — sem import do post completo. */
export const path = "/blog/como-calcular-ferias-coletivas";
export const jsonLd = articleJsonLd({
  path: "/blog/como-calcular-ferias-coletivas",
  title: "Como calcular férias coletivas",
  description: "Como calcular férias coletivas: salário ÷ 30 × dias + 1/3, 10, 15 e 20 dias, proporcionais, licença remunerada e prazo de pagamento.",
  publishedAt: "2026-06-02",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Como calcular férias coletivas?", a: "Valor das férias = salário ÷ 30 × dias. Depois some o adicional de 1/3 (valor das férias ÷ 3)." }, { q: "Férias coletivas têm adicional de 1/3?", a: "Sim. O 1/3 incide sobre os dias que correspondem a férias. Dias de licença remunerada (quando a coletiva ultrapassa o proporcional adquirido) não levam o 1/3." }, { q: "Férias coletivas podem ser divididas?", a: "Sim, em até dois períodos anuais, nenhum inferior a 10 dias corridos." }, { q: "Qual o prazo para pagar as férias coletivas?", a: "Até dois dias antes do início do período de férias, incluindo o adicional de 1/3." }, { q: "E se o empregado ainda não completou 12 meses?", a: "Paga-se o proporcional adquirido com 1/3. Se a coletiva for maior que o proporcional, o excedente é licença remunerada e não é descontado depois das férias." }],
  aboutIds: ["ferias", "folhaDePagamento"],
  mentionIds: [],
  relatedArticlePaths: [
    "/blog/como-calcular-ferias",
    "/blog/como-calcular-folha-de-pagamento",
  ],
});
