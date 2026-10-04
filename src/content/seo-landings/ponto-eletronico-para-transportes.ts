// intent: ponto eletrônico para transportes, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaTransportesContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaTransportes,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para transportes",
  },
  opening: [
    "Quando a empresa possui motoristas em rota, ajudantes e equipe de pátio, acompanhar a jornada pode rapidamente virar uma operação difícil de controlar.",
    "Uma base registra o ponto de um jeito, outra depende de papel de bordo e o responsável pela administração precisa juntar planilhas e mensagens para descobrir o que aconteceu no dia.",
    "Com o SegPonto, a transportadora pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão centralizada da frota e do apoio",
      variant: "white",
      paragraphs: [
        "Cadastre e organize bases, rotas e equipes. Vincule motoristas e ajudantes à unidade certa e acompanhe os registros de ponto por base.",
        "Consulte atrasos, faltas, horas extras e tempo de espera lançado. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor de frota ou pelo RH.",
      ],
      bullets: [
        "Cadastre e organize múltiplas bases",
        "Vincule motoristas e ajudantes a cada unidade",
        "Acompanhe registros de ponto por base",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas e papel de bordo",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para transportadoras que precisam controlar várias bases",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por operações com diferentes estruturas de frota.",
      ],
      subsections: [
        {
          title: "Carga e logística",
          paragraphs: [
            "Controle motoristas e ajudantes em viagens longas, com batida no aplicativo e espelho mensal para o RH.",
          ],
        },
        {
          title: "Distribuição urbana",
          paragraphs: [
            "Acompanhe a jornada de quem faz rota curta e retorno à base sem misturar telemetria do veículo com o espelho CLT.",
          ],
        },
        {
          title: "Passageiros e fretamento",
          paragraphs: [
            "Organize escalas de linha, cobertura de folga e turnos sem depender só do relatório da operação.",
          ],
        },
        {
          title: "Pátio e apoio",
          paragraphs: [
            "Centralize os registros de quem fica na base, no carregamento e na manutenção junto com a frota.",
          ],
        },
      ],
    },
    {
      title: "Cada base organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma transportadora com 8 bases.",
        "Em vez de manter 8 planilhas diferentes ou depender de informações enviadas individualmente por cada gerente, o responsável pela operação consegue consultar os registros de cada base dentro do mesmo sistema.",
        "Base → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a frota cresce.",
      ],
    },
    {
      title: "Controle por base",
      variant: "canvas",
      paragraphs: [
        "Cada base possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da frota, tornando mais simples identificar onde determinado motorista está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas e papel de bordo podem funcionar quando existe apenas uma base pequena.",
        "Conforme a frota cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
        "O ponto eletrônico centralizado reduz esse trabalho operacional e deixa as informações organizadas em um único ambiente.",
      ],
      bullets: [
        "Informações espalhadas entre bases",
        "Registros duplicados",
        "Dificuldade para conferir horas e espera",
        "Alterações manuais",
        "Perda de histórico",
        "Gestores enviando informações por diferentes canais",
      ],
    },
    {
      title: "Sua operação crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma base e estruturar o sistema para acompanhar o crescimento da frota.",
        "Adicione novas bases, motoristas e gestores conforme a operação aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua transportadora.",
        "No SegPonto, a transportadora opera em REP-P, com aplicativo, ponto offline e geolocalização quando a política pedir. Veja também escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em transportes",
    items: [
      {
        q: "Posso gerenciar várias bases no mesmo sistema?",
        a: "Sim. Cadastre múltiplas bases, vincule os funcionários a cada unidade e consulte os registros por base, com visão centralizada para o administrador.",
      },
      {
        q: "Os registros de uma base se misturam com os de outra?",
        a: "Não. Cada base mantém seus próprios funcionários e registros de jornada. A gestão centralizada consulta unidade a unidade sem misturar os espelhos.",
      },
      {
        q: "Telemetria substitui o ponto?",
        a: "Não. Telemetria acompanha veículo e rota. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Motorista pode bater no celular sem sinal?",
        a: "Sim. Use o aplicativo com ponto offline e sincronize quando a conexão voltar. Confira também a página de ponto offline.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a primeira base, vincule a equipe, rode o ponto nessa unidade e só então estenda às demais. Confira preços e a página de como implantar.",
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
