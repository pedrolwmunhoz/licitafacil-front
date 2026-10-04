// intent: ponto eletrônico para hotéis , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaHoteisContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaHoteis,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para hotéis",
  },
  opening: [
    "Quando o hotel opera em turnos contínuos, acompanhar a jornada de recepção, governança, A&B e manutenção pode se espalhar entre escala impressa, planilha do RH e mensagens do supervisor.",
    "Troca de turno, adicional noturno e cobertura de folga precisam aparecer no espelho. Sem isso, o fechamento depende de informação atrasada ou incompleta.",
    "Com o SegPonto, o hotel organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada das áreas do hotel",
      variant: "white",
      paragraphs: [
        "Cadastre e organize recepção, governança, A&B e manutenção. Vincule funcionários a cada área e acompanhe os registros de ponto por setor.",
        "Consulte atrasos, faltas, horas extras e adicional noturno. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou pelo RH.",
      ],
      bullets: [
        "Cadastre turnos diurnos, noturnos e folgas",
        "Vincule funcionários à área ou ao setor",
        "Acompanhe registros por departamento",
        "Consulte atrasos, extras e noturno",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e escalas só no papel",
        "Facilite o acompanhamento do gestor de cada área",
      ],
    },
    {
      title: "Para hotéis com operações diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende propriedades com desenhos distintos de equipe.",
      ],
      subsections: [
        {
          title: "Hotel urbano",
          paragraphs: [
            "Controle recepção 24 horas, governança diurna e manutenção sem misturar os espelhos de cada setor.",
          ],
        },
        {
          title: "Resort e hotel de lazer",
          paragraphs: [
            "Organize equipes maiores, sazonalidade e turnos de A&B junto com hospedagem.",
          ],
        },
        {
          title: "Pousada e boutique",
          paragraphs: [
            "Centralize uma equipe enxuta com funções cruzadas e espelho claro para o contador.",
          ],
        },
        {
          title: "Rede hoteleira",
          paragraphs: [
            "Acompanhe várias propriedades no mesmo sistema, com registros por hotel e visão centralizada.",
          ],
        },
      ],
    },
    {
      title: "Cada setor organizado. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine um hotel com recepção, governança e restaurante.",
        "Em vez de reunir planilhas de cada supervisor, o responsável consulta os registros de cada área no mesmo ambiente.",
        "Setor → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por área",
      variant: "canvas",
      paragraphs: [
        "Cada departamento mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual setor a pessoa está cadastrada, conferir o turno e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos escala só no papel",
      variant: "white",
      paragraphs: [
        "Planilha e escala impressa podem parecer suficientes no começo.",
        "Conforme a ocupação sobe, aparecem informações espalhadas, cobertura sem lançamento, dificuldade para conferir noturno e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre setores",
        "Cobertura de folga sem registro",
        "Dificuldade para conferir noturno e extras",
        "Alterações manuais sem trilha",
        "Perda de histórico na troca de turno",
      ],
    },
    {
      title: "Comece por um setor e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com um setor e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas áreas, propriedades e gestores conforme o hotel aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do seu hotel.",
        "No SegPonto, o hotel opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, ponto offline e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em hotéis",
    items: [
      {
        q: "O PMS substitui o ponto?",
        a: "Não. O PMS cuida da hospedagem. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Dá para separar recepção e governança?",
        a: "Sim. Organize por área ou setor e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Serve para rede com vários hotéis?",
        a: "Sim. Cadastre cada propriedade, vincule a equipe e acompanhe unidade a unidade com visão centralizada.",
      },
      {
        q: "Noturno e cobertura entram no espelho?",
        a: "Sim. Cadastre os turnos reais e confira adicional noturno, extras e coberturas no mesmo painel.",
      },
      {
        q: "Como começar?",
        a: "Escolha um setor piloto, treine a equipe, feche um espelho com o RH e só então estenda às demais áreas.",
      },
    ],
  },
  related: [
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Ponto offline", to: "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
