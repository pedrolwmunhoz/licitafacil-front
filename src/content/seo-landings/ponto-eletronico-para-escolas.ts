// intent: ponto eletrônico para escolas , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaEscolasContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaEscolas,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para escolas",
  },
  opening: [
    "Quando a escola mistura docentes, coordenação e equipe de apoio, acompanhar a jornada pode se espalhar entre diário de classe, planilha da secretaria e mensagem no grupo.",
    "Horário de aula, plantão pedagógico e cobertura de falta precisam aparecer no espelho. Sem isso, a folha depende de informação atrasada ou incompleta.",
    "Com o SegPonto, a escola organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada da equipe escolar",
      variant: "white",
      paragraphs: [
        "Cadastre e organize professores CLT, coordenação, secretaria e apoio. Vincule funcionários ao turno ou ao campus e acompanhe os registros de ponto por área.",
        "Consulte atrasos, faltas, horas extras e substituições. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento da direção ou do RH.",
      ],
      bullets: [
        "Cadastre horários e turnos por função",
        "Vincule funcionários ao turno ou ao campus",
        "Acompanhe registros por área",
        "Consulte atrasos, extras e substituições",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e acertos informais",
        "Facilite o acompanhamento da direção ou do RH",
      ],
    },
    {
      title: "Para escolas com estruturas diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende instituições com desenhos distintos de equipe.",
      ],
      subsections: [
        {
          title: "Escola particular",
          paragraphs: [
            "Controle docentes CLT, secretaria e apoio com espelho mensal para o contador.",
          ],
        },
        {
          title: "Colégio multiunidade",
          paragraphs: [
            "Acompanhe vários campi no mesmo sistema, com registros por unidade e visão centralizada.",
          ],
        },
        {
          title: "Curso livre e idioma",
          paragraphs: [
            "Organize turnos noturnos e finais de semana sem misturar a agenda de turma com a jornada.",
          ],
        },
        {
          title: "Creche e educação infantil",
          paragraphs: [
            "Cadastre escalas de berçário e apoio com intervalos claros e cobertura de falta registrada.",
          ],
        },
      ],
    },
    {
      title: "Cada turno organizado. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine um colégio com manhã, tarde e noite.",
        "Em vez de reunir planilhas de cada coordenador, o responsável consulta os registros de cada turno no mesmo ambiente.",
        "Turno → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por unidade ou turno",
      variant: "canvas",
      paragraphs: [
        "Cada campus ou turno mantém seus funcionários e suas marcações.",
        "Fica mais simples saber onde a pessoa está cadastrada, conferir o horário e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos diário misturado com ponto",
      variant: "white",
      paragraphs: [
        "Planilha e diário de classe podem parecer suficientes no começo.",
        "Conforme a escola cresce, aparecem informações espalhadas, substituição sem lançamento, dificuldade para conferir extras e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre secretaria e coordenação",
        "Diário de classe misturado com jornada",
        "Dificuldade para conferir substituição e extras",
        "Alterações manuais sem trilha",
        "Perda de histórico na troca de professor",
      ],
    },
    {
      title: "Comece por um turno e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com um turno e estruturar o sistema para acompanhar o crescimento da escola.",
        "Adicione novos campi, funções e gestores conforme a operação aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua escola.",
        "No SegPonto, a escola opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, ponto offline e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em escolas",
    items: [
      {
        q: "O diário de classe substitui o ponto?",
        a: "Não. O diário registra aula e frequência escolar. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Professor CLT precisa bater ponto?",
        a: "Em regra, empregado CLT no estabelecimento com dever de anotação entra no controle de jornada. Confirme CCT e enquadramento com o jurídico.",
      },
      {
        q: "Serve para colégio com vários campi?",
        a: "Sim. Cadastre cada unidade, vincule a equipe e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Substituição entra no espelho?",
        a: "Sim. Lance a cobertura no sistema para o fechamento refletir o horário real.",
      },
      {
        q: "Como começar?",
        a: "Cadastre secretaria e apoio, rode um mês piloto, feche o espelho com o RH e só então estenda aos demais turnos.",
      },
    ],
  },
  related: [
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
    { label: "Franquias", to: "/ponto-eletronico-para-franquias" },
  ],
};
