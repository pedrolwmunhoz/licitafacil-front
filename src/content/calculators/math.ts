/** Minutos de trabalho noturno urbano que equivalem a 1 hora reduzida (52 min 30 s). */
export const NIGHT_MINUTES_PER_REDUCED_HOUR = 52.5;

export function formatBrl(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatHours(value: number): string {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function hourlyRate(monthlySalary: number, divisor: number): number {
  if (divisor <= 0) return 0;
  return monthlySalary / divisor;
}

export type HoraExtraDayType = "weekday" | "sunday_holiday";

export type HoraExtraResult = {
  baseHourly: number;
  adicionalPercent: number;
  paidHourly: number;
  extraHours: number;
  totalBruto: number;
};

export function calculateHoraExtra(params: {
  monthlySalary: number;
  divisor: number;
  extraHours: number;
  dayType: HoraExtraDayType;
}): HoraExtraResult {
  const baseHourly = hourlyRate(params.monthlySalary, params.divisor);
  const adicionalPercent = params.dayType === "weekday" ? 50 : 100;
  const paidHourly = baseHourly * (1 + adicionalPercent / 100);
  const totalBruto = paidHourly * params.extraHours;
  return {
    baseHourly,
    adicionalPercent,
    paidHourly,
    extraHours: params.extraHours,
    totalBruto,
  };
}

/**
 * Domingo/feriado trabalhado sem folga compensatória (Súmula 146 do TST).
 * Mensalista: salário ÷ 30 (valor do dia); dobra = 2×; acréscimo na folha = 1×
 * (o salário mensal já inclui a remuneração do repouso).
 * Horista: horas × valor da hora × 2.
 */
export type DomingoFeriadoPayType = "mensalista" | "horista";

export type DomingoFeriadoResult = {
  payType: DomingoFeriadoPayType;
  dailyRate: number;
  valorHora: number;
  hours: number;
  remuneracaoEmDobro: number;
  acrescimoNaFolha: number;
};

export function calculateDomingoFeriado(params: {
  payType: DomingoFeriadoPayType;
  monthlySalary?: number;
  hourlyWage?: number;
  hours?: number;
}): DomingoFeriadoResult {
  if (params.payType === "mensalista") {
    const salary = Math.max(0, params.monthlySalary ?? 0);
    const dailyRate = salary / 30;
    return {
      payType: "mensalista",
      dailyRate,
      valorHora: 0,
      hours: 0,
      remuneracaoEmDobro: dailyRate * 2,
      acrescimoNaFolha: dailyRate,
    };
  }
  const valorHora = Math.max(0, params.hourlyWage ?? 0);
  const hours = Math.max(0, params.hours ?? 0);
  const normal = valorHora * hours;
  return {
    payType: "horista",
    dailyRate: 0,
    valorHora,
    hours,
    remuneracaoEmDobro: normal * 2,
    acrescimoNaFolha: normal * 2,
  };
}

export type HorasNoturnasResult = {
  baseHourly: number;
  clockHours: number;
  nightReducedHours: number;
  adicionalPercent: number;
  nightHourly: number;
  adicionalValue: number;
};

export function clockHoursToNightReducedHours(clockHours: number): number {
  const clockMinutes = clockHours * 60;
  return clockMinutes / NIGHT_MINUTES_PER_REDUCED_HOUR;
}

export function calculateHorasNoturnas(params: {
  monthlySalary: number;
  divisor: number;
  clockHours: number;
  adicionalPercent?: number;
}): HorasNoturnasResult {
  const baseHourly = hourlyRate(params.monthlySalary, params.divisor);
  const adicionalPercent = params.adicionalPercent ?? 20;
  const nightReducedHours = clockHoursToNightReducedHours(params.clockHours);
  const nightHourly = baseHourly * (1 + adicionalPercent / 100);
  const adicionalValue = baseHourly * (adicionalPercent / 100) * nightReducedHours;
  return {
    baseHourly,
    clockHours: params.clockHours,
    nightReducedHours,
    adicionalPercent,
    nightHourly,
    adicionalValue,
  };
}

export function vacationDaysByUnjustifiedAbsences(absences: number): number {
  if (absences <= 5) return 30;
  if (absences <= 14) return 24;
  if (absences <= 23) return 18;
  if (absences <= 32) return 12;
  return 0;
}

export type FeriasResult = {
  monthlyBase: number;
  dailyRate: number;
  diasDireito: number;
  vacationDays: number;
  feriasBruto: number;
  tercoConstitucional: number;
  abonoDays: number;
  abonoBruto: number;
  abonoTerco: number;
  totalBruto: number;
};

/** Abono pecuniário: até 1/3 dos dias de direito (máx. 10 quando o direito é 30). */
export function maxAbonoPecuniarioDays(diasDireito: number): number {
  if (diasDireito <= 0) return 0;
  return Math.min(10, Math.floor(diasDireito / 3));
}

export function calculateFerias(params: {
  monthlySalary: number;
  variableMonthlyAverage?: number;
  /** Dias de férias a que o empregado tem direito no período (já pela tabela de faltas, se aplicável). */
  diasDireito: number;
  abonoDays?: number;
}): FeriasResult {
  const monthlyBase = params.monthlySalary + (params.variableMonthlyAverage ?? 0);
  const dailyRate = monthlyBase / 30;
  const diasDireito = Math.max(0, params.diasDireito);
  const abonoDays = Math.min(
    maxAbonoPecuniarioDays(diasDireito),
    Math.max(0, params.abonoDays ?? 0),
  );
  const vacationDays = Math.max(0, diasDireito - abonoDays);
  const feriasBruto = dailyRate * vacationDays;
  const tercoConstitucional = feriasBruto / 3;
  const abonoBruto = dailyRate * abonoDays;
  const abonoTerco = abonoBruto / 3;
  const totalBruto = feriasBruto + tercoConstitucional + abonoBruto + abonoTerco;
  return {
    monthlyBase,
    dailyRate,
    diasDireito,
    vacationDays,
    feriasBruto,
    tercoConstitucional,
    abonoDays,
    abonoBruto,
    abonoTerco,
    totalBruto,
  };
}

/** Faixas INSS empregado — tabela 2026 (competência jan/2026, Portaria MPS/MF nº 13/2026). */
const INSS_FAIXAS_2026: { limit: number; rate: number }[] = [
  { limit: 1621, rate: 0.075 },
  { limit: 2902.84, rate: 0.09 },
  { limit: 4354.27, rate: 0.12 },
  { limit: 8475.55, rate: 0.14 },
];

/** FGTS mensal: 8% (CLT) ou 2% (aprendiz). Opcionalmente proporcional aos dias. */
export type FgtsResult = {
  remuneracaoMensal: number;
  diasTrabalhados: number;
  baseCalculo: number;
  aliquota: number;
  deposito: number;
  multa40: number;
};

export function calculateFgts(params: {
  remuneracaoMensal: number;
  /** 0.08 empregado | 0.02 aprendiz */
  aliquota?: number;
  /** 1–30; default 30 (mês cheio) */
  diasTrabalhados?: number;
  /** Base para multa rescisória de 40% (opcional) */
  baseMulta?: number;
}): FgtsResult {
  const remuneracaoMensal = Math.max(0, params.remuneracaoMensal);
  const aliquota = params.aliquota === 0.02 ? 0.02 : 0.08;
  const dias = Math.min(30, Math.max(0, params.diasTrabalhados ?? 30));
  const baseCalculo = Math.round(((remuneracaoMensal / 30) * dias) * 100) / 100;
  const deposito = Math.round(baseCalculo * aliquota * 100) / 100;
  const baseMulta = Math.max(0, params.baseMulta ?? 0);
  const multa40 = Math.round(baseMulta * 0.4 * 100) / 100;
  return { remuneracaoMensal, diasTrabalhados: dias, baseCalculo, aliquota, deposito, multa40 };
}

export function calculateInssEmployee2026(baseCalculo: number): number {
  if (baseCalculo <= 0) return 0;
  const capped = Math.min(baseCalculo, INSS_FAIXAS_2026[INSS_FAIXAS_2026.length - 1].limit);
  let inss = 0;
  let previous = 0;
  for (const faixa of INSS_FAIXAS_2026) {
    if (capped <= previous) break;
    const slice = Math.min(capped, faixa.limit) - previous;
    inss += slice * faixa.rate;
    previous = faixa.limit;
  }
  return Math.round(inss * 100) / 100;
}

/** Desconto simplificado mensal IRRF 2026 (= 25% da faixa isenta R$ 2.428,80). */
export const IRRF_DESCONTO_SIMPLIFICADO_2026 = 607.2;

/** Dedução por dependente na base do IRRF (mensal). */
export const IRRF_DEDUCAO_DEPENDENTE_2026 = 189.59;

/** Tabela progressiva IRRF 2026 (mesmas faixas de 2025; Lei 15.270/2025). */
const IRRF_FAIXAS_2026: { limit: number; rate: number; deduct: number }[] = [
  { limit: 2428.8, rate: 0, deduct: 0 },
  { limit: 2826.65, rate: 0.075, deduct: 182.16 },
  { limit: 3751.05, rate: 0.15, deduct: 394.16 },
  { limit: 4664.68, rate: 0.225, deduct: 675.49 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.275, deduct: 908.73 },
];

export type IrrfMensalResult = {
  rendimentoTributavel: number;
  inss: number;
  dependentes: number;
  deducaoAplicada: number;
  usouDescontoSimplificado: boolean;
  baseCalculo: number;
  aliquota: number;
  impostoTabela: number;
  reducaoLei15270: number;
  irrf: number;
};

/**
 * IRRF mensal 2026: base = bruto − max(INSS+dependentes, desconto simplificado),
 * tabela progressiva, depois redução da Lei 15.270/2025 (isenção efetiva até R$ 5.000).
 */
export function calculateIrrfMensal2026(params: {
  rendimentoTributavel: number;
  inss: number;
  dependentes?: number;
}): IrrfMensalResult {
  const rendimentoTributavel = Math.max(0, params.rendimentoTributavel);
  const inss = Math.max(0, params.inss);
  const dependentes = Math.max(0, Math.floor(params.dependentes ?? 0));
  const deducaoLegal = inss + dependentes * IRRF_DEDUCAO_DEPENDENTE_2026;
  const usouDescontoSimplificado = IRRF_DESCONTO_SIMPLIFICADO_2026 >= deducaoLegal;
  const deducaoAplicada = Math.max(deducaoLegal, IRRF_DESCONTO_SIMPLIFICADO_2026);
  const baseCalculo = Math.max(0, rendimentoTributavel - deducaoAplicada);

  let aliquota = 0;
  let parcela = 0;
  for (const faixa of IRRF_FAIXAS_2026) {
    if (baseCalculo <= faixa.limit) {
      aliquota = faixa.rate;
      parcela = faixa.deduct;
      break;
    }
  }
  const impostoTabela = Math.max(0, Math.round((baseCalculo * aliquota - parcela) * 100) / 100);

  let reducaoLei15270 = 0;
  if (rendimentoTributavel <= 5000) {
    reducaoLei15270 = Math.min(impostoTabela, 312.89);
  } else if (rendimentoTributavel <= 7350) {
    reducaoLei15270 = Math.min(impostoTabela, Math.max(0, 978.62 - 0.133145 * rendimentoTributavel));
  }
  reducaoLei15270 = Math.round(reducaoLei15270 * 100) / 100;
  const irrf = Math.max(0, Math.round((impostoTabela - reducaoLei15270) * 100) / 100);

  return {
    rendimentoTributavel,
    inss,
    dependentes,
    deducaoAplicada,
    usouDescontoSimplificado,
    baseCalculo,
    aliquota,
    impostoTabela,
    reducaoLei15270,
    irrf,
  };
}

export type FolhaDePagamentoResult = {
  salarioBase: number;
  proventosFixos: number;
  horaExtra: number;
  adicionalNoturno: number;
  outrasVariaveis: number;
  totalProventos: number;
  valorHora: number;
  valorDia: number;
  descontoFaltasDias: number;
  descontoFaltasHoras: number;
  descontoFaltas: number;
  descontoVt: number;
  outrosDescontos: number;
  inss: number;
  irrf: number;
  totalDescontos: number;
  liquidoEstimado: number;
};

export function calculateFolhaDePagamento(params: {
  salarioBase: number;
  divisor: number;
  proventosFixos?: number;
  valorHoraExtra?: number;
  valorAdicionalNoturno?: number;
  outrasVariaveis?: number;
  /** Dias de falta integral (mensalista: salário ÷ 30 por dia). */
  diasFalta?: number;
  /** Horas de atraso / falta parcial (salário ÷ divisor). */
  horasFalta?: number;
  descontoVtPercent?: boolean;
  outrosDescontos?: number;
  dependentes?: number;
}): FolhaDePagamentoResult {
  const salarioBase = params.salarioBase;
  const proventosFixos = params.proventosFixos ?? 0;
  const horaExtra = params.valorHoraExtra ?? 0;
  const adicionalNoturno = params.valorAdicionalNoturno ?? 0;
  const outrasVariaveis = params.outrasVariaveis ?? 0;
  const totalProventos = salarioBase + proventosFixos + horaExtra + adicionalNoturno + outrasVariaveis;
  const valorHora = hourlyRate(salarioBase, params.divisor || 220);
  const valorDia = salarioBase / 30;
  const descontoFaltasDias = valorDia * (params.diasFalta ?? 0);
  const descontoFaltasHoras = valorHora * (params.horasFalta ?? 0);
  const descontoFaltas = descontoFaltasDias + descontoFaltasHoras;
  const descontoVt = params.descontoVtPercent ? salarioBase * 0.06 : 0;
  const outrosDescontos = params.outrosDescontos ?? 0;
  const inss = calculateInssEmployee2026(totalProventos);
  const irrf = calculateIrrfMensal2026({
    rendimentoTributavel: totalProventos,
    inss,
    dependentes: params.dependentes,
  }).irrf;
  const totalDescontos = inss + irrf + descontoFaltas + descontoVt + outrosDescontos;
  const liquidoEstimado = totalProventos - totalDescontos;
  return {
    salarioBase,
    proventosFixos,
    horaExtra,
    adicionalNoturno,
    outrasVariaveis,
    totalProventos,
    valorHora,
    valorDia,
    descontoFaltasDias,
    descontoFaltasHoras,
    descontoFaltas,
    descontoVt,
    outrosDescontos,
    inss,
    irrf,
    totalDescontos,
    liquidoEstimado,
  };
}

/** Parse "HH:MM" → minutos desde 00:00. Aceita cruzar meia-noite se saída < entrada. */
export function parseHhMmToMinutes(value: string): number | null {
  const m = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (!Number.isFinite(h) || !Number.isFinite(min) || h > 23 || min > 59) return null;
  return h * 60 + min;
}

export type PunchPair = { inTime: string; outTime: string };

export type FolhaDePontoResult = {
  pairs: { inTime: string; outTime: string; minutes: number }[];
  totalMinutes: number;
  totalHours: number;
  errors: string[];
};

export function calculateFolhaDePonto(pairs: PunchPair[]): FolhaDePontoResult {
  const errors: string[] = [];
  const computed: FolhaDePontoResult["pairs"] = [];
  let totalMinutes = 0;
  pairs.forEach((pair, index) => {
    if (!pair.inTime.trim() && !pair.outTime.trim()) return;
    const inM = parseHhMmToMinutes(pair.inTime);
    const outM = parseHhMmToMinutes(pair.outTime);
    if (inM === null || outM === null) {
      errors.push(`Par ${index + 1}: use o formato HH:MM.`);
      return;
    }
    let diff = outM - inM;
    if (diff < 0) diff += 24 * 60; // cruza meia-noite
    if (diff === 0) {
      errors.push(`Par ${index + 1}: entrada e saída iguais.`);
      return;
    }
    computed.push({ inTime: pair.inTime, outTime: pair.outTime, minutes: diff });
    totalMinutes += diff;
  });
  return {
    pairs: computed,
    totalMinutes,
    totalHours: totalMinutes / 60,
    errors,
  };
}

export type BancoHorasResult = {
  creditoHoras: number;
  debitoHoras: number;
  fator: number;
  saldoBrutoHoras: number;
  saldoConvertidoHoras: number;
};

export function calculateBancoDeHoras(params: {
  creditoHoras: number;
  debitoHoras: number;
  fatorConversao?: number;
}): BancoHorasResult {
  const fator = params.fatorConversao && params.fatorConversao > 0 ? params.fatorConversao : 1;
  const saldoBrutoHoras = params.creditoHoras - params.debitoHoras;
  return {
    creditoHoras: params.creditoHoras,
    debitoHoras: params.debitoHoras,
    fator,
    saldoBrutoHoras,
    saldoConvertidoHoras: saldoBrutoHoras * fator,
  };
}

export type CustoPontoResult = {
  funcionarios: number;
  planoLabel: string;
  precoMensal: number;
  precoAnual: number;
  custoPorFuncionarioMes: number;
};

export function calculateCustoPonto(params: {
  funcionarios: number;
  plans: { range: string; priceValue: number; maxFuncionarios: number }[];
}): CustoPontoResult {
  const n = Math.max(1, Math.floor(params.funcionarios));
  const sorted = [...params.plans].sort((a, b) => a.maxFuncionarios - b.maxFuncionarios);
  const plan = sorted.find((p) => n <= p.maxFuncionarios) ?? sorted[sorted.length - 1];
  const precoMensal = plan?.priceValue ?? 0;
  return {
    funcionarios: n,
    planoLabel: plan?.range ?? "—",
    precoMensal,
    precoAnual: precoMensal * 12,
    custoPorFuncionarioMes: n > 0 ? precoMensal / n : 0,
  };
}
