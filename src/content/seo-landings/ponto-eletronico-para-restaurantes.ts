// intent: ponto eletrônico para restaurantes, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaRestaurantesContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaRestaurantes,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para restaurantes",
  },
  opening: [
    "Quando o restaurante opera com salão, cozinha e turnos que mudam no fim de semana, acompanhar a jornada pode rapidamente virar uma operação difícil de controlar.",
    "Um turno registra o ponto de um jeito, outro depende de escala no papel e o responsável pela administração precisa juntar planilhas e mensagens para fechar o mês.",
    "Com o SegPonto, o restaurante pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada do salão e da cozinha",
      variant: "white",
      paragraphs: [
        "Cadastre e organize garçons, cozinha, caixa e apoio. Vincule funcionários aos turnos certos e acompanhe os registros de ponto por área.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou administrador.",
      ],
      bullets: [
        "Cadastre e organize salão e cozinha",
        "Vincule funcionários aos turnos",
        "Acompanhe registros de ponto por área",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para restaurantes com operações diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por casas com diferentes estruturas de serviço.",
      ],
      subsections: [
        {
          title: "Restaurante à la carte",
          paragraphs: [
            "Controle salão e cozinha com turnos de almoço e jantar sem misturar a comanda com o espelho de jornada.",
          ],
        },
        {
          title: "Fast food e quiosque",
          paragraphs: [
            "Acompanhe equipes em horários curtos, picos e finais de semana com registros claros por unidade.",
          ],
        },
        {
          title: "Bar e casa noturna",
          paragraphs: [
            "Organize turnos noturnos, adicional e cobertura sem depender só da escala impressa.",
          ],
        },
        {
          title: "Rede e franquia de alimentação",
          paragraphs: [
            "Centralize os registros de várias unidades no mesmo sistema, sem misturar os espelhos entre lojas.",
          ],
        },
      ],
    },
    {
      title: "Cada unidade organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma rede com 12 restaurantes.",
        "Em vez de manter 12 planilhas diferentes ou depender de informações enviadas individualmente por cada gerente, o responsável pela rede consegue consultar os registros de cada unidade dentro do mesmo sistema.",
        "Unidade → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a rede cresce.",
      ],
    },
    {
      title: "Controle por unidade",
      variant: "canvas",
      paragraphs: [
        "Cada restaurante possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da rede, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas podem funcionar quando existe apenas uma casa pequena.",
        "Conforme o restaurante cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
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
      title: "Seu restaurante crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma unidade e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas unidades, funcionários e gestores conforme a rede aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do seu restaurante.",
        "No SegPonto, o restaurante opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também franquias, escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em restaurantes",
    items: [
      {
        q: "Posso gerenciar várias casas no mesmo sistema?",
        a: "Sim. Cadastre múltiplas unidades, vincule os funcionários a cada restaurante e consulte os registros por casa, com visão centralizada para o administrador.",
      },
      {
        q: "Os registros de uma unidade se misturam com os de outra?",
        a: "Não. Cada restaurante mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta unidade a unidade sem misturar os espelhos.",
      },
      {
        q: "Serve para salão, cozinha e bar?",
        a: "Sim. O mesmo sistema atende salão, cozinha, caixa, bar e redes de alimentação com turnos diferentes.",
      },
      {
        q: "Preciso começar com todas as unidades de uma vez?",
        a: "Não. Você pode começar com uma casa e adicionar novas unidades, funcionários e gestores conforme a rede cresce.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a primeira unidade, vincule a equipe, rode o ponto nessa casa e só então estenda às demais. Confira preços e a página de como implantar.",
      },
    ],
  },
  related: [
    { label: "Franquias", to: "/ponto-eletronico-para-franquias" },
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
