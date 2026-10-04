import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__hora-extra";
import { HoraExtraCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraHoraExtra;

const CalculadoraHoraExtraPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="hora extra"
    form={<HoraExtraCalculatorForm />}
    guideSections={[
      {
        title: "Como calcular o valor da hora normal",
        paragraphs: [
          "Esta calculadora começa pelo valor da hora normal. Você informa o salário mensal e o divisor de horas do contrato. O sistema divide o salário pelo divisor.",
          "Na jornada de 44 horas semanais o divisor mais usado é 220. Outras cargas usam 180, 200 ou outro número definido no contrato ou na convenção coletiva.",
          "O resultado é o valor da hora normal. É a base de tudo que vem depois no cálculo da hora extra.",
        ],
        bullets: ["Valor da hora normal = salário mensal ÷ divisor de horas"],
      },
      {
        title: "Adicional de hora extra",
        paragraphs: [
          "Sobre a hora normal entra o adicional. Em dia útil o mínimo é 50% (hora × 1,50). Em hora extraordinária prestada em domingo ou feriado o mínimo costuma ser 100% (hora × 2).",
          "Isso é hora além da jornada. Trabalho no domingo/feriado sem folga compensatória (Súmula 146, salário ÷ 30) é outra conta — use a calculadora de domingo e feriado.",
        ],
        bullets: [
          "Dia útil: hora extra = hora normal × 1,50",
          "HE em domingo/feriado: hora extra = hora normal × 2,00",
        ],
      },
      {
        title: "Como calcular o total bruto de horas extras no período",
        paragraphs: [
          "Depois de achar o valor de uma hora extra, multiplique pelo número de horas extras que você informou no campo Horas extras no período.",
          "Total bruto = valor da hora extra × quantidade de horas extras. A calculadora mostra também o valor da hora normal, o percentual aplicado e o valor unitário da hora extra para você conferir cada passo.",
          "O holerite oficial pode incluir outras rubricas, médias e descontos. Use este total para conferência antes de fechar o espelho com o contador.",
        ],
        bullets: ["Total bruto = valor da hora extra × horas extras informadas"],
      },
    ]}
    faqs={[
      {
        q: "Qual divisor usar?",
        a: "220 é o mais comum para 44 horas semanais. Confira o contrato e a convenção do colaborador.",
      },
      {
        q: "A calculadora substitui o holerite?",
        a: "Não. Ela calcula o bruto das horas extras informadas. A folha oficial trata INSS, IRRF e demais rubricas.",
      },
      {
        q: "Banco de horas ou pagar a extra?",
        a: "Depende do acordo e da política da empresa. Para simular saldo de banco, use a calculadora de banco de horas; para regras, a página de banco de horas e HE.",
      },
      {
        q: "Domingo e feriado são só aqui?",
        a: "Aqui você calcula hora extraordinária (além da jornada) com 100% em domingo/feriado. Para o dia de repouso trabalhado sem compensação (Súmula 146, mensalista ÷ 30), use a calculadora de domingo e feriado.",
      },
    ]}
    related={[
      { label: "Artigo: como calcular hora extra", to: "/blog/como-calcular-hora-extra" },
      { label: "Calculadora de horas noturnas", to: "/calculadoras/horas-noturnas" },
      { label: "Calculadora de férias", to: "/calculadoras/ferias" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
    ]}
  />
);

export default CalculadoraHoraExtraPage;
