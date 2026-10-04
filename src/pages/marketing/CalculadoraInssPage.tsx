import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__inss";
import { InssCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: calculadora INSS salário contribuição

const seo = PUBLIC_PAGE_SEO.calculadoraInss;

const CalculadoraInssPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="INSS"
    form={<InssCalculatorForm />}
    guideSections={[
      {
        title: "Como calcular o desconto de INSS do empregado",
        paragraphs: [
          "O INSS do empregado CLT é progressivo: cada faixa do salário de contribuição tem uma alíquota (7,5% a 14%). A calculadora soma o desconto de cada fatia até o teto.",
          "Informe o salário de contribuição do mês (em geral o bruto das verbas que entram na base). O resultado é a estimativa do desconto na folha.",
        ],
        bullets: [
          "Tabela 2026: até R$ 1.621 (7,5%); até R$ 2.902,84 (9%); até R$ 4.354,27 (12%); até R$ 8.475,55 (14%)",
          "Teto de contribuição 2026: R$ 8.475,55",
        ],
      },
      {
        title: "Por que não é um percentual único sobre o salário",
        paragraphs: [
          "Muita gente multiplica o salário inteiro por 14% — isso erra. O correto é aplicar 7,5% só na primeira faixa, 9% na segunda, e assim por diante.",
          "Por isso um salário de R$ 3.300 não desconta 14% cheio: parte cai nas faixas menores.",
        ],
      },
      {
        title: "INSS e imposto de renda",
        paragraphs: [
          "O INSS entra na base do IRRF (reduz o rendimento tributável). Se a intenção é só o imposto de renda, use a calculadora de imposto de renda; se quiser o líquido com variáveis do ponto, use a folha de pagamento.",
        ],
      },
    ]}
    faqs={[
      {
        q: "A tabela é de 2026?",
        a: "Sim — faixas da Portaria MPS/MF nº 13/2026 (competência janeiro/2026). Confirme sempre com o contador se houver nova portaria.",
      },
      {
        q: "Vale para autônomo ou MEI?",
        a: "Não. Esta tool é a tabela progressiva de empregado/doméstico/avulso. Autônomo e MEI têm regras próprias.",
      },
      {
        q: "O teto limita o desconto?",
        a: "Sim. Acima de R$ 8.475,55 a base para essa tabela para no teto.",
      },
      {
        q: "Quero só o IRRF",
        a: "Use /calculadoras/imposto-de-renda — ela já estima o INSS e aplica a tabela/redução do IR 2026.",
      },
    ]}
    related={[
      { label: "Como calcular INSS (blog)", to: "/blog/como-calcular-inss" },
      { label: "Calculadora de FGTS", to: "/calculadoras/fgts" },
      { label: "Calculadora de imposto de renda (IRRF)", to: "/calculadoras/imposto-de-renda" },
      { label: "Calculadora de folha de pagamento", to: "/calculadoras/folha-de-pagamento" },
      { label: "Todas as calculadoras", to: "/calculadoras" },
    ]}
  />
);

export default CalculadoraInssPage;
