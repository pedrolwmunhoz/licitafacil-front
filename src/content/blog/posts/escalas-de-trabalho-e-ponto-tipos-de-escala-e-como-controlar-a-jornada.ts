import type { BlogPost } from "@/content/blog/types";

export const escalasDeTrabalhoEPontoTiposDeEscalaEComoControlarAJornada: BlogPost = {
  slug: "escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada",
  title: "Escalas de trabalho e ponto: tipos de escala e como controlar a jornada",
  hero: {
    titleBefore: "Escalas de trabalho e ponto:",
    highlight: "tipos de escala e como controlar a jornada",
  },
  description:
    "Escalas de trabalho e ponto: 5x2, 6x1, 12x36, revezamento, DSR, feriados, banco de horas e como controlar a jornada no sistema.",
  intro:
    "Nem todo funcionário trabalha de segunda a sexta-feira, das 8h às 17h.",
  opening: [
    "Nem todo funcionário trabalha de segunda a sexta-feira, das 8h às 17h.",
    "Empresas de saúde, comércio, indústria, restaurantes, hotéis, transportes, segurança e outros setores podem funcionar aos sábados, domingos, feriados, durante a noite ou até mesmo 24 horas por dia.",
    "Nesses casos, a empresa precisa organizar **escalas de trabalho** para definir quais dias e horários cada funcionário deve trabalhar e quais períodos serão destinados ao descanso.",
    "O ponto eletrônico entra justamente nesse processo: ele registra a jornada efetivamente realizada e permite comparar as marcações com a escala cadastrada.",
  ],
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  readMinutes: 16,
  ctaTitulo: "Evite erros na jornada antes que virem problemas",
  sumario: [
    { secao: "O que é uma escala de trabalho?", rotulo: "O que é escala" },
    { secao: "Quais são os principais tipos de escala de trabalho?", rotulo: "Tipos de escala" },
    { secao: "Escala 12x36", rotulo: "Escala 12x36" },
    { secao: "O que é escala de revezamento?", rotulo: "Revezamento" },
    { secao: "Como cadastrar uma escala no sistema de ponto?", rotulo: "Cadastro no sistema" },
    { secao: "Escala de trabalho e DSR", rotulo: "DSR, domingos e feriados" },
    { secao: "Escala de trabalho e banco de horas", rotulo: "Banco de horas" },
    { secao: "Como o ponto eletrônico controla uma escala?", rotulo: "Controle pelo ponto" },
  ],
  sections: [
    {
      title: "O que é uma escala de trabalho?",
      paragraphs: [
        "A **escala de trabalho** é a forma como os dias de trabalho e os dias de descanso são distribuídos ao longo de determinado período.",
        "Ela pode definir, por exemplo:",
      ],
      bullets: [
        "quais dias o funcionário trabalha;",
        "quais dias são de folga;",
        "horário de entrada e saída;",
        "duração da jornada;",
        "intervalos;",
        "alternância entre equipes;",
        "trabalho em domingos e feriados;",
        "períodos diurnos e noturnos;",
        "revezamento entre horários.",
      ],
      closingParagraphs: [
        "Uma empresa pode ter diferentes escalas funcionando simultaneamente.",
        "Um funcionário pode trabalhar de segunda a sexta-feira, enquanto outro trabalha em 6x1 e outro em 12x36.",
        "Por isso, o controle de ponto precisa estar associado à **escala correta de cada trabalhador**.",
      ],
    },
    {
      title: "Escala de trabalho e jornada de trabalho são a mesma coisa?",
      paragraphs: [
        "Não.",
        "A **jornada** está relacionada ao período em que o empregado trabalha e à duração do trabalho.",
        "A **escala** organiza como os dias de trabalho e descanso são distribuídos.",
        "Por exemplo:",
        "Um funcionário pode ter jornada de 8 horas por dia e trabalhar em uma escala 6x1.",
        "Nesse caso:",
        "**Jornada:** 8 horas de trabalho por dia.",
        "**Escala:** seis dias de trabalho e um dia de descanso.",
        "Outro funcionário pode ter jornada de 12 horas dentro de uma escala 12x36:",
        "**Jornada:** 12 horas.",
        "**Escala:** 12 horas de trabalho seguidas por 36 horas de descanso.",
        "A configuração do ponto precisa considerar as duas informações.",
      ],
    },
    {
      title: "Quais são os principais tipos de escala de trabalho?",
      paragraphs: [
        "Existem diversas formas de distribuir a jornada.",
        "Entre as mais comuns estão:",
      ],
      bullets: [
        "escala 5x2;",
        "escala 6x1;",
        "escala 12x36;",
        "escala 5x1;",
        "escala 6x2;",
        "escala 4x2;",
        "escalas de revezamento;",
        "escalas com trabalho aos domingos;",
        "escalas com trabalho noturno;",
        "escalas específicas estabelecidas por normas coletivas.",
      ],
      closingParagraphs: [
        "A existência e as condições de determinada escala dependem da legislação aplicável, do contrato e, quando existente, de acordo ou convenção coletiva.",
        "Por isso, uma empresa não deve simplesmente escolher uma combinação de dias e horários sem verificar as regras aplicáveis à sua atividade e aos empregados envolvidos.",
      ],
    },
    {
      title: "Escala 5x2",
      paragraphs: [
        "Na escala **5x2**, o empregado trabalha durante cinco dias e possui dois dias de descanso.",
        "Um exemplo:",
        "**Segunda:** trabalha — **Terça:** trabalha — **Quarta:** trabalha — **Quinta:** trabalha — **Sexta:** trabalha — **Sábado:** folga — **Domingo:** folga",
        "A folga não precisa necessariamente ocorrer no sábado e no domingo.",
        "A empresa pode organizar os dias de descanso conforme a atividade e as regras aplicáveis.",
        "Por isso, em uma operação que funciona todos os dias, diferentes funcionários podem estar em escalas 5x2 com folgas distribuídas durante a semana.",
      ],
    },
    {
      title: "Escala 6x1",
      paragraphs: [
        "Na escala **6x1**, o empregado trabalha durante seis dias e possui um dia de descanso.",
        "Exemplo:",
        "**Segunda:** trabalha — **Terça:** trabalha — **Quarta:** trabalha — **Quinta:** trabalha — **Sexta:** trabalha — **Sábado:** trabalha — **Domingo:** folga",
        "Mas a folga também pode ocorrer em outro dia da semana.",
        "Isso é especialmente relevante para empresas que funcionam aos domingos, como lojas, restaurantes, hotéis e outros estabelecimentos.",
        "O sistema de ponto deve acompanhar a escala efetivamente atribuída ao funcionário, e não presumir que domingo será sempre o dia de descanso.",
      ],
    },
    {
      title: "Escala 12x36",
      paragraphs: [
        "A escala **12x36** consiste, em sua forma típica, em 12 horas consecutivas de trabalho seguidas por 36 horas ininterruptas de descanso.",
        "A CLT prevê expressamente esse regime no artigo 59-A. A adoção deve observar os requisitos legais aplicáveis.",
        "Um exemplo:",
        "**Segunda:** trabalha 07:00–19:00 — **Terça:** folga — **Quarta:** trabalha 07:00–19:00 — **Quinta:** folga — **Sexta:** trabalha 07:00–19:00",
        "A escala continua alternando o período de trabalho com 36 horas de descanso.",
      ],
      subsections: [
        {
          title: "Como funciona o ponto na escala 12x36?",
          paragraphs: [
            "O sistema precisa conhecer a escala atribuída ao funcionário.",
            "A marcação efetiva pode ser: **Entrada:** 07:02 — **Saída:** 19:01",
            "O sistema registra o horário realmente realizado.",
            "A escala prevista não deve ser confundida com o registro efetivo.",
            "Isso permite identificar, por exemplo: entrada antecipada; atraso; saída antecipada; extensão da jornada; ausência; trabalho em dia que seria de folga; alterações na escala.",
            "A jornada 12x36 também possui regras específicas sobre compensação e tratamento de domingos e feriados. O artigo 59-A da CLT deve ser analisado junto às demais regras aplicáveis ao caso.",
          ],
        },
      ],
    },
    {
      title: "A escala 12x36 elimina todas as horas extras?",
      paragraphs: [
        "Não é correto interpretar a escala 12x36 como uma autorização genérica para trabalhar qualquer quantidade de horas.",
        "O regime possui uma jornada própria e deve ser observado conforme seus requisitos legais.",
        "As horas realizadas além da jornada prevista podem exigir tratamento específico.",
        "Além disso, instrumentos coletivos podem estabelecer condições relacionadas à jornada, intervalos e compensações. Registros do Mediador do Ministério do Trabalho mostram, por exemplo, instrumentos coletivos que disciplinam de forma própria a adoção da escala 12x36.",
        "Por isso, o sistema de ponto deve registrar o horário efetivamente realizado, mesmo quando o empregado trabalha em uma escala especial.",
      ],
    },
    {
      title: "Escala 5x1",
      paragraphs: [
        "Na escala **5x1**, o empregado trabalha cinco dias consecutivos e descansa um.",
        "Exemplo:",
        "**5 dias de trabalho → 1 dia de descanso → 5 dias de trabalho → 1 dia de descanso**",
        "Como o descanso vai mudando de posição ao longo do calendário, o funcionário pode trabalhar em diferentes dias da semana.",
        "Essa característica torna a escala diferente de uma jornada tradicional de segunda a sexta-feira.",
        "O sistema precisa acompanhar a sequência da escala para determinar corretamente os dias previstos para trabalho e descanso.",
      ],
    },
    {
      title: "Escala 6x2",
      paragraphs: [
        "Na escala **6x2**, o empregado trabalha seis dias e descansa dois.",
        "Exemplo:",
        "**6 dias de trabalho → 2 dias de descanso → 6 dias de trabalho → 2 dias de descanso**",
        "Dependendo da operação, essa escala pode ser utilizada para manter atividades funcionando continuamente.",
        "O importante é que a configuração represente a escala efetivamente adotada pela empresa e respeite as regras aplicáveis à jornada.",
      ],
    },
    {
      title: "Escala 4x2",
      paragraphs: [
        "Na escala **4x2**, o trabalhador realiza quatro dias de trabalho seguidos por dois dias de descanso.",
        "A sequência pode continuar independentemente do dia da semana.",
        "Assim como ocorre em outras escalas de revezamento, o descanso pode cair em diferentes dias do calendário.",
        "O ponto precisa acompanhar essa sequência para evitar que o sistema trate automaticamente sábado e domingo como dias de folga.",
      ],
    },
    {
      title: "O que é escala de revezamento?",
      paragraphs: [
        "A **escala de revezamento** ocorre quando trabalhadores ou equipes alternam dias ou horários de trabalho para manter determinada operação funcionando.",
        "O revezamento pode ocorrer entre:",
      ],
      bullets: [
        "horários;",
        "turnos;",
        "dias de trabalho;",
        "equipes;",
        "períodos diurnos e noturnos.",
      ],
      closingParagraphs: [
        "Por exemplo, uma empresa que funciona 24 horas pode ter uma equipe durante o dia e outra durante a noite, com mudanças programadas conforme a escala.",
        "Em alguns setores, o revezamento pode envolver regras específicas previstas na Constituição, na CLT e em normas coletivas.",
        "Por isso, não existe uma única regra que possa ser aplicada indistintamente a todas as escalas de revezamento.",
      ],
    },
    {
      title: "Escala de trabalho, turno e revezamento",
      paragraphs: [
        "Esses termos são próximos, mas não significam exatamente a mesma coisa.",
      ],
      subsections: [
        {
          title: "Escala",
          paragraphs: ["Organiza os dias de trabalho e descanso."],
        },
        {
          title: "Turno",
          paragraphs: ["Está relacionado ao período ou horário em que a atividade é realizada."],
        },
        {
          title: "Revezamento",
          paragraphs: ["Envolve a alternância entre horários, turnos ou equipes."],
        },
      ],
      closingParagraphs: [
        "Uma empresa pode, por exemplo, ter: **Escala:** 6x2 — **Turno:** noturno — **Regime:** revezamento entre equipes",
        "O sistema de ponto pode precisar representar essas três dimensões.",
      ],
    },
    {
      title: "Como cadastrar uma escala no sistema de ponto?",
      paragraphs: [
        "Antes de cadastrar uma escala, a empresa precisa definir as regras que realmente serão utilizadas.",
        "Entre as informações normalmente necessárias estão:",
      ],
      bullets: [
        "horário de entrada;",
        "horário de saída;",
        "intervalo;",
        "dias de trabalho;",
        "dias de descanso;",
        "tolerâncias aplicáveis;",
        "jornada noturna;",
        "folgas;",
        "feriados;",
        "regras de compensação;",
        "banco de horas, quando existente;",
        "alterações temporárias;",
        "equipes ou setores.",
      ],
      closingParagraphs: [
        "Depois disso, a escala pode ser associada aos funcionários.",
        "Um mesmo sistema pode ter várias escalas simultaneamente.",
        "Por exemplo: **Administrativo:** 5x2 — **Loja:** 6x1 — **Portaria:** 12x36 — **Produção:** 6x2 — **Equipe de suporte:** escala de plantão",
        "Essa flexibilidade é importante em empresas que possuem operações diferentes.",
      ],
    },
    {
      title: "O ponto deve seguir a escala cadastrada?",
      paragraphs: [
        "A escala serve como referência para o tratamento da jornada.",
        "Mas ela não substitui o registro efetivamente realizado.",
        "Imagine que um funcionário deveria trabalhar das 08:00 às 17:00.",
        "No dia, ele registrou: **Entrada:** 08:17 — **Saída:** 17:42",
        "O sistema precisa preservar essas marcações.",
        "A partir delas, pode calcular ou apresentar as diferenças em relação ao horário previsto.",
        "Um sistema eletrônico de controle de jornada também deve observar as regras da Portaria 671, incluindo a preservação do registro fiel das marcações e a vedação de mecanismos que restrinjam indevidamente o registro da jornada.",
      ],
    },
    {
      title: "O que acontece quando o funcionário troca de escala?",
      paragraphs: [
        "A troca de escala precisa ser refletida no cadastro ou planejamento da jornada.",
        "Imagine um funcionário que normalmente trabalha em 6x1, mas durante determinado período será deslocado para outra escala.",
        "Se o sistema continuar utilizando a escala anterior, as comparações entre jornada prevista e realizada podem ficar incorretas.",
        "Por isso, é importante registrar:",
      ],
      bullets: [
        "período de validade da escala;",
        "escala anterior;",
        "nova escala;",
        "data da mudança;",
        "horários aplicáveis;",
        "eventual alteração de setor ou equipe.",
      ],
      closingParagraphs: [
        "Essa organização também facilita a conferência do ponto no fechamento do período.",
      ],
    },
    {
      title: "Como controlar funcionários que trabalham em escalas diferentes?",
      paragraphs: [
        "O ideal é que o sistema permita atribuir diferentes jornadas e escalas aos funcionários.",
        "Por exemplo:",
      ],
      table: {
        headers: ["Funcionário", "Escala", "Horário"],
        rows: [
          ["Funcionário A", "5x2", "08:00–17:00"],
          ["Funcionário B", "6x1", "09:00–17:20"],
          ["Funcionário C", "12x36", "07:00–19:00"],
          ["Funcionário D", "12x36", "19:00–07:00"],
          ["Funcionário E", "6x2", "turno noturno"],
        ],
      },
      closingParagraphs: [
        "Assim, a empresa não precisa transformar todos os funcionários em uma única jornada padrão.",
      ],
    },
    {
      title: "Como fica o intervalo nas escalas de trabalho?",
      paragraphs: [
        "A escala não elimina as regras relacionadas aos intervalos.",
        "Uma jornada extensa pode possuir intervalo para repouso ou alimentação durante o período de trabalho.",
        "O tratamento depende da jornada, da legislação aplicável e, quando existente, de norma coletiva.",
        "Por isso, não se deve interpretar “12x36”, por exemplo, simplesmente como 12 horas ininterruptas de trabalho sem qualquer intervalo.",
        "A CLT trata especificamente do intervalo intrajornada no artigo 71, enquanto o artigo 59-A disciplina a jornada 12x36.",
        "Veja também [intervalo, DSR e sobreaviso](/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras).",
      ],
    },
    {
      title: "Escala de trabalho e DSR",
      paragraphs: [
        "O **Descanso Semanal Remunerado (DSR)** precisa ser considerado na organização das escalas.",
        "Em operações que funcionam todos os dias, o domingo não necessariamente será o dia de descanso de todos os funcionários.",
        "A escala pode distribuir as folgas entre os trabalhadores.",
        "Por isso, o sistema precisa conhecer a escala individual para conseguir diferenciar:",
      ],
      bullets: [
        "dia normal de trabalho;",
        "dia de folga;",
        "domingo;",
        "feriado;",
        "trabalho em dia originalmente destinado ao descanso.",
      ],
      closingParagraphs: [
        "O tratamento do DSR possui regras próprias e não deve ser confundido simplesmente com a folga existente em qualquer escala.",
      ],
    },
    {
      title: "Escalas de trabalho e domingos",
      paragraphs: [
        "Uma empresa pode funcionar aos domingos e utilizar empregados em diferentes escalas.",
        "Isso não significa que todos os funcionários tenham necessariamente a mesma folga semanal.",
        "A organização deve considerar as regras aplicáveis ao repouso semanal e à atividade exercida.",
        "Em uma operação com escala 6x1, por exemplo, o funcionário pode ter uma folga semanal em determinado dia.",
        "Em uma operação 12x36, a distribuição do descanso ocorre de maneira diferente.",
        "O sistema de ponto precisa acompanhar essa configuração.",
      ],
    },
    {
      title: "Escalas de trabalho e feriados",
      paragraphs: [
        "O feriado também precisa ser tratado de acordo com a escala e com as regras aplicáveis.",
        "Um funcionário pode estar escalado para trabalhar em um determinado feriado, enquanto outro estará de folga.",
        "Por isso, simplesmente identificar que determinada data é feriado não é suficiente para determinar o tratamento da jornada.",
        "É necessário saber:",
        "**Qual era a escala do funcionário naquela data?**",
        "**Ele estava previsto para trabalhar?**",
        "**Ele efetivamente trabalhou?**",
        "**Houve folga compensatória?**",
        "**Existe regra específica em norma coletiva?**",
        "Essas informações podem influenciar o tratamento da jornada e da folha.",
      ],
    },
    {
      title: "Escala de trabalho e banco de horas",
      paragraphs: [
        "As escalas também podem ser utilizadas em conjunto com sistemas de compensação e banco de horas, quando atendidos os requisitos aplicáveis.",
        "Nesse cenário, o sistema precisa diferenciar:",
        "**Jornada prevista** — o que estava programado para o funcionário.",
        "**Jornada realizada** — o que foi efetivamente registrado.",
        "**Saldo** — a diferença tratada de acordo com as regras de compensação.",
        "Isso permite acompanhar créditos e débitos sem confundir a escala prevista com as horas efetivamente trabalhadas.",
        "Veja também [banco de horas e horas extras](/blog/como-funciona-o-banco-de-horas-na-pratica).",
      ],
    },
    {
      title: "Escalas noturnas",
      paragraphs: [
        "Algumas escalas funcionam total ou parcialmente durante o período noturno.",
        "Nesse caso, o controle precisa considerar as regras aplicáveis ao trabalho noturno.",
        "O sistema pode precisar tratar:",
      ],
      bullets: [
        "horário noturno;",
        "adicional noturno;",
        "jornada que atravessa a meia-noite;",
        "encerramento da jornada no dia seguinte;",
        "prorrogação do trabalho noturno, quando aplicável;",
        "escala noturna;",
        "intervalos.",
      ],
      closingParagraphs: [
        "Por exemplo: **Entrada:** 22:00 — **Saída:** 06:00",
        "Embora a entrada aconteça em um dia e a saída no dia seguinte, as duas marcações pertencem à mesma jornada.",
        "Um sistema de ponto precisa conseguir interpretar essa situação corretamente.",
        "Veja também [como calcular horas noturnas](/blog/como-calcular-horas-noturnas).",
      ],
    },
    {
      title: "Como o ponto eletrônico controla uma escala?",
      paragraphs: [
        "O funcionamento pode ser dividido em duas informações diferentes.",
      ],
      subsections: [
        {
          title: "1. Escala prevista",
          paragraphs: [
            "O sistema sabe que determinado funcionário deveria trabalhar naquele dia e horário.",
          ],
        },
        {
          title: "2. Registro realizado",
          paragraphs: [
            "O funcionário registra efetivamente sua entrada, saída e demais marcações.",
          ],
        },
      ],
      closingParagraphs: [
        "A comparação entre essas informações permite identificar ocorrências.",
        "Exemplo: **Previsto:** 08:00–17:00 — **Realizado:** 08:14–17:36",
        "O sistema pode apresentar: atraso na entrada; extensão na saída; total efetivamente registrado; intervalo realizado; saldo resultante conforme as regras configuradas.",
        "O ponto não deve simplesmente substituir o registro realizado pelo horário previsto.",
      ],
    },
    {
      title: "É possível controlar escala pelo celular?",
      paragraphs: [
        "Sim.",
        "O controle de jornada pode ser realizado por sistemas eletrônicos que utilizam diferentes dispositivos e tecnologias.",
        "Uma solução baseada em software pode permitir que o trabalhador registre o ponto pelo celular, computador ou outro dispositivo compatível, conforme a arquitetura utilizada.",
        "O REP-P, por exemplo, é uma modalidade de registrador eletrônico de ponto baseada em programa de computador e pode utilizar tecnologias móveis.",
        "Veja [app de ponto eletrônico](/blog/app-de-ponto-eletronico-como-funciona-e-como-usar).",
      ],
    },
    {
      title: "Escala e geolocalização",
      paragraphs: [
        "A geolocalização pode ser utilizada como recurso adicional em sistemas de ponto, especialmente quando os funcionários trabalham fora de um estabelecimento fixo.",
        "Mas **escala e geolocalização são coisas diferentes**.",
        "A escala informa quando o funcionário deveria trabalhar.",
        "A geolocalização pode informar onde o registro foi realizado.",
        "Uma não substitui a outra.",
        "Veja [geolocalização no ponto](/blog/geolocalizacao-no-ponto-como-funciona-e-para-que-serve).",
      ],
    },
    {
      title: "Escalas para trabalho externo e home office",
      paragraphs: [
        "Funcionários externos, híbridos ou em home office também podem possuir jornadas e escalas definidas.",
        "O local onde o trabalho é realizado não elimina automaticamente a necessidade de organizar a jornada.",
        "O sistema pode permitir o registro por aplicativo ou outros meios eletrônicos, dependendo da situação e da solução utilizada.",
        "Veja também [ponto eletrônico para home office](/blog/ponto-eletronico-para-home-office-como-funciona-o-controle-de-jornada).",
      ],
    },
    {
      title: "Como fazer a gestão de escalas no sistema de ponto?",
      paragraphs: [
        "Uma boa gestão de escalas precisa considerar três momentos:",
      ],
      subsections: [
        {
          title: "Planejamento",
          paragraphs: ["Definir a escala que será atribuída ao funcionário."],
        },
        {
          title: "Registro",
          paragraphs: ["Registrar os horários efetivamente realizados."],
        },
        {
          title: "Conferência",
          paragraphs: [
            "Comparar o realizado com a jornada prevista e tratar as ocorrências.",
          ],
        },
      ],
      closingParagraphs: [
        "Isso reduz situações em que o RH precisa reconstruir manualmente a jornada no final do mês.",
        "Em empresas com muitos funcionários, também é importante manter histórico das alterações de escala.",
        "Uma alteração feita hoje não deve apagar a informação sobre qual escala estava vigente anteriormente.",
      ],
    },
    {
      title: "O que analisar ao escolher um sistema de ponto para escalas?",
      paragraphs: [
        "Empresas que trabalham com escalas devem verificar se o sistema consegue representar a realidade da operação.",
        "Entre os pontos importantes estão:",
      ],
      bullets: [
        "múltiplas escalas;",
        "escalas fixas e variáveis;",
        "5x2;",
        "6x1;",
        "12x36;",
        "escalas de revezamento;",
        "jornadas noturnas;",
        "folgas variáveis;",
        "troca de escala;",
        "trabalho em domingos e feriados;",
        "intervalos;",
        "banco de horas;",
        "horas extras;",
        "registro pelo celular;",
        "controle de funcionários externos;",
        "fechamento do ponto;",
        "integração com a folha.",
      ],
      closingParagraphs: [
        "Não basta o sistema permitir cadastrar um horário de entrada e saída.",
        "Em uma empresa que possui equipes trabalhando em diferentes regimes, a escala precisa fazer parte da estrutura do controle de jornada.",
      ],
    },
    {
      title: "Resumo: escalas de trabalho e ponto",
      paragraphs: [
        "A escala organiza os dias de trabalho e descanso; o ponto registra o que foi efetivamente realizado.",
      ],
      table: {
        headers: ["Escala", "Como funciona", "Atenção no ponto"],
        rows: [
          ["5x2", "Cinco dias de trabalho e dois de descanso", "Folgas podem não cair no fim de semana"],
          ["6x1", "Seis dias de trabalho e um de descanso", "Domingo não é folga automática"],
          ["12x36", "12 horas de trabalho e 36 de descanso (art. 59-A)", "Escala prevista ≠ marcação realizada"],
          ["Revezamento", "Alternância de dias, turnos ou equipes", "Configurar a sequência real da escala"],
        ],
      },
    },
    {
      title: "Conclusão",
      paragraphs: [
        "A escala de trabalho é a estrutura que organiza **quando cada funcionário deve trabalhar e quando deve descansar**.",
        "Na prática, uma mesma empresa pode trabalhar com várias escalas simultaneamente: 5x2 no administrativo, 6x1 no comércio, 12x36 na portaria e escalas de revezamento na operação.",
        "O controle de ponto precisa acompanhar essa realidade.",
        "A escala representa o planejamento. O ponto registra o que realmente aconteceu.",
        "Quando os dois estão corretamente configurados, o sistema consegue comparar a jornada prevista com a realizada, identificar ocorrências e fornecer informações para o fechamento do ponto e integração com a folha.",
        "Para empresas que trabalham com diferentes horários, equipes e dias de funcionamento, ter um sistema capaz de administrar múltiplas escalas deixa de ser apenas uma questão de organização e passa a ser parte importante do próprio controle da jornada.",
      ],
    },
  ],
  faqs: [
    {
      q: "O que é escala de trabalho?",
      a: "É a forma de organizar os dias e horários de trabalho e descanso dos funcionários.",
    },
    {
      q: "Qual a diferença entre escala e jornada?",
      a: "A jornada está relacionada à duração e ao período de trabalho. A escala organiza como os dias de trabalho e descanso são distribuídos.",
    },
    {
      q: "O que significa escala 5x2?",
      a: "Significa cinco dias de trabalho seguidos por dois dias de descanso.",
    },
    {
      q: "O que significa escala 6x1?",
      a: "Significa seis dias de trabalho seguidos por um dia de descanso.",
    },
    {
      q: "O que significa escala 12x36?",
      a: "É o regime em que o empregado trabalha 12 horas seguidas e descansa 36 horas consecutivas, observadas as regras aplicáveis ao regime. A CLT disciplina essa modalidade no artigo 59-A.",
    },
    {
      q: "A escala 12x36 pode trabalhar aos domingos?",
      a: "Sim. Dependendo da escala, o plantão pode coincidir com domingo ou feriado. O tratamento deve considerar as regras específicas do regime e as normas aplicáveis.",
    },
    {
      q: "Quem trabalha em escala precisa bater ponto?",
      a: "Quando houver obrigação de controle de jornada, a empresa precisa utilizar um meio de registro adequado à situação. O registro pode ser manual, mecânico ou eletrônico, conforme permitido pela legislação.",
    },
    {
      q: "O ponto eletrônico aceita escala 12x36?",
      a: "Sim. Sistemas de controle de jornada podem ser configurados para trabalhar com diferentes escalas, incluindo 12x36.",
    },
    {
      q: "É possível ter várias escalas na mesma empresa?",
      a: "Sim. Uma empresa pode ter funcionários em 5x2, 6x1, 12x36 e outras escalas simultaneamente.",
    },
    {
      q: "A escala cadastrada substitui o registro do ponto?",
      a: "Não. A escala representa a jornada prevista. O ponto registra o horário efetivamente realizado.",
    },
    {
      q: "Funcionário pode trocar de escala?",
      a: "A alteração deve seguir as regras aplicáveis à relação de trabalho e ser corretamente registrada pela empresa. No sistema de ponto, a nova escala deve ser vinculada ao período em que passa a valer.",
    },
    {
      q: "Escala e banco de horas são a mesma coisa?",
      a: "Não. A escala organiza os dias e horários de trabalho e descanso. O banco de horas trata da compensação de horas conforme as regras aplicáveis.",
    },
    {
      q: "Escala e DSR são a mesma coisa?",
      a: "Não. A escala organiza a distribuição do trabalho e das folgas. O DSR é o repouso semanal remunerado previsto na legislação.",
    },
  ],
  related: [
    {
      label: "Controle de jornada",
      to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    },
    {
      label: "Intervalo, DSR e sobreaviso",
      to: "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
    },
    {
      label: "Banco de horas",
      to: "/blog/como-funciona-o-banco-de-horas-na-pratica",
    },
    {
      label: "Como implantar ponto eletrônico",
      to: "/blog/como-implantar-ponto-eletronico-na-empresa-passo-a-passo",
    },
  ],
};
