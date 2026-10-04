import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__folha-de-pagamento";
import { FolhaDePagamentoCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraFolhaDePagamento;

const CalculadoraFolhaDePagamentoPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="folha de pagamento"
    form={<FolhaDePagamentoCalculatorForm />}
    guideSections={[
      {
        title: "Proventos",
        paragraphs: [
          "Some salário base, proventos fixos e variáveis em reais (hora extra, adicional noturno e outras) já apurados no espelho ou nas outras calculadoras.",
        ],
        bullets: ["Total de proventos = salário + fixos + hora extra + noturno + outras variáveis"],
      },
      {
        title: "Faltas e atrasos",
        paragraphs: [
          "Falta de dia inteiro no mensalista: desconto = salário ÷ 30 por dia.",
          "Atraso ou falta parcial em horas: desconto = (salário ÷ divisor) × horas.",
        ],
        bullets: [
          "Dia de falta = salário ÷ 30",
          "Horas de atraso = (salário ÷ divisor) × horas",
        ],
      },
      {
        title: "INSS, IRRF, vale-transporte e líquido",
        paragraphs: [
          "INSS: tabela progressiva 2026 sobre o total de proventos.",
          "IRRF 2026: tabela progressiva + redução da Lei 15.270/2025.",
          "Vale-transporte: até 6% do salário base, se marcado.",
          "Líquido = proventos − INSS − IRRF − faltas − VT − outros descontos.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Por que dia de falta usa ÷ 30 e atraso usa divisor?",
        a: "No mensalista a falta integral desconta o valor do dia (salário ÷ 30). Atraso em horas usa o valor da hora da jornada (salário ÷ divisor).",
      },
      {
        q: "A calculadora substitui a folha do contador?",
        a: "Não. Serve para conferência de proventos, descontos principais e líquido.",
      },
      {
        q: "O INSS e o IRRF estão atualizados?",
        a: "Sim — tabelas 2026 e redução da Lei 15.270/2025. Confirme a base real com o contador.",
      },
    ]}
    related={[
      { label: "Artigo: como calcular folha", to: "/blog/como-calcular-folha-de-pagamento" },
      { label: "Calculadora de IRRF", to: "/calculadoras/imposto-de-renda" },
      { label: "Calculadora de INSS", to: "/calculadoras/inss" },
      { label: "Calculadora de FGTS", to: "/calculadoras/fgts" },
      { label: "Como calcular FGTS", to: "/blog/como-calcular-fgts" },
      { label: "Calculadora de folha de ponto", to: "/calculadoras/folha-de-ponto" },
    ]}
  />
);

export default CalculadoraFolhaDePagamentoPage;
