// intent: ponto eletrônico para clínicas , estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaClinicasContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaClinicas,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para clínicas",
  },
  opening: [
    "Quando a clínica mistura recepção, enfermagem e plantões, acompanhar a jornada pode se espalhar entre agenda do sistema, planilha do RH e mensagem no grupo da equipe.",
    "Troca de plantão, adicional noturno e cobertura de folga precisam aparecer no espelho. Sem isso, a folha depende de informação atrasada ou incompleta.",
    "Com o SegPonto, a clínica organiza essas marcações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Organize a jornada da equipe da clínica",
      variant: "white",
      paragraphs: [
        "Cadastre e organize recepção, técnicos, enfermagem e administrativos. Vincule funcionários à unidade certa e acompanhe os registros de ponto por área.",
        "Consulte atrasos, faltas, horas extras e adicional noturno. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou pelo RH.",
      ],
      bullets: [
        "Cadastre plantões e horários por setor",
        "Vincule funcionários à unidade ou à especialidade",
        "Acompanhe registros por área",
        "Consulte atrasos, extras e noturno",
        "Centralize a jornada no mesmo sistema",
        "Reduza planilhas e acertos informais",
        "Facilite o acompanhamento do gestor ou do RH",
      ],
    },
    {
      title: "Para clínicas com operações diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema atende unidades com desenhos distintos de equipe.",
      ],
      subsections: [
        {
          title: "Clínica ambulatorial",
          paragraphs: [
            "Controle recepção e apoio com horários comerciais e espelho mensal para o contador.",
          ],
        },
        {
          title: "Clínica 24 horas",
          paragraphs: [
            "Organize plantões, noturno e cobertura sem misturar o prontuário com o controle de jornada.",
          ],
        },
        {
          title: "Rede de clínicas",
          paragraphs: [
            "Acompanhe várias unidades no mesmo sistema, com registros por clínica e visão centralizada.",
          ],
        },
        {
          title: "Diagnóstico e laboratório",
          paragraphs: [
            "Cadastre turnos de coleta e laudo com intervalos claros e espelho separado por setor.",
          ],
        },
      ],
    },
    {
      title: "Cada unidade organizada. Gestão mais clara",
      variant: "white",
      paragraphs: [
        "Imagine uma rede com três clínicas.",
        "Em vez de reunir planilhas de cada gerente, o responsável consulta os registros de cada unidade no mesmo ambiente.",
        "Unidade → Equipe → Registros de ponto → Folha. Isso reduz retrabalho no fechamento.",
      ],
    },
    {
      title: "Controle por clínica",
      variant: "canvas",
      paragraphs: [
        "Cada unidade mantém seus funcionários e suas marcações.",
        "Fica mais simples saber em qual clínica a pessoa está cadastrada, conferir o plantão e exportar o espelho certo.",
      ],
    },
    {
      title: "Menos planilha e menos agenda misturada com ponto",
      variant: "white",
      paragraphs: [
        "Planilha e agenda de consultas podem parecer suficientes no começo.",
        "Conforme a clínica cresce, aparecem informações espalhadas, cobertura sem lançamento, dificuldade para conferir noturno e histórico incompleto na demissão.",
        "O ponto eletrônico centralizado reduz esse trabalho e deixa a jornada organizada em um só lugar.",
      ],
      bullets: [
        "Informações espalhadas entre setores",
        "Agenda de paciente misturada com jornada",
        "Dificuldade para conferir plantão e noturno",
        "Alterações manuais sem trilha",
        "Perda de histórico na troca de equipe",
      ],
    },
    {
      title: "Comece por uma unidade e amplie",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma unidade e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novos setores, plantões e gestores conforme a clínica aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários da sua clínica.",
        "No SegPonto, a clínica opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também escalas, ponto offline e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em clínicas",
    items: [
      {
        q: "A agenda de pacientes substitui o ponto?",
        a: "Não. A agenda organiza consultas. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Plantão e noturno entram no espelho?",
        a: "Sim. Cadastre os plantões reais e confira adicional noturno, extras e coberturas no mesmo painel.",
      },
      {
        q: "Serve para rede com várias clínicas?",
        a: "Sim. Cadastre cada unidade, vincule a equipe e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Profissional liberado do ponto precisa bater?",
        a: "Quem se enquadra no art. 62 da CLT pode ficar fora do controle de jornada. Confirme o vínculo e a política com o jurídico.",
      },
      {
        q: "Como começar?",
        a: "Escolha uma unidade piloto, treine a equipe, feche um espelho com o RH e só então estenda às demais.",
      },
    ],
  },
  related: [
    { label: "Escalas e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    { label: "Exceções art. 62", to: "/blog/excecoes-ao-controle-de-jornada-o-que-diz-o-artigo-62-da-clt" },
    { label: "Como implantar", to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo" },
    { label: "Preços", to: "/precos" },
  ],
};
