import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/domingo-trabalhado";
const BLOG_FERIADO = "/blog/como-calcular-feriado-trabalhado";

export const comoCalcularDomingoTrabalhado: BlogPost = {
  slug: "como-calcular-domingo-trabalhado",
  title: "Como calcular domingo trabalhado",
  hero: {
    titleBefore: "Como calcular",
    highlight: "domingo trabalhado",
  },
  description:
    "Como calcular domingo trabalhado: Súmula 146, folga compensatória, mensalista e horista, escalas 6x1, 5x1 e 12x36, com exemplos.",
  intro:
    "Para calcular domingo trabalhado, primeiro verifique se houve folga compensatória. Sem compensação, a regra da Súmula 146 do TST é o pagamento em dobro.",
  opening: [
    "Para calcular quanto pagar por um **domingo trabalhado**, primeiro é preciso verificar se houve **folga compensatória**.",
    "Pela regra aplicada pela Justiça do Trabalho, o trabalho prestado em domingo que **não for compensado** deve ser remunerado em dobro, sem prejuízo da remuneração correspondente ao repouso semanal. Essa orientação está consolidada na Súmula 146 do TST.",
    `Na prática, o cálculo depende da forma de remuneração do trabalhador e da quantidade de horas trabalhadas. Você também pode [simular na calculadora de domingo trabalhado](${CALC}).`,
  ],
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-18",
  readMinutes: 14,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular domingo trabalhado?", rotulo: "Cálculo básico" },
    { secao: "Domingo trabalhado sempre é pago em dobro?", rotulo: "Pagamento em dobro" },
    { secao: "Domingo trabalhado com folga compensatória: como calcular?", rotulo: "Folga compensatória" },
    { secao: "Como calcular domingo trabalhado na escala 6x1?", rotulo: "Escalas 6x1, 5x1 e 12x36" },
    { secao: "Domingo trabalhado pode ir para o banco de horas?", rotulo: "Banco de horas" },
    { secao: "Como calcular domingo trabalhado: tabela", rotulo: "Tabela" },
    { secao: "Exemplo completo: salário de R$ 3.000", rotulo: "Exemplos completos" },
  ],
  sections: [
    {
      title: "Como calcular domingo trabalhado?",
      paragraphs: [
        "Para um empregado mensalista, uma forma prática de calcular o valor de um domingo trabalhado e não compensado é:",
        "**Salário mensal ÷ 30 = valor de um dia de trabalho**",
        "Depois: **Valor do dia × 2 = valor correspondente ao trabalho em dobro**",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Um funcionário recebe **R$ 3.000 por mês**.",
            "O valor de um dia é: **R$ 3.000 ÷ 30 = R$ 100**",
            "Se ele trabalhar em um domingo sem folga compensatória: **R$ 100 × 2 = R$ 200**",
            "Nesse exemplo, a remuneração correspondente ao domingo não compensado é de **R$ 200**.",
            "O TST já registrou que, para empregado mensalista, a remuneração do descanso semanal já está incluída no salário mensal. Quando há trabalho nesse dia sem compensação, a dobra corresponde a mais um dia de remuneração.",
            `Simule na [calculadora de domingo trabalhado](${CALC}) no modo mensalista com salário R$ 3.000.`,
          ],
        },
      ],
    },
    {
      title: "Domingo trabalhado sempre é pago em dobro?",
      paragraphs: [
        "Não. Trabalhar no domingo não significa, por si só, que o trabalhador receberá o pagamento em dobro.",
        "Quando o trabalho realizado no domingo é compensado com uma folga em outro dia, não há a dobra prevista pela Súmula 146 do TST.",
        "Já quando o domingo é trabalhado **sem folga compensatória**, o trabalho deve ser pago em dobro, conforme a Súmula 146 do TST.",
        "**Exemplo:**",
      ],
      bullets: [
        "Domingo trabalhado + folga compensatória = não há pagamento em dobro.",
        "Domingo trabalhado + sem folga compensatória = pagamento em dobro.",
      ],
      closingParagraphs: [
        "Em jornadas como 6x1, o importante é verificar se o trabalhador recebeu o descanso semanal correspondente.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado por hora?",
      paragraphs: [
        "Quando o trabalhador é remunerado por hora, o cálculo pode ser feito a partir do valor da hora.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Valor da hora: **R$ 15**. Horas trabalhadas no domingo: **8 horas**.",
            "Valor normal das horas: **8 × R$ 15 = R$ 120**. Considerando a remuneração em dobro: **R$ 120 × 2 = R$ 240**.",
            "Assim, o valor correspondente às 8 horas trabalhadas no domingo, sem compensação, seria **R$ 240**.",
            `Simule esse cenário na [calculadora de domingo trabalhado](${CALC}) no modo horista (R$ 15/hora e 8 horas).`,
            "A forma exata de lançamento na folha depende da remuneração do empregado e do tratamento adotado pela empresa.",
          ],
        },
      ],
    },
    {
      title: "Domingo trabalhado tem adicional de 100%?",
      paragraphs: [
        "Na prática muita gente chama de “adicional de 100%”. O nome é comum, mas a base jurídica não é a da [hora extra](/blog/como-calcular-hora-extra).",
        "A Súmula 146 do TST trata de outra coisa: trabalho em domingo **sem folga compensatória** deve ser **pago em dobro**, sem prejuízo da remuneração do repouso.",
        "**Hora extra** é tempo além da jornada. **Dobra do domingo** é trabalho no dia de repouso sem compensação. São fatos geradores diferentes.",
        "Por isso não dá para pegar qualquer batida no domingo e lançar tudo como “HE 100%” sem olhar escala, jornada e se houve folga.",
      ],
    },
    {
      title: "Domingo trabalhado com folga compensatória: como calcular?",
      paragraphs: [
        "Se o empregado trabalha no domingo e recebe folga em outro dia para compensar o repouso, **não há pagamento em dobro** pela Súmula 146.",
        "A dobra vale para o domingo **sem** folga compensatória.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "O funcionário trabalha de segunda a sábado. Em um domingo, trabalha **08:00 às 16:00**. Na semana seguinte, recebe a folga compensatória da escala.",
            "Nesse caso o domingo foi compensado — não se aplica a dobra da Súmula 146.",
          ],
        },
      ],
    },
    {
      title: "E se trabalhar no domingo e folgar na segunda?",
      paragraphs: [
        "Depende da escala e de como o descanso semanal foi concedido.",
        "Se a folga de segunda for o descanso semanal que compensa aquele domingo, o domingo **não** entra como não compensado.",
        "Em quem trabalha por escala, não basta olhar só o dia da semana: confira **quando trabalhou** e **quando descansou**.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado na escala 6x1?",
      paragraphs: [
        "Na 6x1, o trabalhador trabalha seis dias e tem um de descanso semanal.",
        "Esse descanso não precisa cair sempre no domingo — a Constituição fala em repouso preferencialmente aos domingos.",
        "Por isso, alguém pode trabalhar num domingo e folgar noutro dia da semana.",
        "O ponto é saber se o descanso semanal foi concedido. Se foi, aquele domingo trabalhado **não** gera dobra automática. Veja também [escalas de trabalho e ponto](/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada).",
      ],
    },
    {
      title: "Como calcular domingo trabalhado na escala 5x1?",
      paragraphs: [
        "Na 5x1, o empregado trabalha cinco dias e descansa um.",
        "O descanso pode cair em dias diferentes da semana.",
        "Por isso **não** dá para tratar todo domingo trabalhado como domingo sem compensação.",
        "Olhe a escala e veja quando o descanso semanal foi dado.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado na escala 12x36?",
      paragraphs: [
        "A escala 12x36 possui uma regra específica na CLT.",
        "O art. 59-A estabelece que a remuneração mensal pactuada para o regime de 12 horas de trabalho por 36 horas de descanso **abrange os pagamentos devidos pelo descanso semanal remunerado e pelos feriados**, considerando também compensados os feriados e as prorrogações do trabalho noturno previstas na própria norma.",
        "Por isso, o cálculo de domingo para quem trabalha em 12x36 não deve ser feito simplesmente aplicando a fórmula geral de pagamento em dobro.",
        "É necessário verificar se o empregado realmente está submetido ao regime 12x36 previsto na CLT e se existem regras específicas em acordo ou convenção coletiva.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado com salário mensal?",
      paragraphs: [
        "Para um empregado mensalista, o cálculo básico do dia é: **Salário mensal ÷ 30**.",
        "Depois, quando houver trabalho em domingo não compensado: **Valor do dia × 2**.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Salário: **R$ 4.500**. Valor diário: **R$ 4.500 ÷ 30 = R$ 150**. Domingo não compensado: **R$ 150 × 2 = R$ 300**.",
            "O TST já decidiu que, no caso do mensalista, o salário mensal já contempla a remuneração do repouso semanal. Assim, a dobra do domingo não compensado representa mais um dia de remuneração.",
          ],
        },
      ],
    },
    {
      title: "Como calcular domingo trabalhado com hora extra?",
      paragraphs: [
        "Aqui é necessário separar duas situações: **trabalho no domingo** e **trabalho além da jornada normal**.",
        "Por exemplo, um funcionário possui jornada de 8 horas e trabalha 10 horas em um domingo.",
        "Não basta considerar todas as 10 horas simplesmente como horas extras de 100%.",
        "É necessário verificar jornada contratual, horas efetivamente trabalhadas, existência de folga compensatória, horas extras, acordo ou convenção coletiva e regime de trabalho.",
        "A CLT estabelece que a hora extra deve ser remunerada com adicional de pelo menos 50% sobre a hora normal, salvo regras específicas aplicáveis ao caso. Use também a [calculadora de hora extra](/calculadoras/hora-extra).",
        "Já o trabalho em domingo não compensado possui a regra específica de pagamento em dobro prevista na Súmula 146 do TST.",
      ],
    },
    {
      title: "Domingo trabalhado pode ir para o banco de horas?",
      paragraphs: [
        "A possibilidade de compensação depende do regime de compensação adotado e das regras aplicáveis ao contrato e à categoria.",
        "Quando o domingo é efetivamente compensado, deixa de existir a situação de trabalho **não compensado** tratada pela Súmula 146.",
        "Por isso, ao utilizar [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica) ou outro mecanismo de compensação, é importante verificar se a compensação atende às regras legais e coletivas aplicáveis. Veja também a landing de [banco de horas e horas extras](/blog/como-funciona-o-banco-de-horas-na-pratica).",
      ],
    },
    {
      title: "Como calcular domingo trabalhado no ponto eletrônico?",
      paragraphs: [
        "Em um [sistema de ponto eletrônico](https://segponto.com), o cálculo começa pelas marcações efetivamente realizadas.",
        "Por exemplo, no domingo: entrada 08:00, intervalo 12:00–13:00, saída 17:00 — total trabalhado **8 horas**.",
        "Depois, o sistema precisa considerar a escala e identificar se aquele domingo era dia normal de trabalho, descanso semanal, dia compensado ou dia sujeito a banco de horas.",
        "O simples fato de existir uma marcação no domingo não determina sozinho o valor a pagar.",
        "É a combinação entre **jornada, escala, compensação e regras aplicáveis** que determina o tratamento.",
        `Depois de classificar o dia, [simule o valor na calculadora](${CALC}).`,
      ],
    },
    {
      title: "Domingo trabalhado conta como hora extra?",
      paragraphs: [
        "Não necessariamente.",
        "Trabalhar no domingo não significa, por si só, que todas as horas daquele dia sejam horas extras.",
        "Um trabalhador pode estar regularmente escalado para trabalhar aos domingos.",
        "O que precisa ser analisado é se houve trabalho em dia de repouso, compensação, excesso da jornada normal e regras específicas de escala.",
        "A Constituição garante repouso semanal remunerado, preferencialmente aos domingos, e também estabelece remuneração superior para o serviço extraordinário. São direitos relacionados, mas não são a mesma coisa.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado: tabela",
      paragraphs: [
        "A existência de acordo ou convenção coletiva pode alterar a forma de compensação ou estabelecer condições específicas.",
      ],
      table: {
        headers: ["Situação", "Tratamento"],
        rows: [
          ["Domingo trabalhado e não compensado", "Pagamento em dobro"],
          ["Domingo trabalhado com folga compensatória", "Não há pagamento em dobro"],
          ["Hora extra em dia normal", "Pelo menos 50% de adicional"],
          ["Jornada 12x36", "Possui regras específicas na CLT"],
          [
            "Domingo trabalhado além da jornada",
            "Analisar trabalho no repouso e horas excedentes separadamente",
          ],
        ],
      },
    },
    {
      title: "Exemplo completo: salário de R$ 3.000",
      paragraphs: [
        "Imagine um trabalhador mensalista que recebe **R$ 3.000 por mês** e trabalhou um domingo durante uma jornada normal, sem receber folga compensatória.",
        "**1. Calcular o valor do dia:** R$ 3.000 ÷ 30 = R$ 100",
        "**2. Aplicar a dobra:** R$ 100 × 2 = R$ 200",
        "Nesse exemplo, o valor correspondente ao domingo trabalhado e não compensado é **R$ 200**.",
        "Isso não significa necessariamente que o empregado receberá exatamente R$ 200 adicionais no contracheque, porque o salário mensal já contém a remuneração do repouso. Para o mensalista, a dobra corresponde ao pagamento adicional decorrente do trabalho no dia de repouso não compensado. O TST explica essa composição em sua jurisprudência.",
      ],
    },
    {
      title: "Exemplo completo: trabalhador recebe R$ 20 por hora",
      paragraphs: [
        "Agora considere um trabalhador horista que recebe **R$ 20 por hora** e trabalhou **8 horas em um domingo não compensado**.",
        "Valor normal: **8 × R$ 20 = R$ 160**. Em dobro: **R$ 160 × 2 = R$ 320**.",
        "O valor correspondente às horas trabalhadas nesse domingo, considerando a dobra, é de **R$ 320**.",
        `Simule na [calculadora de domingo trabalhado](${CALC}) no modo horista (R$ 20/hora e 8 horas).`,
        "O cálculo final da folha deve considerar a forma de remuneração e os demais componentes aplicáveis ao contrato.",
      ],
    },
    {
      title: "Como fica o domingo trabalhado no salário?",
      paragraphs: [
        "Para o empregado mensalista, o salário já contempla a remuneração do repouso semanal.",
        "Por isso, quando há trabalho em domingo não compensado, a questão não é simplesmente acrescentar “mais dois dias” ao salário.",
        "O entendimento do TST é que o empregado mensalista já recebeu o valor correspondente ao repouso e, diante do trabalho não compensado, é devida a dobra correspondente. Em precedente analisado pelo TST, isso foi tratado como o acréscimo de **mais um dia de salário**, equivalente a 1/30 da remuneração, para completar a dobra.",
      ],
    },
    {
      title: "Como calcular domingo trabalhado na folha?",
      paragraphs: [
        "Na [folha de pagamento](/blog/como-calcular-folha-de-pagamento), o tratamento deve considerar a forma como a empresa calcula e demonstra a remuneração.",
        "Para um mensalista com salário de R$ 3.000: **valor diário = R$ 3.000 ÷ 30 = R$ 100**.",
        "Se houve um domingo não compensado: **dobra = R$ 100** (parcela adicional para completar a remuneração em dobro).",
        "Assim, o empregado terá o salário mensal normalmente e o valor adicional correspondente à dobra do domingo não compensado, observada a forma de lançamento utilizada pela folha.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular domingo trabalhado, o primeiro passo é descobrir **se houve folga compensatória**.",
        "Se o domingo foi trabalhado **sem compensação**, a regra consolidada na Súmula 146 do TST determina o pagamento em dobro.",
        "Para um empregado mensalista, o cálculo básico é: **Salário ÷ 30 = valor do dia** e **Valor do dia × 2 = valor correspondente ao trabalho não compensado**.",
        "Exemplo: salário de R$ 3.000 → R$ 3.000 ÷ 30 = R$ 100 → R$ 100 × 2 = R$ 200.",
        "Mas o cálculo não deve ser aplicado mecanicamente a qualquer trabalhador. Escalas, banco de horas, folgas compensatórias, jornada 12x36, acordos coletivos e convenções coletivas podem alterar o tratamento.",
        `Por isso, para calcular corretamente um domingo trabalhado, é necessário analisar **a jornada registrada, a escala do funcionário e se houve ou não compensação**. [Simule na calculadora](${CALC}).`,
        `Se a dúvida for sobre feriado, veja [como calcular feriado trabalhado](${BLOG_FERIADO}).`,
      ],
    },
  ],
  faqs: [
    {
      q: "Quanto vale um domingo trabalhado?",
      a: "Para um mensalista, calcula-se o valor do dia dividindo o salário por 30. Se o domingo não for compensado, aplica-se a dobra prevista para o trabalho em domingo não compensado.",
    },
    {
      q: "Domingo trabalhado é 100%?",
      a: "Não necessariamente. Sem folga compensatória, a Súmula 146 manda pagar em dobro — o que é diferente de tratar o dia só como hora extra de 100%. Com folga compensatória, não há essa dobra.",
    },
    {
      q: "Domingo trabalhado com folga compensatória tem pagamento em dobro?",
      a: "Não. Com folga compensatória, não há a dobra da Súmula 146. A dobra vale para o domingo trabalhado sem compensação.",
    },
    {
      q: "Como calcular domingo trabalhado com salário de R$ 2.000?",
      a: "R$ 2.000 ÷ 30 = R$ 66,67. Se o domingo não foi compensado: R$ 66,67 × 2 = R$ 133,34. Para o mensalista, o salário já contempla o repouso; a parcela adicional da dobra corresponde a mais um dia.",
    },
    {
      q: "Domingo trabalhado pode ser compensado?",
      a: "Sim, desde que a compensação seja válida e respeite as regras aplicáveis ao regime de trabalho e aos instrumentos coletivos.",
    },
    {
      q: "Como calcular domingo trabalhado na escala 6x1?",
      a: "Identifique o dia de descanso semanal. Se o domingo foi trabalhado e houve outro dia de descanso que compensou o repouso, não há dobra. Sem essa folga, aplica-se o pagamento em dobro.",
    },
  ],
  related: [
    { label: "Calculadora de domingo trabalhado", to: CALC },
    { label: "Como calcular feriado trabalhado", to: BLOG_FERIADO },
    { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
    { label: "Escalas de trabalho", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
  ],
};
