import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__domingo-trabalhado";
import { DomingoTrabalhadoCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraDomingoTrabalhado;

const CalculadoraDomingoTrabalhadoPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="domingo trabalhado"
    titleBefore="Calculadora de"
    form={<DomingoTrabalhadoCalculatorForm />}
    guideSections={[
      {
        title: "Mensalista: salário ÷ 30 (Súmula 146)",
        paragraphs: [
          "Para empregado mensalista, o valor do dia é o salário mensal dividido por 30. Sem folga compensatória, o domingo trabalhado deve ser remunerado em dobro.",
          "O salário mensal já inclui a remuneração do repouso. Por isso o acréscimo na folha costuma ser de mais um dia (1/30), completando a dobra.",
        ],
        bullets: [
          "Valor do dia = salário mensal ÷ 30",
          "Remuneração em dobro do dia = valor do dia × 2",
          "Acréscimo na folha = valor do dia (1/30)",
        ],
      },
      {
        title: "Horista: horas × valor da hora × 2",
        paragraphs: [
          "Para horista, multiplique as horas trabalhadas no domingo pelo valor da hora e aplique a dobra quando não houver folga compensatória.",
        ],
        bullets: ["Remuneração em dobro = horas × valor da hora × 2"],
      },
      {
        title: "Não confundir com hora extra",
        paragraphs: [
          "Trabalho no domingo sem compensação (Súmula 146) é diferente de hora extraordinária além da jornada. Para horas extras use a calculadora de hora extra.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Por que mensalista usa ÷ 30 e não o divisor 220?",
        a: "Porque a remuneração do domingo do mensalista é calculada pelo valor do dia (salário ÷ 30), conforme a jurisprudência do TST sobre a dobra do repouso não compensado — não pelo valor da hora da jornada.",
      },
      {
        q: "E se houve folga compensatória?",
        a: "Com folga compensatória adequada, a dobra da Súmula 146 não se aplica automaticamente. Confirme escala e política antes de lançar.",
      },
      {
        q: "Qual a diferença para a calculadora de hora extra?",
        a: "Hora extra remunera tempo além da jornada (50% ou 100% sobre a hora). Esta calculadora trata o domingo trabalhado sem compensação pela regra do dia (mensalista) ou da dobra horária (horista).",
      },
      {
        q: "E feriado trabalhado?",
        a: "A lógica da Súmula 146 é a mesma, mas há uma calculadora específica de feriado trabalhado.",
      },
    ]}
    related={[
      { label: "Calculadora de feriado trabalhado", to: "/calculadoras/feriado-trabalhado" },
      { label: "Como calcular domingo trabalhado", to: "/blog/como-calcular-domingo-trabalhado" },
      { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
      { label: "Escalas de trabalho e ponto", to: "/blog/escalas-de-trabalho-e-ponto-tipos-de-escala-e-como-controlar-a-jornada" },
    ]}
  />
);

export default CalculadoraDomingoTrabalhadoPage;
