import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__horas-noturnas";
import { HorasNoturnasCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

const seo = PUBLIC_PAGE_SEO.calculadoraHorasNoturnas;

const CalculadoraHorasNoturnasPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="horas noturnas"
    form={<HorasNoturnasCalculatorForm />}
    guideSections={[
      {
        title: "Hora normal e adicional (art. 73 da CLT)",
        paragraphs: [
          "Hora normal = salário mensal ÷ divisor. Sobre ela incide o adicional noturno (mínimo de 20% no trabalho urbano).",
          "No mensalista o salário já remunera a hora normal. O que se lança a mais na folha é o adicional: hora normal × percentual × horas noturnas reduzidas.",
        ],
        bullets: [
          "Hora normal = salário ÷ divisor",
          "Adicional a pagar = hora normal × (adicional%) × horas reduzidas",
        ],
      },
      {
        title: "Hora noturna reduzida (52 min 30 s)",
        paragraphs: [
          "Entre 22h e 5h, cada 52 minutos e 30 segundos equivalem a 1 hora noturna para apuração da jornada.",
          "Informe as horas no relógio no período noturno. A conversão é: (horas × 60) ÷ 52,5.",
        ],
        bullets: ["Horas reduzidas = (horas no relógio × 60) ÷ 52,5"],
      },
    ]}
    faqs={[
      {
        q: "Por que não mostro “total com hora cheia + adicional” como se fosse tudo a mais?",
        a: "Porque no mensalista a hora normal já está no salário. O acréscimo típico é só o adicional noturno. A hora reduzida também conta na jornada e pode gerar hora extra em outra conta.",
      },
      {
        q: "O adicional mínimo é sempre 20%?",
        a: "No urbano o mínimo legal é 20%. Convenção coletiva pode majorar — ajuste o percentual.",
      },
      {
        q: "Posso somar HE e noturno juntos aqui?",
        a: "Não. Calcule o adicional noturno aqui e a hora extra na calculadora de hora extra.",
      },
    ]}
    related={[
      { label: "Artigo: como calcular horas noturnas", to: "/blog/como-calcular-horas-noturnas" },
      { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
    ]}
  />
);

export default CalculadoraHorasNoturnasPage;
