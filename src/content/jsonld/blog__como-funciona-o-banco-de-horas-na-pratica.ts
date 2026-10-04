import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/como-funciona-o-banco-de-horas-na-pratica — sem import do post completo. */
export const path = "/blog/como-funciona-o-banco-de-horas-na-pratica";
export const jsonLd = articleJsonLd({
  path: "/blog/como-funciona-o-banco-de-horas-na-pratica",
  title: "Como funciona o banco de horas na prática",
  description: "Como funciona o banco de horas na prática: saldo positivo e negativo, cálculo, prazos da CLT, hora extra, atrasos e controle no ponto eletrônico.",
  publishedAt: "2026-06-15",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O que é banco de horas?", a: "É um regime de compensação de jornada em que determinadas horas trabalhadas além ou aquém da jornada podem gerar créditos ou débitos para compensação posterior." }, { q: "Banco de horas paga hora extra?", a: "As horas submetidas validamente ao banco podem ser compensadas em vez de serem imediatamente pagas como horas extras. As regras dependem do regime de compensação adotado." }, { q: "Quanto tempo dura o banco de horas?", a: "Depende da forma de instituição. Pela CLT, pode haver compensação em até 1 ano por negociação coletiva ou até 6 meses por acordo individual escrito. Também existe a compensação dentro do mesmo mês." }, { q: "Posso usar banco de horas para sair mais cedo?", a: "Sim, desde que a compensação esteja de acordo com as regras do banco de horas." }, { q: "Posso usar banco de horas para chegar mais tarde?", a: "Pode ser possível, desde que a compensação esteja prevista ou autorizada pelo regime adotado." }, { q: "Banco de horas pode gerar folga?", a: "Sim. As horas acumuladas podem ser utilizadas para compensar períodos de descanso, conforme as regras estabelecidas." }, { q: "Banco de horas pode ficar negativo?", a: "Pode haver saldo negativo, mas o tratamento desse saldo depende das regras do banco e da situação que gerou o débito." }, { q: "O que acontece com o banco de horas na demissão?", a: "As horas extraordinárias não compensadas devem ser pagas na rescisão, conforme o artigo 59 da CLT." }, { q: "O banco de horas precisa ser controlado no ponto eletrônico?", a: "Quando a empresa utiliza registro eletrônico, as movimentações do banco podem ser tratadas pelo sistema de ponto, respeitando as regras da Portaria 671 e a fidelidade das marcações." }],
  aboutIds: ["bancoDeHoras", "horaExtra"],
  mentionIds: ["controleDeJornada", "portaria671"],
  relatedArticlePaths: [
    "/blog/como-calcular-hora-extra",
    "/blog/como-fechar-o-ponto-do-mes",
  ],
});
