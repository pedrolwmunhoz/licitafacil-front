import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__imposto-de-renda";
import { ImpostoDeRendaCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: calculadora imposto de renda / IRRF salário

const seo = PUBLIC_PAGE_SEO.calculadoraImpostoDeRenda;

const CalculadoraImpostoDeRendaPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="imposto de renda"
    form={<ImpostoDeRendaCalculatorForm />}
    guideSections={[
      {
        title: "Como a calculadora estima o IRRF mensal",
        paragraphs: [
          "Você informa o rendimento bruto do mês (salário e demais verbas tributáveis) e o número de dependentes. A ferramenta calcula o INSS 2026 sobre esse bruto e monta a base do IRRF.",
          "A dedução usada é a maior entre (INSS + dependentes) e o desconto simplificado de R$ 607,20. Sobre a base aplica-se a tabela progressiva (isento a 27,5%).",
        ],
        bullets: [
          "Base = bruto − max(INSS + dependentes, R$ 607,20)",
          "Imposto tabela = base × alíquota − parcela a deduzir",
        ],
      },
      {
        title: "Redução da Lei 15.270/2025 (vigente em 2026)",
        paragraphs: [
          "Depois do imposto da tabela, entra a redução mensal: até R$ 5.000 de rendimento a redução pode zerar o IRRF; entre R$ 5.000,01 e R$ 7.350 a redução é progressiva; acima de R$ 7.350 não há redução extra.",
          "É por isso que muita gente com salário até R$ 5 mil fica isenta na prática na retenção mensal — mesmo com a faixa formal da tabela ainda em R$ 2.428,80.",
        ],
        bullets: [
          "Até R$ 5.000: redução até R$ 312,89 (pode zerar)",
          "R$ 5.000,01 a R$ 7.350: R$ 978,62 − (0,133145 × rendimento)",
        ],
      },
      {
        title: "O que esta tool não faz",
        paragraphs: [
          "Não trata pensão alimentícia, outras deduções legais específicas, 13º em separado nem declaração anual. É estimativa de retenção mensal para conferência.",
          "Para líquido completo com variáveis do ponto, use a calculadora de folha de pagamento.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Quem ganha até R$ 5.000 não paga IRRF?",
        a: "Na retenção mensal de 2026, a redução da Lei 15.270 costuma zerar o imposto para rendimentos até R$ 5.000. Confirme a base tributável com o contador.",
      },
      {
        q: "A tabela progressiva mudou em 2026?",
        a: "As faixas (7,5% a 27,5%) seguem os valores de 2025. O que mudou foi o redutor adicional da Lei 15.270/2025.",
      },
      {
        q: "Preciso informar o INSS?",
        a: "Não. A calculadora estima o INSS 2026 a partir do salário informado e usa esse valor na base do IR.",
      },
      {
        q: "Substitui o holerite?",
        a: "Não. É ferramenta de conferência. A folha oficial fica com o contador.",
      },
    ]}
    related={[
      { label: "Como calcular imposto de renda (blog)", to: "/blog/como-calcular-imposto-de-renda" },
      { label: "Calculadora de INSS", to: "/calculadoras/inss" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
      { label: "Todas as calculadoras", to: "/calculadoras" },
    ]}
  />
);

export default CalculadoraImpostoDeRendaPage;
