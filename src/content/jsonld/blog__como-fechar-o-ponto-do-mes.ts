import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-fechar-o-ponto-do-mes — sem import do post completo. */
export const path = "/blog/como-fechar-o-ponto-do-mes";
export const jsonLd = articleJsonLd({
  path: "/blog/como-fechar-o-ponto-do-mes",
  title: "Como fechar o ponto do mês",
  description: "Como fechar o ponto do mês passo a passo: período de apuração, marcações faltantes, horas extras, banco de horas, Espelho de Ponto e envio para a folha.",
  publishedAt: "2026-09-08",
  updatedAt: "2026-09-18",
  faqs: [{ q: "Qual é a data de fechamento do ponto?", a: "Não existe uma única data para todas as empresas. A data depende do período de apuração utilizado pela empresa e pode ser definida antes do fim do mês." }, { q: "Posso fechar o ponto no dia 20?", a: "Sim, desde que o período de apuração adotado pela empresa termine nessa data e as regras aplicáveis sejam observadas." }, { q: "O ponto pode ser fechado antes do fim do mês?", a: "Sim. O fechamento antecipado pode ser utilizado para permitir o processamento da folha, desde que a empresa tenha um período de apuração definido." }, { q: "O que acontece com uma hora extra feita depois do fechamento?", a: "Ela será considerada no período de apuração seguinte, caso tenha sido realizada depois do encerramento da competência anterior." }, { q: "O que precisa conferir antes de fechar o ponto?", a: "Principalmente marcações incompletas, horas extras, atrasos, faltas, intervalos, banco de horas, férias, afastamentos e demais ocorrências que alterem a apuração da jornada." }, { q: "Fechar o ponto é o mesmo que fechar a folha?", a: "Não. O fechamento do ponto encerra a apuração da jornada. A folha de pagamento utiliza essas informações junto aos demais dados necessários para calcular a remuneração." }, { q: "O sistema pode alterar uma marcação para fechar o ponto?", a: "O tratamento do ponto não deve ser utilizado para alterar livremente as marcações originais. A Portaria 671 estabelece que o tratamento se limite a complementar omissões e tratar situações previstas na norma." }],
  aboutIds: ["espelhoDePonto", "controleDeJornada"],
  mentionIds: ["horaExtra", "bancoDeHoras", "folhaDePagamento", "portaria671"],
  relatedArticlePaths: [
    "/blog/o-que-e-espelho-de-ponto",
    "/blog/como-calcular-folha-de-pagamento",
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
  ],
});
