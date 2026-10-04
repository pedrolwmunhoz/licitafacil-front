import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/folha-de-pagamento */
export const path = "/calculadoras/folha-de-pagamento";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/folha-de-pagamento",
  title: "Calculadora de folha de pagamento | SegPonto",
  description: "Calculadora de folha de pagamento: salário, variáveis do ponto, INSS 2026, IRRF 2026 e faltas. Estimativa de líquido. Não substitui o contador.",
  faqs: [{ q: "Por que dia de falta usa ÷ 30 e atraso usa divisor?", a: "No mensalista a falta integral desconta o valor do dia (salário ÷ 30). Atraso em horas usa o valor da hora da jornada (salário ÷ divisor)." }, { q: "A calculadora substitui a folha do contador?", a: "Não. Serve para conferência de proventos, descontos principais e líquido." }, { q: "O INSS e o IRRF estão atualizados?", a: "Sim — tabelas 2026 e redução da Lei 15.270/2025. Confirme a base real com o contador." }],
  aboutIds: ["folhaDePagamento"],
  mentionIds: ["inss", "impostoDeRenda", "horaExtra"],
  relatedArticlePaths: [
    "/blog/como-calcular-folha-de-pagamento",
    "/blog/como-fechar-o-ponto-do-mes",
  ],
});
