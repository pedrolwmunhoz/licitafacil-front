import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/fgts";

export const comoCalcularFgts: BlogPost = {
  slug: "como-calcular-fgts",
  title: "Como calcular FGTS",
  hero: { titleBefore: "Como calcular", highlight: "FGTS" },
  description:
    "Como calcular FGTS: depósito de 8% (ou 2% no aprendiz), proporcional, horas extras, férias, 13º e multa de 40%. Não é descontado do salário.",
  intro:
    "O FGTS é depósito do empregador na conta vinculada do trabalhador. Em geral corresponde a 8% da remuneração; no aprendizado, 2%.",
  opening: [
    "O **FGTS (Fundo de Garantia do Tempo de Serviço)** é um direito dos trabalhadores contratados pelo regime da CLT. O valor não é descontado do salário do empregado. O depósito é uma obrigação do empregador e deve ser realizado mensalmente na conta vinculada do trabalhador.",
    "Para a maioria dos empregados, o depósito corresponde a **8% da remuneração**. No caso do contrato de aprendizagem, a alíquota é de **2%**.",
    `Você também pode [simular na calculadora de FGTS](${CALC}).`,
  ],
  publishedAt: "2026-09-18",
  updatedAt: "2026-09-18",
  readMinutes: 12,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular o FGTS?", rotulo: "Fórmula básica" },
    { secao: "Passo a passo para calcular o FGTS", rotulo: "Passo a passo" },
    { secao: "Como calcular o FGTS proporcional?", rotulo: "FGTS proporcional" },
    { secao: "Como calcular o FGTS sobre horas extras?", rotulo: "Horas extras, férias e 13º" },
    { secao: "Como calcular o FGTS acumulado?", rotulo: "FGTS acumulado" },
    { secao: "Como calcular a multa de 40% do FGTS?", rotulo: "Multa de 40%" },
    { secao: "Quem paga o FGTS?", rotulo: "Quem paga" },
  ],
  sections: [
    {
      title: "Como calcular o FGTS?",
      paragraphs: [
        "O cálculo básico do FGTS é feito aplicando a alíquota sobre a remuneração que integra a base de cálculo.",
        "A fórmula é:",
        "**Remuneração × 8% = valor do FGTS**",
        "Por exemplo, se um funcionário recebe R$ 3.000:",
        "**R$ 3.000 × 8% = R$ 240**",
        "Nesse caso, o empregador deverá depositar **R$ 240 de FGTS** na conta vinculada do trabalhador.",
        "O valor de R$ 240 não é descontado dos R$ 3.000 recebidos pelo funcionário.",
        `Simule na [calculadora de FGTS](${CALC}).`,
      ],
    },
    {
      title: "Passo a passo para calcular o FGTS",
      paragraphs: [
        "Para calcular o FGTS corretamente, primeiro é necessário identificar a remuneração do trabalhador e as verbas que fazem parte da base de cálculo.",
        "Depois, deve-se verificar a alíquota aplicável ao contrato e multiplicar a base de cálculo por esse percentual.",
        "Para um empregado comum:",
        "**1. Identifique a remuneração**",
        "**2. Some as verbas que integram a base do FGTS**",
        "**3. Aplique a alíquota de 8%**",
        "**4. Encontre o valor do depósito**",
        "Por exemplo, considerando um salário de R$ 3.000 e R$ 400 de horas extras:",
        "**R$ 3.000 + R$ 400 = R$ 3.400**",
        "**R$ 3.400 × 8% = R$ 272**",
        "Nesse exemplo, o depósito de FGTS será de **R$ 272**.",
      ],
    },
    {
      title: "Como calcular o FGTS sobre o salário?",
      paragraphs: [
        "Quando o trabalhador recebe apenas o salário e não possui outras verbas que alterem a base de cálculo, o cálculo é simples.",
        "Para um salário de R$ 4.000:",
        "**R$ 4.000 × 8% = R$ 320**",
        "Portanto, o empregador deverá depositar **R$ 320 de FGTS** naquele mês.",
      ],
    },
    {
      title: "Como calcular o FGTS proporcional?",
      paragraphs: [
        "O **FGTS proporcional** é calculado quando o trabalhador recebe apenas uma parte do salário no mês, como acontece quando o empregado é contratado ou desligado durante o mês.",
        "Primeiro, calcula-se a remuneração correspondente aos dias trabalhados. Depois, aplica-se a alíquota do FGTS.",
        "Por exemplo, considere um funcionário com salário mensal de **R$ 3.000** que trabalhou **15 dias** no mês.",
        "Primeiro, calcula-se o valor correspondente a um dia de salário:",
        "**R$ 3.000 ÷ 30 = R$ 100**",
        "Depois, calcula-se a remuneração dos 15 dias:",
        "**R$ 100 × 15 = R$ 1.500**",
        "Agora, aplica-se o FGTS:",
        "**R$ 1.500 × 8% = R$ 120**",
        "Nesse caso, o depósito proporcional de FGTS será de **R$ 120**.",
        "O mesmo princípio é utilizado quando o contrato termina antes do final do mês: o FGTS é calculado sobre a remuneração devida pelo período trabalhado.",
      ],
    },
    {
      title: "Como calcular o FGTS sobre horas extras?",
      paragraphs: [
        "As [**horas extras**](/blog/como-calcular-hora-extra) podem integrar a remuneração utilizada para o cálculo do FGTS.",
        "Por exemplo, se o trabalhador recebe R$ 3.000 de salário e R$ 500 de horas extras:",
        "**R$ 3.000 + R$ 500 = R$ 3.500**",
        "O FGTS será:",
        "**R$ 3.500 × 8% = R$ 280**",
        "Nesse exemplo, o depósito correspondente ao mês será de **R$ 280**.",
      ],
    },
    {
      title: "Como calcular o FGTS sobre adicional noturno?",
      paragraphs: [
        "O [**adicional noturno**](/blog/como-calcular-horas-noturnas) também pode integrar a remuneração utilizada como base para o FGTS.",
        "Por exemplo, considerando um salário de R$ 3.000 e R$ 300 de adicional noturno:",
        "**R$ 3.000 + R$ 300 = R$ 3.300**",
        "O cálculo será:",
        "**R$ 3.300 × 8% = R$ 264**",
        "Nesse caso, o depósito de FGTS será de **R$ 264**.",
      ],
    },
    {
      title: "Como calcular o FGTS sobre férias?",
      paragraphs: [
        "A remuneração das [férias](/blog/como-calcular-ferias) está sujeita ao depósito do FGTS, observadas as regras aplicáveis às parcelas que compõem a base de cálculo.",
        "Considerando, por exemplo, um salário de R$ 3.000 e o adicional de 1/3 de férias de R$ 1.000:",
        "**R$ 3.000 + R$ 1.000 = R$ 4.000**",
        "Aplicando 8%:",
        "**R$ 4.000 × 8% = R$ 320**",
        "O cálculo efetivo deve considerar as verbas que compõem a base do FGTS no período.",
      ],
    },
    {
      title: "Como calcular o FGTS sobre o 13º salário?",
      paragraphs: [
        "O **13º salário** também gera depósito de FGTS.",
        "Por exemplo, considerando um 13º salário de R$ 3.000:",
        "**R$ 3.000 × 8% = R$ 240**",
        "Nesse caso, o depósito de FGTS correspondente ao 13º será de **R$ 240**.",
        "Quando o trabalhador recebe apenas uma parte do 13º salário, o FGTS também será calculado sobre o valor correspondente à parcela devida.",
      ],
    },
    {
      title: "Como calcular o FGTS acumulado?",
      paragraphs: [
        "Para calcular uma estimativa dos depósitos de FGTS realizados durante vários meses, basta somar os valores depositados em cada período.",
        "Por exemplo, se o empregador deposita R$ 240 por mês durante 12 meses:",
        "**R$ 240 × 12 = R$ 2.880**",
        "Nesse exemplo, o total de depósitos será de **R$ 2.880**.",
        "O saldo da conta do FGTS pode ser diferente desse valor porque também podem existir rendimentos, depósitos de outros períodos e movimentações realizadas pelo trabalhador.",
      ],
    },
    {
      title: "Como calcular a multa de 40% do FGTS?",
      paragraphs: [
        "Na demissão sem justa causa, existe a **multa rescisória de 40%** sobre a base de cálculo prevista para a rescisão.",
        "De forma simplificada:",
        "**Base para a multa × 40% = multa do FGTS**",
        "Por exemplo, considerando uma base de R$ 20.000:",
        "**R$ 20.000 × 40% = R$ 8.000**",
        "Nesse exemplo, a multa será de **R$ 8.000**.",
        "O cálculo da rescisão deve considerar a base correta para a multa e os depósitos que devem integrar essa apuração.",
      ],
    },
    {
      title: "O FGTS é descontado do salário?",
      paragraphs: [
        "Não. O FGTS é uma obrigação do empregador e não deve ser descontado do salário do trabalhador.",
        "Por exemplo, se o empregado recebe R$ 3.000 e o depósito de FGTS é de R$ 240, ele continua recebendo os R$ 3.000 de remuneração, considerando os demais descontos legais aplicáveis.",
        "Os R$ 240 são depositados separadamente pelo empregador na conta vinculada do FGTS.",
      ],
    },
    {
      title: "Qual é a porcentagem do FGTS?",
      paragraphs: [
        "Para a maioria dos empregados, o depósito mensal corresponde a **8% da remuneração**.",
        "No contrato de aprendizagem, a alíquota é de **2%**.",
        "A alíquota deve ser aplicada sobre a base de cálculo correspondente ao tipo de contrato e às verbas que estão sujeitas ao FGTS.",
      ],
    },
    {
      title: "Quem paga o FGTS?",
      paragraphs: [
        "O **empregador** é responsável pelo depósito do FGTS.",
        "O trabalhador não precisa realizar o pagamento diretamente e o valor não deve ser descontado de sua remuneração como acontece com outras obrigações da folha, como a [contribuição previdenciária](/blog/como-calcular-inss).",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular o FGTS, é necessário identificar a remuneração que compõe a base de cálculo e aplicar a alíquota correspondente ao contrato.",
        "Para a maioria dos empregados, a fórmula é:",
        "**Remuneração sujeita ao FGTS × 8% = depósito de FGTS**",
        "Quando o trabalhador recebe apenas parte do salário no mês, o cálculo deve ser feito sobre a remuneração proporcional aos dias trabalhados.",
        "Além do salário, outras verbas podem integrar a base de cálculo, como horas extras, adicional noturno, férias e 13º salário, conforme as regras aplicáveis a cada parcela.",
        `Use a [calculadora de FGTS](${CALC}) para estimar o depósito mensal e a multa de 40%.`,
      ],
    },
  ],
  faqs: [
    {
      q: "O FGTS é descontado do salário?",
      a: "Não. O FGTS é pago pelo empregador e depositado na conta vinculada do trabalhador.",
    },
    {
      q: "Quanto é o FGTS de um salário de R$ 2.000?",
      a: "Considerando a alíquota de 8%: **R$ 2.000 × 8% = R$ 160**.",
    },
    {
      q: "Quanto é o FGTS de um salário de R$ 3.000?",
      a: "Considerando a alíquota de 8%: **R$ 3.000 × 8% = R$ 240**.",
    },
    {
      q: "Quanto é o FGTS de um salário de R$ 5.000?",
      a: "Considerando a alíquota de 8%: **R$ 5.000 × 8% = R$ 400**.",
    },
    {
      q: "Horas extras entram no cálculo do FGTS?",
      a: "Sim. As horas extras podem integrar a remuneração utilizada para o cálculo do FGTS.",
    },
    {
      q: "O 13º salário tem FGTS?",
      a: "Sim. O 13º salário também gera depósito de FGTS.",
    },
    {
      q: "Férias têm FGTS?",
      a: "A remuneração das férias está sujeita ao FGTS, observadas as regras aplicáveis às parcelas que compõem a base de cálculo.",
    },
    {
      q: "Como calcular o FGTS proporcional?",
      a: "Primeiro, calcule a remuneração correspondente aos dias trabalhados e depois aplique a alíquota de 8%. Com salário de R$ 3.000 e 15 dias: R$ 1.500 × 8% = R$ 120.",
    },
    {
      q: "Qual é a diferença entre FGTS e INSS?",
      a: "O **FGTS** é um depósito do empregador na conta vinculada. O **INSS** é contribuição previdenciária descontada da remuneração do empregado, conforme as regras aplicáveis.",
    },
  ],
  related: [
    { label: "Calculadora de FGTS", to: CALC },
    { label: "Como calcular INSS", to: "/blog/como-calcular-inss" },
    { label: "Como calcular folha de pagamento", to: "/blog/como-calcular-folha-de-pagamento" },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
  ],
};
