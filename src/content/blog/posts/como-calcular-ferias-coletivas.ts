import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/ferias";

export const comoCalcularFeriasColetivas: BlogPost = {
  slug: "como-calcular-ferias-coletivas",
  title: "Como calcular férias coletivas",
  hero: { titleBefore: "Como calcular", highlight: "férias coletivas" },
  description:
    "Como calcular férias coletivas: salário ÷ 30 × dias + 1/3, 10, 15 e 20 dias, proporcionais, licença remunerada e prazo de pagamento.",
  intro:
    "O cálculo de férias coletivas usa o salário, os dias concedidos e o período aquisitivo. O adicional constitucional de 1/3 também entra na conta.",
  opening: [
    "O cálculo de **férias coletivas** depende do salário do empregado, da quantidade de dias concedidos e do período aquisitivo já cumprido.",
    "Assim como nas [férias individuais](/blog/como-calcular-ferias), as férias coletivas são remuneradas com o **adicional constitucional de 1/3**.",
    "Para fazer o cálculo corretamente, também é importante verificar se o empregado já completou 12 meses de trabalho. Quando isso ainda não aconteceu, o cálculo é feito considerando as férias proporcionais adquiridas.",
    `Você também pode [simular na calculadora de férias](${CALC}).`,
  ],
  publishedAt: "2026-06-02",
  updatedAt: "2026-09-18",
  readMinutes: 12,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular férias coletivas?", rotulo: "Cálculo básico" },
    { secao: "Como calcular férias coletivas de 10 dias?", rotulo: "10, 15 e 20 dias" },
    { secao: "Como ficam as férias coletivas para quem ainda não completou 12 meses?", rotulo: "Menos de 12 meses de empresa" },
    { secao: "Férias coletivas têm adicional de 1/3?", rotulo: "Adicional de 1/3" },
    { secao: "Qual é o prazo para pagar as férias coletivas?", rotulo: "Prazo de pagamento" },
    { secao: "Exemplo completo de cálculo de férias coletivas", rotulo: "Exemplo completo" },
    { secao: "Como evitar erros no cálculo das férias coletivas?", rotulo: "Erros comuns" },
  ],
  sections: [
    {
      title: "Como calcular férias coletivas?",
      paragraphs: [
        "Para empregados com salário fixo, o cálculo das férias coletivas pode ser feito pela seguinte fórmula:",
        "**Valor das férias = salário ÷ 30 × número de dias de férias**",
        "Depois, deve ser acrescentado o adicional de 1/3:",
        "**Adicional de 1/3 = valor das férias ÷ 3**",
        "Por exemplo, um empregado que recebe **R$ 3.000** e terá **15 dias de férias coletivas**:",
        "**R$ 3.000 ÷ 30 × 15 = R$ 1.500**",
        "Adicional de 1/3:",
        "**R$ 1.500 ÷ 3 = R$ 500**",
        "Total bruto das férias:",
        "**R$ 1.500 + R$ 500 = R$ 2.000**",
        "Portanto, nesse exemplo, o empregado receberá **R$ 2.000 brutos** pelas férias coletivas, antes dos descontos aplicáveis.",
        `Simule na [calculadora de férias](${CALC}) com salário R$ 3.000 e 15 dias.`,
      ],
    },
    {
      title: "Como calcular férias coletivas de 10 dias?",
      paragraphs: [
        "Quando a empresa concede **10 dias de férias coletivas**, o cálculo considera 10/30 do salário.",
        "Para um empregado que recebe **R$ 3.000**:",
        "**R$ 3.000 ÷ 30 × 10 = R$ 1.000**",
        "O adicional de 1/3 será:",
        "**R$ 1.000 ÷ 3 = R$ 333,33**",
        "Total:",
        "**R$ 1.000 + R$ 333,33 = R$ 1.333,33**",
        "Nesse caso, o valor bruto das férias coletivas será de **R$ 1.333,33**.",
      ],
    },
    {
      title: "Como calcular férias coletivas de 15 dias?",
      paragraphs: [
        "Para 15 dias de férias coletivas, o empregado recebe metade do salário referente ao período, acrescida de 1/3.",
        "Considerando um salário de **R$ 3.000**:",
        "**R$ 3.000 ÷ 30 × 15 = R$ 1.500**",
        "Adicional de 1/3:",
        "**R$ 1.500 ÷ 3 = R$ 500**",
        "Total:",
        "**R$ 1.500 + R$ 500 = R$ 2.000**",
        "Portanto, o empregado receberá **R$ 2.000 brutos** pelas férias coletivas de 15 dias.",
      ],
    },
    {
      title: "Como calcular férias coletivas de 20 dias?",
      paragraphs: [
        "Para 20 dias de férias coletivas, considerando um salário de **R$ 3.000**:",
        "**R$ 3.000 ÷ 30 × 20 = R$ 2.000**",
        "Adicional de 1/3:",
        "**R$ 2.000 ÷ 3 = R$ 666,67**",
        "Total:",
        "**R$ 2.000 + R$ 666,67 = R$ 2.666,67**",
        "Nesse exemplo, o valor bruto das férias coletivas será de **R$ 2.666,67**.",
      ],
    },
    {
      title: "Como ficam as férias coletivas para quem ainda não completou 12 meses?",
      paragraphs: [
        "O empregado que ainda não completou 12 meses de trabalho possui direito a **férias proporcionais**.",
        "A quantidade de dias adquiridos depende do número de meses considerados no período aquisitivo.",
        "Por exemplo, um empregado que trabalhou por **6 meses** terá direito a:",
        "**30 ÷ 12 × 6 = 15 dias de férias proporcionais**",
        "Se a empresa conceder 15 dias de férias coletivas, esses 15 dias serão pagos como férias, acrescidos do adicional de 1/3.",
        "Depois da concessão das férias coletivas, inicia-se um **novo período aquisitivo** para esse empregado.",
      ],
    },
    {
      title: "E se as férias coletivas forem maiores do que o período de férias adquirido?",
      paragraphs: [
        "Se o empregado ainda não completou 12 meses de trabalho e o período de férias coletivas for maior do que os dias de férias proporcionais adquiridos, os dias que excederem o período adquirido serão considerados **licença remunerada**.",
        "Por exemplo, um empregado trabalhou por 6 meses e possui direito a **15 dias de férias proporcionais**. A empresa, porém, concede **20 dias de férias coletivas**.",
        "Nesse caso:",
      ],
      bullets: [
        "**15 dias** serão pagos como férias, com adicional de 1/3;",
        "**5 dias** serão considerados licença remunerada.",
      ],
      closingParagraphs: [
        "Os 5 dias de licença remunerada **não são descontados posteriormente das férias**.",
        "Após as férias coletivas, inicia-se um novo período aquisitivo.",
      ],
    },
    {
      title: "Férias coletivas têm adicional de 1/3?",
      paragraphs: [
        "Sim.",
        "As férias coletivas são remuneradas com o **adicional constitucional de 1/3**.",
        "O adicional corresponde a um terço do valor das férias.",
        "Por exemplo, se o valor das férias for **R$ 1.800**:",
        "**R$ 1.800 ÷ 3 = R$ 600**",
        "O total bruto será:",
        "**R$ 1.800 + R$ 600 = R$ 2.400**",
        "O adicional de 1/3 é calculado apenas sobre os dias que efetivamente correspondem às férias. Portanto, no caso de licença remunerada decorrente de férias coletivas superiores ao período proporcional adquirido, não há adicional de 1/3 sobre esses dias.",
      ],
    },
    {
      title: "Férias coletivas podem ser divididas?",
      paragraphs: [
        "Sim.",
        "As férias coletivas podem ser concedidas em **até dois períodos anuais**, desde que nenhum deles seja inferior a **10 dias corridos**.",
        "Por exemplo, uma empresa pode conceder:",
      ],
      bullets: [
        "10 dias de férias coletivas em julho;",
        "20 dias de férias coletivas em dezembro.",
      ],
      closingParagraphs: [
        "Cada período deve ser registrado e calculado de acordo com as regras aplicáveis às férias.",
      ],
    },
    {
      title: "Qual é o prazo para pagar as férias coletivas?",
      paragraphs: [
        "O pagamento da remuneração das férias, incluindo o adicional de 1/3, deve ser realizado **até dois dias antes do início do período de férias**.",
        "Por exemplo, se as férias coletivas começam no dia **20 de dezembro**, o pagamento deve ser realizado até o dia **18 de dezembro**.",
      ],
    },
    {
      title: "Como calcular férias coletivas com salário variável?",
      paragraphs: [
        "Quando o empregado recebe **comissões, adicionais ou outras parcelas variáveis**, o cálculo pode exigir a consideração das médias das parcelas que integram a remuneração das férias.",
        "Por isso, o cálculo não deve ser feito simplesmente dividindo o salário-base por 30.",
        "A empresa deve verificar quais parcelas compõem a remuneração do empregado e quais regras devem ser utilizadas para calcular a média correspondente.",
      ],
    },
    {
      title: "Exemplo completo de cálculo de férias coletivas",
      paragraphs: [
        "Considere um empregado com:",
      ],
      bullets: [
        "Salário: **R$ 3.600**",
        "Férias coletivas: **15 dias**",
        "Período aquisitivo completo",
      ],
      closingParagraphs: [
        "Primeiro, calcula-se o valor correspondente aos 15 dias:",
        "**R$ 3.600 ÷ 30 × 15 = R$ 1.800**",
        "Depois, calcula-se o adicional de 1/3:",
        "**R$ 1.800 ÷ 3 = R$ 600**",
        "Total bruto:",
        "**R$ 1.800 + R$ 600 = R$ 2.400**",
        "Nesse exemplo, o empregado terá **R$ 2.400 brutos** de férias coletivas, antes dos descontos legais.",
        `Confira na [calculadora de férias](${CALC}).`,
      ],
    },
    {
      title: "Férias coletivas precisam ser registradas no controle de ponto?",
      paragraphs: [
        "Sim. A empresa deve manter o registro correto do período de férias dos empregados.",
        "Os dias de férias não devem ser tratados como dias normais de trabalho no controle de jornada.",
        "Um sistema de [registro eletrônico de ponto](https://segponto.com) pode ajudar a organizar as jornadas antes e depois das férias coletivas, mantendo o controle correto dos períodos trabalhados e dos afastamentos.",
      ],
    },
    {
      title: "Como evitar erros no cálculo das férias coletivas?",
      paragraphs: [
        "Antes de calcular as férias coletivas, a empresa deve conferir:",
      ],
      bullets: [
        "**Salário do empregado**",
        "**Quantidade de dias de férias coletivas**",
        "**Período aquisitivo**",
        "**Quantidade de férias proporcionais adquiridas**",
        "**Adicional constitucional de 1/3**",
        "**Existência de salário ou parcelas variáveis**",
        "**Possíveis dias de licença remunerada**",
        "**Prazo para pagamento das férias**",
        "**Registro correto do período de férias**",
      ],
      closingParagraphs: [
        "O cálculo é mais simples quando o empregado já completou o período aquisitivo e recebe apenas salário fixo. Para empregados admitidos recentemente, é necessário verificar primeiro a quantidade de férias proporcionais adquiridas e se haverá dias de licença remunerada quando as férias coletivas forem superiores a esse período.",
        `Para o cálculo do terço e dos dias, use a [calculadora de férias](${CALC}) e o guia de [como calcular férias](/blog/como-calcular-ferias).`,
      ],
    },
  ],
  faqs: [
    {
      q: "Como calcular férias coletivas?",
      a: "Valor das férias = salário ÷ 30 × dias. Depois some o adicional de 1/3 (valor das férias ÷ 3).",
    },
    {
      q: "Férias coletivas têm adicional de 1/3?",
      a: "Sim. O 1/3 incide sobre os dias que correspondem a férias. Dias de licença remunerada (quando a coletiva ultrapassa o proporcional adquirido) não levam o 1/3.",
    },
    {
      q: "Férias coletivas podem ser divididas?",
      a: "Sim, em até dois períodos anuais, nenhum inferior a 10 dias corridos.",
    },
    {
      q: "Qual o prazo para pagar as férias coletivas?",
      a: "Até dois dias antes do início do período de férias, incluindo o adicional de 1/3.",
    },
    {
      q: "E se o empregado ainda não completou 12 meses?",
      a: "Paga-se o proporcional adquirido com 1/3. Se a coletiva for maior que o proporcional, o excedente é licença remunerada e não é descontado depois das férias.",
    },
  ],
  related: [
    { label: "Calculadora de férias", to: CALC },
    { label: "Como calcular férias", to: "/blog/como-calcular-ferias" },
    { label: "Férias da empregada doméstica", to: "/blog/como-calcular-ferias-empregada-domestica" },
    { label: "Como fechar o ponto do mês", to: "/blog/como-fechar-o-ponto-do-mes" },
  ],
};
