import type { HelpDocTopic } from "@/content/help/types";

/** Guia de uso do SegPonto: tarefas práticas no painel e no app. */
export const DOCUMENTACAO_TOPICS: HelpDocTopic[] = [
  {
    id: "inicio",
    title: "Configurar a empresa",
    intro:
      "Cada implantação começa pela conta e pelo assistente: da contratação ao primeiro dia de operação. Sabe o que configurar antes de liberar o app ao time?",
    sections: [
      {
        title: "Contratar e acessar o painel",
        paragraphs: [
          "Escolha a faixa na página de preços, preencha os dados da empresa e do responsável financeiro e finalize o pagamento.",
          "Após a confirmação, acesse o painel com o telefone e a senha definidos na contratação. Se a configuração inicial ainda não foi concluída, o painel abre o assistente em etapas.",
        ],
      },
      {
        title: "Assistente de configuração (6 etapas)",
        paragraphs: [
          "O fluxo guia jornada, carga horária, pausas, regras de registro, banco de horas e áreas de ponto. Você pode voltar e ajustar antes de concluir. O objetivo é sair com a política mínima pronta para o piloto.",
        ],
        bullets: [
          "Jornada: escolha o modelo (semana comercial, 6×1 ou plantão 12×36) e horários padrão",
          "Carga: revise carga diária, semanal e descanso entre jornadas",
          "Pausas: defina intervalo padrão e tolerância de batida",
          "Registro: configure geolocalização, batida dentro da área e permissão de ajuste",
          "Banco: ative ou desative a exibição de horas extras / banco de horas",
          "Locais: cadastre áreas no mapa (sede, filial, cliente) quando necessário",
        ],
      },
      {
        title: "Cadastrar colaboradores",
        paragraphs: [
          "Em Funcionários, inclua o time, associe a jornada e envie o acesso. Cada pessoa recebe login de colaborador para o app.",
          "Se travar em jornada ou importação, acione o suporte para ajuda na implantação.",
        ],
      },
    ],
  },
  {
    id: "painel",
    title: "Usar o painel da empresa",
    intro:
      "Depois do login, o painel organiza o dia do RH: pendências, espelho, banco e aprovações. Sabe por onde começar cada manhã?",
    sections: [
      {
        title: "Dashboard",
        paragraphs: [
          "O resumo do período mostra pendências de batida, solicitações em aberto e indicadores para priorizar o dia.",
        ],
      },
      {
        title: "Gerenciar funcionários",
        paragraphs: [
          "Liste o time, edite o perfil de jornada, ative ou desative colaborador e gerencie dados de acesso. Cada pessoa associada corretamente evita espelho órfão no fechamento.",
        ],
      },
      {
        title: "Consultar espelho de ponto",
        paragraphs: [
          "Veja a jornada por colaborador e período: batidas, intervalos, extras e afastamentos consolidados antes do fechamento com o contador.",
        ],
      },
      {
        title: "Acompanhar banco de horas",
        paragraphs: [
          "Consulte os 4 totais do período por pessoa: esperadas, trabalhadas, feriado e extras (derivados das batidas).",
        ],
      },
      {
        title: "Aprovar solicitações",
        paragraphs: [
          "A fila reúne pedidos de ajuste de batida e outras solicitações. Aprove ou negue. A decisão fica no histórico com seu nome e data.",
        ],
      },
      {
        title: "Cadastrar férias e feriados",
        paragraphs: [
          "Cadastre férias e afastamentos no calendário de jornada. Feriados cadastrados evitam que o fechamento cobre batida em dia sem expediente.",
        ],
      },
      {
        title: "Configurar áreas de ponto",
        paragraphs: [
          "Desenhe perímetros no mapa (sede, loja, obra). Batida fora da área vai para conferência do gestor quando a regra de registro exigir local.",
        ],
      },
      {
        title: "Gerar relatórios",
        paragraphs: [
          "Exporte PDF, Excel ou AFDT do período escolhido para validar o espelho e enviar ao escritório de contabilidade.",
        ],
      },
      {
        title: "Consultar auditoria",
        paragraphs: [
          "Veja quem alterou registro, quando e o quê. Útil para dúvida sobre batida antiga ou exigência de documentação.",
        ],
      },
    ],
  },
  {
    id: "app",
    title: "Usar o app do colaborador",
    intro:
      "No celular, o colaborador registra a jornada e consulta o próprio histórico. Sabe o que ele consegue fazer após o login?",
    sections: [
      {
        title: "Bater ponto",
        paragraphs: [
          "Na tela inicial, registre entrada, saída e intervalo. Se a empresa exigir local, o app pede permissão de GPS na hora da marcação.",
        ],
      },
      {
        title: "Consultar calendário de batidas",
        paragraphs: [
          "Veja as batidas do mês em visão de calendário. Confira o próprio registro antes de pedir ajuste. isso reduz solicitação sem necessidade.",
        ],
      },
      {
        title: "Solicitar ajuste de batida",
        paragraphs: [
          "Peça correção de batida ou outra solicitação definida pela empresa. O gestor responde no painel e o status aparece no app.",
        ],
      },
      {
        title: "Consultar banco de horas e férias",
        paragraphs: [
          "Veja os totais do período (esperadas, trabalhadas, feriado, extras) e férias/afastamentos liberados no perfil.",
        ],
      },
    ],
  },
  {
    id: "fechamento",
    title: "Fechar o mês",
    intro:
      "Antes de enviar para a folha, alguém valida pendências, espelho e exportação. Sabe o ritual do dia 2?",
    sections: [
      {
        title: "Conferir pendências",
        paragraphs: [
          "Revise quem não registrou saída, solicitações em aberto e férias no período. Aprove ou negue ajustes antes de fechar o espelho.",
        ],
      },
      {
        title: "Validar espelho e banco",
        paragraphs: [
          "O sistema deriva extras e feriado a partir das batidas e da escala. Confira se o resultado bate com a operação antes de exportar.",
        ],
      },
      {
        title: "Exportar e arquivar",
        paragraphs: [
          "Em Relatórios, gere o arquivo no formato que o contador pede. Guarde o período fechado para consultas futuras e para eventual fiscalização.",
        ],
        bullets: [
          "PDF para leitura e arquivo",
          "Excel para conferência e manipulação",
          "AFDT quando o escritório ou fiscalização pedir o layout",
        ],
      },
    ],
  },
  {
    id: "geo-uso",
    title: "Configurar geolocalização",
    intro:
      "Áreas no mapa ligam a batida ao local quando a política exige. Sabe como criar o perímetro e tratar exceção?",
    sections: [
      {
        title: "Criar áreas no painel",
        paragraphs: [
          "Em Áreas de ponto, desenhe ou informe o perímetro (sede, loja, obra, cliente). Associe a regra de registro na etapa Registro do assistente ou nas configurações da empresa.",
        ],
      },
      {
        title: "Permissão no app do colaborador",
        paragraphs: [
          "Na primeira batida com local obrigatório, o celular pede permissão de localização. Sem permissão, a batida pode ficar sem GPS. trate conforme a política interna e o aviso ao time.",
        ],
      },
      {
        title: "Tratar batida fora da área",
        paragraphs: [
          "A batida aparece na rotina de exceções do gestor. Analise, aprove justificativa ou peça correção. A decisão fica registrada.",
        ],
      },
    ],
  },
];
