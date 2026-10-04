import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__ferias-empregada-domestica";
import { FeriasDomesticaCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraFeriasEmpregadaDomestica;

const CalculadoraFeriasEmpregadaDomesticaPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="férias da empregada doméstica"
    titleBefore="Calculadora de"
    form={<FeriasDomesticaCalculatorForm />}
    guideSections={[
      {
        title: "Cálculo básico: salário + 1/3",
        paragraphs: [
          "Na regra geral, após 12 meses de trabalho a empregada doméstica tem direito a 30 dias de férias com remuneração acrescida de pelo menos 1/3.",
          "Para 30 dias: total bruto ≈ salário + (salário ÷ 3). Para menos dias: (salário ÷ 30 × dias) + 1/3.",
        ],
        bullets: [
          "Valor do dia = salário ÷ 30",
          "Férias brutas = valor do dia × dias a gozar",
          "1/3 = férias brutas ÷ 3",
        ],
      },
      {
        title: "Abono pecuniário (venda de até 10 dias)",
        paragraphs: [
          "A empregada pode converter até 1/3 das férias em abono. Com direito a 30 dias, vender 10 significa gozar 20.",
        ],
      },
      {
        title: "Pagamento",
        paragraphs: [
          "O pagamento deve ser feito até 2 dias antes do início das férias. O eSocial Doméstico registra o período e distribui valores entre competências quando as férias atravessam meses.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Qual a diferença para a calculadora de férias geral?",
        a: "A matemática do terço é a mesma. Esta versão foca no cenário da empregada doméstica (salário, dias e abono), sem a tabela de faltas da CLT de empresa.",
      },
      {
        q: "Posso simular 15 ou 10 dias?",
        a: "Sim. Informe os dias de férias (ou use os atalhos) e, se for o caso, os dias de abono.",
      },
      {
        q: "A calculadora já desconta INSS?",
        a: "Não. Mostra valores brutos. Os descontos entram na folha / eSocial Doméstico.",
      },
    ]}
    related={[
      { label: "Como calcular férias da empregada doméstica", to: "/blog/como-calcular-ferias-empregada-domestica" },
      { label: "Calculadora de férias (geral)", to: "/calculadoras/ferias" },
      { label: "Ponto para empregada doméstica", to: "/ponto-eletronico-empregada-domestica" },
      { label: "Como calcular férias", to: "/blog/como-calcular-ferias" },
    ]}
  />
);

export default CalculadoraFeriasEmpregadaDomesticaPage;
