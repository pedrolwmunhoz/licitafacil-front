// intent: ponto eletrônico para construção, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaConstrucaoContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaConstrucao,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para construção",
  },
  opening: [
    "Quando a obra muda de endereço e o sinal falha, acompanhar a jornada de pedreiros, oficiais e encarregados pode rapidamente virar uma operação difícil de controlar.",
    "Um canteiro registra o ponto de um jeito, outro depende do caderno do encarregado e o responsável pela administração precisa juntar planilhas e mensagens para fechar o mês.",
    "Com o SegPonto, a construtora pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada dos canteiros",
      variant: "white",
      paragraphs: [
        "Cadastre e organize múltiplas obras. Vincule funcionários aos respectivos canteiros e acompanhe os registros de ponto por obra.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou administrador.",
      ],
      bullets: [
        "Cadastre e organize múltiplas obras",
        "Vincule funcionários aos respectivos canteiros",
        "Acompanhe registros de ponto por obra",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas e caderno",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para construtoras que precisam controlar várias obras",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por empresas com diferentes estruturas de canteiro.",
      ],
      subsections: [
        {
          title: "Obra residencial",
          paragraphs: [
            "Controle equipes de pedreiros, oficiais e ajudantes com batida no aplicativo mesmo quando o sinal oscila.",
          ],
        },
        {
          title: "Obra comercial e industrial",
          paragraphs: [
            "Acompanhe turnos longos, concretagem e extras sem misturar diário de obra com espelho CLT.",
          ],
        },
        {
          title: "Reforma e manutenção predial",
          paragraphs: [
            "Organize equipes que mudam de endereço com frequência, mantendo o histórico por obra.",
          ],
        },
        {
          title: "Sede e escritório técnico",
          paragraphs: [
            "Centralize administrativo e engenharia no mesmo sistema das obras, com registros separados.",
          ],
        },
      ],
    },
    {
      title: "Cada obra organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma construtora com 10 canteiros.",
        "Em vez de manter 10 planilhas diferentes ou depender de informações enviadas individualmente por cada encarregado, o responsável pela operação consegue consultar os registros de cada obra dentro do mesmo sistema.",
        "Obra → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme o portfólio cresce.",
      ],
    },
    {
      title: "Controle por obra",
      variant: "canvas",
      paragraphs: [
        "Cada canteiro possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação das obras, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas e caderno do encarregado podem funcionar quando existe apenas uma obra pequena.",
        "Conforme a construtora cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
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
      title: "Suas obras crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma obra e estruturar o sistema para acompanhar o crescimento do portfólio.",
        "Adicione novos canteiros, funcionários e gestores conforme a operação aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua construção.",
        "No SegPonto, a construção opera em REP-P, com aplicativo, ponto offline e geolocalização quando a política pedir. Veja também escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em construção",
    items: [
      {
        q: "Posso gerenciar várias obras no mesmo sistema?",
        a: "Sim. Cadastre múltiplos canteiros, vincule os funcionários a cada obra e consulte os registros por unidade, com visão centralizada para o administrador.",
      },
      {
        q: "Os registros de uma obra se misturam com os de outra?",
        a: "Não. Cada canteiro mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta obra a obra sem misturar os espelhos.",
      },
      {
        q: "E se o canteiro ficar sem sinal?",
        a: "Use ponto offline: a batida grava no aparelho e sincroniza quando a conexão voltar. Confira a página de ponto offline.",
      },
      {
        q: "Preciso começar com todas as obras de uma vez?",
        a: "Não. Você pode começar com uma obra piloto e adicionar novos canteiros, funcionários e gestores conforme o portfólio cresce.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a primeira obra, vincule a equipe, rode o ponto nesse canteiro e só então estenda às demais. Confira preços e a página de como implantar.",
      },
    ],
  },
  related: [
    { label: "Ponto offline", to: "/blog/ponto-eletronico-offline-como-funciona-quando-nao-ha-internet" },
    { label: "Geolocalização", to: "/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
