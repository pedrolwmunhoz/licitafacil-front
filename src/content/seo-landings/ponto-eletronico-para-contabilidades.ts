// intent: ponto eletrônico para contabilidades , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaContabilidadesContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaContabilidades,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para contabilidades",
  },
  opening: [
    "Quando o escritório contábil fecha várias folhas no mês, acompanhar a própria equipe e a jornada dos clientes pode se espalhar entre planilhas, e-mails e prints de espelho.",
    "Hora extra, banco de horas e ajustes precisam aparecer com trilha. Sem isso, o fechamento depende de informação atrasada ou incompleta.",
    "Com o SegPonto, a contabilidade organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada do escritório e dos clientes",
      variant: "white",
      paragraphs: [
        "Cadastre e organize a equipe interna e, quando fizer sentido, as empresas atendidas. Vincule cada pessoa à empresa certa e acompanhe os registros de ponto por cliente.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento do responsável pela folha.",
      ],
      bullets: [
        "Cadastre horários da equipe do escritório",
        "Separe espelhos por cliente quando operar multiempresa",
        "Acompanhe registros por empresa",
        "Consulte atrasos, extras e banco de horas",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e e-mails de fechamento",
        "Facilite o acompanhamento do responsável pela folha",
      ],
    },
    {
      title: "Para escritórios com portes diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende contabilidades com desenhos distintos de operação.",
      ],
      subsections: [
        {
          title: "Escritório enxuto",
          paragraphs: [
            "Controle a equipe interna com espelho claro e menos planilha no fechamento do próprio RH.",
          ],
        },
        {
          title: "BPO de folha",
          paragraphs: [
            "Organize vários clientes no mesmo ambiente, com registros e exportações por empresa.",
          ],
        },
        {
          title: "Contabilidade multiunidade",
          paragraphs: [
            "Acompanhe filiais do escritório no mesmo sistema, com visão centralizada.",
          ],
        },
        {
          title: "Home office e híbrido",
          paragraphs: [
            "Cadastre o regime remoto da equipe e registre batidas com a política definida pelo escritório.",
          ],
        },
      ],
    },
    {
      title: "Cada cliente organizado. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine um BPO com vinte empresas na folha.",
        "Em vez de reunir planilhas e prints de cada cliente, o responsável consulta os registros de cada empresa no mesmo ambiente.",
        "Cliente → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por empresa",
      variant: "canvas",
      paragraphs: [
        "Cada cliente mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual empresa a pessoa está cadastrada, conferir o horário e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos e-mail de fechamento",
      variant: "white",
      paragraphs: [
        "Planilha e e-mail podem parecer suficientes no começo.",
        "Conforme a carteira cresce, aparecem informações espalhadas, ajustes sem trilha, dificuldade para conferir extras e histórico incompleto na fiscalização.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre clientes",
        "Prints e e-mails no lugar do espelho",
        "Dificuldade para conferir extras e banco",
        "Alterações manuais sem trilha",
        "Perda de histórico no fechamento",
      ],
    },
    {
      title: "Comece pelo escritório e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar pelo escritório e estruturar o sistema para acompanhar o crescimento da carteira.",
        "Adicione novos clientes, filiais e gestores conforme a operação aumenta.",
        "Uma plataforma para acompanhar a jornada da equipe e dos clientes da contabilidade.",
        "No SegPonto, a contabilidade opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também AFD/AEJ, espelho e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em contabilidades",
    items: [
      {
        q: "Posso gerenciar o ponto de vários clientes?",
        a: "Sim. Organize por empresa, vincule a equipe de cada cliente e exporte o espelho separado.",
      },
      {
        q: "Os registros de um cliente se misturam com os de outro?",
        a: "Não. Cada empresa mantém seus próprios funcionários e registros de jornada.",
      },
      {
        q: "Serve só para a equipe interna?",
        a: "Também. Muitos escritórios começam pelo próprio time e depois incluem clientes de BPO.",
      },
      {
        q: "AFD e AEJ saem do sistema?",
        a: "Sim. Veja a página de AFD, AEJ e espelho de ponto para o fluxo de exportação.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a equipe interna, rode um mês piloto e só então estenda aos clientes que pedirem o mesmo padrão.",
      },
    ],
  },
  related: [
    { label: "AFD, AEJ e espelho", to: "/blog/o-que-e-afd-e-aej" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
    { label: "Empresas", to: "/blog/ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada" },
  ],
};
