import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/horas-noturnas";

export const comoCalcularHorasNoturnas: BlogPost = {
  slug: "como-calcular-horas-noturnas",
  title: "Como calcular horas noturnas",
  hero: { titleBefore: "Como calcular", highlight: "horas noturnas" },
  description:
    "Como calcular horas noturnas: período 22h–5h, hora de 52min30s, adicional de 20%, exemplos com salários e prorrogação após as 5h.",
  intro:
    "Para calcular horas noturnas, considere o horário trabalhado, a hora reduzida de 52min30s e o adicional noturno de pelo menos 20% no trabalho urbano.",
  opening: [
    "Para calcular as **horas noturnas**, é preciso considerar o horário trabalhado, a duração da hora noturna e o adicional noturno previsto para a jornada.",
    "No trabalho urbano, considera-se noturno o trabalho realizado entre **22h e 5h do dia seguinte**. Nesse período, a hora noturna é reduzida para **52 minutos e 30 segundos**, o que significa que 7 horas trabalhadas no período noturno correspondem a 8 horas de trabalho para fins de cálculo.",
    "Além disso, o trabalhador urbano tem direito a um **adicional noturno de pelo menos 20%** sobre o valor da hora diurna, salvo condições mais favoráveis previstas em norma coletiva.",
    `Você também pode [simular na calculadora de horas noturnas](${CALC}).`,
  ],
  publishedAt: "2026-05-20",
  updatedAt: "2026-09-18",
  readMinutes: 12,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular uma hora noturna?", rotulo: "Hora noturna reduzida" },
    { secao: "Como calcular o adicional noturno?", rotulo: "Adicional noturno" },
    { secao: "Como calcular horas noturnas com salário de R$ 2.000?", rotulo: "Exemplos por salário" },
    { secao: "Como calcular horas noturnas depois das 5h?", rotulo: "Depois das 5h" },
    { secao: "Como calcular horas noturnas e horas extras?", rotulo: "Com horas extras" },
    { secao: "Como calcular horas noturnas na escala 12x36?", rotulo: "Escala 12x36" },
    { secao: "Como calcular horas noturnas no eSocial?", rotulo: "No eSocial" },
  ],
  sections: [
    {
      title: "Como calcular uma hora noturna?",
      paragraphs: [
        "O primeiro passo é encontrar o valor da hora normal. Para um empregado com salário de **R$ 2.200** e jornada mensal de 220 horas:",
        "**R$ 2.200 ÷ 220 = R$ 10 por hora**",
        "Considerando o adicional noturno de 20%:",
        "**R$ 10 × 20% = R$ 2**",
        "Assim, o valor da hora noturna será:",
        "**R$ 10 + R$ 2 = R$ 12**",
        "Esse cálculo considera apenas o adicional noturno. A redução da hora noturna também precisa ser considerada na quantidade de horas computadas.",
        `Simule na [calculadora de horas noturnas](${CALC}) com salário R$ 2.200.`,
      ],
    },
    {
      title: "Como calcular as horas noturnas com a hora reduzida?",
      paragraphs: [
        "No trabalho urbano, cada hora noturna corresponde a **52 minutos e 30 segundos**.",
        "Por isso, o período entre **22h e 5h**, que possui 7 horas no relógio, corresponde a 8 horas noturnas para fins de cálculo.",
        "A conversão pode ser feita pela fórmula:",
        "**Horas reais ÷ 52,5 × 60 = horas noturnas**",
        "Por exemplo, 7 horas trabalhadas entre 22h e 5h:",
        "**7 × 60 ÷ 52,5 = 8 horas**",
        "Assim, as 7 horas efetivamente trabalhadas correspondem a **8 horas noturnas**.",
      ],
    },
    {
      title: "Como calcular o adicional noturno?",
      paragraphs: [
        "O adicional noturno urbano corresponde, na regra geral, a pelo menos **20% do valor da hora diurna**.",
        "Se a hora normal vale **R$ 10**, o adicional será:",
        "**R$ 10 × 20% = R$ 2**",
        "Portanto, cada hora noturna terá valor de:",
        "**R$ 10 + R$ 2 = R$ 12**",
        "O percentual pode ser superior quando houver previsão em acordo ou convenção coletiva.",
      ],
    },
    {
      title: "Como calcular horas noturnas com salário de R$ 2.000?",
      paragraphs: [
        "Considerando salário de **R$ 2.000** e jornada mensal de 220 horas:",
        "**R$ 2.000 ÷ 220 = R$ 9,09**",
        "Adicional noturno de 20%:",
        "**R$ 9,09 × 20% = R$ 1,82**",
        "Valor da hora noturna:",
        "**R$ 9,09 + R$ 1,82 = R$ 10,91**",
        "Esse valor corresponde à hora normal acrescida do adicional noturno, sem considerar outros adicionais ou parcelas que possam fazer parte da remuneração.",
      ],
    },
    {
      title: "Como calcular horas noturnas com salário de R$ 3.000?",
      paragraphs: [
        "Com salário de **R$ 3.000** e jornada mensal de 220 horas:",
        "**R$ 3.000 ÷ 220 = R$ 13,64**",
        "O adicional noturno de 20% será:",
        "**R$ 13,64 × 20% = R$ 2,73**",
        "Assim, o valor da hora noturna será aproximadamente:",
        "**R$ 13,64 + R$ 2,73 = R$ 16,37**",
      ],
    },
    {
      title: "Como calcular 8 horas de trabalho noturno?",
      paragraphs: [
        "Considere um funcionário que trabalha das **22h às 5h**.",
        "Esse período possui 7 horas no relógio, mas, devido à redução da hora noturna, corresponde a **8 horas noturnas** para fins de cálculo.",
        "Se a hora normal vale **R$ 10**, o adicional noturno de 20% acrescenta R$ 2 por hora.",
        "Assim:",
        "**8 × R$ 12 = R$ 96**",
        "Nesse exemplo, o valor correspondente às 8 horas noturnas, considerando apenas o salário-base e o adicional noturno, será de **R$ 96**.",
      ],
    },
    {
      title: "Como calcular horas noturnas depois das 5h?",
      paragraphs: [
        "Quando a jornada começa durante o período noturno e continua depois das **5h**, é necessário observar as regras aplicáveis à prorrogação do trabalho noturno.",
        "A CLT estabelece que, cumprida integralmente a jornada no período noturno e prorrogada esta, também é devido o adicional quanto às horas prorrogadas.",
        "Por exemplo, um empregado que trabalha das **22h às 7h** terá as horas trabalhadas após as 5h analisadas como prorrogação do trabalho noturno, desde que atendidos os requisitos legais.",
      ],
    },
    {
      title: "Como calcular horas noturnas e horas extras?",
      paragraphs: [
        "Quando o empregado trabalha além da jornada e essas horas também são realizadas no período noturno, podem existir tanto o adicional noturno quanto o adicional de hora extra.",
        "Nesse caso, o cálculo deve considerar os adicionais devidos de forma conjunta, conforme a legislação e as regras coletivas aplicáveis.",
        "Por exemplo, se a hora normal vale **R$ 10**, o adicional noturno de 20% eleva a hora para **R$ 12**. Sobre uma hora extra noturna, aplica-se também o adicional de hora extra previsto para a situação.",
        "Veja também [como calcular hora extra](/blog/como-calcular-hora-extra) e a [calculadora de hora extra](/calculadoras/hora-extra).",
      ],
    },
    {
      title: "Como calcular horas noturnas na escala 12x36?",
      paragraphs: [
        "Na jornada **12x36**, também deve ser observado o trabalho realizado durante o período noturno.",
        "As horas trabalhadas entre **22h e 5h** seguem a regra da hora noturna reduzida no trabalho urbano, além do adicional noturno devido.",
        "Se a jornada avançar além das 5h, é necessário verificar também as regras aplicáveis à prorrogação do trabalho noturno e à jornada adotada.",
      ],
    },
    {
      title: "Como calcular horas noturnas no domingo ou feriado?",
      paragraphs: [
        "Quando o trabalho noturno também ocorre em domingo ou feriado, podem existir outras parcelas decorrentes da jornada, dependendo da forma como o trabalho é compensado e das regras aplicáveis.",
        "Por isso, o cálculo não deve considerar apenas o adicional noturno. É necessário verificar também eventual pagamento em dobro, adicional de hora extra e as regras previstas em acordo ou convenção coletiva.",
        "Confira [como calcular domingo trabalhado](/blog/como-calcular-domingo-trabalhado) e [como calcular feriado trabalhado](/blog/como-calcular-feriado-trabalhado).",
      ],
    },
    {
      title: "Como calcular horas noturnas no eSocial?",
      paragraphs: [
        "No eSocial, as informações relacionadas à remuneração do trabalho noturno são registradas conforme a jornada e as parcelas devidas ao trabalhador.",
        "O empregador deve informar corretamente as verbas correspondentes ao adicional noturno e às demais parcelas que façam parte da remuneração.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular as horas noturnas, é necessário considerar o valor da hora normal, o adicional noturno e a redução da hora noturna.",
        "No trabalho urbano, o período entre **22h e 5h** possui hora reduzida de **52 minutos e 30 segundos**, e o adicional noturno é de pelo menos **20%** sobre a hora diurna.",
        "Por exemplo, com salário de **R$ 2.200** e jornada de 220 horas mensais:",
        "**R$ 2.200 ÷ 220 = R$ 10**",
        "Adicional noturno:",
        "**R$ 10 × 20% = R$ 2**",
        "Hora noturna:",
        "**R$ 10 + R$ 2 = R$ 12**",
        "Em situações envolvendo horas extras, prorrogação após as 5h, domingos, feriados, escalas especiais ou normas coletivas, o cálculo pode incluir outras regras e adicionais.",
        `Use a [calculadora de horas noturnas](${CALC}) para simular o adicional e a hora reduzida.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Qual horário é considerado noturno?",
      a: "No trabalho urbano, o período noturno é aquele realizado entre **22h e 5h do dia seguinte**.",
    },
    {
      q: "Quanto vale uma hora noturna?",
      a: "A hora noturna tem duração reduzida para **52 minutos e 30 segundos** e, no trabalho urbano, possui adicional de pelo menos **20%** sobre a hora diurna.",
    },
    {
      q: "Quantos minutos tem a hora noturna?",
      a: "A hora noturna urbana corresponde a **52 minutos e 30 segundos**.",
    },
    {
      q: "Quem trabalha à noite ganha quanto a mais?",
      a: "No trabalho urbano, o adicional noturno é de pelo menos **20% sobre o valor da hora diurna**, salvo percentual mais favorável previsto em norma coletiva.",
    },
    {
      q: "Das 22h às 5h são quantas horas noturnas?",
      a: "São 7 horas no relógio, mas esse período corresponde a **8 horas noturnas** devido à redução da hora noturna.",
    },
    {
      q: "O adicional noturno é obrigatório?",
      a: "Sim, para o trabalho urbano realizado no período noturno definido pela legislação, é devido adicional de pelo menos **20%**, observadas as regras aplicáveis à categoria.",
    },
  ],
  related: [
    { label: "Calculadora de horas noturnas", to: CALC },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
    { label: "Domingo trabalhado", to: "/blog/como-calcular-domingo-trabalhado" },
    { label: "Feriado trabalhado", to: "/blog/como-calcular-feriado-trabalhado" },
  ],
};
