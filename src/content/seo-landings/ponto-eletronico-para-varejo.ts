// intent: ponto eletrônico para varejo, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaVarejoContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaVarejo,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para varejo",
  },
  opening: [
    "Quando a loja opera com caixa, estoque e finais de semana cheios, acompanhar a jornada pode rapidamente virar uma operação difícil de controlar.",
    "Uma unidade registra o ponto de um jeito, outra depende de planilha do gerente e o responsável pela administração precisa acessar várias fontes para descobrir o que está acontecendo.",
    "Com o SegPonto, a rede de varejo pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada das lojas",
      variant: "white",
      paragraphs: [
        "Cadastre e organize múltiplas lojas. Vincule funcionários às respectivas unidades e acompanhe os registros de ponto por loja.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou administrador.",
      ],
      bullets: [
        "Cadastre e organize múltiplas lojas",
        "Vincule funcionários às respectivas unidades",
        "Acompanhe registros de ponto por loja",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para varejos que precisam controlar várias lojas",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por redes com diferentes estruturas de operação.",
      ],
      subsections: [
        {
          title: "Loja de rua e shopping",
          paragraphs: [
            "Controle equipes de caixa, estoque e atendimento com turnos, sábados e feriados claros no espelho.",
          ],
        },
        {
          title: "Supermercado e atacado",
          paragraphs: [
            "Acompanhe setores e turnos longos sem misturar o relatório de vendas com a jornada CLT.",
          ],
        },
        {
          title: "E-commerce e estoque",
          paragraphs: [
            "Organize picking, packing e expedição com horários e extras lançados no mesmo painel.",
          ],
        },
        {
          title: "Rede multiunidade",
          paragraphs: [
            "Centralize os registros de várias lojas no mesmo sistema, sem misturar os espelhos entre unidades.",
          ],
        },
      ],
    },
    {
      title: "Cada loja organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma rede com 20 lojas.",
        "Em vez de manter 20 planilhas diferentes ou depender de informações enviadas individualmente por cada gerente, o responsável pela rede consegue consultar os registros de cada unidade dentro do mesmo sistema.",
        "Loja → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a rede cresce.",
      ],
    },
    {
      title: "Controle por loja",
      variant: "canvas",
      paragraphs: [
        "Cada loja possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da rede, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas podem funcionar quando existe apenas uma loja pequena.",
        "Conforme o varejo cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
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
        "Você pode começar com uma loja e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas lojas, funcionários e gestores conforme a rede aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do seu varejo.",
        "No SegPonto, o varejo opera em REP-P, com aplicativo e painel por unidade na faixa por número de ativos. Veja também franquias, escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em varejo",
    items: [
      {
        q: "Posso gerenciar várias lojas no mesmo sistema?",
        a: "Sim. Cadastre múltiplas unidades, vincule os funcionários a cada loja e consulte os registros por unidade, com visão centralizada para o administrador da rede.",
      },
      {
        q: "Os registros de uma loja se misturam com os de outra?",
        a: "Não. Cada loja mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta unidade a unidade sem misturar os espelhos.",
      },
      {
        q: "Serve para shopping, supermercado e e-commerce?",
        a: "Sim. O mesmo sistema atende loja de rua, shopping, supermercado, atacado e operação de estoque com turnos diferentes.",
      },
      {
        q: "Preciso começar com todas as lojas de uma vez?",
        a: "Não. Você pode começar com uma loja e adicionar novas unidades, funcionários e gestores conforme a rede cresce.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a primeira loja, vincule a equipe, rode o ponto nessa unidade e só então estenda às demais. Confira preços e a página de como implantar.",
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
