import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/feriado-trabalhado";
const BLOG_DOMINGO = "/blog/como-calcular-domingo-trabalhado";

export const comoCalcularFeriadoTrabalhado: BlogPost = {
  slug: "como-calcular-feriado-trabalhado",
  title: "Como calcular feriado trabalhado",
  hero: {
    titleBefore: "Como calcular",
    highlight: "feriado trabalhado",
  },
  description:
    "Como calcular feriado trabalhado: Súmula 146, folga compensatória, mensalista e horista, jornada 12x36 e exemplos de cálculo.",
  intro:
    "Como calcular o pagamento de um feriado trabalhado? Sem folga compensatória, a Súmula 146 do TST determina remuneração em dobro.",
  opening: [
    "**Como calcular o pagamento de um feriado trabalhado?** Essa é uma dúvida comum tanto para quem trabalha em um feriado quanto para empresas que precisam calcular corretamente a remuneração da equipe.",
    "Quando o trabalhador presta serviço no feriado e **não recebe outro dia de folga para compensar esse trabalho**, o feriado deve ser remunerado em dobro, conforme a Súmula 146 do TST. Quando a empresa concede outro dia de folga para compensar o feriado trabalhado, o pagamento em dobro não se aplica.",
    "Por isso, para calcular corretamente o valor, é necessário considerar a **remuneração do trabalhador, a quantidade de horas trabalhadas no feriado e se houve ou não outro dia de folga para compensar o trabalho**.",
    `A seguir, veja como funciona o cálculo do feriado trabalhado, com exemplos para entender quanto deve ser pago em cada situação. Você também pode usar a [**calculadora de feriado trabalhado**](${CALC}) para fazer a simulação.`,
  ],
  publishedAt: "2026-09-07",
  updatedAt: "2026-09-20",
  readMinutes: 12,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular feriado trabalhado?", rotulo: "Cálculo básico" },
    { secao: "Feriado trabalhado sempre é pago em dobro?", rotulo: "Pagamento em dobro" },
    { secao: "Como calcular feriado trabalhado por hora?", rotulo: "Cálculo por hora" },
    { secao: "Feriado trabalhado pode ir para o banco de horas?", rotulo: "Banco de horas" },
    { secao: "Como calcular feriado trabalhado na escala 12x36?", rotulo: "Escala 12x36" },
    { secao: "Como calcular feriado trabalhado: tabela", rotulo: "Tabela" },
    { secao: "Exemplo completo: salário de R$ 3.000", rotulo: "Exemplos completos" },
  ],
  sections: [
    {
      title: "Como calcular feriado trabalhado?",
      paragraphs: [
        "Para um empregado mensalista, uma forma prática de calcular o valor de um feriado trabalhado e não compensado é:",
        "**Salário mensal ÷ 30 = valor de um dia de trabalho**",
        "Depois: **Valor do dia × 2 = valor correspondente ao trabalho em dobro**",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Um funcionário recebe **R$ 3.000 por mês**.",
            "O valor de um dia é: **R$ 3.000 ÷ 30 = R$ 100**",
            "Se ele trabalhar em um feriado sem folga compensatória: **R$ 100 × 2 = R$ 200**",
            "Nesse exemplo, a remuneração correspondente ao feriado não compensado é de **R$ 200**.",
            "O TST já registrou que, para empregado mensalista, a remuneração dos feriados já está incluída no salário mensal. Quando há trabalho nesses dias sem compensação, a dobra corresponde a mais um dia de remuneração.",
            `Simule na [calculadora de feriado trabalhado](${CALC}) no modo mensalista com salário R$ 3.000.`,
          ],
        },
      ],
    },
    {
      title: "Feriado trabalhado sempre é pago em dobro?",
      paragraphs: [
        "Não. Trabalhar no feriado não significa, por si só, que o trabalhador receberá o pagamento em dobro.",
        "Quando o feriado é compensado com uma folga em outro dia, não há a dobra prevista pela Súmula 146 do TST.",
        "Já quando o feriado é trabalhado **sem folga compensatória**, o trabalho deve ser pago em dobro, conforme a Súmula 146 do TST.",
        "**Exemplo:**",
      ],
      bullets: [
        "Feriado trabalhado + folga compensatória = não há pagamento em dobro.",
        "Feriado trabalhado + sem folga compensatória = pagamento em dobro.",
      ],
      closingParagraphs: [
        "Há regimes com regra própria — por exemplo a 12x36 (art. 59-A da CLT), em que a remuneração mensal já abrange DSR e feriados. Acordo ou convenção coletiva também podem mudar o tratamento. Por isso, antes de calcular, identifique o regime de trabalho.",
      ],
    },
    {
      title: "Como calcular feriado trabalhado por hora?",
      paragraphs: [
        "Quando o trabalhador é remunerado por hora, o cálculo pode ser feito a partir do valor da hora.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Valor da hora: **R$ 20**. Horas trabalhadas no feriado: **6 horas**.",
            "Valor normal das horas: **6 × R$ 20 = R$ 120**. Considerando a remuneração em dobro: **R$ 120 × 2 = R$ 240**.",
            "Assim, o valor correspondente às 6 horas trabalhadas no feriado, sem compensação, seria **R$ 240**.",
            `Simule esse cenário na [calculadora de feriado trabalhado](${CALC}) no modo horista (R$ 20/hora e 6 horas).`,
            "A forma exata de lançamento na folha depende da remuneração do empregado e do tratamento adotado pela empresa.",
          ],
        },
      ],
    },
    {
      title: "Feriado trabalhado tem adicional de 100%?",
      paragraphs: [
        "Na prática muita gente chama de “adicional de 100%”. O nome é comum, mas a base jurídica não é a da [hora extra](/blog/como-calcular-hora-extra).",
        "A Súmula 146 do TST trata de outra coisa: trabalho em feriado **sem folga compensatória** deve ser **pago em dobro**, sem prejuízo da remuneração do repouso.",
        "**Hora extra** é tempo além da jornada. **Dobra do feriado** é trabalho no dia de repouso sem compensação. São fatos geradores diferentes.",
        "Por isso não dá para pegar qualquer batida no feriado e lançar tudo como “HE 100%” sem olhar escala, jornada e se houve folga.",
      ],
    },
    {
      title: "Como calcular feriado trabalhado com salário mensal?",
      paragraphs: [
        "Para um empregado mensalista, o cálculo básico do dia é: **Salário mensal ÷ 30**.",
        "Depois, quando houver trabalho em feriado não compensado: **Valor do dia × 2**.",
      ],
      subsections: [
        {
          title: "Exemplo",
          paragraphs: [
            "Salário: **R$ 4.500**. Valor diário: **R$ 4.500 ÷ 30 = R$ 150**. Feriado não compensado: **R$ 150 × 2 = R$ 300**.",
            "O TST já decidiu que, no caso do mensalista, o salário mensal já contempla a remuneração do feriado. Assim, a dobra do feriado não compensado representa mais um dia de remuneração.",
          ],
        },
      ],
    },
    {
      title: "Como calcular feriado trabalhado com hora extra?",
      paragraphs: [
        "Aqui é necessário separar duas situações: **trabalho no feriado** e **trabalho além da jornada normal**.",
        "Por exemplo, um funcionário possui jornada de 8 horas e trabalha 10 horas em um feriado.",
        "Não basta considerar todas as 10 horas simplesmente como horas extras de 100%.",
        "É necessário verificar jornada contratual, horas efetivamente trabalhadas, existência de folga compensatória, horas extras, acordo ou convenção coletiva e regime de trabalho.",
        "A CLT estabelece que a hora extra deve ser remunerada com adicional de pelo menos 50% sobre a hora normal, salvo regras específicas aplicáveis ao caso. Use também a [calculadora de hora extra](/calculadoras/hora-extra).",
        "Já o trabalho em feriado não compensado possui a regra específica de pagamento em dobro prevista na Súmula 146 do TST.",
      ],
    },
    {
      title: "Feriado trabalhado pode ir para o banco de horas?",
      paragraphs: [
        "A possibilidade de compensação depende do regime de compensação adotado e das regras aplicáveis ao contrato e à categoria.",
        "Quando o feriado é efetivamente compensado, deixa de existir a situação de trabalho **não compensado** tratada pela Súmula 146.",
        "Por isso, ao utilizar [banco de horas](/blog/como-funciona-o-banco-de-horas-na-pratica) ou outro mecanismo de compensação, é importante verificar se a compensação atende às regras legais e coletivas aplicáveis. Veja também a landing de [banco de horas e horas extras](/blog/como-funciona-o-banco-de-horas-na-pratica).",
      ],
    },
    {
      title: "Como calcular feriado trabalhado no ponto eletrônico?",
      paragraphs: [
        "Em um [sistema de ponto eletrônico](https://segponto.com), o cálculo começa pelas marcações efetivamente realizadas.",
        "O sistema precisa identificar: qual era o feriado; se o funcionário estava escalado; quantas horas trabalhou; se houve folga compensatória; se existe regra específica em acordo ou convenção coletiva; e se houve também horas excedentes à jornada.",
        "O simples fato de existir uma marcação no feriado não determina sozinho o valor a pagar.",
        "É a combinação entre **jornada, escala, compensação e regras aplicáveis** que determina o tratamento.",
        `Depois de classificar o dia, [simule o valor na calculadora](${CALC}).`,
      ],
    },
    {
      title: "Como calcular feriado trabalhado na escala 12x36?",
      paragraphs: [
        "A escala 12x36 possui uma regra específica na CLT.",
        "O art. 59-A estabelece que a remuneração mensal pactuada para o regime de 12 horas de trabalho por 36 horas de descanso **abrange os pagamentos devidos pelo descanso semanal remunerado e pelos feriados**, considerando também compensados os feriados e as prorrogações do trabalho noturno previstas na própria norma.",
        "Por isso, o cálculo de feriado para quem trabalha em 12x36 não deve ser feito simplesmente aplicando a fórmula geral de pagamento em dobro.",
        "É necessário verificar se o empregado realmente está submetido ao regime 12x36 previsto na CLT e se existem regras específicas em acordo ou convenção coletiva.",
      ],
    },
    {
      title: "Como calcular feriado trabalhado: tabela",
      paragraphs: [
        "A existência de acordo ou convenção coletiva pode alterar a forma de compensação ou estabelecer condições específicas.",
      ],
      table: {
        headers: ["Situação", "Tratamento"],
        rows: [
          ["Feriado trabalhado e não compensado", "Pagamento em dobro"],
          ["Feriado trabalhado com compensação", "Não há pagamento em dobro"],
          ["Hora extra em dia normal", "Pelo menos 50% de adicional"],
          ["Jornada 12x36", "Possui regras específicas na CLT"],
          [
            "Feriado trabalhado além da jornada",
            "Analisar trabalho no feriado e horas excedentes separadamente",
          ],
        ],
      },
    },
    {
      title: "Exemplo completo: salário de R$ 3.000",
      paragraphs: [
        "Imagine um trabalhador mensalista que recebe **R$ 3.000 por mês** e trabalhou um feriado durante uma jornada normal, sem receber folga compensatória.",
        "**1. Calcular o valor do dia:** R$ 3.000 ÷ 30 = R$ 100",
        "**2. Aplicar a dobra:** R$ 100 × 2 = R$ 200",
        "Nesse exemplo, o valor correspondente ao feriado trabalhado e não compensado é **R$ 200**.",
        "Isso não significa necessariamente que o empregado receberá exatamente R$ 200 adicionais no contracheque, porque o salário mensal já contém a remuneração do feriado. Para o mensalista, a dobra corresponde ao pagamento adicional decorrente do trabalho no feriado não compensado. O TST explica essa composição em sua jurisprudência.",
      ],
    },
    {
      title: "Exemplo completo: trabalhador recebe R$ 20 por hora",
      paragraphs: [
        "Agora considere um trabalhador horista que recebe **R$ 20 por hora** e trabalhou **8 horas em um feriado não compensado**.",
        "Valor normal: **8 × R$ 20 = R$ 160**. Em dobro: **R$ 160 × 2 = R$ 320**.",
        "O valor correspondente às horas trabalhadas nesse feriado, considerando a dobra, é de **R$ 320**.",
        `Simule na [calculadora de feriado trabalhado](${CALC}) no modo horista (R$ 20/hora e 8 horas).`,
        "O cálculo final da folha deve considerar a forma de remuneração e os demais componentes aplicáveis ao contrato.",
      ],
    },
    {
      title: "Como calcular feriado trabalhado na folha?",
      paragraphs: [
        "Na [folha de pagamento](/blog/como-calcular-folha-de-pagamento), o tratamento deve considerar a forma como a empresa calcula e demonstra a remuneração.",
        "Para um mensalista com salário de R$ 3.000: **valor diário = R$ 3.000 ÷ 30 = R$ 100**.",
        "Se houve um feriado não compensado: **dobra = R$ 100** (parcela adicional para completar a remuneração em dobro).",
        "Assim, o empregado terá o salário mensal normalmente e o valor adicional correspondente à dobra do feriado não compensado, observada a forma de lançamento utilizada pela folha.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular feriado trabalhado, o primeiro passo é descobrir **se houve folga compensatória**.",
        "Se o feriado foi trabalhado **sem compensação**, a regra consolidada na Súmula 146 do TST determina o pagamento em dobro.",
        "Para um empregado mensalista, o cálculo básico é: **Salário ÷ 30 = valor do dia** e **Valor do dia × 2 = valor correspondente ao trabalho não compensado**.",
        "Exemplo: salário de R$ 3.000 → R$ 3.000 ÷ 30 = R$ 100 → R$ 100 × 2 = R$ 200.",
        "Mas o cálculo não deve ser aplicado mecanicamente a qualquer trabalhador. Escalas, banco de horas, folgas compensatórias, jornada 12x36, acordos coletivos e convenções coletivas podem alterar o tratamento.",
        `Por isso, para calcular corretamente um feriado trabalhado, é necessário analisar **a jornada registrada, a escala do funcionário e se houve ou não compensação**. [Simule na calculadora](${CALC}).`,
        `Se a dúvida for sobre domingo, veja [como calcular domingo trabalhado](${BLOG_DOMINGO}).`,
      ],
    },
  ],
  faqs: [
    {
      q: "Quanto vale um feriado trabalhado?",
      a: "Para um mensalista, o valor diário é obtido dividindo o salário por 30. Se o feriado não for compensado, aplica-se a remuneração em dobro.",
    },
    {
      q: "Feriado trabalhado é 100%?",
      a: "Sem folga compensatória, o feriado trabalhado deve ser pago em dobro (Súmula 146). Com compensação válida, não há essa dobra. Regimes como 12x36 têm regra própria.",
    },
    {
      q: "Como calcular feriado trabalhado com salário de R$ 3.000?",
      a: "R$ 3.000 ÷ 30 = R$ 100 por dia. Feriado trabalhado sem compensação: R$ 100 × 2 = R$ 200. Para o mensalista, a remuneração normal do feriado já está no salário mensal.",
    },
    {
      q: "Quem trabalha 12x36 recebe feriado em dobro?",
      a: "A jornada 12x36 possui regra específica. O art. 59-A da CLT estabelece que a remuneração mensal pactuada nesse regime abrange os pagamentos relativos ao descanso semanal remunerado e aos feriados, considerados compensados.",
    },
    {
      q: "Feriado trabalhado pode ser compensado?",
      a: "Sim, desde que a compensação seja válida e respeite as regras aplicáveis ao regime de trabalho e aos instrumentos coletivos.",
    },
  ],
  related: [
    { label: "Calculadora de feriado trabalhado", to: CALC },
    { label: "Como calcular domingo trabalhado", to: BLOG_DOMINGO },
    { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
    { label: "Escalas de trabalho", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
  ],
};
