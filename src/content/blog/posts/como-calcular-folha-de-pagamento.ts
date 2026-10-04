import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/folha-de-pagamento";

export const comoCalcularFolhaDePagamento: BlogPost = {
  slug: "como-calcular-folha-de-pagamento",
  title: "Como calcular folha de pagamento",
  hero: { titleBefore: "Como calcular", highlight: "folha de pagamento" },
  description:
    "Como calcular folha de pagamento: salário bruto, horas extras, adicional noturno, faltas, INSS, IRRF e salário líquido.",
  intro:
    "Para calcular a folha, some o salário e os proventos, aplique os descontos (INSS, IR quando devido) e chegue ao líquido.",
  opening: [
    "Para calcular a **folha de pagamento**, é preciso considerar o salário do trabalhador, os dias trabalhados, horas extras, adicionais, descontos e demais valores que façam parte da remuneração.",
    "O cálculo começa pelo valor bruto devido ao trabalhador. Depois, são aplicados os descontos previstos, como contribuição ao INSS e, quando aplicável, Imposto de Renda. O resultado é o valor líquido que será recebido pelo trabalhador.",
    `Você também pode [simular na calculadora de folha de pagamento](${CALC}).`,
  ],
  publishedAt: "2026-04-22",
  updatedAt: "2026-09-18",
  readMinutes: 14,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular a folha de pagamento?", rotulo: "Visão geral" },
    { secao: "Como calcular salário bruto?", rotulo: "Salário bruto" },
    { secao: "Como calcular folha de pagamento com horas extras?", rotulo: "Horas extras e adicional noturno" },
    { secao: "Como calcular folha de pagamento com faltas?", rotulo: "Faltas e atrasos" },
    { secao: "Como calcular os descontos da folha de pagamento?", rotulo: "Descontos: INSS e IRRF" },
    { secao: "Como calcular o salário líquido?", rotulo: "Salário líquido" },
    { secao: "Quando deve ser paga a folha de pagamento?", rotulo: "Prazo de pagamento" },
  ],
  sections: [
    {
      title: "Como calcular a folha de pagamento?",
      paragraphs: [
        "O cálculo da folha pode ser resumido pela seguinte fórmula:",
        "**Salário bruto + adicionais + horas extras + outros proventos - descontos = salário líquido**",
        "Por exemplo, um trabalhador com salário de **R$ 3.000** que recebeu **R$ 300 de horas extras** terá:",
        "**R$ 3.000 + R$ 300 = R$ 3.300 de remuneração bruta**",
        "Sobre esse valor serão calculados os descontos aplicáveis ao trabalhador.",
        `Simule na [calculadora de folha de pagamento](${CALC}).`,
      ],
    },
    {
      title: "Como calcular salário bruto?",
      paragraphs: [
        "O salário bruto é o valor devido antes dos descontos.",
        "Para um trabalhador com salário mensal de **R$ 2.500**, sem horas extras ou outros adicionais, o salário bruto será de:",
        "**R$ 2.500**",
        "Se esse trabalhador receber **R$ 200 de adicional noturno**, o salário bruto passa a ser:",
        "**R$ 2.500 + R$ 200 = R$ 2.700**",
        "Esse valor servirá de base para os descontos e demais cálculos que dependam da remuneração.",
      ],
    },
    {
      title: "Como calcular folha de pagamento com horas extras?",
      paragraphs: [
        "As [horas extras](/blog/como-calcular-hora-extra) devem ser calculadas considerando o valor da hora normal e o adicional de hora extra aplicável.",
        "Por exemplo, considerando salário de **R$ 2.200** e jornada mensal de 220 horas:",
        "**R$ 2.200 ÷ 220 = R$ 10 por hora**",
        "Uma hora extra com adicional de 50% corresponde a:",
        "**R$ 10 × 1,5 = R$ 15**",
        "Se o trabalhador fizer 10 horas extras:",
        "**R$ 15 × 10 = R$ 150**",
        "Nesse caso, a remuneração bruta será:",
        "**R$ 2.200 + R$ 150 = R$ 2.350**",
        "O percentual pode ser diferente quando houver previsão mais favorável em acordo ou convenção coletiva.",
        "Veja também a [calculadora de hora extra](/calculadoras/hora-extra).",
      ],
    },
    {
      title: "Como calcular folha de pagamento com adicional noturno?",
      paragraphs: [
        "O [adicional noturno](/blog/como-calcular-horas-noturnas) deve ser incluído na remuneração quando o trabalhador realiza atividade durante o período noturno e a parcela for devida.",
        "No trabalho urbano, o período noturno é, em regra, das **22h às 5h**, com adicional de pelo menos 20% sobre a hora diurna.",
        "Se a hora normal vale **R$ 10**, o adicional de 20% corresponde a:",
        "**R$ 10 × 20% = R$ 2**",
        "Assim, a hora noturna será de:",
        "**R$ 10 + R$ 2 = R$ 12**",
        "O cálculo da folha deve considerar também a redução da hora noturna e as demais regras aplicáveis à jornada.",
        "Simule na [calculadora de horas noturnas](/calculadoras/horas-noturnas).",
      ],
    },
    {
      title: "Como calcular folha de pagamento com faltas?",
      paragraphs: [
        "Quando há falta injustificada que deve ser descontada, o valor correspondente aos dias não trabalhados é deduzido da remuneração.",
        "Por exemplo, considerando salário de **R$ 3.000**:",
        "**R$ 3.000 ÷ 30 = R$ 100 por dia**",
        "Uma falta corresponde a:",
        "**R$ 100**",
        "Assim, o salário antes dos demais descontos será:",
        "**R$ 3.000 - R$ 100 = R$ 2.900**",
        "O reflexo da falta no descanso semanal remunerado também deve ser observado quando aplicável.",
      ],
    },
    {
      title: "Como calcular folha de pagamento com atraso?",
      paragraphs: [
        "O atraso pode gerar desconto quando não estiver dentro das situações de tolerância ou quando não houver justificativa ou compensação aplicável.",
        "Por exemplo, se o trabalhador recebe R$ 3.000 e possui uma remuneração diária equivalente a R$ 100, um atraso de 30 minutos corresponde a uma fração do valor da hora de trabalho.",
        "O cálculo deve considerar a jornada contratada e as regras aplicáveis ao desconto.",
        "Veja também [tolerância de ponto na CLT](/blog/tolerancia-de-ponto-na-clt-quantos-minutos-o-funcionario-pode-atrasar).",
      ],
    },
    {
      title: "Como calcular folha de pagamento proporcional?",
      paragraphs: [
        "Quando o trabalhador não recebe o salário integral do mês, o valor pode ser calculado proporcionalmente aos dias trabalhados.",
        "Por exemplo, considerando salário mensal de **R$ 3.000** e 15 dias trabalhados:",
        "**R$ 3.000 ÷ 30 × 15 = R$ 1.500**",
        "Esse será o valor proporcional do salário antes dos demais proventos e descontos.",
      ],
    },
    {
      title: "Como calcular os descontos da folha de pagamento?",
      paragraphs: [
        "Depois de calcular os valores brutos, são aplicados os descontos correspondentes.",
        "Entre os descontos que podem aparecer na folha estão a contribuição previdenciária do empregado, Imposto de Renda quando devido, vale-transporte dentro dos limites legais, faltas, atrasos, pensão alimentícia e outros descontos autorizados ou previstos em lei.",
        "O valor líquido será obtido depois da aplicação dos descontos:",
        "**Remuneração bruta - descontos = salário líquido**",
      ],
    },
    {
      title: "Como calcular o INSS na folha de pagamento?",
      paragraphs: [
        "A contribuição previdenciária do empregado é calculada conforme as **faixas e alíquotas progressivas vigentes**.",
        "Por isso, não basta simplesmente aplicar uma única alíquota sobre todo o salário. Cada faixa da remuneração é considerada de acordo com as regras previdenciárias do período.",
        "O valor descontado do trabalhador é informado na folha e recolhido pelo empregador conforme as obrigações aplicáveis.",
      ],
    },
    {
      title: "Como calcular o IRRF na folha de pagamento?",
      paragraphs: [
        "O Imposto de Renda Retido na Fonte, quando devido, é calculado sobre a base de cálculo do imposto após as deduções permitidas pela legislação.",
        "Por isso, o salário bruto não é necessariamente o mesmo valor utilizado diretamente para calcular o IRRF.",
        "A tabela e as regras de dedução devem ser verificadas de acordo com o ano e o período da folha.",
        "Veja a [calculadora de imposto de renda](/calculadoras/imposto-de-renda) e [como calcular imposto de renda](/blog/como-calcular-imposto-de-renda).",
      ],
    },
    {
      title: "Como calcular o salário líquido?",
      paragraphs: [
        "O salário líquido é o valor que o trabalhador efetivamente recebe depois dos descontos.",
        "Por exemplo, se a remuneração bruta for de **R$ 3.500** e os descontos totalizarem **R$ 400**:",
        "**R$ 3.500 - R$ 400 = R$ 3.100**",
        "Nesse exemplo, o salário líquido será de **R$ 3.100**.",
      ],
    },
    {
      title: "O que entra na folha de pagamento?",
      paragraphs: [
        "A folha de pagamento pode incluir salário, horas extras, adicional noturno, adicional de insalubridade, adicional de periculosidade, comissões, gratificações, descanso semanal remunerado, [férias](/blog/como-calcular-ferias), 13º salário e outras verbas, conforme a situação do trabalhador.",
        "Também são registrados os descontos e encargos relacionados à remuneração.",
      ],
    },
    {
      title: "Qual a diferença entre folha de pagamento e salário líquido?",
      paragraphs: [
        "A folha de pagamento é o conjunto de informações utilizadas para apurar a remuneração do trabalhador e os respectivos descontos e encargos.",
        "Já o salário líquido é apenas o valor que será efetivamente pago ao trabalhador depois dos descontos aplicáveis.",
        "Por exemplo, uma folha pode apresentar **R$ 3.500 de remuneração bruta**, **R$ 400 de descontos** e **R$ 3.100 de salário líquido**.",
      ],
    },
    {
      title: "Como calcular folha de pagamento mensal?",
      paragraphs: [
        "Para uma folha mensal, primeiro são apurados o salário e os demais proventos do trabalhador. Em seguida, são calculados os descontos e o valor líquido.",
        "Por exemplo, considerando um salário de **R$ 3.000** e **R$ 200 de horas extras**:",
        "**R$ 3.000 + R$ 200 = R$ 3.200 brutos**",
        "Depois, são aplicados os descontos correspondentes àquele trabalhador e à competência.",
        "O valor restante será o salário líquido a ser pago.",
        "O [fechamento do ponto](/blog/como-fechar-o-ponto-do-mes) ajuda a alimentar corretamente a folha.",
      ],
    },
    {
      title: "Quando deve ser paga a folha de pagamento?",
      paragraphs: [
        "O salário mensal deve ser pago até o **5º dia útil do mês seguinte ao trabalhado**, conforme a regra geral prevista na legislação trabalhista.",
        "O empregador também deve cumprir as obrigações relacionadas ao fechamento da folha, aos encargos e às informações exigidas pelos sistemas oficiais.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular a folha de pagamento, primeiro são apurados o **salário e os demais proventos**, como horas extras, adicionais e comissões. Depois são aplicados os descontos correspondentes, chegando ao valor líquido.",
        "A fórmula básica é:",
        "**Salário bruto + proventos - descontos = salário líquido**",
        "O cálculo final depende da remuneração, da jornada, das ocorrências do mês e das regras trabalhistas e tributárias aplicáveis ao trabalhador.",
        `Use a [calculadora de folha de pagamento](${CALC}) para simular o bruto e o líquido.`,
      ],
    },
  ],
  faqs: [
    {
      q: "Como calcular uma folha de pagamento?",
      a: "Some o salário e os demais proventos, como horas extras e adicionais, e depois desconte os valores aplicáveis ao trabalhador.",
    },
    {
      q: "O que é salário bruto?",
      a: "É a remuneração antes dos descontos.",
    },
    {
      q: "O que é salário líquido?",
      a: "É o valor que o trabalhador recebe depois dos descontos.",
    },
    {
      q: "Quais descontos podem aparecer na folha?",
      a: "Podem existir descontos de INSS, IRRF, vale-transporte, faltas, atrasos, pensão alimentícia e outros valores previstos em lei ou autorizados.",
    },
    {
      q: "Hora extra entra na folha de pagamento?",
      a: "Sim. As horas extras devidas devem ser incluídas na remuneração da competência correspondente.",
    },
    {
      q: "Adicional noturno entra na folha?",
      a: "Sim. Quando devido, o adicional noturno deve ser considerado no cálculo da remuneração.",
    },
    {
      q: "Quando o salário deve ser pago?",
      a: "Na regra geral, o salário mensal deve ser pago até o **5º dia útil do mês seguinte ao trabalhado**.",
    },
  ],
  related: [
    { label: "Calculadora de folha de pagamento", to: CALC },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
    { label: "Como calcular horas noturnas", to: "/blog/como-calcular-horas-noturnas" },
    { label: "Como fechar o ponto do mês", to: "/blog/como-fechar-o-ponto-do-mes" },
  ],
};
