import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/folha-de-ponto */
export const path = "/calculadoras/folha-de-ponto";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/folha-de-ponto",
  title: "Calculadora de folha de ponto | SegPonto",
  description: "Calculadora de folha/cartão de ponto: some batidas de entrada e saída e veja o total de horas do dia ou da semana.",
  faqs: [{ q: "E se faltar uma batida?", a: "A conta fica incompleta. Inclua só pares válidos ou ajuste o horário faltante antes de somar — no sistema real isso vira solicitação de ajuste." }, { q: "Como trato o intervalo?", a: "Informe manhã e tarde como dois pares (ex.: 08–12 e 13–17). Se preferir, já desconte o intervalo e use um único par contínuo." }, { q: "Serve para plantão que cruza meia-noite?", a: "Sim: se a saída for menor que a entrada, a ferramenta assume virada de dia (ex.: 22:00 → 06:00)." }, { q: "Isso substitui o espelho do SegPonto?", a: "Não. É uma calculadora de conferência. No produto as batidas vêm do app com histórico e aprovações." }],
  aboutIds: ["espelhoDePonto", "controleDeJornada"],
  mentionIds: ["pontoEletronico"],
  relatedArticlePaths: [
    "/blog/o-que-e-espelho-de-ponto",
    "/blog/como-fechar-o-ponto-do-mes",
  ],
});
