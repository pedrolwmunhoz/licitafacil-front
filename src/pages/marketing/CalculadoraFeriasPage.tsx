import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__ferias";
import { FeriasCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraFerias;

const CalculadoraFeriasPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="férias"
    form={<FeriasCalculatorForm />}
    guideSections={[
      {
        title: "Dias de direito (art. 130 da CLT)",
        paragraphs: [
          "As faltas injustificadas no período aquisitivo reduzem os dias de férias pela tabela da CLT.",
          "O abono pecuniário vende até 1/3 desses dias (no máximo 10 quando o direito é 30). Os dias a gozar são direito menos abono — o abono não cria dias extras.",
        ],
        bullets: [
          "Até 5 faltas: 30 dias",
          "6 a 14 faltas: 24 dias",
          "15 a 23 faltas: 18 dias",
          "24 a 32 faltas: 12 dias",
          "Mais de 32 faltas: 0 dias",
          "Abono ≤ 1/3 do direito (máx. 10)",
          "Dias a gozar = direito − abono",
        ],
      },
      {
        title: "Base e valor do dia",
        paragraphs: [
          "Base mensal = salário + média de variáveis habituais. Valor do dia = base ÷ 30.",
        ],
        bullets: ["Valor do dia = (salário + média) ÷ 30"],
      },
      {
        title: "Terço constitucional e abono",
        paragraphs: [
          "Férias brutas = valor do dia × dias a gozar, mais 1/3. Abono = valor do dia × dias vendidos, mais 1/3 sobre o abono.",
        ],
        bullets: [
          "Férias + terço = (valor do dia × gozo) × 4/3",
          "Abono + terço = (valor do dia × abono) × 4/3",
        ],
      },
    ]}
    faqs={[
      {
        q: "Quantos dias posso vender no abono?",
        a: "Até um terço dos dias de direito (máximo 10 quando o direito é 30), com concordância do empregado.",
      },
      {
        q: "Posso informar 30 de gozo e 10 de abono ao mesmo tempo?",
        a: "Não. Com direito a 30, se vender 10 goza 20. A calculadora aplica isso automaticamente.",
      },
      {
        q: "A calculadora já desconta impostos?",
        a: "Não. Mostra valores brutos. INSS e IRRF entram na folha de férias.",
      },
    ]}
    related={[
      { label: "Artigo: como calcular férias", to: "/blog/como-calcular-ferias" },
      { label: "Férias coletivas", to: "/blog/como-calcular-ferias-coletivas" },
      { label: "Férias doméstica", to: "/blog/como-calcular-ferias-empregada-domestica" },
      { label: "Calculadora férias doméstica", to: "/calculadoras/ferias-empregada-domestica" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
    ]}
  />
);

export default CalculadoraFeriasPage;
