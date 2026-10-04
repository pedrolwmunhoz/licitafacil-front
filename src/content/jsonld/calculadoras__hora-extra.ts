import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/hora-extra */
export const path = "/calculadoras/hora-extra";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/hora-extra",
  title: "Calculadora de hora extra | SegPonto",
  description: "Calculadora de hora extra: divisor 220, adicional 50% ou 100% em domingo/feriado. Total bruto estimado para conferir o espelho.",
  faqs: [{ q: "Qual divisor usar?", a: "220 é o mais comum para 44 horas semanais. Confira o contrato e a convenção do colaborador." }, { q: "A calculadora substitui o holerite?", a: "Não. Ela calcula o bruto das horas extras informadas. A folha oficial trata INSS, IRRF e demais rubricas." }, { q: "Banco de horas ou pagar a extra?", a: "Depende do acordo e da política da empresa. Para simular saldo de banco, use a calculadora de banco de horas; para regras, a página de banco de horas e HE." }, { q: "Domingo e feriado são só aqui?", a: "Aqui você calcula hora extraordinária (além da jornada) com 100% em domingo/feriado. Para o dia de repouso trabalhado sem compensação (Súmula 146, mensalista ÷ 30), use a calculadora de domingo e feriado." }],
  aboutIds: ["horaExtra"],
  mentionIds: ["bancoDeHoras", "folhaDePagamento"],
  relatedArticlePaths: [
    "/blog/como-calcular-hora-extra",
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
  ],
});
