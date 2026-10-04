import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__fgts";
import { FgtsCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: calculadora FGTS depósito 8% multa 40%

const seo = PUBLIC_PAGE_SEO.calculadoraFgts;

const CalculadoraFgtsPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="FGTS"
    form={<FgtsCalculatorForm />}
    guideSections={[
      {
        title: "Como calcular o depósito de FGTS",
        paragraphs: [
          "O FGTS é obrigação do empregador e não é descontado do salário. Para a maioria dos empregados CLT, o depósito é 8% da remuneração sujeita ao FGTS. No contrato de aprendizagem, a alíquota é 2%.",
          "Informe a remuneração do mês (salário e verbas que integram a base), os dias trabalhados e a alíquota. O resultado é a estimativa do depósito.",
        ],
        bullets: [
          "Fórmula: remuneração × 8% (ou × 2% no aprendiz)",
          "Proporcional: (salário ÷ 30 × dias) × alíquota",
          "Multa de 40%: base informada × 40% (demissão sem justa causa)",
        ],
      },
      {
        title: "O que pode entrar na base",
        paragraphs: [
          "Além do salário, horas extras, adicional noturno, férias e 13º podem integrar a base, conforme a natureza da verba. A classificação correta fica com o contador.",
        ],
      },
      {
        title: "FGTS e INSS",
        paragraphs: [
          "Não confunda: o FGTS é depósito do empregador; o INSS do empregado é desconto na folha. Use a calculadora de INSS se a dúvida for o desconto previdenciário.",
        ],
      },
    ]}
    faqs={[
      {
        q: "O FGTS é descontado do salário?",
        a: "Não. É depósito do empregador na conta vinculada do trabalhador.",
      },
      {
        q: "Qual a alíquota?",
        a: "8% para a maioria dos empregados CLT; 2% no contrato de aprendizagem.",
      },
      {
        q: "Como calcular proporcional?",
        a: "Calcule a remuneração dos dias trabalhados (salário ÷ 30 × dias) e aplique a alíquota.",
      },
      {
        q: "O que é a multa de 40%?",
        a: "Na demissão sem justa causa, há multa rescisória de 40% sobre a base prevista para a rescisão. Informe a base no campo opcional.",
      },
    ]}
    related={[
      { label: "Como calcular FGTS (blog)", to: "/blog/como-calcular-fgts" },
      { label: "Calculadora de INSS", to: "/calculadoras/inss" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
      { label: "Todas as calculadoras", to: "/calculadoras" },
    ]}
  />
);

export default CalculadoraFgtsPage;
