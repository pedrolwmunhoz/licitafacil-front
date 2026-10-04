import type { HelpFaqTopic } from "@/content/help/types";

/** FAQ central: 5 grupos temáticos com respostas em prosa e links nomeados. */
export const FAQ_TOPICS: HelpFaqTopic[] = [
  {
    id: "conta",
    title: "Conta",
    intro:
      "Cada operação começa pela conta da empresa: cadastro, acesso e configuração inicial. Sabe o que fazer antes da primeira batida?",
    items: [
      {
        q: "Como criar minha conta?",
        a: "Acesse a página de cadastro, escolha a faixa na página de preços e confirme o pagamento. Em seguida, configure a empresa no painel com o assistente.",
      },
      {
        q: "Esqueci minha senha. Como recuperar?",
        a: "Na tela de login, use a opção de recuperação. Você recebe um link no e-mail ou telefone cadastrado.",
      },
      {
        q: "Quem configura o sistema na empresa?",
        a: "Você mesmo, pelo painel. O assistente guia jornada, pausas e banco de horas. Se precisar, o suporte ajuda na implantação.",
      },
      {
        q: "Posso gerenciar mais de uma filial?",
        a: "Sim. Cadastre áreas de ponto por unidade. Veja a página de geolocalização. E associe colaboradores ao local correto.",
      },
    ],
  },
  {
    id: "batida",
    title: "Batida / App",
    intro:
      "A marcação do dia a dia passa pelo app do colaborador: entrada, intervalo, saída e pedidos de ajuste. Sabe como o fluxo funciona?",
    items: [
      {
        q: "Como o colaborador bate ponto?",
        a: "Pelo app no celular (Android ou iOS). Ele registra entrada, saída e intervalo. O guia do app de ponto eletrônico aprofunda o fluxo.",
      },
      {
        q: "E se o colaborador esquecer de bater ponto?",
        a: "Ele solicita ajuste pelo app. O gestor aprova ou nega no painel, com trilha de data e responsável.",
      },
      {
        q: "Precisa de internet para bater ponto?",
        a: "O fluxo principal usa conexão. Quando o modo offline está disponível, a batida sincroniza quando a internet voltar. Veja a página de ponto offline.",
      },
      {
        q: "Geolocalização é obrigatória?",
        a: "Não. A geo é opcional e configurável por área no painel. Detalhes na página de geolocalização.",
      },
    ],
  },
  {
    id: "jornada",
    title: "Jornada",
    intro:
      "Espelho, hora extra, banco de horas e férias fecham o mês com o contador. Sabe o que conferir antes de exportar?",
    items: [
      {
        q: "O sistema calcula hora extra automaticamente?",
        a: "Sim, conforme a política configurada. Confira o espelho no fechamento e exporte para o contador. Regras na página de banco de horas e HE.",
      },
      {
        q: "Posso ter perfis de jornada diferentes?",
        a: "Sim. Cadastre perfis por colaborador ou grupo. escala fixa, plantão, meio período. Veja a página de escalas e ponto.",
      },
      {
        q: "Como funciona o banco de horas?",
        a: "O resumo compara horas trabalhadas (batidas) com as esperadas da escala. Extras = trabalhadas − esperadas; feriado soma o trabalhado em feriados. Não há vencimento nem compensação persistida.",
      },
      {
        q: "Férias e feriados entram no espelho?",
        a: "Sim. Cadastre férias e feriados no calendário e o fechamento considera o afastamento correto. O guia de controle de jornada aprofunda.",
      },
    ],
  },
  {
    id: "cobranca",
    title: "Cobrança",
    intro:
      "A mensalidade segue faixas de funcionários ativos. Sabe o que muda quando o quadro cresce ou quando você cancela?",
    items: [
      {
        q: "Como funcionam os planos?",
        a: "Cobrança mensal por faixa de colaboradores. Valores e inclusões estão na página de preços.",
      },
      {
        q: "O que acontece se eu passar da faixa?",
        a: "Quando o time cresce além do limite, você migra para a faixa seguinte. O painel orienta o ajuste; o histórico permanece na conta.",
      },
      {
        q: "Posso cancelar a assinatura?",
        a: "Sim, a qualquer momento pelo suporte ou e-mail de contato na área logada. Sem fidelidade anual obrigatória nos termos vigentes.",
      },
      {
        q: "Existe calculadora de custo?",
        a: "Sim. A calculadora de custo do ponto eletrônico estima mensalidade e ano por headcount.",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    intro:
      "Conformidade, Portaria 671, arquivos e LGPD entram no pacote da operação. Sabe o que preparar para o fechamento e para a fiscalização?",
    items: [
      {
        q: "O SegPonto atende a Portaria 671?",
        a: "O desenho de REP-P cobre identificação individual, trilha de alterações e exportação padronizada. Aprofunde na página da Portaria 671 e no checklist interativo.",
      },
      {
        q: "O que são AFD e AEJ?",
        a: "Arquivos técnicos de registro de ponto usados conforme o modelo e o pedido do contador ou da fiscalização. Explicação completa na página de AFD, AEJ e espelho.",
      },
      {
        q: "Como responder a uma fiscalização?",
        a: "Exporte relatórios e histórico de alterações com data e responsável. O sistema gera AFD e espelho do período solicitado, conforme o que for cabível.",
      },
      {
        q: "Como os dados dos colaboradores são protegidos?",
        a: "Criptografia, controle de acesso por perfil e tratamento conforme a LGPD. Detalhes na Política de Privacidade.",
      },
    ],
  },
];
