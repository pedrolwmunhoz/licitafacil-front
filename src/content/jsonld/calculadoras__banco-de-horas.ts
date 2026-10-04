import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/banco-de-horas */
export const path = "/calculadoras/banco-de-horas";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/banco-de-horas",
  title: "Calculadora de banco de horas | SegPonto",
  description: "Calculadora de banco de horas: créditos, débitos, fator de conversão e saldo estimado para conferir com o acordo da empresa.",
  faqs: [{ q: "Posso usar banco sem acordo?", a: "Na prática o banco precisa de lastro em acordo. Sem isso, o caminho usual é pagar hora extra." }, { q: "O fator 1,5 é obrigatório?", a: "Não. Depende do que estiver escrito no acordo ou convenção. A ferramenta só multiplica o que você informar." }, { q: "Saldo negativo significa o quê?", a: "Que há mais débito que crédito no período informado — a pessoa 'deve' horas ao banco, conforme a política." }, { q: "Isso substitui o módulo de banco do SegPonto?", a: "Não. É estimativa. O produto mantém o saldo operacional por colaborador no painel." }],
  aboutIds: ["bancoDeHoras"],
  mentionIds: ["horaExtra", "controleDeJornada"],
  relatedArticlePaths: [
    "/blog/como-funciona-o-banco-de-horas-na-pratica",
    "/blog/como-calcular-hora-extra",
  ],
});
