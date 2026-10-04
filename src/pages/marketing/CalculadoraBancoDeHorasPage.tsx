import { CalculatorToolPageView } from "@/components/calculators/CalculatorToolPageView";
import { jsonLd } from "@/content/jsonld/calculadoras__banco-de-horas";
import { BancoHorasCalculatorForm } from "@/components/calculators/CalculatorForms";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";

// intent: calculadora banco de horas — crédito débito saldo

const seo = PUBLIC_PAGE_SEO.calculadoraBancoDeHoras;

const CalculadoraBancoDeHorasPage = () => (
  <CalculatorToolPageView
    jsonLd={jsonLd}
    seo={seo}
    highlight="banco de horas"
    form={<BancoHorasCalculatorForm />}
    guideSections={[
      {
        title: "Crédito, débito e saldo",
        paragraphs: [
          "No banco de horas, horas além da jornada entram a crédito; faltas ou compensações entram a débito. O saldo é crédito menos débito.",
          "Alguns acordos usam fator (ex.: 1,5) na conversão. Informe o fator do seu acordo; use 1 se não houver multiplicador.",
        ],
      },
      {
        title: "Acordo escrito e prazo",
        paragraphs: [
          "Banco de horas exige base legal (acordo individual ou coletivo) e regras de prazo/compensação. A calculadora não valida o acordo — só faz a conta do saldo informado.",
          "Leia o guia de banco de horas e horas extras para o contexto jurídico de alto nível.",
        ],
      },
      {
        title: "Quando converter em pagamento",
        paragraphs: [
          "Se o prazo do banco vence sem compensação, o saldo pode virar pagamento com os adicionais devidos. Confirme com o contador e a convenção.",
          "No SegPonto o painel ajuda a acompanhar saldos do time; esta tool é para simulação pontual.",
        ],
      },
    ]}
    faqs={[
      {
        q: "Posso usar banco sem acordo?",
        a: "Na prática o banco precisa de lastro em acordo. Sem isso, o caminho usual é pagar hora extra.",
      },
      {
        q: "O fator 1,5 é obrigatório?",
        a: "Não. Depende do que estiver escrito no acordo ou convenção. A ferramenta só multiplica o que você informar.",
      },
      {
        q: "Saldo negativo significa o quê?",
        a: "Que há mais débito que crédito no período informado — a pessoa 'deve' horas ao banco, conforme a política.",
      },
      {
        q: "Isso substitui o módulo de banco do SegPonto?",
        a: "Não. É estimativa. O produto mantém o saldo operacional por colaborador no painel.",
      },
    ]}
    related={[
      { label: "Banco de horas e horas extras (guia)", to: "/blog/como-funciona-o-banco-de-horas-na-pratica" },
      { label: "Como funciona o banco de horas (blog)", to: "/blog/como-funciona-o-banco-de-horas-na-pratica" },
      { label: "Calculadora de hora extra", to: "/calculadoras/hora-extra" },
      { label: "Controle de jornada", to: "/blog/controle-de-jornada-o-que-e-como-funciona-e-como-registrar-a-jornada-dos-funcionarios" },
    ]}
  />
);

export default CalculadoraBancoDeHorasPage;
