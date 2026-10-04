import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/inss";

export const comoCalcularInss: BlogPost = {
  slug: "como-calcular-inss",
  title: "Como calcular INSS",
  hero: { titleBefore: "Como calcular", highlight: "INSS" },
  description:
    "Como calcular INSS 2026: contribuição progressiva por faixas (7,5% a 14%), salário de contribuição, teto, horas extras e salário líquido.",
  intro:
    "O desconto do INSS é progressivo: o salário é dividido em faixas e cada faixa recebe a sua própria alíquota.",
  opening: [
    "O desconto do **INSS** é calculado de forma progressiva sobre o salário do trabalhador. Isso significa que o salário é dividido em faixas e cada faixa recebe a sua própria alíquota de contribuição.",
    "Na prática, o valor descontado no salário não é simplesmente o resultado de aplicar uma única porcentagem sobre toda a remuneração. O cálculo considera as faixas de contribuição vigentes e os respectivos limites.",
    `Para saber quanto será descontado do seu salário, você pode usar a [calculadora de INSS](${CALC}) e conferir o valor da contribuição.`,
  ],
  publishedAt: "2026-03-28",
  updatedAt: "2026-09-19",
  readMinutes: 12,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular o INSS?", rotulo: "Visão geral" },
    { secao: "Qual é a tabela do INSS em 2026?", rotulo: "Tabela 2026" },
    { secao: "Passo a passo para calcular o INSS", rotulo: "Passo a passo" },
    { secao: "Como calcular o INSS sobre horas extras?", rotulo: "Horas extras, férias e 13º" },
    { secao: "Como calcular o INSS de quem ganha acima do teto?", rotulo: "Acima do teto" },
    { secao: "Como calcular o salário líquido depois do INSS?", rotulo: "Salário líquido" },
    { secao: "Quem precisa pagar INSS?", rotulo: "Quem paga" },
  ],
  sections: [
    {
      title: "Como calcular o INSS?",
      paragraphs: [
        "Para calcular o INSS, primeiro é necessário identificar o **salário de contribuição** do trabalhador. Depois, o valor é dividido entre as faixas da tabela progressiva e cada faixa recebe sua respectiva alíquota.",
        "A fórmula geral é:",
        "**Valor do INSS = contribuição calculada em cada faixa da tabela**",
        "Por isso, um trabalhador que recebe R$ 4.000, por exemplo, não terá simplesmente 4.000 × 12% descontados. O cálculo considera separadamente cada faixa.",
        `Simule na [calculadora de INSS](${CALC}).`,
      ],
    },
    {
      title: "Qual é a tabela do INSS em 2026?",
      paragraphs: [
        "Para empregados, empregados domésticos e trabalhadores avulsos, a contribuição ao INSS é calculada de forma progressiva. Isso significa que cada alíquota é aplicada somente sobre a parcela do salário que está dentro de cada faixa.",
        "A tabela vigente desde janeiro de 2026 é:",
      ],
      table: {
        headers: ["Faixa", "Salário de contribuição", "Alíquota"],
        rows: [
          ["1ª faixa", "Até R$ 1.621,00", "7,5%"],
          ["2ª faixa", "De R$ 1.621,01 a R$ 2.902,84", "9%"],
          ["3ª faixa", "De R$ 2.902,85 a R$ 4.354,27", "12%"],
          ["4ª faixa", "De R$ 4.354,28 a R$ 8.475,55", "14%"],
        ],
      },
      closingParagraphs: [
        "O limite máximo do salário de contribuição em 2026 é de **R$ 8.475,55**.",
      ],
      subsections: [
        {
          title: "Como funciona o cálculo?",
          paragraphs: [
            "A alíquota não é aplicada sobre todo o salário de uma única vez. O salário é dividido entre as faixas e cada parte recebe a sua respectiva alíquota.",
            "Por exemplo, para um salário de **R$ 3.500,00**, o cálculo é feito assim:",
            "R$ 1.621,00 × 7,5% = R$ 121,58",
            "R$ 1.281,84 × 9% = R$ 115,37",
            "R$ 597,16 × 12% = R$ 71,66",
            "**Total de INSS: R$ 308,61.**",
            "Portanto, não se deve calcular simplesmente 12% sobre os R$ 3.500,00. A contribuição é progressiva e cada parcela do salário é enquadrada na faixa correspondente.",
            `A [calculadora de INSS](${CALC}) realiza esse cálculo considerando as faixas e o teto vigentes em 2026.`,
          ],
        },
      ],
    },
    {
      title: "Passo a passo para calcular o INSS",
      paragraphs: ["O cálculo pode ser feito seguindo estas etapas."],
      subsections: [
        {
          title: "1. Identifique o salário de contribuição",
          paragraphs: [
            "Primeiro, some as parcelas da remuneração que entram no cálculo do INSS.",
            "Podem fazer parte da base, conforme a natureza da verba, valores como salário, [horas extras](/blog/como-calcular-hora-extra), [adicional noturno](/blog/como-calcular-horas-noturnas) e outros pagamentos sujeitos à contribuição previdenciária.",
          ],
        },
        {
          title: "2. Consulte a tabela do INSS",
          paragraphs: [
            "Depois de encontrar o salário de contribuição, consulte as faixas e alíquotas vigentes no ano.",
            "Em 2026, as alíquotas dos empregados são progressivas e variam de **7,5% a 14%**, respeitando o limite máximo do salário de contribuição.",
          ],
        },
        {
          title: "3. Divida o salário entre as faixas",
          paragraphs: [
            "O salário deve ser distribuído entre as faixas da tabela.",
            "Por exemplo, se parte da remuneração estiver na primeira faixa e outra parte estiver na segunda, cada parcela será calculada com a alíquota correspondente.",
          ],
        },
        {
          title: "4. Some as contribuições de cada faixa",
          paragraphs: [
            "Depois de calcular o valor correspondente a cada faixa, some os resultados.",
            "**INSS da faixa 1 + INSS da faixa 2 + INSS da faixa 3 + demais faixas = INSS devido**",
          ],
        },
        {
          title: "5. Verifique o teto do INSS",
          paragraphs: [
            "Se a remuneração ultrapassar o limite máximo do salário de contribuição, o INSS do empregado não continua aumentando sobre o valor excedente.",
            "Em 2026, o teto previdenciário deve ser considerado conforme o valor vigente no período do cálculo.",
          ],
        },
      ],
    },
    {
      title: "Como calcular o INSS sobre um salário?",
      paragraphs: [
        "Imagine um trabalhador com salário de **R$ 3.000**.",
        "O primeiro passo é identificar em quais faixas da tabela o salário está.",
        "Depois, calcula-se a contribuição da primeira faixa, da segunda faixa e assim sucessivamente até chegar aos R$ 3.000.",
        "A soma dessas parcelas será o valor do INSS descontado na folha.",
        "Esse método é diferente de simplesmente aplicar uma alíquota única de 12% ou 14% sobre os R$ 3.000.",
      ],
    },
    {
      title: "Como calcular o INSS sobre horas extras?",
      paragraphs: [
        "As [**horas extras**](/blog/como-calcular-hora-extra) podem integrar o salário de contribuição e, nesse caso, aumentam a base utilizada para calcular o INSS.",
        "Por exemplo, se o trabalhador recebe R$ 3.000 de salário e R$ 500 de horas extras, o cálculo deve considerar a remuneração sujeita à contribuição previdenciária.",
        "**R$ 3.000 + R$ 500 = R$ 3.500**",
        "A partir dessa base, aplica-se o cálculo progressivo do INSS.",
      ],
    },
    {
      title: "Como calcular o INSS sobre adicional noturno?",
      paragraphs: [
        "O [**adicional noturno**](/blog/como-calcular-horas-noturnas), quando integra o salário de contribuição, também pode aumentar a base utilizada para o cálculo do INSS.",
        "Assim, o valor do adicional deve ser considerado juntamente com as demais parcelas sujeitas à contribuição previdenciária.",
      ],
    },
    {
      title: "Como calcular o INSS sobre férias?",
      paragraphs: [
        "A incidência do INSS sobre [férias](/blog/como-calcular-ferias) depende da natureza da verba.",
        "A remuneração das férias está sujeita à contribuição previdenciária, enquanto o **terço constitucional de férias** possui tratamento específico e não deve ser simplesmente tratado da mesma forma que o salário para todos os efeitos previdenciários.",
        "Por isso, o cálculo da contribuição sobre férias deve considerar a legislação previdenciária e a natureza de cada parcela.",
      ],
    },
    {
      title: "Como calcular o INSS sobre o 13º salário?",
      paragraphs: [
        "O **13º salário** possui cálculo próprio para a contribuição previdenciária.",
        "O INSS sobre o décimo terceiro é calculado separadamente da remuneração mensal normal, observando as regras específicas aplicáveis ao 13º.",
      ],
    },
    {
      title: "Como calcular o INSS de quem ganha acima do teto?",
      paragraphs: [
        "Quando o salário de contribuição ultrapassa o **teto do INSS**, a contribuição do empregado fica limitada ao valor máximo permitido pela Previdência Social.",
        "Por exemplo, se um trabalhador recebe uma remuneração muito superior ao teto previdenciário, não será aplicada a alíquota sobre todo o salário.",
        "O cálculo fica limitado ao teto do salário de contribuição vigente.",
      ],
    },
    {
      title: "Como calcular o salário líquido depois do INSS?",
      paragraphs: [
        "O INSS é um dos descontos considerados para chegar ao salário líquido.",
        "De forma simplificada:",
        "**Salário bruto + adicionais + horas extras - INSS - IRRF - outros descontos = salário líquido**",
        "Por isso, o valor do INSS também influencia o cálculo do [Imposto de Renda](/blog/como-calcular-imposto-de-renda), já que a contribuição previdenciária pode ser considerada como dedução na apuração do IRRF.",
        "Veja também a [calculadora de folha de pagamento](/calculadoras/folha-de-pagamento).",
      ],
    },
    {
      title: "Quem precisa pagar INSS?",
      paragraphs: [
        "Empregados, empregados domésticos e trabalhadores avulsos possuem contribuição previdenciária descontada de sua remuneração, conforme as regras aplicáveis a cada categoria.",
        "O empregador é responsável por realizar o desconto e efetuar o recolhimento da contribuição nos termos da legislação.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular o INSS, é necessário identificar o salário de contribuição, consultar a tabela vigente e aplicar as alíquotas de forma **progressiva**, calculando cada faixa separadamente.",
        "Depois, as contribuições de cada faixa são somadas para encontrar o desconto previdenciário do trabalhador. Quando a remuneração ultrapassa o teto do INSS, o cálculo fica limitado ao salário de contribuição máximo.",
        `Use a [calculadora de INSS](${CALC}) para estimar o desconto com as faixas progressivas.`,
      ],
    },
  ],
  faqs: [
    {
      q: "O INSS é calculado sobre o salário bruto?",
      a: "O cálculo utiliza o **salário de contribuição**, que pode incluir diversas verbas da remuneração, conforme sua natureza e as regras previdenciárias.",
    },
    {
      q: "O INSS é calculado com uma única alíquota?",
      a: "Não. Para empregados, o cálculo é progressivo. Cada faixa da remuneração possui uma alíquota específica.",
    },
    {
      q: "Horas extras têm desconto de INSS?",
      a: "As horas extras podem integrar o salário de contribuição e, quando sujeitas à contribuição, entram no cálculo do INSS.",
    },
    {
      q: "Existe limite para o desconto do INSS?",
      a: "Sim. A contribuição do empregado é limitada ao teto do salário de contribuição do INSS vigente.",
    },
    {
      q: "O INSS é descontado do salário líquido?",
      a: "Sim. O INSS é um dos descontos realizados sobre a remuneração para chegar ao salário líquido.",
    },
    {
      q: "O INSS influencia o cálculo do Imposto de Renda?",
      a: "Sim. A contribuição previdenciária pode ser considerada na determinação da base de cálculo do IRRF, conforme as regras tributárias aplicáveis.",
    },
  ],
  related: [
    { label: "Calculadora de INSS", to: CALC },
    { label: "Como calcular imposto de renda", to: "/blog/como-calcular-imposto-de-renda" },
    { label: "Como calcular folha de pagamento", to: "/blog/como-calcular-folha-de-pagamento" },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
  ],
};
