import type { BlogPost } from "@/content/blog/types";

export const jornadaIntervaloDsrESobreavisoEntendaAsRegras: BlogPost = {
  slug: "jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
  title: "Jornada, intervalo, DSR e sobreaviso: entenda as regras",
  hero: {
    titleBefore: "Jornada, intervalo, DSR e sobreaviso:",
    highlight: "entenda as regras",
  },
  description:
    "Jornada, intervalo intrajornada e interjornada, DSR e sobreaviso: regras da CLT, Súmula 428, ponto eletrônico e diferença entre os conceitos.",
  intro:
    "O controle da jornada não envolve apenas registrar a hora de entrada e saída do funcionário.",
  opening: [
    "O controle da jornada não envolve apenas registrar a hora de entrada e saída do funcionário.",
    "Também é necessário considerar os períodos em que o trabalhador **descansa durante a jornada**, o intervalo entre uma jornada e outra, o **repouso semanal remunerado (DSR)** e, em determinadas atividades, os períodos em que o empregado permanece disponível para ser chamado fora do horário normal.",
    "Essas situações possuem regras diferentes e não devem ser tratadas como se fossem a mesma coisa.",
    "A CLT estabelece, por exemplo, um período mínimo de **11 horas consecutivas entre duas jornadas**, enquanto o intervalo intrajornada depende da duração do trabalho. Já o DSR corresponde ao repouso semanal remunerado, e o sobreaviso possui requisitos próprios.",
  ],
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  readMinutes: 15,
  ctaTitulo: "Evite erros na jornada antes que virem problemas",
  sumario: [
    { secao: "Quais são os principais períodos de descanso na jornada?", rotulo: "Períodos de descanso" },
    { secao: "O que é intervalo intrajornada?", rotulo: "Intervalo intrajornada" },
    { secao: "O que é intervalo interjornada?", rotulo: "Intervalo interjornada" },
    { secao: "O que é DSR?", rotulo: "DSR" },
    { secao: "O que acontece quando o funcionário trabalha no dia de DSR?", rotulo: "Trabalho no DSR" },
    { secao: "O que é sobreaviso?", rotulo: "Sobreaviso" },
    { secao: "Como registrar sobreaviso no controle de jornada?", rotulo: "Registro do sobreaviso" },
    { secao: "Como controlar jornada, intervalos, DSR e sobreaviso no mesmo sistema?", rotulo: "Tudo no mesmo sistema" },
  ],
  sections: [
    {
      title: "Quais são os principais períodos de descanso na jornada?",
      paragraphs: [
        "Para entender o controle de jornada, é importante separar quatro situações:",
      ],
      table: {
        headers: ["Situação", "O que significa"],
        rows: [
          ["Intervalo intrajornada", "Pausa durante a própria jornada"],
          ["Intervalo interjornada", "Descanso entre duas jornadas"],
          ["DSR", "Repouso semanal remunerado"],
          [
            "Sobreaviso",
            "Período de descanso em que o empregado permanece em regime de plantão aguardando possível chamado",
          ],
        ],
      },
      closingParagraphs: [
        "Embora todos estejam relacionados ao descanso ou à disponibilidade do trabalhador, as regras são diferentes.",
        "O sistema de ponto deve conseguir representar corretamente essas situações de acordo com a jornada e as regras aplicáveis à empresa.",
      ],
    },
    {
      title: "O que é intervalo intrajornada?",
      paragraphs: [
        "O **intervalo intrajornada** é o período de descanso ou alimentação concedido durante a própria jornada de trabalho.",
        "A regra geral do artigo 71 da CLT estabelece que, em trabalho contínuo cuja duração exceda seis horas, deve ser concedido intervalo para repouso ou alimentação de, no mínimo, uma hora. Quando o trabalho não excede seis horas, mas ultrapassa quatro horas, é obrigatório um intervalo de 15 minutos.",
        "Assim:",
      ],
      bullets: [
        "jornada de até 4 horas: não há intervalo intrajornada mínimo previsto pelo art. 71;",
        "jornada superior a 4 e até 6 horas: intervalo mínimo de 15 minutos;",
        "jornada superior a 6 horas: intervalo mínimo de 1 hora, observadas as regras legais e negociais aplicáveis.",
      ],
      closingParagraphs: [
        "O intervalo de descanso não é computado na duração do trabalho.",
      ],
    },
    {
      title: "O intervalo intrajornada precisa ser registrado no ponto?",
      paragraphs: [
        "O tratamento do intervalo depende da forma de controle utilizada pela empresa e das regras aplicáveis à jornada.",
        "No controle eletrônico, o sistema pode registrar as marcações de início e término do intervalo.",
        "Por exemplo:",
        "**Entrada:** 08:00 — **Saída para intervalo:** 12:00 — **Retorno:** 13:00 — **Saída:** 17:00",
        "Nesse caso, o período entre 12:00 e 13:00 corresponde ao intervalo.",
        "O registro permite que o sistema identifique a jornada realizada e trate o período de descanso conforme as regras configuradas.",
      ],
    },
    {
      title: "O que acontece se o intervalo intrajornada não for concedido?",
      paragraphs: [
        "O artigo 71, § 4º, da CLT estabelece que a **não concessão ou a concessão parcial do intervalo intrajornada mínimo** implica o pagamento, de natureza indenizatória, apenas do período suprimido, com acréscimo de 50% sobre o valor da remuneração da hora normal.",
        "Por isso, o sistema de ponto deve conseguir identificar situações em que o intervalo realizado ficou abaixo do período aplicável.",
        "Isso não significa que o software deva simplesmente alterar a marcação realizada pelo funcionário.",
        "O registro da jornada deve permanecer fiel, enquanto o tratamento pode identificar a ocorrência conforme as regras configuradas.",
      ],
    },
    {
      title: "O que é intervalo interjornada?",
      paragraphs: [
        "O **intervalo interjornada** é o período de descanso entre o fim de uma jornada e o início da próxima.",
        "O artigo 66 da CLT estabelece que deve existir um período mínimo de **11 horas consecutivas para descanso entre duas jornadas**.",
        "Por exemplo:",
        "**Saída:** 22:00 — **Próxima entrada:** 08:00",
        "Nesse caso, existem apenas 10 horas entre uma jornada e outra.",
        "O intervalo seria inferior às 11 horas previstas no artigo 66.",
        "Já se o funcionário sair às 21:00 e retornar às 08:00 do dia seguinte, haverá 11 horas de intervalo.",
      ],
    },
    {
      title: "Intervalo intrajornada e interjornada são a mesma coisa?",
      paragraphs: [
        "Não.",
        "A diferença está no momento em que o descanso acontece.",
        "**Intrajornada:** ocorre durante a jornada.",
        "**Interjornada:** ocorre entre duas jornadas.",
        "Exemplo:",
        "Um funcionário trabalha das 08:00 às 17:00 com uma hora de intervalo.",
        "O período de 12:00 às 13:00 é **intrajornada**.",
        "Se ele encerra o trabalho às 17:00 e retorna às 08:00 do dia seguinte, o período entre 17:00 e 08:00 corresponde ao **intervalo interjornada**.",
        "São duas regras diferentes e precisam ser tratadas separadamente no controle de jornada.",
      ],
    },
    {
      title: "Como o sistema de ponto controla os intervalos?",
      paragraphs: [
        "Um sistema de controle de jornada pode utilizar os registros realizados durante o dia para identificar os períodos de trabalho e descanso.",
        "A partir das marcações, é possível verificar:",
      ],
      bullets: [
        "duração da jornada;",
        "início e término do intervalo;",
        "duração do intervalo;",
        "tempo entre uma jornada e outra;",
        "jornadas consecutivas;",
        "possíveis descumprimentos das regras configuradas.",
      ],
      closingParagraphs: [
        "Por exemplo, se um funcionário possui uma jornada das 08:00 às 17:00 e registra intervalo entre 12:05 e 13:02, o sistema pode calcular o período efetivamente realizado.",
        "Da mesma forma, pode comparar a saída de um dia com a entrada do dia seguinte para identificar o intervalo interjornada.",
        "O objetivo do sistema é **tratar os registros**, e não criar artificialmente horários que não foram registrados.",
      ],
    },
    {
      title: "O que é DSR?",
      paragraphs: [
        "**DSR** significa **Descanso Semanal Remunerado**.",
        "A legislação garante ao empregado um período de descanso semanal remunerado de 24 horas consecutivas, preferencialmente aos domingos. A Constituição também reconhece o repouso semanal remunerado, preferencialmente aos domingos, como direito dos trabalhadores.",
        "O DSR é diferente do intervalo intrajornada e do intervalo interjornada.",
        "Ele não é uma pausa dentro da jornada.",
        "Também não é simplesmente o período entre o fim de um dia de trabalho e o início do próximo.",
        "O DSR é o **repouso semanal**.",
      ],
    },
    {
      title: "Qual é a diferença entre DSR e intervalo interjornada?",
      paragraphs: [
        "Essa confusão é comum.",
        "O intervalo interjornada é o descanso mínimo entre duas jornadas consecutivas.",
        "O DSR é o repouso semanal remunerado.",
        "Por exemplo, imagine que um funcionário trabalhe de segunda a sábado e tenha domingo como dia de repouso.",
        "O domingo representa o repouso semanal.",
        "Já as horas entre o encerramento do trabalho de sábado e o início da próxima jornada fazem parte do intervalo entre jornadas.",
        "São conceitos diferentes e podem se sobrepor na organização da escala, mas possuem fundamentos distintos.",
      ],
    },
    {
      title: "O DSR precisa ser registrado no ponto?",
      paragraphs: [
        "O DSR faz parte do tratamento da jornada e da escala de trabalho.",
        "O sistema precisa conhecer a escala do funcionário para identificar quais são seus dias de trabalho e quais são os períodos destinados ao repouso.",
        "Isso é especialmente importante em empresas que trabalham com:",
      ],
      bullets: [
        "escalas;",
        "trabalho aos domingos;",
        "revezamento;",
        "jornadas especiais;",
        "funcionamento em feriados;",
        "operações 24 horas.",
      ],
      closingParagraphs: [
        "O controle da jornada não pode considerar apenas segunda a sexta-feira como padrão universal.",
        "A escala efetivamente utilizada pelo funcionário precisa estar configurada.",
      ],
    },
    {
      title: "O funcionário pode trabalhar no domingo?",
      paragraphs: [
        "O trabalho aos domingos não significa automaticamente que o funcionário perdeu o direito ao repouso semanal.",
        "A CLT prevê o descanso semanal de 24 horas consecutivas e estabelece, como regra, preferência pelo domingo. Em atividades que exigem trabalho aos domingos, a organização da escala deve observar as regras aplicáveis à atividade.",
        "Por isso, empresas que funcionam aos domingos precisam controlar corretamente as escalas e os períodos de descanso.",
        "O sistema de ponto pode ser utilizado para acompanhar essas jornadas e verificar se os descansos previstos na escala estão sendo observados.",
      ],
    },
    {
      title: "O que acontece quando o funcionário trabalha no dia de DSR?",
      paragraphs: [
        "O tratamento depende das circunstâncias e das regras aplicáveis.",
        "A Lei nº 605/1949 disciplina o repouso semanal remunerado e estabelece regras para situações envolvendo trabalho em dias de repouso e feriados.",
        "Em determinadas situações, o trabalho no período destinado ao repouso pode gerar consequências específicas, inclusive relacionadas à remuneração ou à concessão de outro dia de descanso.",
        "Por isso, não é adequado tratar todo trabalho aos domingos ou em dias de repouso simplesmente como “hora extra”.",
        "É necessário considerar a escala, a folga concedida e as regras aplicáveis ao caso.",
      ],
    },
    {
      title: "DSR e horas extras têm relação?",
      paragraphs: [
        "Sim.",
        "A Lei nº 605/1949 estabelece regras para a remuneração do repouso semanal e determina que, para determinadas categorias de trabalhadores, as horas extras habitualmente prestadas integram o cálculo da remuneração do repouso.",
        "Isso significa que o tratamento das horas extras pode ter reflexos no DSR.",
        "O sistema de ponto pode fornecer as informações da jornada que posteriormente serão utilizadas pela folha de pagamento.",
        "A folha, por sua vez, realiza os cálculos correspondentes conforme as regras aplicáveis.",
        "É por isso que o controle correto da jornada é importante também para o processamento da folha.",
        "Veja também [integração do ponto com a folha de pagamento](/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona).",
      ],
    },
    {
      title: "O que é sobreaviso?",
      paragraphs: [
        "O **sobreaviso** é uma situação diferente do trabalho efetivamente realizado e também diferente de simplesmente estar disponível para receber uma mensagem.",
        "A CLT trata do regime de sobreaviso no artigo 244, originalmente direcionado aos ferroviários. O dispositivo estabelece que as horas de sobreaviso são remuneradas à razão de um terço do salário normal.",
        "Na aplicação atual, o TST utiliza a Súmula 428 para tratar do sobreaviso em situações envolvendo instrumentos telemáticos e informatizados.",
        "Segundo a súmula, o simples fornecimento ou uso de celular, computador ou outro instrumento de comunicação **não caracteriza, por si só, o regime de sobreaviso**.",
        "É necessário que o empregado esteja, à distância, submetido a controle patronal e permaneça em regime de plantão ou equivalente, aguardando eventual chamado durante o período de descanso.",
      ],
    },
    {
      title: "Ter celular da empresa significa estar de sobreaviso?",
      paragraphs: [
        "Não.",
        "Esse é um dos principais pontos sobre o assunto.",
        "O simples fato de o funcionário possuir um celular corporativo ou permanecer com o telefone ligado não é suficiente, por si só, para caracterizar o sobreaviso.",
        "A Súmula 428 do TST diferencia o simples uso do instrumento de comunicação da situação em que o empregado permanece efetivamente em regime de plantão ou equivalente, aguardando chamado.",
        "Por exemplo:",
        "**Celular corporativo:** o funcionário recebe um telefone da empresa, mas está livre durante seu período de descanso. Isso, isoladamente, não caracteriza sobreaviso.",
        "**Escala de plantão:** o funcionário é colocado em uma escala e precisa permanecer disponível para atender eventual chamado durante seu período de descanso. Nesse caso, pode existir caracterização do regime de sobreaviso, dependendo das circunstâncias concretas.",
      ],
    },
    {
      title: "Como funciona o sobreaviso?",
      paragraphs: [
        "Imagine um funcionário de suporte de TI.",
        "Sua jornada termina às 18:00.",
        "Naquela noite, ele está escalado para permanecer de sobreaviso e pode ser acionado pela empresa caso ocorra uma falha crítica.",
        "Durante esse período, ele não está necessariamente trabalhando continuamente.",
        "Ele está em um regime de disponibilidade aguardando eventual chamado.",
        "Se for efetivamente acionado e precisar trabalhar, o período de trabalho realizado precisa ser tratado separadamente do período em que permaneceu em sobreaviso.",
        "O TST diferencia justamente o período de disponibilidade do tempo de efetivo trabalho quando o empregado é chamado.",
      ],
    },
    {
      title: "Sobreaviso é a mesma coisa que hora extra?",
      paragraphs: [
        "Não.",
        "O **sobreaviso** corresponde ao período em que o empregado permanece em regime de plantão ou equivalente, aguardando eventual chamado.",
        "A **hora extra** corresponde ao trabalho realizado além da jornada normal, observadas as regras aplicáveis.",
        "Quando um empregado em sobreaviso é efetivamente chamado para trabalhar, o período de trabalho realizado possui tratamento diferente do período em que permaneceu aguardando o chamado.",
        "Por isso, o sistema de controle precisa distinguir essas situações.",
      ],
    },
    {
      title: "Como registrar sobreaviso no controle de jornada?",
      paragraphs: [
        "O sistema de ponto pode utilizar eventos ou classificações específicas para representar períodos de sobreaviso.",
        "Isso permite separar:",
        "**Jornada normal** — tempo em que o funcionário está trabalhando normalmente.",
        "**Sobreaviso** — período em que está em regime de disponibilidade conforme a escala estabelecida.",
        "**Trabalho durante o sobreaviso** — período em que o funcionário efetivamente foi acionado e realizou trabalho.",
        "Essa separação é importante para que a informação seja corretamente utilizada posteriormente pela folha.",
      ],
    },
    {
      title: "O sobreaviso precisa aparecer no ponto?",
      paragraphs: [
        "O tratamento do sobreaviso depende da estrutura de controle de jornada adotada pela empresa e das situações concretas.",
        "Quando a empresa utiliza escalas de plantão e precisa controlar períodos de disponibilidade e eventuais chamados, o sistema pode registrar essas ocorrências de forma específica.",
        "O mais importante é não transformar automaticamente qualquer período fora da jornada em sobreaviso.",
        "É necessário que exista a situação que efetivamente caracteriza o regime.",
      ],
    },
    {
      title: "Como controlar jornada, intervalos, DSR e sobreaviso no mesmo sistema?",
      paragraphs: [
        "Uma empresa pode ter funcionários com regras completamente diferentes.",
        "Um funcionário administrativo pode trabalhar: **08:00 → 12:00 → 13:00 → 17:00**",
        "Outro pode trabalhar em escala.",
        "Outro pode trabalhar aos domingos.",
        "Outro pode possuir uma jornada noturna.",
        "Outro pode participar de escala de sobreaviso.",
        "Por isso, o sistema de ponto precisa trabalhar com **jornadas, escalas e regras**, e não apenas com um horário fixo de entrada e saída.",
        "O controle pode considerar:",
      ],
      bullets: [
        "jornada contratual;",
        "escala;",
        "intervalos;",
        "descanso entre jornadas;",
        "DSR;",
        "trabalho em domingos;",
        "trabalho em feriados;",
        "horas extras;",
        "banco de horas;",
        "trabalho noturno;",
        "sobreaviso;",
        "ocorrências e justificativas.",
      ],
    },
    {
      title: "Como o controle de jornada ajuda a identificar intervalos?",
      paragraphs: [
        "Quando os registros estão organizados, o sistema consegue comparar os horários efetivamente registrados.",
        "Por exemplo:",
        "**Dia 1 — saída:** 22:00 — **Dia 2 — entrada:** 08:00",
        "O sistema identifica 10 horas entre as marcações.",
        "Como a CLT estabelece 11 horas consecutivas de descanso entre jornadas, essa situação pode ser apresentada como uma ocorrência para análise.",
        "Da mesma forma, o sistema pode analisar a duração do intervalo realizado durante a jornada.",
        "Isso permite que o RH encontre situações que precisam ser verificadas antes do fechamento do período.",
      ],
    },
    {
      title: "O sistema de ponto pode impedir uma marcação por causa do intervalo?",
      paragraphs: [
        "O controle do ponto deve registrar fielmente a jornada realizada.",
        "No registro eletrônico, a Portaria nº 671 estabelece regras para impedir mecanismos que restrinjam ou alterem indevidamente a marcação do trabalhador.",
        "Por isso, o sistema não deve simplesmente impedir uma marcação porque ela ocorreu fora do horário previsto.",
        "O horário previsto e o horário efetivamente registrado são informações diferentes.",
        "A função do sistema é permitir o registro e depois realizar o tratamento conforme as regras configuradas.",
        "Veja também [controle de jornada](/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios).",
      ],
    },
    {
      title: "Intervalos e ponto por exceção",
      paragraphs: [
        "O tratamento dos intervalos também pode variar quando a empresa utiliza **ponto por exceção**.",
        "Nesse modelo, o registro normal da jornada pode ser presumido conforme as regras estabelecidas, enquanto determinadas ocorrências ou exceções são registradas.",
        "O ponto por exceção possui regras próprias e não deve ser confundido com a simples ausência de registro de intervalos.",
        "Veja [ponto por exceção](/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras).",
      ],
    },
    {
      title: "Como essas informações chegam à folha de pagamento?",
      paragraphs: [
        "Depois que a jornada é registrada e tratada, os resultados podem ser utilizados no processamento da folha.",
        "Podem existir informações relacionadas a:",
      ],
      bullets: [
        "horas extras;",
        "horas noturnas;",
        "DSR;",
        "faltas;",
        "atrasos;",
        "banco de horas;",
        "trabalho em domingos e feriados;",
        "sobreaviso;",
        "períodos efetivamente trabalhados durante um plantão.",
      ],
      closingParagraphs: [
        "O sistema de ponto fornece as informações relacionadas à jornada.",
        "A folha utiliza esses resultados conforme os eventos e regras de remuneração configurados.",
        "Veja também [integração do ponto com a folha de pagamento](/blog/integracao-do-ponto-com-a-folha-de-pagamento-como-funciona).",
      ],
    },
    {
      title: "Resumo: jornada, intervalo, DSR e sobreaviso",
      paragraphs: [
        "No controle de jornada, esses quatro conceitos não se confundem e precisam ser tratados separadamente.",
      ],
      table: {
        headers: ["Conceito", "O que é", "Momento"],
        rows: [
          ["Intervalo intrajornada", "Pausa de repouso ou alimentação", "Durante a jornada"],
          ["Intervalo interjornada", "Descanso mínimo entre jornadas (regra geral: 11 horas)", "Entre o fim de uma jornada e o início da próxima"],
          ["DSR", "Repouso semanal remunerado (24 horas consecutivas)", "Na escala semanal"],
          ["Sobreaviso", "Disponibilidade em regime de plantão ou equivalente", "Fora da jornada, aguardando eventual chamado"],
        ],
      },
    },
    {
      title: "Conclusão",
      paragraphs: [
        "**Jornada, intervalos, DSR e sobreaviso são conceitos diferentes, mas todos podem fazer parte do controle de jornada.**",
        "O intervalo intrajornada acontece durante a jornada. O intervalo interjornada corresponde ao descanso entre duas jornadas. O DSR representa o repouso semanal remunerado. Já o sobreaviso envolve uma situação específica de disponibilidade em regime de plantão ou equivalente.",
        "Para a empresa, controlar essas situações corretamente significa configurar jornadas e escalas, registrar os horários realizados e tratar cada ocorrência de acordo com sua natureza.",
        "Um sistema de ponto não deve apenas registrar entrada e saída. Ele precisa conseguir representar as diferentes situações que acontecem durante a jornada e fornecer informações confiáveis para o fechamento do ponto e, quando aplicável, para a folha de pagamento.",
      ],
    },
  ],
  faqs: [
    {
      q: "Quantas horas de descanso entre duas jornadas?",
      a: "A regra geral do artigo 66 da CLT estabelece **11 horas consecutivas** de descanso entre duas jornadas.",
    },
    {
      q: "Qual é o intervalo para quem trabalha mais de 6 horas?",
      a: "A regra geral do artigo 71 da CLT estabelece intervalo mínimo de **1 hora** para repouso ou alimentação, observadas as regras legais e negociais aplicáveis.",
    },
    {
      q: "Quem trabalha mais de 4 e até 6 horas tem intervalo?",
      a: "Sim. O artigo 71 estabelece intervalo de **15 minutos** quando a duração do trabalho ultrapassa 4 horas e não excede 6 horas.",
    },
    {
      q: "O intervalo intrajornada conta como hora trabalhada?",
      a: "Na regra geral, não. O artigo 71, § 2º, estabelece que os intervalos de descanso não são computados na duração do trabalho.",
    },
    {
      q: "O que é DSR?",
      a: "É o **Descanso Semanal Remunerado**, correspondente ao repouso semanal de 24 horas consecutivas previsto na legislação, preferencialmente aos domingos.",
    },
    {
      q: "DSR e intervalo interjornada são iguais?",
      a: "Não. O intervalo interjornada é o descanso entre duas jornadas. O DSR é o repouso semanal remunerado.",
    },
    {
      q: "Ter celular da empresa gera sobreaviso?",
      a: "Não automaticamente. O TST estabelece que o simples uso de instrumentos telemáticos ou informatizados não caracteriza, por si só, o regime de sobreaviso.",
    },
    {
      q: "O que caracteriza o sobreaviso?",
      a: "A Súmula 428 do TST considera em sobreaviso o empregado que, à distância e submetido a controle patronal por instrumentos telemáticos ou informatizados, permanece em regime de plantão ou equivalente, aguardando eventual chamado durante o período de descanso.",
    },
    {
      q: "Sobreaviso é hora extra?",
      a: "Não. O período de sobreaviso e o período de trabalho efetivamente realizado após um chamado são situações distintas e possuem tratamentos diferentes.",
    },
    {
      q: "Quem trabalha no domingo perde o DSR?",
      a: "Não é correto concluir isso automaticamente. O trabalho aos domingos precisa ser analisado de acordo com a escala, o repouso concedido e as regras aplicáveis à atividade.",
    },
    {
      q: "O sistema de ponto controla o DSR?",
      a: "O sistema pode utilizar a escala e os registros de jornada para controlar os períodos de trabalho e repouso, inclusive em jornadas que possuem trabalho aos domingos ou escalas diferenciadas.",
    },
    {
      q: "O sistema de ponto controla sobreaviso?",
      a: "Pode controlar as ocorrências de sobreaviso e os períodos efetivamente trabalhados durante um plantão, desde que a solução possua recursos para esse tratamento e a empresa configure corretamente as regras aplicáveis.",
    },
  ],
  related: [
    {
      label: "Controle de jornada",
      to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    },
    {
      label: "Banco de horas",
      to: "/blog/como-funciona-o-banco-de-horas-na-pratica",
    },
    {
      label: "Como calcular hora extra",
      to: "/blog/como-calcular-hora-extra",
    },
    {
      label: "Escalas de trabalho e ponto",
      to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada",
    },
  ],
};
