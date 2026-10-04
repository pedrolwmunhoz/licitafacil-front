// intent: ponto eletrônico para advocacia , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaAdvocaciaContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaAdvocacia,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para advocacia",
  },
  opening: [
    "Quando o escritório mistura CLT, sócios e estagiários, acompanhar a jornada do time administrativo e dos advogados empregados pode se espalhar em planilha, timesheet de cliente e mensagem no grupo.",
    "Hora extra, banco de horas e home office precisam aparecer no espelho. Sem isso, a folha e o fechamento dependem de informação incompleta.",
    "Com o SegPonto, o escritório organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada do time do escritório",
      variant: "white",
      paragraphs: [
        "Cadastre e organize secretaria, financeiro, paralegais e advogados CLT. Vincule cada pessoa ao núcleo certo e acompanhe os registros de ponto por área.",
        "Consulte atrasos, faltas, horas extras e banco de horas. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou pelo RH.",
      ],
      bullets: [
        "Cadastre horários comerciais e regimes híbridos",
        "Separe timesheet de cliente do ponto CLT",
        "Acompanhe registros por área ou núcleo",
        "Consulte atrasos, extras e banco de horas",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e acertos informais",
        "Facilite o acompanhamento do gestor ou do RH",
      ],
    },
    {
      title: "Para escritórios com estruturas diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende bancas com desenhos distintos de equipe.",
      ],
      subsections: [
        {
          title: "Escritório boutique",
          paragraphs: [
            "Controle uma equipe enxuta com espelho claro para o contador, sem misturar sócio e CLT no mesmo registro.",
          ],
        },
        {
          title: "Banca full service",
          paragraphs: [
            "Organize núcleos, secretaria e financeiro com horários e gestores por área.",
          ],
        },
        {
          title: "Escritório multiunidade",
          paragraphs: [
            "Acompanhe filiais no mesmo sistema, com registros por unidade e visão centralizada.",
          ],
        },
        {
          title: "Home office e híbrido",
          paragraphs: [
            "Cadastre o regime acordado e registre batidas com a política de localização que o escritório definir.",
          ],
        },
      ],
    },
    {
      title: "Cada área organizada. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine um escritório com contencioso, consultivo e administrativo.",
        "Em vez de reunir planilhas de cada coordenador, o responsável consulta os registros de cada área no mesmo ambiente.",
        "Área → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por núcleo",
      variant: "canvas",
      paragraphs: [
        "Cada área mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual núcleo a pessoa está cadastrada, conferir o horário e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos timesheet misturado com ponto",
      variant: "white",
      paragraphs: [
        "Planilha e timesheet de cliente podem parecer suficientes no começo.",
        "Conforme a banca cresce, aparecem informações espalhadas, hora extra sem lançamento, dificuldade para conferir banco de horas e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada CLT organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre núcleos",
        "Timesheet de cliente misturado com jornada",
        "Dificuldade para conferir extras e banco",
        "Alterações manuais sem trilha",
        "Perda de histórico na saída do colaborador",
      ],
    },
    {
      title: "Comece pelo administrativo e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar pelo administrativo e estruturar o sistema para acompanhar o crescimento da banca.",
        "Adicione novos núcleos, filiais e gestores conforme o escritório aumenta.",
        "Uma plataforma para acompanhar a jornada dos empregados CLT do seu escritório.",
        "No SegPonto, o escritório opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também home office, escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em advocacia",
    items: [
      {
        q: "Timesheet de cliente substitui o ponto?",
        a: "Não. Timesheet mede tempo por processo ou cliente. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Sócio e associado precisam bater ponto?",
        a: "Depende do vínculo. Empregado CLT segue a regra de anotação do estabelecimento. Sócio ou associado sem vínculo de emprego costuma ficar fora do ponto. Confirme com o jurídico.",
      },
      {
        q: "Serve para escritório com filiais?",
        a: "Sim. Cadastre cada unidade, vincule a equipe e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Home office entra no sistema?",
        a: "Sim. Cadastre o regime acordado e a política de batida. Veja também a página de home office.",
      },
      {
        q: "Como começar?",
        a: "Cadastre o administrativo, rode um mês piloto, feche o espelho com o contador e só então estenda aos demais núcleos.",
      },
    ],
  },
  related: [
    { label: "Home office", to: "/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada" },
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
