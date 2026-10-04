// intent: ponto eletrônico para call center , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaCallCenterContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaCallCenter,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para call center",
  },
  opening: [
    "Quando a operação roda em turnos e metas de atendimento, acompanhar a jornada dos agentes pode se espalhar entre escala do supervisor, planilha do RH e login no discador.",
    "Intervalo, hora extra e cobertura de pico precisam aparecer no espelho. Sem isso, a folha depende de informação atrasada ou incompleta.",
    "Com o SegPonto, o call center organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada da operação de atendimento",
      variant: "white",
      paragraphs: [
        "Cadastre e organize agentes, supervisores e backoffice. Vincule funcionários à fila ou ao site e acompanhe os registros de ponto por operação.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo supervisor ou pelo RH.",
      ],
      bullets: [
        "Cadastre turnos e escalas por campanha",
        "Vincule funcionários à fila ou ao site",
        "Acompanhe registros por operação",
        "Consulte atrasos, extras e banco de horas",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e acertos informais",
        "Facilite o acompanhamento do supervisor e do RH",
      ],
    },
    {
      title: "Para operações de atendimento diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende contact centers com desenhos distintos.",
      ],
      subsections: [
        {
          title: "Inbound e SAC",
          paragraphs: [
            "Controle turnos contínuos e intervalos sem misturar o login do discador com o espelho de jornada.",
          ],
        },
        {
          title: "Outbound e vendas",
          paragraphs: [
            "Organize equipes por campanha, com horários e metas de presença claros no ponto.",
          ],
        },
        {
          title: "Home office e híbrido",
          paragraphs: [
            "Cadastre o regime remoto e registre batidas com a política de localização que a operação definir.",
          ],
        },
        {
          title: "Multisite",
          paragraphs: [
            "Acompanhe vários sites no mesmo sistema, com registros por unidade e visão centralizada.",
          ],
        },
      ],
    },
    {
      title: "Cada site organizado. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine uma operação com dois sites e uma equipe remota.",
        "Em vez de reunir planilhas de cada supervisor, o responsável consulta os registros de cada site no mesmo ambiente.",
        "Site → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por operação",
      variant: "canvas",
      paragraphs: [
        "Cada campanha ou site mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual fila a pessoa está cadastrada, conferir o turno e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos login misturado com ponto",
      variant: "white",
      paragraphs: [
        "Planilha e horário do discador podem parecer suficientes no começo.",
        "Conforme a operação cresce, aparecem informações espalhadas, intervalo sem lançamento, dificuldade para conferir extras e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre supervisores",
        "Login no discador misturado com jornada",
        "Dificuldade para conferir intervalo e extras",
        "Alterações manuais sem trilha",
        "Perda de histórico na troca de turno",
      ],
    },
    {
      title: "Comece por um site e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com um site e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas campanhas, unidades e gestores conforme o atendimento aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do seu call center.",
        "No SegPonto, o call center opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, home office e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em call center",
    items: [
      {
        q: "O login no discador substitui o ponto?",
        a: "Não. O discador mede disponibilidade na fila. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Dá para separar sites e campanhas?",
        a: "Sim. Organize por unidade ou operação e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Home office entra no sistema?",
        a: "Sim. Cadastre o regime acordado e a política de batida. Veja também a página de home office.",
      },
      {
        q: "Intervalos entram no espelho?",
        a: "Sim. Cadastre os turnos reais e confira intervalos, extras e coberturas no mesmo painel.",
      },
      {
        q: "Como começar?",
        a: "Escolha um site piloto, treine supervisores, feche um espelho com o RH e só então estenda às demais operações.",
      },
    ],
  },
  related: [
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Home office", to: "/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
