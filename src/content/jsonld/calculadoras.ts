import { calculatorsIndexJsonLd } from "@/components/seo/jsonld/templates";

export const path = "/calculadoras";
export const jsonLd = calculatorsIndexJsonLd({
  title: "Calculadoras de ponto, jornada e folha | SegPonto",
  description: "Calculadora de ponto, férias, hora extra, horas noturnas, banco de horas e folha. Ferramentas gratuitas com fórmulas CLT para conferência.",
  items: [{"name":"Calculadora de folha de ponto","path":"/calculadoras/folha-de-ponto"},{"name":"Calculadora de férias","path":"/calculadoras/ferias"},{"name":"Calculadora de férias da empregada doméstica","path":"/calculadoras/ferias-empregada-domestica"},{"name":"Calculadora de hora extra","path":"/calculadoras/hora-extra"},{"name":"Calculadora de domingo trabalhado","path":"/calculadoras/domingo-trabalhado"},{"name":"Calculadora de feriado trabalhado","path":"/calculadoras/feriado-trabalhado"},{"name":"Calculadora de horas noturnas","path":"/calculadoras/horas-noturnas"},{"name":"Calculadora de banco de horas","path":"/calculadoras/banco-de-horas"},{"name":"Calculadora de folha de pagamento","path":"/calculadoras/folha-de-pagamento"},{"name":"Calculadora de imposto de renda (IRRF)","path":"/calculadoras/imposto-de-renda"},{"name":"Calculadora de INSS","path":"/calculadoras/inss"},{"name":"Calculadora de FGTS","path":"/calculadoras/fgts"},{"name":"Calculadora de custo de ponto eletrônico","path":"/calculadoras/custo-ponto-eletronico"}],
});
