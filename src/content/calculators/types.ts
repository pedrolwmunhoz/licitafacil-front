export type CalculatorSlug =
  | "hora-extra"
  | "horas-noturnas"
  | "ferias"
  | "ferias-empregada-domestica"
  | "folha-de-pagamento"
  | "folha-de-ponto"
  | "domingo-trabalhado"
  | "feriado-trabalhado"
  | "banco-de-horas"
  | "custo-ponto-eletronico"
  | "imposto-de-renda"
  | "inss"
  | "fgts";

export type CalculatorLink = {
  label: string;
  to: string;
};
