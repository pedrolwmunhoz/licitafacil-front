import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__folha-de-ponto";
import { FolhaDePontoCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: calculadora folha/cartão de ponto — somar batidas

const seo = PUBLIC_PAGE_SEO.calculadoraFolhaDePonto;

const CalculadoraFolhaDePontoPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="folha de ponto"
    form={<FolhaDePontoCalculatorForm />}
    guideSections={[
      {
        title: "O que é folha ou cartão de ponto",
        paragraphs: [
          "A folha (ou cartão) de ponto é o registro das batidas de entrada e saída. Ela mostra quantas horas a pessoa trabalhou no dia ou na semana — não calcula INSS nem líquido do holerite.",
          "Esta ferramenta soma pares de horário no formato HH:MM. Use para conferir um cartão manual, um print ou um espelho antes de fechar o mês.",
        ],
        bullets: ["Folha de ponto = tempo trabalhado", "Folha de pagamento = salário e descontos"],
      },
      {
        title: "Diferença para a calculadora de folha de pagamento",
        paragraphs: [
          "Se você precisa estimar salário líquido, INSS e descontos, use a calculadora de folha de pagamento. Aqui o foco é só bater a conta das horas do cartão.",
          "No SegPonto o espelho já organiza as batidas do app; esta página ajuda quem ainda está em planilha ou quer validar um dia pontual.",
        ],
      },
      {
        title: "Erros comuns ao somar batidas",
        paragraphs: [
          "Esquecer o intervalo (almoço) e somar entrada–saída única como se fosse contínuo. Faltar uma batida (só entrada). Cruzar meia-noite sem perceber (plantão).",
          "Se a saída for menor que a entrada, tratamos como virada de dia. Confira se é isso mesmo no seu caso.",
        ],
        bullets: ["Intervalo precisa de dois pares ou já descontado", "Meia-noite: confira o sentido da virada"],
      },
    ]}
    faqs={[
      {
        q: "E se faltar uma batida?",
        a: "A conta fica incompleta. Inclua só pares válidos ou ajuste o horário faltante antes de somar — no sistema real isso vira solicitação de ajuste.",
      },
      {
        q: "Como trato o intervalo?",
        a: "Informe manhã e tarde como dois pares (ex.: 08–12 e 13–17). Se preferir, já desconte o intervalo e use um único par contínuo.",
      },
      {
        q: "Serve para plantão que cruza meia-noite?",
        a: "Sim: se a saída for menor que a entrada, a ferramenta assume virada de dia (ex.: 22:00 → 06:00).",
      },
      {
        q: "Isso substitui o espelho do SegPonto?",
        a: "Não. É uma calculadora de conferência. No produto as batidas vêm do app com histórico e aprovações.",
      },
    ]}
    related={[
      { label: "O que é espelho de ponto (blog)", to: "/blog/o-que-e-espelho-de-ponto" },
      { label: "Como fechar o ponto do mês", to: "/blog/como-fechar-o-ponto-do-mes" },
      { label: "Folha de ponto online", to: "/blog/folha-de-ponto-online-como-funciona-e-como-fazer-o-controle-da-jornada" },
      { label: "Todas as calculadoras", to: "/calculadoras" },
    ]}
  />
);

export default CalculadoraFolhaDePontoPage;
