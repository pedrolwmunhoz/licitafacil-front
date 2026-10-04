import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/o-que-e-espelho-de-ponto — sem import do post completo. */
export const path = "/blog/o-que-e-espelho-de-ponto";
export const jsonLd = articleJsonLd({
  path: "/blog/o-que-e-espelho-de-ponto",
  title: "O que é espelho de ponto?",
  description: "O que é espelho de ponto: relatório de jornada, Espelho de Ponto Eletrônico na Portaria 671, diferença para marcação e comprovante, AEJ e acesso do trabalhador.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O que é espelho de ponto?", a: "É o relatório que reúne as informações da jornada do trabalhador, incluindo as marcações realizadas e os dados tratados pelo sistema." }, { q: "O que aparece no espelho de ponto?", a: "Entre as informações mínimas estão a identificação do empregador, identificação do trabalhador, período do relatório, jornada contratual, marcações efetuadas e tratadas e duração das jornadas realizadas." }, { q: "O funcionário tem direito ao espelho de ponto?", a: "O trabalhador deve ter acesso às informações constantes do Espelho de Ponto Eletrônico por meio de sistema informatizado, mensalmente de forma eletrônica ou impressa, ou em prazo inferior, conforme a Portaria 671." }, { q: "Espelho de ponto é a mesma coisa que cartão de ponto?", a: "Não exatamente. O cartão ou registro de ponto contém as marcações realizadas. O espelho de ponto é o relatório que reúne e apresenta as informações da jornada após o tratamento dos registros." }, { q: "O espelho de ponto pode ser digital?", a: "Sim. O acesso pode ser disponibilizado por meio de sistema informatizado." }, { q: "Quem gera o espelho de ponto?", a: "O Programa de Tratamento de Registro de Ponto é responsável por gerar o relatório Espelho de Ponto Eletrônico." }, { q: "O espelho de ponto precisa ter assinatura?", a: "A necessidade e a forma de assinatura devem ser analisadas conforme o sistema utilizado e as regras aplicáveis. A Portaria 671 estabelece os requisitos mínimos do relatório e as regras para os documentos eletrônicos do sistema." }],
  aboutIds: ["espelhoDePonto", "portaria671"],
  mentionIds: ["afd", "aej", "comprovanteDePonto"],
  relatedArticlePaths: [
    "/blog/o-que-e-afd-e-aej",
    "/blog/como-fechar-o-ponto-do-mes",
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
  ],
});
