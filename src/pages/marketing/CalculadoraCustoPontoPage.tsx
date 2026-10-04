import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__custo-ponto-eletronico";
import { CustoPontoCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: TCO custo ponto eletrônico por headcount

const seo = PUBLIC_PAGE_SEO.calculadoraCustoPonto;

const CalculadoraCustoPontoPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="custo do ponto"
    titleBefore="Calculadora de"
    form={<CustoPontoCalculatorForm />}
    guideSections={[
      {
        title: "Como lemos o preço SegPonto",
        paragraphs: [
          "Os planos do SegPonto são mensais por faixa de funcionários. A calculadora escolhe a faixa que comporta o número informado e mostra mensal, anual e custo por cabeça.",
          "O plano teste (1 funcionário) existe para experimentar; a grade completa está em /precos.",
        ],
      },
      {
        title: "Custo oculto da planilha",
        paragraphs: [
          "Planilha 'grátis' consome horas de RH, retrabalho com o contador e risco de erro no espelho. Some esse tempo ao comparar com o SaaS.",
          "Esta tool não inventa preço fora da tabela oficial — só estima a faixa.",
        ],
      },
      {
        title: "Próximo passo",
        paragraphs: [
          "Se a faixa fizer sentido, abra /cadastro com o plano desejado ou leia o artigo sobre quanto custa ponto eletrônico.",
          "Dúvidas de o que está incluso: página de preços e FAQ de cobrança.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Os valores mudam?",
        a: "A fonte oficial é a página de preços. Se a tabela mudar, atualizamos lá e nesta estimativa.",
      },
      {
        q: "Tem taxa de implantação?",
        a: "A contratação é self-serve no cartão. Veja condições atuais em /precos e /cadastro.",
      },
      {
        q: "App está incluso?",
        a: "Sim: painel web e app do colaborador entram na assinatura da faixa.",
      },
      {
        q: "E se eu crescer de faixa?",
        a: "Você sobe para o plano que comporta o novo headcount. A calculadora ajuda a antecipar o salto.",
      },
    ]}
    related={[
      { label: "Preços SegPonto", to: "/precos" },
      { label: "Quanto custa ponto eletrônico (blog)", to: "/blog/quanto-custa-um-sistema-de-ponto-eletronico" },
      { label: "Contratar", to: "/cadastro" },
      { label: "Ponto eletrônico para empresas", to: "/blog/ponto-eletronico-para-empresas-como-funciona-o-controle-de-jornada" },
    ]}
  />
);

export default CalculadoraCustoPontoPage;
