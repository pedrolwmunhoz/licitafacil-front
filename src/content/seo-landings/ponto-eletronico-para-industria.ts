// intent: ponto eletrônico para indústria, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaIndustriaContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaIndustria,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para indústria",
  },
  opening: [
    "Quando a planta opera em turnos, acompanhar a jornada de produção, manutenção e administrativo pode rapidamente virar uma operação difícil de controlar.",
    "Um setor registra o ponto de um jeito, outro depende de planilha do encarregado e o responsável pela administração precisa acessar várias fontes para descobrir o que está acontecendo.",
    "Com o SegPonto, a indústria pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada da planta",
      variant: "white",
      paragraphs: [
        "Cadastre e organize setores, turnos e equipes. Vincule funcionários à área certa e acompanhe os registros de ponto por setor.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou pelo RH.",
      ],
      bullets: [
        "Cadastre e organize setores e turnos",
        "Vincule funcionários à respectiva área",
        "Acompanhe registros de ponto por setor",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para indústrias com operações diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por plantas com diferentes estruturas de produção.",
      ],
      subsections: [
        {
          title: "Produção em turnos",
          paragraphs: [
            "Controle equipes de manhã, tarde e noite com troca de turno e intervalo claros no espelho.",
          ],
        },
        {
          title: "Manutenção e utilidades",
          paragraphs: [
            "Acompanhe plantões, sobreaviso lançado e coberturas sem misturar ordem de serviço com jornada CLT.",
          ],
        },
        {
          title: "Administrativo e qualidade",
          paragraphs: [
            "Organize horários comerciais e regimes híbridos no mesmo painel da planta.",
          ],
        },
        {
          title: "Multiplanta",
          paragraphs: [
            "Centralize os registros de várias plantas no mesmo sistema, sem misturar os espelhos entre unidades.",
          ],
        },
      ],
    },
    {
      title: "Cada setor organizado. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma planta com produção, manutenção e administrativo.",
        "Em vez de manter planilhas diferentes ou depender de informações enviadas individualmente por cada encarregado, o responsável pela planta consegue consultar os registros de cada setor dentro do mesmo sistema.",
        "Setor → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a operação cresce.",
      ],
    },
    {
      title: "Controle por setor",
      variant: "canvas",
      paragraphs: [
        "Cada setor possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da planta, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas podem funcionar quando existe apenas uma equipe pequena.",
        "Conforme a indústria cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
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
      title: "Sua planta crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com um setor e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novos setores, turnos e gestores conforme a planta aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua indústria.",
        "No SegPonto, a indústria opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, ponto offline e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em indústria",
    items: [
      {
        q: "Posso gerenciar vários setores no mesmo sistema?",
        a: "Sim. Cadastre setores e turnos, vincule os funcionários a cada área e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Os registros de um setor se misturam com os de outro?",
        a: "Não. Cada setor mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta área a área.",
      },
      {
        q: "Serve para multiplanta?",
        a: "Sim. Cadastre cada planta, vincule a equipe e acompanhe unidade a unidade com visão centralizada.",
      },
      {
        q: "Preciso começar com toda a planta de uma vez?",
        a: "Não. Você pode começar com um setor piloto e adicionar novos turnos, áreas e gestores conforme a operação cresce.",
      },
      {
        q: "Como começar?",
        a: "Cadastre o primeiro setor, vincule a equipe, rode o ponto nessa área e só então estenda às demais. Confira preços e a página de como implantar.",
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
