// intent: ponto eletrônico para salões, estrutura de produto
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import type { SeoLandingContent } from "@/content/seo-landings/types";

export const pontoEletronicoParaSaloesContent: SeoLandingContent = {
  seo: PUBLIC_PAGE_SEO.pontoEletronicoParaSaloes,
  hero: {
    eyebrow: "Segmento",
    titleBefore: "Ponto eletrônico",
    highlight: "para salões",
  },
  opening: [
    "Quando o salão mistura recepção, profissionais CLT e comissionados, acompanhar a jornada pode rapidamente virar uma operação difícil de controlar.",
    "Um dia fecha cedo, outro estica com encaixes e o responsável pela administração precisa juntar agenda, planilha e mensagens para descobrir quem ficou até mais tarde.",
    "Com o SegPonto, o salão pode organizar essas informações em uma única plataforma.",
  ],
  sections: [
    {
      title: "Tenha uma visão clara da equipe do salão",
      variant: "white",
      paragraphs: [
        "Cadastre e organize recepção, auxiliares e profissionais com vínculo CLT. Vincule cada pessoa ao horário certo e acompanhe os registros de ponto no dia a dia.",
        "Consulte atrasos, faltas e horas extras. Centralize as informações da jornada, reduza a dependência de planilhas e facilite o acompanhamento pelo gestor ou pelo dono.",
      ],
      bullets: [
        "Cadastre e organize a equipe do salão",
        "Separe agenda de cliente do ponto CLT",
        "Acompanhe registros de ponto por função",
        "Consulte atrasos, faltas e horas extras",
        "Centralize as informações da jornada",
        "Reduza a dependência de planilhas",
        "Facilite o acompanhamento pelo gestor ou administrador",
      ],
    },
    {
      title: "Para salões com estruturas diferentes",
      variant: "canvas",
      paragraphs: [
        "O sistema pode ser utilizado por negócios com diferentes portes e formatos.",
      ],
      subsections: [
        {
          title: "Salão de beleza",
          paragraphs: [
            "Controle recepção e profissionais CLT com horários de abertura, almoço e fechamento claros no espelho.",
          ],
        },
        {
          title: "Barbearia",
          paragraphs: [
            "Acompanhe a jornada da equipe em turnos estendidos e finais de semana sem misturar comissão com ponto.",
          ],
        },
        {
          title: "Clínica estética",
          paragraphs: [
            "Organize técnicos e apoio com agendas cheias e encaixes, mantendo o registro de jornada separado do prontuário.",
          ],
        },
        {
          title: "Rede com várias unidades",
          paragraphs: [
            "Centralize os registros de cada unidade no mesmo sistema, sem misturar os espelhos entre salões.",
          ],
        },
      ],
    },
    {
      title: "Cada unidade organizada. Uma gestão centralizada",
      variant: "white",
      paragraphs: [
        "Imagine uma rede com 6 salões.",
        "Em vez de manter 6 planilhas diferentes ou depender de informações enviadas individualmente por cada gerente, o responsável pela rede consegue consultar os registros de cada unidade dentro do mesmo sistema.",
        "Unidade → Funcionários → Registros de ponto → Gestão centralizada. Isso facilita a administração conforme a rede cresce.",
      ],
    },
    {
      title: "Controle por unidade",
      variant: "canvas",
      paragraphs: [
        "Cada salão possui seus próprios funcionários e registros de jornada.",
        "Você consegue organizar a estrutura da empresa de acordo com a operação da rede, tornando mais simples identificar onde determinado funcionário está cadastrado e consultar seus registros.",
      ],
    },
    {
      title: "Menos planilhas para administrar o ponto",
      variant: "white",
      paragraphs: [
        "Planilhas podem funcionar quando existe apenas uma equipe pequena.",
        "Conforme o salão cresce, porém, começam a surgir problemas: informações espalhadas, registros duplicados, dificuldade para conferir horas, alterações manuais, perda de histórico e gestores enviando informações por diferentes canais.",
        "O ponto eletrônico centralizado reduz esse trabalho operacional e deixa as informações organizadas em um único ambiente.",
      ],
      bullets: [
        "Informações espalhadas",
        "Agenda misturada com jornada",
        "Dificuldade para conferir horas",
        "Alterações manuais",
        "Perda de histórico",
        "Gestores enviando informações por diferentes canais",
      ],
    },
    {
      title: "Seu salão crescendo sem complicar a gestão do ponto",
      variant: "canvas",
      paragraphs: [
        "Você pode começar com uma unidade e estruturar o sistema para acompanhar o crescimento da operação.",
        "Adicione novas unidades, funcionários e gestores conforme o negócio aumenta.",
        "Uma plataforma para acompanhar a jornada dos funcionários do seu salão.",
        "No SegPonto, o salão opera em REP-P, com aplicativo e painel na faixa por número de ativos. Veja também varejo, escalas e como implantar.",
      ],
    },
  ],
  faqs: {
    title: "Dúvidas sobre ponto em salões",
    items: [
      {
        q: "A agenda de clientes substitui o ponto?",
        a: "Não. A agenda organiza horários de atendimento. O ponto registra a jornada CLT para espelho e folha.",
      },
      {
        q: "Comissionado precisa bater ponto?",
        a: "Depende do vínculo. Empregado CLT entra no controle de jornada. Confirme o enquadramento com o contador ou o jurídico.",
      },
      {
        q: "Posso gerenciar vários salões no mesmo sistema?",
        a: "Sim. Cadastre múltiplas unidades, vincule os funcionários a cada salão e consulte os registros sem misturar os espelhos.",
      },
      {
        q: "Serve para barbearia e estética?",
        a: "Sim. O mesmo sistema atende salão, barbearia, clínica estética e redes com várias unidades.",
      },
      {
        q: "Como começar?",
        a: "Cadastre a equipe, rode o ponto por um mês piloto e só então estenda a outras unidades se houver rede. Confira preços e a página de como implantar.",
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
