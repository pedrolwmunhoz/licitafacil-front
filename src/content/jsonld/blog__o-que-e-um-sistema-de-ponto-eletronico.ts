import { articleJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /blog/o-que-e-um-sistema-de-ponto-eletronico — sem import do post completo. */
export const path = "/blog/o-que-e-um-sistema-de-ponto-eletronico";
export const jsonLd = articleJsonLd({
  path: "/blog/o-que-e-um-sistema-de-ponto-eletronico",
  title: "O que é um sistema de ponto eletrônico?",
  description: "O que é um sistema de ponto eletrônico: como funciona, Portaria 671 (REP-C, REP-A e REP-P), ponto pelo celular, espelho, AEJ, comprovante e o que verificar antes de contratar.",
  publishedAt: "2026-09-18",
  updatedAt: "2026-09-18",
  faqs: [{ q: "O que é sistema de ponto eletrônico?", a: "É um conjunto de equipamentos e programas utilizado para registrar eletronicamente a jornada de trabalho dos funcionários." }, { q: "Como funciona o ponto eletrônico?", a: "O funcionário realiza a marcação, o sistema registra e armazena a informação e posteriormente os dados podem ser tratados para gerar relatórios e documentos de jornada." }, { q: "Sistema de ponto eletrônico é obrigatório?", a: "Não. A jornada pode ser registrada por meio manual, mecânico ou eletrônico. A obrigatoriedade é de registrar a jornada quando a legislação exigir, mas isso não significa que o registro precise ser eletrônico." }, { q: "Ponto pelo celular é ponto eletrônico?", a: "Pode ser. Soluções baseadas em celular podem fazer parte de um sistema REP-P, desde que atendam aos requisitos aplicáveis." }, { q: "Qual a diferença entre REP-P e ponto eletrônico?", a: "O REP-P é uma das modalidades de sistema de registro eletrônico de ponto previstas pela Portaria 671. Um sistema de ponto eletrônico pode utilizar REP-C, REP-A ou REP-P." }, { q: "O ponto eletrônico pode ser usado pelo celular?", a: "Sim. O MTE reconhece a utilização de tecnologias de marcação mobile no contexto do REP-P." }, { q: "O sistema de ponto pode apagar uma marcação?", a: "O sistema não pode possuir mecanismos que permitam alterar indevidamente os dados registrados pelo empregado. O tratamento das informações deve seguir as regras estabelecidas para o registro eletrônico de ponto." }, { q: "O sistema de ponto eletrônico precisa ter comprovante?", a: "Sim. O REP-C e o REP-P devem emitir ou disponibilizar acesso ao comprovante de registro de ponto, conforme as regras da Portaria 671." }],
  aboutIds: ["pontoEletronico", "portaria671"],
  mentionIds: ["repP", "espelhoDePonto", "comprovanteDePonto"],
  relatedArticlePaths: [
    "/blog/portaria-671-o-que-e-requisitos-e-regras-para-o-ponto-eletronico",
    "/blog/rep-c-rep-a-e-rep-p-entenda-as-diferencas",
    "/blog/o-que-e-espelho-de-ponto",
  ],
});
