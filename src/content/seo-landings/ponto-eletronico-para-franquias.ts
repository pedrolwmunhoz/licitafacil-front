// intent: ponto eletrônico para franquias , texto de produto / rede multiunidade
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaFranquiasContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaFranquias,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para franquias",
  },
  opening: [
    "Quando uma empresa possui várias unidades, acompanhar a jornada dos funcionários pode rapidamente virar uma operação difícil de controlar.",
    "Uma unidade registra o ponto de uma forma, outra possui funcionários com horários diferentes e o responsável pela administração precisa acessar várias contas ou planilhas para descobrir o que está acontecendo.",
    "Com o SegPonto, sua rede pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada da sua rede",
      variant: "white",
      paragraphs: [
        "Cadastre e organize múltiplas unidades. Vincule funcionários às respectivas franquias e acompanhe os registros de ponto por unidade.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou administrador.",
      ],
      bullets: [
        "Cadastre e organize múltiplas unidades",
        "Vincule funcionários às respectivas franquias",
        "Acompanhe registros de ponto por unidade",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para franquias que precisam controlar várias unidades",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por redes com diferentes estruturas de operação.",
      ],
      subsections: [
        {
          title: "Franquias de alimentação",
          paragraphs: [
            "Controle equipes que trabalham em restaurantes, lanchonetes, cafeterias e operações com diferentes turnos.",
          ],
        },
        {
          title: "Lojas e varejo",
          paragraphs: [
            "Acompanhe a jornada dos funcionários de cada loja sem misturar os registros entre unidades.",
          ],
        },
        {
          title: "Academias e studios",
          paragraphs: [
            "Organize equipes que trabalham em horários e unidades diferentes.",
          ],
        },
        {
          title: "Clínicas e serviços",
          paragraphs: [
            "Centralize os registros de profissionais e funcionários distribuídos pela rede.",
          ],
        },
      ],
    },
    {
      title: "Cada unidade organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma rede com 15 franquias.",
        "Em vez de manter 15 planilhas diferentes ou depender de informações enviadas individualmente por cada gerente, o responsável pela rede consegue consultar os registros de cada unidade dentro do mesmo sistema.",
        "Unidade → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a rede cresce.",
      ],
    },
    {
      title: "Controle por unidade",
      variant: "canvas",
      paragraphs: [
        "Cada franquia possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da sua rede, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas podem funcionar quando existe apenas uma pequena equipe.",
        "Conforme a franquia cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
        "O ponto eletrônico centralizado reduz esse trabalho operacional e deixa as informações organizadas em um único ambiente.",
      ],
      bullets: [
        "Informações espalhadas",
        "Registros duplicados",
        "Dificuldade para conferir horas",
        "Alterações manuais",
        "Perda de histórico",
        "Gestores enviando informações por diferentes canais",
      ],
    },
    {
      title: "Sua rede crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma unidade e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas unidades, funcionários e gestores conforme sua rede aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua franquia.",
        "No SegPonto, a franquia opera em REP-P, com aplicativo e painel por unidade na faixa por número de ativos. Veja também varejo, escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em franquias",
    items: [
      {
        q: "Posso gerenciar várias lojas no mesmo sistema?",
        a: "Sim. Cadastre múltiplas unidades, vincule os funcionários a cada franquia e consulte os registros por loja, com visão centralizada para o administrador da rede.",
      },
      {
        q: "Os registros de uma loja se misturam com os de outra?",
        a: "Não. Cada franquia mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta unidade a unidade sem misturar os espelhos.",
      },
      {
        q: "Serve para alimentação, varejo e academias?",
        a: "Sim. O mesmo sistema atende redes com turnos diferentes: restaurantes e lanchonetes, lojas, academias, clínicas e outros serviços distribuídos.",
      },
      {
        q: "Preciso começar com todas as unidades de uma vez?",
        a: "Não. Você pode começar com uma unidade e adicionar novas franquias, funcionários e gestores conforme a rede cresce.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a primeira unidade, vincule a equipe, rode o ponto nessa loja e só então estenda às demais. Confira preços e a página de como implantar.",
      },
    ],
  },
  related: [
    { label: "Varejo", to: "/ponto-eletronico-para-varejo" },
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
