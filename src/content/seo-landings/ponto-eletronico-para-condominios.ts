// intent: ponto eletrônico para condomínios , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaCondominiosContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaCondominios,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para condomínios",
  },
  opening: [
    "Quando o condomínio tem portaria, zeladoria e limpeza, acompanhar a jornada pode se espalhar em livro de ocorrência, planilha do síndico e mensagens no grupo do WhatsApp.",
    "Plantão 12x36, cobertura de folga e adicional noturno precisam aparecer no espelho. Sem isso, o rateio e a folha dependem de informação atrasada ou incompleta.",
    "Com o SegPonto, o condomínio ou a administradora organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada da equipe do prédio",
      variant: "white",
      paragraphs: [
        "Cadastre e organize portaria, zeladoria e limpeza. Vincule cada pessoa ao plantão certo e acompanhe os registros de ponto por prédio.",
        "Consulte atrasos, faltas, horas extras e adicional noturno. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo síndico ou pela administradora.",
      ],
      bullets: [
        "Cadastre escalas 12x36 e turnos diurnos",
        "Registre cobertura de folga e falta",
        "Consulte atrasos, extras e noturno",
        "Gere espelho para folha e rateio",
        "Separe livro de ocorrência do controle de jornada",
        "Reduza planilhas e acertos informais",
        "Facilite o acompanhamento do síndico ou da administradora",
      ],
    },
    {
      title: "Para diferentes estruturas condominiais",
      variant: "canvas",
      paragraphs: [
        "O sistema atende prédios e administradoras com desenhos distintos.",
      ],
      subsections: [
        {
          title: "Edifício residencial",
          paragraphs: [
            "Controle portaria e apoio com plantões claros e espelho mensal para o contador.",
          ],
        },
        {
          title: "Condomínio-clube",
          paragraphs: [
            "Organize equipes maiores, áreas comuns e turnos variados sem misturar funções no mesmo perfil de horário.",
          ],
        },
        {
          title: "Administradora multiunidade",
          paragraphs: [
            "Acompanhe vários prédios no mesmo sistema, com espelho e equipe por condomínio.",
          ],
        },
        {
          title: "Portaria 24 horas",
          paragraphs: [
            "Cadastre o 12x36 com intervalo e acompanhe a cobertura quando um colega assume o plantão do outro.",
          ],
        },
      ],
    },
    {
      title: "Cada prédio organizado. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine uma administradora com dez condomínios.",
        "Em vez de reunir planilhas e prints de cada síndico, o responsável consulta os registros de cada prédio no mesmo ambiente.",
        "Prédio → Equipe → Registros de ponto → Folha e rateio. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por condomínio",
      variant: "canvas",
      paragraphs: [
        "Cada unidade mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual prédio a pessoa está cadastrada, conferir o plantão e exportar o espelho certo para o contador.",
      ],
    },
    {
      title: "Menos planilha e menos combinado de corredor",
      variant: "white",
      paragraphs: [
        "Planilha e livro de ocorrência podem parecer suficientes no começo.",
        "Conforme a equipe cresce, aparecem informações espalhadas, cobertura sem lançamento, dificuldade para conferir horas e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre síndico e portaria",
        "Cobertura de folga sem registro",
        "Dificuldade para conferir plantão e noturno",
        "Alterações manuais sem trilha",
        "Perda de histórico na troca de porteiro",
      ],
    },
    {
      title: "Comece por um prédio e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com um prédio e estruturar o sistema para acompanhar o crescimento da carteira.",
        "Adicione novos condomínios, funções e gestores conforme a operação aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do condomínio.",
        "No SegPonto, o condomínio opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, ponto offline e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em condomínios",
    items: [
      {
        q: "O livro de ocorrência substitui o ponto?",
        a: "Não. O livro registra fatos e visitantes. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "A escala 12x36 cabe no sistema?",
        a: "Sim. Cadastre o plantão e o intervalo conforme a regra aplicável e a CCT da categoria.",
      },
      {
        q: "A administradora pode ver vários prédios?",
        a: "Sim. Mantenha equipe e espelho por condomínio, com visão centralizada para a administradora.",
      },
      {
        q: "Condomínio com 30 CLTs é obrigado a anotar?",
        a: "Pelo art. 74, §2º, o estabelecimento com mais de vinte trabalhadores tem dever formal de anotar entrada e saída. Confirme a contagem e a CCT.",
      },
      {
        q: "Como começar?",
        a: "Cadastre os plantões, treine um prédio piloto, feche um espelho com o contador e só então estenda aos demais.",
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
