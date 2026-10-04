import type { BlogPost } from "@/content/blog/types";

export const intervaloPreAssinaladoOQueEComoFuncionaEQuaisSaoAsRegras: BlogPost = {
  slug: "intervalo-pre-assinalado-o-que-e-como-funciona-e-quais-sao-as-regras",
  title: "Intervalo pré-assinalado: o que é, como funciona e quais são as regras",
  hero: {
    titleBefore: "Intervalo pré-assinalado:",
    highlight: "o que é, como funciona e quais são as regras",
  },
  description:
    "Intervalo pré-assinalado: o que é, art. 74 §2º CLT, Portaria 671, espelho de ponto, AEJ, diferença da marcação automática e ponto por exceção.",
  intro:
    "O intervalo pré-assinalado é uma forma de registrar o período de repouso e alimentação no controle de jornada sem exigir marcação específica de início e fim todos os dias.",
  opening: [
    "O intervalo pré-assinalado é uma forma de registrar o período de repouso e alimentação no controle de jornada **sem exigir que o funcionário faça uma marcação específica no início e no fim do intervalo todos os dias**.",
    "Em vez de o trabalhador registrar **12:00 — saída para intervalo** e **13:00 — retorno do intervalo**, o sistema pode deixar previamente indicado no controle de jornada que aquele funcionário possui intervalo das 12:00 às 13:00.",
    "Essa possibilidade está prevista no artigo 74, § 2º, da CLT.",
    "A pré-assinalação, porém, não significa que a empresa possa inventar ou alterar os horários efetivamente trabalhados. Ela é uma forma de indicar previamente o período destinado ao repouso e alimentação. A Portaria MTE nº 671 também estabelece que sistemas eletrônicos devem registrar fielmente as marcações realizadas e não podem utilizar marcação automática de ponto com horários predeterminados ou contratuais.",
  ],
  publishedAt: "2026-09-21",
  updatedAt: "2026-09-21",
  readMinutes: 15,
  ctaTitulo: "Organize o ponto antes da fiscalização bater na porta",
  sumario: [
    { secao: "O que é intervalo pré-assinalado?", rotulo: "O que é" },
    { secao: "Pré-assinalação é o mesmo que marcar o intervalo automaticamente?", rotulo: "Não é marcação automática" },
    { secao: "Como funciona o intervalo pré-assinalado na prática?", rotulo: "Na prática" },
    { secao: "O funcionário pode trabalhar durante o intervalo pré-assinalado?", rotulo: "Trabalho no intervalo" },
    { secao: "Como fica o espelho de ponto com intervalo pré-assinalado?", rotulo: "Espelho e AEJ" },
    { secao: "E se o funcionário não fizer o intervalo?", rotulo: "Intervalo não feito" },
    { secao: "Como configurar intervalo pré-assinalado em um sistema de ponto?", rotulo: "Como configurar" },
    { secao: "Quais são as vantagens da pré-assinalação?", rotulo: "Vantagens e cuidados" },
  ],
  sections: [
    {
      title: "O que é intervalo pré-assinalado?",
      paragraphs: [
        "É o intervalo de repouso e alimentação que já aparece previamente indicado no controle de jornada.",
        "Por exemplo, uma empresa estabelece para determinado funcionário: **Entrada:** 08:00 — **Intervalo:** 12:00 às 13:00 — **Saída:** 17:00",
        "Com a pré-assinalação, o funcionário pode registrar apenas: **08:00 — entrada** e **17:00 — saída**.",
        "Enquanto o controle de jornada apresenta: **12:00 às 13:00 — intervalo pré-assinalado**",
        "O funcionário não precisa necessariamente realizar uma marcação específica às 12:00 e às 13:00.",
        "A própria legislação permite a pré-assinalação do período de repouso e alimentação.",
      ],
    },
    {
      title: "Pré-assinalação é o mesmo que marcar o intervalo automaticamente?",
      paragraphs: [
        "Não.",
        "Essa é uma das principais diferenças que precisam ser entendidas.",
        "**Pré-assinalação:** o sistema deixa previamente indicado o horário previsto para o intervalo.",
        "**Marcação automática do ponto:** o sistema cria uma marcação como se o funcionário tivesse registrado determinado horário.",
        "A Portaria nº 671 proíbe a **marcação automática do ponto utilizando horários predeterminados ou o horário contratual**.",
        "Portanto, não se deve confundir a possibilidade legal de pré-assinalar o intervalo com a criação automática de marcações de ponto.",
      ],
    },
    {
      title: "Como funciona o intervalo pré-assinalado na prática?",
      paragraphs: [
        "Imagine uma empresa em que determinado funcionário possui: **Jornada:** 08:00 às 17:00 — **Intervalo previsto:** 12:00 às 13:00",
        "Com o intervalo pré-assinalado, o controle pode apresentar:",
      ],
      table: {
        headers: ["Horário", "Tipo"],
        rows: [
          ["08:00", "Entrada registrada"],
          ["12:00", "Intervalo pré-assinalado"],
          ["13:00", "Intervalo pré-assinalado"],
          ["17:00", "Saída registrada"],
        ],
      },
      closingParagraphs: [
        "O funcionário não precisa necessariamente registrar 12:00 e 13:00.",
        "O período já está indicado no controle.",
        "Mas isso não significa que o funcionário possa ser impedido de informar uma ocorrência real.",
        "Se o intervalo efetivamente realizado foi diferente, a situação precisa poder ser tratada corretamente.",
      ],
    },
    {
      title: "O funcionário precisa bater o ponto no intervalo?",
      paragraphs: [
        "Quando a empresa adota validamente a **pré-assinalação do intervalo intrajornada**, o funcionário pode ser dispensado da marcação específica do início e do término desse intervalo.",
        "A própria legislação prevê essa possibilidade.",
        "O Ministério do Trabalho e Emprego esclarece que, quando a empresa adota a pré-assinalação prevista no artigo 74, § 2º, da CLT, as marcações correspondentes ao intervalo devem constar do **Espelho de Ponto** e também do **Arquivo Eletrônico de Jornada (AEJ)**.",
        "Portanto, não é necessário interpretar a ausência dessas duas marcações feitas manualmente pelo funcionário como ausência de intervalo.",
      ],
    },
    {
      title: "A empresa pode pré-assinalar o intervalo para todos os funcionários?",
      paragraphs: [
        "A pré-assinalação pode ser adotada no controle de jornada, mas o horário indicado precisa representar o intervalo que a empresa efetivamente estabelece para a jornada.",
        "Não basta criar um intervalo fictício para todos os funcionários independentemente de suas jornadas.",
        "Por exemplo, uma empresa possui:",
        "**Funcionário A:** 08:00–17:00 — **Intervalo:** 12:00–13:00",
        "**Funcionário B:** 09:00–18:00 — **Intervalo:** 13:00–14:00",
        "Os dois podem ter intervalos pré-assinalados, mas os horários podem ser diferentes.",
        "O sistema precisa refletir a jornada e o intervalo aplicáveis a cada empregado.",
      ],
    },
    {
      title: "Pré-assinalar o intervalo significa que ele sempre aconteceu?",
      paragraphs: [
        "Não.",
        "A pré-assinalação representa o período destinado ao intervalo no controle de jornada.",
        "Ela não transforma automaticamente uma situação diferente em uma marcação real.",
        "Imagine que o intervalo esteja pré-assinalado das 12:00 às 13:00, mas o funcionário, por uma ocorrência específica, tenha realizado o intervalo das 12:30 às 13:00.",
        "O sistema precisa possuir uma forma adequada de tratar a divergência, preservando a realidade da jornada.",
        "A pré-assinalação não deve ser usada para esconder o horário efetivamente realizado.",
      ],
    },
    {
      title: "O funcionário pode trabalhar durante o intervalo pré-assinalado?",
      paragraphs: [
        "A pré-assinalação não autoriza o empregador a eliminar o intervalo.",
        "Ela apenas dispensa a marcação específica do início e do fim do período de repouso quando adotada essa modalidade.",
        "O direito ao intervalo continua existindo.",
        "O artigo 71 da CLT estabelece as regras gerais para o intervalo intrajornada, inclusive sua duração conforme a jornada realizada.",
        "Por isso, existe uma diferença entre:",
        "**“O intervalo não precisa ser marcado pelo funcionário.”**",
        "e",
        "**“O funcionário não precisa fazer o intervalo.”**",
        "A primeira situação pode ocorrer na pré-assinalação.",
        "A segunda não decorre da pré-assinalação.",
      ],
    },
    {
      title: "O intervalo pré-assinalado pode ter horário diferente?",
      paragraphs: [
        "Sim.",
        "O horário pré-assinalado deve acompanhar a jornada e a organização do trabalho.",
        "Por exemplo: **Jornada:** 07:00–16:00 — **Intervalo:** 11:00–12:00",
        "Outro funcionário: **Jornada:** 10:00–19:00 — **Intervalo:** 14:00–15:00",
        "Não existe uma exigência de que todos os empregados de uma empresa tenham exatamente o mesmo horário de intervalo.",
        "O importante é que o controle represente o período destinado ao repouso e alimentação conforme as regras aplicáveis.",
      ],
    },
    {
      title: "Qual é a diferença entre pré-assinalação e intervalo registrado?",
      paragraphs: [
        "Na marcação tradicional, o funcionário registra o início e o término do intervalo.",
        "Por exemplo: **08:00 — entrada** — **12:03 — início do intervalo** — **13:01 — retorno** — **17:05 — saída**",
        "Nesse caso, o sistema possui as marcações efetivamente realizadas.",
        "Na pré-assinalação: **08:00 — entrada** — **12:00–13:00 — intervalo pré-assinalado** — **17:00 — saída**",
        "O intervalo já está indicado no controle.",
        "As duas formas não devem ser confundidas com a alteração ou criação artificial das marcações de entrada e saída.",
      ],
    },
    {
      title: "Pré-assinalação pode ser usada no ponto eletrônico?",
      paragraphs: [
        "Sim.",
        "A pré-assinalação pode aparecer no controle eletrônico de jornada.",
        "Entretanto, o sistema eletrônico precisa respeitar as regras da Portaria nº 671.",
        "O artigo 74 da Portaria estabelece que o sistema de registro eletrônico deve registrar fielmente as marcações realizadas e proíbe, entre outras práticas:",
      ],
      bullets: [
        "restrição de horário para marcação;",
        "marcação automática utilizando horários predeterminados;",
        "exigência de autorização prévia para marcar sobrejornada;",
        "alteração dos dados registrados pelo empregado.",
      ],
      closingParagraphs: [
        "A pré-assinalação do intervalo é uma situação específica autorizada pela legislação e não deve ser confundida com essas práticas proibidas.",
      ],
    },
    {
      title: "Como fica o espelho de ponto com intervalo pré-assinalado?",
      paragraphs: [
        "O intervalo precisa aparecer corretamente no **Espelho de Ponto**.",
        "Por exemplo:",
      ],
      table: {
        headers: ["Registro", "Horário"],
        rows: [
          ["Entrada", "08:02"],
          ["Intervalo", "12:00–13:00"],
          ["Saída", "17:06"],
        ],
      },
      closingParagraphs: [
        "A diferença é que 12:00 e 13:00 representam o intervalo pré-assinalado, e não necessariamente duas marcações realizadas pelo trabalhador naquele dia.",
        "O Ministério do Trabalho e Emprego esclarece que a pré-assinalação deve constar do Relatório de Espelho de Ponto. Não basta apenas colocar uma informação genérica no cabeçalho dizendo que a empresa adota pré-assinalação.",
      ],
    },
    {
      title: "O intervalo pré-assinalado precisa aparecer no AEJ?",
      paragraphs: [
        "Sim.",
        "Esse é um ponto particularmente importante para sistemas de ponto eletrônico.",
        "Segundo o Ministério do Trabalho e Emprego, quando a empresa adota a pré-assinalação do intervalo intrajornada prevista no artigo 74, § 2º, da CLT, as marcações devem constar tanto no **Espelho de Ponto** quanto no **AEJ — Arquivo Eletrônico de Jornada**.",
        "Ou seja, não basta o sistema mostrar o intervalo visualmente no espelho.",
        "A informação precisa ser tratada corretamente também no arquivo eletrônico correspondente.",
      ],
    },
    {
      title: "A pré-assinalação precisa aparecer apenas no cabeçalho do espelho?",
      paragraphs: [
        "Não.",
        "O MTE esclarece expressamente que não é suficiente colocar no cabeçalho do Espelho de Ponto uma informação geral dizendo que determinado funcionário possui intervalo pré-assinalado.",
        "As marcações do intervalo precisam ser inseridas previamente **nas jornadas diárias de cada empregado**, tanto no AEJ quanto no Espelho de Ponto.",
        "Isso faz diferença para a estrutura de um sistema de controle de jornada.",
        "Não é simplesmente adicionar “Intervalo pré-assinalado: sim” no topo do relatório.",
        "O período precisa aparecer associado à jornada correspondente.",
      ],
    },
    {
      title: "A pré-assinalação vale para intervalo intrajornada?",
      paragraphs: [
        "Sim.",
        "A regra mencionada no artigo 74, § 2º, trata do período destinado ao repouso ou alimentação durante a jornada.",
        "É importante não confundir essa situação com: intervalo interjornada; DSR; pausas da NR-17; períodos de sobreaviso; folgas da escala.",
        "São situações diferentes.",
        "Veja também [jornada, intervalo, DSR e sobreaviso](/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras).",
      ],
    },
    {
      title: "As pausas da NR-17 podem ser pré-assinaladas no ponto?",
      paragraphs: [
        "Não devem ser tratadas como se fossem o intervalo intrajornada comum.",
        "O próprio MTE esclarece que as pausas previstas na **NR-17** não constituem intervalo de repouso ou alimentação e, por isso, não devem ser marcadas no REP como se fossem esse tipo de intervalo. O empregador deve utilizar outra forma de controle para demonstrar o cumprimento dessas pausas.",
        "Essa distinção é importante porque nem toda pausa ocorrida durante a jornada possui a mesma natureza jurídica.",
      ],
    },
    {
      title: "Pré-assinalação elimina o intervalo?",
      paragraphs: [
        "Não.",
        "Esse é provavelmente o principal ponto da página.",
        "A pré-assinalação elimina a necessidade de o empregado realizar uma marcação específica do início e do fim do intervalo, quando adotada essa modalidade.",
        "Ela **não elimina o período de descanso**.",
        "Por exemplo: **Jornada:** 08:00–17:00 — **Intervalo pré-assinalado:** 12:00–13:00",
        "O funcionário continua tendo o período de intervalo.",
        "O que muda é a forma como esse período é registrado no controle de jornada.",
      ],
    },
    {
      title: "E se o funcionário não fizer o intervalo?",
      paragraphs: [
        "A empresa não deve utilizar a pré-assinalação como forma de simplesmente presumir que o intervalo sempre ocorreu, independentemente da realidade.",
        "Se o trabalhador não realizou o intervalo ou o realizou parcialmente, a ocorrência precisa ser tratada conforme as regras aplicáveis.",
        "O artigo 71, § 4º, da CLT estabelece consequências para a não concessão ou concessão parcial do intervalo intrajornada mínimo.",
        "Por isso, um bom sistema precisa permitir o tratamento de divergências.",
      ],
    },
    {
      title: "O funcionário pode registrar uma exceção ao intervalo pré-assinalado?",
      paragraphs: [
        "O sistema pode precisar de mecanismos para tratar situações em que a jornada efetivamente realizada não corresponde ao planejamento.",
        "Por exemplo: **Pré-assinalado:** 12:00–13:00 — **Ocorrência real:** intervalo de 12:30–13:00",
        "A solução deve permitir que a situação seja identificada e tratada de maneira adequada, sem simplesmente apagar a informação original ou criar uma marcação fictícia.",
        "Isso é especialmente importante em operações em que os horários de intervalo variam.",
      ],
    },
    {
      title: "Pré-assinalação e ponto por exceção são a mesma coisa?",
      paragraphs: [
        "Não.",
        "São conceitos diferentes.",
      ],
      subsections: [
        {
          title: "Pré-assinalação",
          paragraphs: ["O período de intervalo é previamente indicado no controle."],
        },
        {
          title: "Ponto por exceção",
          paragraphs: [
            "A empresa utiliza uma sistemática em que a jornada normal pode ser presumida e as exceções são registradas.",
          ],
        },
      ],
      closingParagraphs: [
        "O ponto por exceção possui fundamento próprio no artigo 74, § 4º, da CLT.",
        "Portanto, uma empresa pode ter pré-assinalação do intervalo sem adotar ponto por exceção.",
        "Veja [ponto por exceção](/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras).",
      ],
    },
    {
      title: "Pré-assinalação e marcação automática são a mesma coisa?",
      paragraphs: [
        "Também não.",
        "Essa diferença é especialmente importante em sistemas eletrônicos.",
        "A Portaria nº 671 proíbe a **marcação automática do ponto utilizando horários predeterminados ou o horário contratual**.",
        "A pré-assinalação, por outro lado, é uma forma prevista para indicar previamente o período de intervalo.",
        "Portanto:",
        "**Pré-assinalação:** indica o período de repouso.",
        "**Marcação automática:** cria uma marcação de ponto como se tivesse sido realizada.",
        "São coisas diferentes.",
      ],
    },
    {
      title: "A empresa pode alterar o intervalo pré-assinalado depois?",
      paragraphs: [
        "A gestão do intervalo precisa respeitar a realidade da jornada e as regras aplicáveis.",
        "No caso de sistemas eletrônicos, a Portaria 671 proíbe dispositivos que permitam alterar os dados registrados pelo empregado.",
        "Isso significa que o sistema deve separar claramente:",
      ],
      bullets: [
        "horário previsto;",
        "intervalo pré-assinalado;",
        "marcação efetivamente realizada;",
        "ajuste ou ocorrência;",
        "justificativa;",
        "tratamento realizado no ponto.",
      ],
      closingParagraphs: [
        "Essa separação melhora a rastreabilidade do controle.",
      ],
    },
    {
      title: "Como configurar intervalo pré-assinalado em um sistema de ponto?",
      paragraphs: [
        "A configuração normalmente envolve:",
      ],
      bullets: [
        "definir a jornada;",
        "definir o período de intervalo;",
        "habilitar a pré-assinalação quando aplicável;",
        "associar a jornada aos funcionários;",
        "gerar o controle de jornada com o intervalo indicado;",
        "permitir o tratamento das ocorrências;",
        "gerar corretamente o Espelho de Ponto;",
        "gerar corretamente o AEJ, quando aplicável.",
      ],
      closingParagraphs: [
        "O sistema também precisa preservar as informações necessárias para auditoria e fiscalização.",
      ],
    },
    {
      title: "Exemplo de configuração",
      paragraphs: [
        "Imagine uma empresa com a seguinte jornada:",
        "**Segunda a sexta-feira** — **Entrada:** 08:00 — **Intervalo:** 12:00–13:00 — **Saída:** 17:00",
        "Com a pré-assinalação habilitada, o funcionário registra: **08:04 — entrada** e **17:02 — saída**",
        "E o controle apresenta: **12:00–13:00 — intervalo pré-assinalado**",
        "No fechamento, o espelho pode apresentar a jornada completa, incluindo o período pré-assinalado.",
        "Se houver uma ocorrência relacionada ao intervalo, ela precisa ser tratada de acordo com a situação real e as regras da empresa.",
      ],
    },
    {
      title: "Quais são as vantagens da pré-assinalação?",
      paragraphs: [
        "A principal vantagem operacional é evitar que o trabalhador precise realizar duas marcações adicionais todos os dias para um intervalo que já está previamente definido.",
        "Isso pode simplificar o processo de registro em empresas em que os horários de intervalo são estáveis.",
        "Também pode reduzir a quantidade de marcações realizadas pelos funcionários.",
        "Mas a simplificação não significa que a empresa possa deixar de controlar situações em que a jornada efetivamente realizada diverge do previsto.",
      ],
    },
    {
      title: "Quando a pré-assinalação exige mais atenção?",
      paragraphs: [
        "Ela exige maior atenção principalmente quando os intervalos variam frequentemente.",
        "Imagine um restaurante em que o funcionário deveria fazer intervalo às 15:00, mas, dependendo do movimento, o horário muda.",
        "Se o sistema simplesmente mantiver 15:00–16:00 como intervalo pré-assinalado todos os dias, sem mecanismo adequado para tratar as situações reais, o controle pode deixar de representar corretamente a jornada.",
        "Quanto maior a variação dos horários, mais importante é que o sistema consiga registrar e tratar as exceções.",
      ],
    },
    {
      title: "O intervalo pré-assinalado pode ser usado em diferentes escalas?",
      paragraphs: [
        "Sim, desde que o intervalo seja configurado de acordo com a jornada aplicável.",
        "Uma empresa pode possuir:",
        "**Administrativo:** 08:00–17:00, intervalo 12:00–13:00",
        "**Comércio:** 09:00–18:00, intervalo 13:00–14:00",
        "**Operação:** jornada diferenciada, com intervalo conforme escala",
        "Cada jornada pode possuir sua própria configuração.",
        "A pré-assinalação não exige que todos os empregados tenham o mesmo intervalo.",
      ],
    },
    {
      title: "Como escolher um sistema de ponto com pré-assinalação?",
      paragraphs: [
        "Para uma empresa que pretende utilizar pré-assinalação, vale verificar se o sistema:",
      ],
      bullets: [
        "permite configurar intervalos por jornada;",
        "diferencia intervalo previsto e marcação realizada;",
        "gera corretamente o Espelho de Ponto;",
        "trata o intervalo no AEJ;",
        "permite registrar ocorrências;",
        "preserva as marcações realizadas;",
        "não cria marcações automáticas indevidas;",
        "permite consultar o histórico;",
        "integra as informações com a folha;",
        "mantém os registros de forma auditável.",
      ],
      closingParagraphs: [
        "A simples existência de uma opção chamada **“pré-assinalar intervalo”** não é suficiente.",
        "O comportamento do sistema precisa estar de acordo com as regras do registro de jornada.",
      ],
    },
    {
      title: "Resumo: intervalo pré-assinalado",
      paragraphs: [
        "A pré-assinalação indica o intervalo no controle de jornada; não cria marcação automática nem elimina o direito ao descanso.",
      ],
      table: {
        headers: ["Situação", "O que é", "Não confundir com"],
        rows: [
          ["Pré-assinalação", "Intervalo previamente indicado (art. 74, § 2º, CLT)", "Marcação automática do ponto"],
          ["Marcação automática", "Criar horário como se o trabalhador tivesse batido o ponto", "Prática vedada pela Portaria 671"],
          ["Espelho e AEJ", "Intervalo pré-assinalado deve constar nas jornadas diárias", "Só informar no cabeçalho do relatório"],
          ["Ponto por exceção", "Registro das exceções à jornada regular (art. 74, § 4º)", "Pré-assinalação do intervalo"],
        ],
      },
    },
    {
      title: "Conclusão",
      paragraphs: [
        "O **intervalo pré-assinalado** é uma forma de simplificar o registro do intervalo intrajornada sem exigir que o funcionário faça diariamente uma marcação de saída e outra de retorno.",
        "Mas pré-assinalar não significa registrar automaticamente.",
        "A diferença é fundamental.",
        "O período de intervalo pode ser previamente indicado no controle, enquanto as marcações efetivamente realizadas pelo trabalhador continuam precisando ser preservadas e tratadas corretamente.",
        "Em sistemas eletrônicos, essa distinção fica ainda mais importante: a Portaria nº 671 exige fidelidade das marcações e proíbe a marcação automática com horários predeterminados, enquanto o MTE determina que a pré-assinalação adotada pela empresa apareça corretamente tanto no **Espelho de Ponto** quanto no **AEJ**.",
        "Por isso, um sistema de ponto que trabalha com pré-assinalação precisa tratar separadamente **jornada prevista, intervalo pré-assinalado, marcações realizadas e eventuais ocorrências**.",
      ],
    },
  ],
  faqs: [
    {
      q: "O que é intervalo pré-assinalado?",
      a: "É o período de repouso e alimentação previamente indicado no controle de jornada, permitindo dispensar o empregado da marcação específica de início e término desse intervalo, conforme a legislação aplicável.",
    },
    {
      q: "O funcionário precisa bater ponto no horário do almoço?",
      a: "Não necessariamente. Quando a empresa adota a pré-assinalação do intervalo, o empregado pode ser dispensado de registrar o início e o término do intervalo.",
    },
    {
      q: "A pré-assinalação do intervalo é permitida?",
      a: "Sim. A possibilidade está prevista no artigo 74, § 2º, da CLT.",
    },
    {
      q: "Pré-assinalação significa que o intervalo aconteceu?",
      a: "Não. A pré-assinalação indica o período destinado ao intervalo. Ela não deve ser usada para ocultar uma situação diferente da jornada efetivamente realizada.",
    },
    {
      q: "A empresa pode colocar o mesmo intervalo para todos?",
      a: "Pode existir uma configuração comum quando os empregados realmente possuem o mesmo intervalo, mas o sistema precisa representar corretamente as jornadas e situações aplicáveis a cada trabalhador.",
    },
    {
      q: "O intervalo pré-assinalado aparece no espelho de ponto?",
      a: "Sim. O MTE esclarece que as marcações do intervalo pré-assinalado devem constar do Espelho de Ponto.",
    },
    {
      q: "O intervalo pré-assinalado precisa aparecer no AEJ?",
      a: "Sim. De acordo com o MTE, quando a empresa adota a pré-assinalação, as marcações devem ser inseridas previamente no AEJ e no Espelho de Ponto.",
    },
    {
      q: "Basta informar no cabeçalho que o intervalo é pré-assinalado?",
      a: "Não. O MTE esclarece que a informação precisa constar das jornadas diárias de cada empregado no AEJ e no Espelho de Ponto.",
    },
    {
      q: "Pré-assinalação é marcação automática?",
      a: "Não. A Portaria 671 diferencia a pré-assinalação do intervalo da marcação automática do ponto, que é proibida quando utiliza horários predeterminados ou contratuais.",
    },
    {
      q: "O funcionário pode trabalhar durante o intervalo?",
      a: "A pré-assinalação não elimina o direito ao intervalo. Se o intervalo não for concedido ou for concedido parcialmente, devem ser observadas as consequências previstas na legislação.",
    },
    {
      q: "Pré-assinalação e ponto por exceção são iguais?",
      a: "Não. São mecanismos diferentes. A pré-assinalação trata do intervalo intrajornada; o ponto por exceção possui regras próprias para o registro das exceções à jornada normal.",
    },
    {
      q: "Pausas da NR-17 podem ser pré-assinaladas como intervalo?",
      a: "Não devem ser tratadas como intervalo de repouso e alimentação no REP. O MTE esclarece que essas pausas possuem natureza diferente e devem ser controladas por outro meio.",
    },
  ],
  related: [
    {
      label: "Jornada, intervalo, DSR e sobreaviso",
      to: "/blog/jornada-intervalo-dsr-e-sobreaviso-entenda-as-regras",
    },
    {
      label: "Ponto por exceção",
      to: "/blog/ponto-por-excecao-como-funciona-quem-pode-usar-e-quais-sao-as-regras",
    },
    {
      label: "Controle de jornada",
      to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios",
    },
    {
      label: "O que é AFD e AEJ",
      to: "/blog/o-que-e-afd-e-aej",
    },
  ],
};
