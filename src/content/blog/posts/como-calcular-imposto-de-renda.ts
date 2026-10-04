import type { BlogPost } from "@/content/blog/types";

const CALC = "/calculadoras/imposto-de-renda";

export const comoCalcularImpostoDeRenda: BlogPost = {
  slug: "como-calcular-imposto-de-renda",
  title: "Como calcular imposto de renda",
  hero: { titleBefore: "Como calcular", highlight: "imposto de renda" },
  description:
    "Como calcular Imposto de Renda (IRRF) 2026: base de cálculo, tabela progressiva, desconto simplificado, redução até R$ 5.000 e exemplos.",
  intro:
    "O IRRF na folha usa a base de cálculo, a tabela progressiva e, em 2026, a redução que pode zerar o imposto até R$ 5.000 mensais.",
  opening: [
    "O cálculo do **Imposto de Renda Retido na Fonte (IRRF)** sobre o salário é feito mensalmente pela empresa na folha de pagamento. Para chegar ao valor do imposto, é necessário calcular a base de cálculo, aplicar a tabela progressiva e verificar se existe alguma redução do imposto.",
    "Em 2026, também existe uma regra de redução que pode zerar o Imposto de Renda para rendimentos tributáveis de até **R$ 5.000 por mês** e reduzir o imposto para rendimentos entre **R$ 5.000,01 e R$ 7.350,00**.",
    `Você também pode [simular na calculadora de imposto de renda](${CALC}).`,
  ],
  publishedAt: "2026-04-05",
  updatedAt: "2026-09-18",
  readMinutes: 14,
  ctaTitulo: "Evite erros nos cálculos antes que cheguem à folha",
  sumario: [
    { secao: "Como calcular o Imposto de Renda?", rotulo: "Visão geral" },
    { secao: "Qual é a tabela do Imposto de Renda em 2026?", rotulo: "Tabela 2026" },
    { secao: "Passo a passo para calcular o Imposto de Renda", rotulo: "Passo a passo" },
    { secao: "Como calcular o Imposto de Renda com desconto simplificado?", rotulo: "Desconto simplificado" },
    { secao: "Como calcular o Imposto de Renda com dependentes?", rotulo: "Dependentes" },
    { secao: "Como calcular o IRRF sobre horas extras?", rotulo: "Horas extras, férias e 13º" },
    { secao: "Quem não paga Imposto de Renda em 2026?", rotulo: "Quem está isento" },
  ],
  sections: [
    {
      title: "Como calcular o Imposto de Renda?",
      paragraphs: [
        "O cálculo do IRRF começa pela definição da base de cálculo. É necessário considerar os rendimentos tributáveis e aplicar as deduções permitidas ou o desconto simplificado mensal.",
        "De forma simplificada:",
        "**Rendimentos tributáveis - deduções = base de cálculo do IRRF**",
        "Depois de encontrar a base de cálculo, aplica-se a alíquota correspondente da tabela progressiva e subtrai-se a parcela a deduzir.",
        "**Base de cálculo × alíquota - parcela a deduzir = imposto devido**",
        "Em 2026, depois desse cálculo, também deve ser verificada a redução mensal prevista para rendimentos de até R$ 7.350,00.",
        `Simule na [calculadora de imposto de renda](${CALC}).`,
      ],
    },
    {
      title: "Qual é a tabela do Imposto de Renda em 2026?",
      paragraphs: [
        "A tabela mensal do IRRF em 2026 é:",
      ],
      table: {
        headers: ["Base de cálculo mensal", "Alíquota", "Parcela a deduzir"],
        rows: [
          ["Até R$ 2.428,80", "Isento", "R$ 0,00"],
          ["De R$ 2.428,81 até R$ 2.826,65", "7,5%", "R$ 182,16"],
          ["De R$ 2.826,66 até R$ 3.751,05", "15%", "R$ 394,16"],
          ["De R$ 3.751,06 até R$ 4.664,68", "22,5%", "R$ 675,49"],
          ["Acima de R$ 4.664,68", "27,5%", "R$ 908,73"],
        ],
      },
      closingParagraphs: [
        "Além da tabela progressiva, existem as regras de desconto simplificado, dedução por dependentes e redução do imposto previstas para 2026.",
      ],
    },
    {
      title: "Passo a passo para calcular o Imposto de Renda",
      paragraphs: [
        "Para calcular o IRRF de um salário, siga estas etapas:",
      ],
      subsections: [
        {
          title: "1. Calcule os rendimentos tributáveis",
          paragraphs: [
            "Some o salário e as demais verbas tributáveis recebidas no mês, como [horas extras](/blog/como-calcular-hora-extra) e adicionais.",
            "**Salário + horas extras + adicionais + outras verbas tributáveis = rendimentos tributáveis**",
          ],
        },
        {
          title: "2. Calcule as deduções",
          paragraphs: [
            "Verifique as deduções que podem ser utilizadas no cálculo, como a contribuição para o INSS e a dedução por dependentes.",
            "Em 2026, a dedução mensal por dependente é de **R$ 189,59**.",
            "Também existe a possibilidade de utilizar o **desconto simplificado mensal de R$ 607,20**, quando for mais vantajoso.",
          ],
        },
        {
          title: "3. Encontre a base de cálculo",
          paragraphs: [
            "Subtraia as deduções dos rendimentos tributáveis.",
            "**Rendimentos tributáveis - deduções = base de cálculo**",
            "Por exemplo, considerando R$ 6.000 de rendimentos tributáveis e R$ 607,20 de desconto simplificado:",
            "**R$ 6.000 - R$ 607,20 = R$ 5.392,80**",
          ],
        },
        {
          title: "4. Consulte a faixa da tabela do IRRF",
          paragraphs: [
            "Com a base de cálculo definida, identifique a faixa correspondente na tabela progressiva.",
            "Para uma base de R$ 5.392,80, por exemplo, aplica-se a alíquota de **27,5%** e a parcela a deduzir correspondente.",
          ],
        },
        {
          title: "5. Calcule o imposto pela tabela",
          paragraphs: [
            "A fórmula é:",
            "**R$ 5.392,80 × 27,5% - R$ 908,73 = R$ 573,79**",
            "Esse é o imposto calculado pela tabela antes de considerar a redução de 2026.",
          ],
        },
        {
          title: "6. Verifique a redução do Imposto de Renda",
          paragraphs: [
            "Para rendimentos tributáveis entre **R$ 5.000,01 e R$ 7.350,00**, existe uma redução mensal.",
            "A fórmula da redução é:",
            "**R$ 978,62 - (0,133145 × rendimentos tributáveis)**",
            "Para R$ 6.000:",
            "**R$ 978,62 - (0,133145 × R$ 6.000) = R$ 179,75**",
          ],
        },
        {
          title: "7. Encontre o IRRF final",
          paragraphs: [
            "Depois de calcular a redução, subtraia o valor do imposto calculado pela tabela.",
            "**R$ 573,79 - R$ 179,75 = R$ 394,04**",
            "Nesse exemplo, o IRRF seria de aproximadamente **R$ 394,04**.",
            "O valor efetivamente retido na folha pode depender das demais regras e deduções aplicáveis ao trabalhador.",
          ],
        },
      ],
    },
    {
      title: "Como calcular a base do Imposto de Renda?",
      paragraphs: [
        "A base de cálculo não é necessariamente igual ao salário bruto.",
        "Primeiro, são considerados os rendimentos tributáveis recebidos no mês. Depois, são aplicadas as deduções permitidas ou o desconto simplificado mensal.",
        "A fórmula é:",
        "**Rendimentos tributáveis - deduções = base de cálculo do IRRF**",
        "Essa base será utilizada para identificar a faixa da tabela e calcular o imposto.",
      ],
    },
    {
      title: "Como calcular o Imposto de Renda com desconto simplificado?",
      paragraphs: [
        "O desconto simplificado mensal em 2026 é de **R$ 607,20**.",
        "Por exemplo, considerando R$ 4.000 de rendimentos tributáveis:",
        "**R$ 4.000 - R$ 607,20 = R$ 3.392,80**",
        "A base de cálculo seria de R$ 3.392,80.",
        "O cálculo pela tabela seria:",
        "**R$ 3.392,80 × 15% - R$ 394,16 = R$ 114,76**",
        "Como o rendimento tributável é de até R$ 5.000, a redução de 2026 pode zerar esse imposto.",
        "Nesse exemplo:",
        "**IRRF = R$ 0,00**",
      ],
    },
    {
      title: "Como calcular o Imposto de Renda com dependentes?",
      paragraphs: [
        "O trabalhador que possui dependentes que atendem aos requisitos legais pode utilizar a dedução mensal correspondente.",
        "Em 2026, a dedução é de **R$ 189,59 por dependente**.",
        "Por exemplo, com dois dependentes:",
        "**2 × R$ 189,59 = R$ 379,18**",
        "Esse valor pode ser utilizado como dedução no cálculo quando forem aplicadas as deduções legais.",
      ],
    },
    {
      title: "Como calcular o IRRF sobre horas extras?",
      paragraphs: [
        "As [**horas extras**](/blog/como-calcular-hora-extra) podem aumentar os rendimentos tributáveis do trabalhador e, consequentemente, alterar a base de cálculo do IRRF.",
        "Por exemplo, se o trabalhador recebe R$ 4.500 de salário e R$ 500 de horas extras, os valores tributáveis recebidos no mês devem ser considerados no cálculo.",
        "Assim, as horas extras podem fazer com que a base de cálculo passe para uma faixa diferente da tabela.",
      ],
    },
    {
      title: "Como calcular o IRRF sobre adicional noturno?",
      paragraphs: [
        "O [**adicional noturno**](/blog/como-calcular-horas-noturnas) também pode integrar os rendimentos tributáveis do trabalhador.",
        "Por isso, quando o empregado recebe salário e adicional noturno, os valores devem ser considerados conforme a natureza da verba e as regras aplicáveis ao cálculo do IRRF.",
      ],
    },
    {
      title: "Como calcular o IRRF sobre férias?",
      paragraphs: [
        "O pagamento de [férias](/blog/como-calcular-ferias) possui regras próprias para incidência do Imposto de Renda.",
        "O valor tributável das férias e do adicional constitucional de 1/3, quando sujeitos à tributação, deve ser considerado conforme as regras específicas de retenção.",
        "Por isso, o cálculo do IRRF sobre férias deve observar o tratamento tributário específico dessa verba.",
      ],
    },
    {
      title: "Como calcular o IRRF sobre o 13º salário?",
      paragraphs: [
        "O **13º salário** possui tributação própria para fins de Imposto de Renda.",
        "O IRRF sobre o décimo terceiro é calculado separadamente dos demais rendimentos recebidos durante o ano, seguindo as regras específicas aplicáveis ao 13º salário.",
      ],
    },
    {
      title: "Como calcular o salário líquido depois do Imposto de Renda?",
      paragraphs: [
        "Depois de calcular o IRRF e os demais descontos da [folha](/blog/como-calcular-folha-de-pagamento), é possível chegar ao salário líquido.",
        "De forma simplificada:",
        "**Salário bruto + adicionais + horas extras - INSS - IRRF - outros descontos = salário líquido**",
        "O valor final depende da remuneração recebida, das deduções e dos descontos aplicáveis ao trabalhador.",
        "Veja também a [calculadora de folha de pagamento](/calculadoras/folha-de-pagamento).",
      ],
    },
    {
      title: "Quem não paga Imposto de Renda em 2026?",
      paragraphs: [
        "Em 2026, a regra de redução faz com que o imposto devido seja zerado para **rendimentos tributáveis mensais de até R$ 5.000,00**.",
        "Para rendimentos entre **R$ 5.000,01 e R$ 7.350,00**, existe uma redução parcial.",
        "Acima de R$ 7.350,00, a redução deixa de ser aplicada e o cálculo segue a tabela progressiva normalmente.",
      ],
    },
    {
      title: "Conclusão",
      paragraphs: [
        "Para calcular o Imposto de Renda sobre o salário, primeiro é necessário identificar os rendimentos tributáveis, calcular as deduções, encontrar a base de cálculo e consultar a tabela progressiva.",
        "Depois, deve-se aplicar a alíquota e a parcela a deduzir e verificar se existe alguma redução aplicável.",
        "Em 2026, essa última etapa é especialmente importante, pois existe uma redução que pode zerar o IRRF para rendimentos tributáveis de até **R$ 5.000** e reduzir o imposto para rendimentos entre **R$ 5.000,01 e R$ 7.350**.",
        `Use a [calculadora de imposto de renda](${CALC}) para conferir a estimativa com a tabela 2026.`,
      ],
    },
  ],
  faqs: [
    {
      q: "O Imposto de Renda é calculado sobre o salário bruto?",
      a: "Não necessariamente. O cálculo considera a base de cálculo depois das deduções permitidas ou do desconto simplificado aplicável.",
    },
    {
      q: "Qual é o desconto simplificado do IRRF em 2026?",
      a: "O desconto simplificado mensal é de **R$ 607,20**.",
    },
    {
      q: "Quem ganha R$ 5.000 paga Imposto de Renda em 2026?",
      a: "A regra de redução de 2026 pode zerar o imposto devido para rendimentos tributáveis mensais de até R$ 5.000.",
    },
    {
      q: "Quanto é a dedução por dependente em 2026?",
      a: "A dedução mensal por dependente é de **R$ 189,59**.",
    },
    {
      q: "Qual é a maior alíquota do Imposto de Renda?",
      a: "A maior alíquota da tabela mensal é de **27,5%**.",
    },
    {
      q: "Horas extras aumentam o Imposto de Renda?",
      a: "Podem aumentar, porque as horas extras podem integrar os rendimentos tributáveis utilizados no cálculo.",
    },
  ],
  related: [
    { label: "Calculadora de imposto de renda", to: CALC },
    { label: "Como calcular folha de pagamento", to: "/blog/como-calcular-folha-de-pagamento" },
    { label: "Como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
    { label: "Como calcular férias", to: "/blog/como-calcular-ferias" },
  ],
};
