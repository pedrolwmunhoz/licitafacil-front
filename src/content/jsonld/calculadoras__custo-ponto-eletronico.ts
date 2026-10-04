import { calculatorJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /calculadoras/custo-ponto-eletronico */
export const path = "/calculadoras/custo-ponto-eletronico";
export const jsonLd = calculatorJsonLd({
  path: "/calculadoras/custo-ponto-eletronico",
  title: "Calculadora de custo de ponto eletrônico | SegPonto",
  description: "Estime o custo mensal e anual do SegPonto por número de funcionários e compare com o custo oculto da planilha.",
  faqs: [{ q: "Os valores mudam?", a: "A fonte oficial é a página de preços. Se a tabela mudar, atualizamos lá e nesta estimativa." }, { q: "Tem taxa de implantação?", a: "A contratação é self-serve no cartão. Veja condições atuais em /precos e /cadastro." }, { q: "App está incluso?", a: "Sim: painel web e app do colaborador entram na assinatura da faixa." }, { q: "E se eu crescer de faixa?", a: "Você sobe para o plano que comporta o novo headcount. A calculadora ajuda a antecipar o salto." }],
  aboutIds: ["pontoEletronico"],
  mentionIds: ["controleDeJornada"],
  relatedArticlePaths: [
    "/blog/quanto-custa-um-sistema-de-ponto-eletronico",
    "/blog/como-escolher-um-sistema-de-ponto-eletronico-para-pequenas-empresas",
  ],
});
