import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalculatorSlug } from "@/content/calculators";
import { Checkbox } from "@/components/ui/checkbox";
import {
  calculateBancoDeHoras,
  calculateCustoPonto,
  calculateDomingoFeriado,
  calculateFerias,
  calculateFolhaDePagamento,
  calculateFolhaDePonto,
  calculateHoraExtra,
  calculateHorasNoturnas,
  calculateInssEmployee2026,
  calculateFgts,
  calculateIrrfMensal2026,
  formatBrl,
  formatHours,
  maxAbonoPecuniarioDays,
  vacationDaysByUnjustifiedAbsences,
} from "@/content/calculators/math";
import type { DomingoFeriadoPayType } from "@/content/calculators/math";
import { TIPOS_ASSINATURA_COMERCIAIS } from "@/constants/tipoAssinatura";

function parseMoney(value: string): number {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function parseNumber(value: string): number {
  const normalized = value.replace(",", ".").trim();
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b border-landing-ink/10 last:border-0">
      <span className="text-sm text-landing-muted">{label}</span>
      <span className="text-sm font-semibold text-landing-ink tabular-nums">{value}</span>
    </div>
  );
}

function ResultBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-xl border-2 border-landing-ink/15 bg-white p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-landing-ink mb-4">Resultado estimado</h3>
      {children}
      <p className="mt-4 text-xs text-landing-muted leading-relaxed">
        Valores brutos para conferência. INSS, IRRF e regras da convenção entram na folha processada pelo contador.
      </p>
    </div>
  );
}

const fieldClass = "mt-1.5";
const inputClass =
  "h-11 rounded-lg border-landing-ink/20 bg-white text-landing-ink focus-visible:ring-landing-cta";

export function HoraExtraCalculatorForm() {
  const [salary, setSalary] = useState("3300");
  const [divisor, setDivisor] = useState("220");
  const [extraHours, setExtraHours] = useState("10");
  const [dayType, setDayType] = useState<"weekday" | "sunday_holiday">("weekday");

  const result = useMemo(() => {
    return calculateHoraExtra({
      monthlySalary: parseMoney(salary),
      divisor: parseNumber(divisor) || 220,
      extraHours: parseNumber(extraHours),
      dayType,
    });
  }, [salary, divisor, extraHours, dayType]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="he-salary">Salário mensal (R$)</Label>
          <Input
            id="he-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="he-divisor">Divisor de horas</Label>
          <Input
            id="he-divisor"
            className={inputClass}
            inputMode="numeric"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
          />
          <p className={`text-xs text-landing-muted mt-1 ${fieldClass}`}>Ex.: 220 para 44 h semanais</p>
        </div>
        <div>
          <Label htmlFor="he-hours">Horas extras no período</Label>
          <Input
            id="he-hours"
            className={inputClass}
            inputMode="decimal"
            value={extraHours}
            onChange={(e) => setExtraHours(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="he-day">Tipo de dia</Label>
          <Select value={dayType} onValueChange={(v) => setDayType(v as "weekday" | "sunday_holiday")}>
            <SelectTrigger id="he-day" className={`${inputClass} ${fieldClass}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekday">Dia útil (+50% mínimo)</SelectItem>
              <SelectItem value="sunday_holiday">Hora extra em domingo/feriado (+100% mínimo)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Valor da hora normal" value={formatBrl(result.baseHourly)} />
        <ResultRow label="Adicional aplicado" value={`${result.adicionalPercent}%`} />
        <ResultRow label="Valor da hora extra" value={formatBrl(result.paidHourly)} />
        <ResultRow label="Horas extras" value={formatHours(result.extraHours)} />
        <ResultRow label="Total bruto estimado" value={formatBrl(result.totalBruto)} />
      </ResultBox>
    </div>
  );
}

export function HorasNoturnasCalculatorForm() {
  const [salary, setSalary] = useState("3300");
  const [divisor, setDivisor] = useState("220");
  const [clockHours, setClockHours] = useState("7");
  const [adicional, setAdicional] = useState("20");

  const result = useMemo(() => {
    return calculateHorasNoturnas({
      monthlySalary: parseMoney(salary),
      divisor: parseNumber(divisor) || 220,
      clockHours: parseNumber(clockHours),
      adicionalPercent: parseNumber(adicional) || 20,
    });
  }, [salary, divisor, clockHours, adicional]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="hn-salary">Salário mensal (R$)</Label>
          <Input
            id="hn-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hn-divisor">Divisor de horas</Label>
          <Input
            id="hn-divisor"
            className={inputClass}
            inputMode="numeric"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hn-clock">Horas no relógio (22h às 5h)</Label>
          <Input
            id="hn-clock"
            className={inputClass}
            inputMode="decimal"
            value={clockHours}
            onChange={(e) => setClockHours(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Já descontado o intervalo, se houver</p>
        </div>
        <div>
          <Label htmlFor="hn-ad">Adicional noturno (%)</Label>
          <Input
            id="hn-ad"
            className={inputClass}
            inputMode="decimal"
            value={adicional}
            onChange={(e) => setAdicional(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Mínimo legal urbano: 20%</p>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Valor da hora normal" value={formatBrl(result.baseHourly)} />
        <ResultRow label="Horas no relógio" value={formatHours(result.clockHours)} />
        <ResultRow label="Horas noturnas reduzidas (52min30s)" value={formatHours(result.nightReducedHours)} />
        <ResultRow label="Valor da hora com adicional" value={formatBrl(result.nightHourly)} />
        <ResultRow
          label="Adicional noturno a lançar na folha"
          value={formatBrl(result.adicionalValue)}
        />
      </ResultBox>
      <p className="mt-3 text-xs text-landing-muted leading-relaxed">
        No mensalista o salário já remunera a hora normal; o acréscimo típico é só o adicional (
        {result.adicionalPercent}% sobre a hora × horas reduzidas). A hora reduzida também conta na
        apuração da jornada.
      </p>
    </div>
  );
}

export function FeriasCalculatorForm() {
  const [salary, setSalary] = useState("3300");
  const [media, setMedia] = useState("0");
  const [absences, setAbsences] = useState("0");
  const [diasDireito, setDiasDireito] = useState("30");
  const [abonoDays, setAbonoDays] = useState("0");
  const [useAbsenceTable, setUseAbsenceTable] = useState(true);

  const daysFromTable = vacationDaysByUnjustifiedAbsences(parseNumber(absences));
  const direito = useAbsenceTable ? daysFromTable : parseNumber(diasDireito);
  const maxAbono = maxAbonoPecuniarioDays(direito);

  const result = useMemo(() => {
    return calculateFerias({
      monthlySalary: parseMoney(salary),
      variableMonthlyAverage: parseMoney(media),
      diasDireito: direito,
      abonoDays: parseNumber(abonoDays),
    });
  }, [salary, media, direito, abonoDays]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fe-salary">Salário mensal (R$)</Label>
          <Input
            id="fe-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fe-media">Média mensal de variáveis (R$)</Label>
          <Input
            id="fe-media"
            className={inputClass}
            inputMode="decimal"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Hora extra, noturno, comissão habitual</p>
        </div>
        <div>
          <Label htmlFor="fe-abs">Faltas injustificadas no aquisitivo</Label>
          <Input
            id="fe-abs"
            className={inputClass}
            inputMode="numeric"
            value={absences}
            onChange={(e) => {
              setAbsences(e.target.value);
              setUseAbsenceTable(true);
            }}
          />
          {useAbsenceTable ? (
            <p className="text-xs text-landing-muted mt-1">
              Dias de direito pela tabela da CLT: {daysFromTable}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="fe-days">Dias de direito no período</Label>
          <Input
            id="fe-days"
            className={inputClass}
            inputMode="numeric"
            value={useAbsenceTable ? String(daysFromTable) : diasDireito}
            onChange={(e) => {
              setUseAbsenceTable(false);
              setDiasDireito(e.target.value);
            }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[15, 20, 30].map((d) => (
              <button
                key={d}
                type="button"
                className="rounded-md border border-landing-ink/20 px-2.5 py-1 text-xs font-medium text-landing-ink hover:bg-white"
                onClick={() => {
                  setUseAbsenceTable(false);
                  setDiasDireito(String(d));
                }}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="fe-abono">
            Dias vendidos no abono pecuniário (máx. {maxAbono} = 1/3 do direito)
          </Label>
          <Input
            id="fe-abono"
            className={inputClass}
            inputMode="numeric"
            value={abonoDays}
            onChange={(e) => setAbonoDays(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">
            Dias a gozar = direito − abono ({result.vacationDays} dias). O abono não soma dias além do
            direito.
          </p>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Base mensal (salário + média)" value={formatBrl(result.monthlyBase)} />
        <ResultRow label="Valor do dia (base ÷ 30)" value={formatBrl(result.dailyRate)} />
        <ResultRow label="Dias de direito" value={`${result.diasDireito} dias`} />
        <ResultRow label="Dias a gozar" value={`${result.vacationDays} dias`} />
        <ResultRow label="Férias (bruto)" value={formatBrl(result.feriasBruto)} />
        <ResultRow label="Terço constitucional" value={formatBrl(result.tercoConstitucional)} />
        {result.abonoDays > 0 ? (
          <>
            <ResultRow label={`Abono pecuniário (${result.abonoDays} dias)`} value={formatBrl(result.abonoBruto)} />
            <ResultRow label="Terço sobre abono" value={formatBrl(result.abonoTerco)} />
          </>
        ) : null}
        <ResultRow label="Total bruto" value={formatBrl(result.totalBruto)} />
      </ResultBox>
    </div>
  );
}

/** Férias da empregada doméstica — salário + 1/3, dias de gozo e abono (LC 150 / eSocial Doméstico). */
export function FeriasDomesticaCalculatorForm() {
  const [salary, setSalary] = useState("2000");
  const [diasDireito, setDiasDireito] = useState("30");
  const [abonoDays, setAbonoDays] = useState("0");

  const direito = parseNumber(diasDireito);
  const maxAbono = maxAbonoPecuniarioDays(direito);

  const result = useMemo(
    () =>
      calculateFerias({
        monthlySalary: parseMoney(salary),
        diasDireito: direito,
        abonoDays: parseNumber(abonoDays),
      }),
    [salary, direito, abonoDays],
  );

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="fed-salary">Salário mensal (R$)</Label>
          <Input
            id="fed-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fed-days">Dias de férias</Label>
          <Input
            id="fed-days"
            className={inputClass}
            inputMode="numeric"
            value={diasDireito}
            onChange={(e) => setDiasDireito(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[10, 15, 20, 30].map((d) => (
              <button
                key={d}
                type="button"
                className="rounded-md border border-landing-ink/20 px-2.5 py-1 text-xs font-medium text-landing-ink hover:bg-white"
                onClick={() => setDiasDireito(String(d))}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="fed-abono">
            Dias de abono pecuniário (máx. {maxAbono})
          </Label>
          <Input
            id="fed-abono"
            className={inputClass}
            inputMode="numeric"
            value={abonoDays}
            onChange={(e) => setAbonoDays(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">
            Com 30 dias de direito, vender 10 → gozar 20. Dias a gozar: {result.vacationDays}.
          </p>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Valor do dia (salário ÷ 30)" value={formatBrl(result.dailyRate)} />
        <ResultRow label="Dias a gozar" value={`${result.vacationDays} dias`} />
        <ResultRow label="Férias (bruto)" value={formatBrl(result.feriasBruto)} />
        <ResultRow label="1/3 de férias" value={formatBrl(result.tercoConstitucional)} />
        {result.abonoDays > 0 ? (
          <>
            <ResultRow label={`Abono (${result.abonoDays} dias)`} value={formatBrl(result.abonoBruto)} />
            <ResultRow label="1/3 sobre abono" value={formatBrl(result.abonoTerco)} />
          </>
        ) : null}
        <ResultRow label="Total bruto" value={formatBrl(result.totalBruto)} />
      </ResultBox>
    </div>
  );
}

export function FolhaDePagamentoCalculatorForm() {
  const [salary, setSalary] = useState("3300");
  const [divisor, setDivisor] = useState("220");
  const [proventosFixos, setProventosFixos] = useState("0");
  const [horaExtra, setHoraExtra] = useState("0");
  const [noturno, setNoturno] = useState("0");
  const [outrasVariaveis, setOutrasVariaveis] = useState("0");
  const [diasFalta, setDiasFalta] = useState("0");
  const [horasFalta, setHorasFalta] = useState("0");
  const [outrosDescontos, setOutrosDescontos] = useState("0");
  const [dependentes, setDependentes] = useState("0");
  const [descontoVt, setDescontoVt] = useState(false);

  const result = useMemo(() => {
    return calculateFolhaDePagamento({
      salarioBase: parseMoney(salary),
      divisor: parseNumber(divisor) || 220,
      proventosFixos: parseMoney(proventosFixos),
      valorHoraExtra: parseMoney(horaExtra),
      valorAdicionalNoturno: parseMoney(noturno),
      outrasVariaveis: parseMoney(outrasVariaveis),
      diasFalta: parseNumber(diasFalta),
      horasFalta: parseNumber(horasFalta),
      descontoVtPercent: descontoVt,
      outrosDescontos: parseMoney(outrosDescontos),
      dependentes: Math.floor(parseNumber(dependentes)),
    });
  }, [
    salary,
    divisor,
    proventosFixos,
    horaExtra,
    noturno,
    outrasVariaveis,
    diasFalta,
    horasFalta,
    descontoVt,
    outrosDescontos,
    dependentes,
  ]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fp-salary">Salário base (R$)</Label>
          <Input
            id="fp-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-divisor">Divisor de horas (atrasos)</Label>
          <Input
            id="fp-divisor"
            className={inputClass}
            inputMode="numeric"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-fixos">Proventos fixos do mês (R$)</Label>
          <Input
            id="fp-fixos"
            className={inputClass}
            inputMode="decimal"
            value={proventosFixos}
            onChange={(e) => setProventosFixos(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-extra">Hora extra do espelho (R$)</Label>
          <Input
            id="fp-extra"
            className={inputClass}
            inputMode="decimal"
            value={horaExtra}
            onChange={(e) => setHoraExtra(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-noturno">Adicional noturno do espelho (R$)</Label>
          <Input
            id="fp-noturno"
            className={inputClass}
            inputMode="decimal"
            value={noturno}
            onChange={(e) => setNoturno(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-var">Outras variáveis (R$)</Label>
          <Input
            id="fp-var"
            className={inputClass}
            inputMode="decimal"
            value={outrasVariaveis}
            onChange={(e) => setOutrasVariaveis(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-dias-falta">Dias de falta integral</Label>
          <Input
            id="fp-dias-falta"
            className={inputClass}
            inputMode="decimal"
            value={diasFalta}
            onChange={(e) => setDiasFalta(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Desconto = salário ÷ 30 por dia</p>
        </div>
        <div>
          <Label htmlFor="fp-falta">Horas de atraso / falta parcial</Label>
          <Input
            id="fp-falta"
            className={inputClass}
            inputMode="decimal"
            value={horasFalta}
            onChange={(e) => setHorasFalta(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Desconto = salário ÷ divisor × horas</p>
        </div>
        <div>
          <Label htmlFor="fp-outros">Outros descontos (R$)</Label>
          <Input
            id="fp-outros"
            className={inputClass}
            inputMode="decimal"
            value={outrosDescontos}
            onChange={(e) => setOutrosDescontos(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fp-dep">Dependentes (IRRF)</Label>
          <Input
            id="fp-dep"
            className={inputClass}
            inputMode="numeric"
            value={dependentes}
            onChange={(e) => setDependentes(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2 pt-1">
          <Checkbox
            id="fp-vt"
            checked={descontoVt}
            onCheckedChange={(v) => setDescontoVt(v === true)}
          />
          <Label htmlFor="fp-vt" className="font-normal cursor-pointer">
            Descontar vale-transporte (6% do salário base)
          </Label>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Total de proventos" value={formatBrl(result.totalProventos)} />
        <ResultRow label="Valor do dia (salário ÷ 30)" value={formatBrl(result.valorDia)} />
        <ResultRow label="Valor da hora (salário ÷ divisor)" value={formatBrl(result.valorHora)} />
        <ResultRow label="INSS (2026)" value={formatBrl(result.inss)} />
        <ResultRow label="IRRF (2026)" value={formatBrl(result.irrf)} />
        <ResultRow label="Desconto por dias de falta" value={formatBrl(result.descontoFaltasDias)} />
        <ResultRow label="Desconto por horas de atraso" value={formatBrl(result.descontoFaltasHoras)} />
        <ResultRow label="Desconto vale-transporte" value={formatBrl(result.descontoVt)} />
        <ResultRow label="Outros descontos" value={formatBrl(result.outrosDescontos)} />
        <ResultRow label="Total de descontos" value={formatBrl(result.totalDescontos)} />
        <ResultRow label="Líquido" value={formatBrl(result.liquidoEstimado)} />
      </ResultBox>
      <p className="mt-3 text-xs text-landing-muted leading-relaxed">
        IRRF: tabela 2026 + redução da Lei 15.270/2025. Confirme a base de contribuição e o
        holerite com o contador.
      </p>
    </div>
  );
}

export function InssCalculatorForm() {
  const [salary, setSalary] = useState("3300");

  const result = useMemo(() => {
    const base = parseMoney(salary);
    const inss = calculateInssEmployee2026(base);
    return { base, inss, liquidoAposInss: base - inss };
  }, [salary]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="inss-salary">Salário de contribuição (R$)</Label>
          <Input
            id="inss-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <p className="mt-2 text-xs text-landing-muted">
            Em geral o salário bruto do mês (proventos que entram na base do INSS). Teto 2026: R$ 8.475,55.
          </p>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Base informada" value={formatBrl(result.base)} />
        <ResultRow label="INSS estimado (2026)" value={formatBrl(result.inss)} />
        <ResultRow label="Após INSS (antes de outros descontos)" value={formatBrl(result.liquidoAposInss)} />
      </ResultBox>
    </div>
  );
}

export function FgtsCalculatorForm() {
  const [remuneracao, setRemuneracao] = useState("3000");
  const [dias, setDias] = useState("30");
  const [aliquota, setAliquota] = useState<"0.08" | "0.02">("0.08");
  const [baseMulta, setBaseMulta] = useState("");

  const result = useMemo(() => {
    return calculateFgts({
      remuneracaoMensal: parseMoney(remuneracao),
      diasTrabalhados: Math.floor(parseNumber(dias)) || 30,
      aliquota: aliquota === "0.02" ? 0.02 : 0.08,
      baseMulta: baseMulta.trim() ? parseMoney(baseMulta) : 0,
    });
  }, [remuneracao, dias, aliquota, baseMulta]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fgts-rem">Remuneração mensal sujeita ao FGTS (R$)</Label>
          <Input
            id="fgts-rem"
            className={inputClass}
            inputMode="decimal"
            value={remuneracao}
            onChange={(e) => setRemuneracao(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fgts-dias">Dias trabalhados no mês</Label>
          <Input
            id="fgts-dias"
            className={inputClass}
            inputMode="numeric"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
          />
          <p className="mt-2 text-xs text-landing-muted">Use menos de 30 para FGTS proporcional.</p>
        </div>
        <div>
          <Label htmlFor="fgts-aliq">Alíquota</Label>
          <Select value={aliquota} onValueChange={(v) => setAliquota(v as "0.08" | "0.02")}>
            <SelectTrigger id="fgts-aliq" className={inputClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.08">8% — empregado CLT</SelectItem>
              <SelectItem value="0.02">2% — aprendiz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fgts-multa">Base da multa 40% (opcional, R$)</Label>
          <Input
            id="fgts-multa"
            className={inputClass}
            inputMode="decimal"
            value={baseMulta}
            onChange={(e) => setBaseMulta(e.target.value)}
            placeholder="Ex.: saldo de depósitos"
          />
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Base de cálculo" value={formatBrl(result.baseCalculo)} />
        <ResultRow
          label="Alíquota"
          value={`${(result.aliquota * 100).toFixed(0)}%`}
        />
        <ResultRow label="Depósito de FGTS" value={formatBrl(result.deposito)} />
        {result.multa40 > 0 ? (
          <ResultRow label="Multa de 40% (estimativa)" value={formatBrl(result.multa40)} />
        ) : null}
      </ResultBox>
      <p className="mt-3 text-xs text-landing-muted leading-relaxed">
        O FGTS não é descontado do salário — é depósito do empregador. Estimativa para conferência; a base
        da multa rescisória depende das regras do caso.
      </p>
    </div>
  );
}

export function ImpostoDeRendaCalculatorForm() {
  const [salary, setSalary] = useState("6000");
  const [dependentes, setDependentes] = useState("0");

  const result = useMemo(() => {
    const bruto = parseMoney(salary);
    const inss = calculateInssEmployee2026(bruto);
    return calculateIrrfMensal2026({
      rendimentoTributavel: bruto,
      inss,
      dependentes: Math.floor(parseNumber(dependentes)),
    });
  }, [salary, dependentes]);

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="ir-salary">Salário / rendimento bruto do mês (R$)</Label>
          <Input
            id="ir-salary"
            className={inputClass}
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="ir-dep">Número de dependentes</Label>
          <Input
            id="ir-dep"
            className={inputClass}
            inputMode="numeric"
            value={dependentes}
            onChange={(e) => setDependentes(e.target.value)}
          />
        </div>
      </div>
      <ResultBox>
        <ResultRow label="INSS (base do IR)" value={formatBrl(result.inss)} />
        <ResultRow
          label={result.usouDescontoSimplificado ? "Dedução (desconto simplificado)" : "Dedução (INSS + dependentes)"}
          value={formatBrl(result.deducaoAplicada)}
        />
        <ResultRow label="Base de cálculo do IRRF" value={formatBrl(result.baseCalculo)} />
        <ResultRow
          label="Alíquota da faixa"
          value={result.aliquota === 0 ? "Isento" : `${(result.aliquota * 100).toFixed(1).replace(".", ",")}%`}
        />
        <ResultRow label="Imposto pela tabela" value={formatBrl(result.impostoTabela)} />
        <ResultRow label="Redução Lei 15.270/2025" value={formatBrl(result.reducaoLei15270)} />
        <ResultRow label="IRRF estimado (2026)" value={formatBrl(result.irrf)} />
      </ResultBox>
      <p className="mt-3 text-xs text-landing-muted leading-relaxed">
        Até R$ 5.000 de rendimento mensal a redução pode zerar o IRRF. Entre R$ 5.000,01 e R$ 7.350 a redução é
        progressiva. Estimativa — não substitui a folha do contador.
      </p>
    </div>
  );
}

export function FolhaDePontoCalculatorForm() {
  const [pairs, setPairs] = useState([
    { inTime: "08:00", outTime: "12:00" },
    { inTime: "13:00", outTime: "17:00" },
    { inTime: "", outTime: "" },
  ]);

  const result = useMemo(() => calculateFolhaDePonto(pairs), [pairs]);

  const updatePair = (index: number, key: "inTime" | "outTime", value: string) => {
    setPairs((prev) => prev.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <p className="text-sm text-landing-muted mb-5 leading-relaxed">
        Informe pares de entrada e saída (HH:MM). Se a saída for menor que a entrada, consideramos virada de
        meia-noite. Isso soma a <strong className="text-landing-ink font-medium">folha/cartão de ponto</strong>,
        não a folha salarial.
      </p>
      <div className="space-y-4">
        {pairs.map((pair, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={`fpn-in-${index}`}>Entrada {index + 1}</Label>
              <Input
                id={`fpn-in-${index}`}
                className={inputClass}
                placeholder="08:00"
                value={pair.inTime}
                onChange={(e) => updatePair(index, "inTime", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`fpn-out-${index}`}>Saída {index + 1}</Label>
              <Input
                id={`fpn-out-${index}`}
                className={inputClass}
                placeholder="12:00"
                value={pair.outTime}
                onChange={(e) => updatePair(index, "outTime", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="text-sm font-medium text-landing-ink underline underline-offset-4"
          onClick={() => setPairs((prev) => [...prev, { inTime: "", outTime: "" }])}
        >
          + Adicionar par de batidas
        </button>
      </div>
      <ResultBox>
        {result.errors.map((err) => (
          <p key={err} className="text-sm text-red-700 mb-2">
            {err}
          </p>
        ))}
        {result.pairs.map((p) => (
          <ResultRow
            key={`${p.inTime}-${p.outTime}-${p.minutes}`}
            label={`${p.inTime} → ${p.outTime}`}
            value={formatHours(p.minutes / 60)}
          />
        ))}
        <ResultRow label="Total de horas" value={formatHours(result.totalHours)} />
        <ResultRow label="Total em minutos" value={`${result.totalMinutes} min`} />
      </ResultBox>
    </div>
  );
}

export type RepousoTrabalhadoDayKind = "domingo" | "feriado";

export function DomingoFeriadoCalculatorForm({
  dayKind = "domingo",
}: {
  dayKind?: RepousoTrabalhadoDayKind;
}) {
  const [payType, setPayType] = useState<DomingoFeriadoPayType>("mensalista");
  const [salary, setSalary] = useState("3000");
  const [hourlyWage, setHourlyWage] = useState("15");
  const [hours, setHours] = useState("8");
  const dayLabel = dayKind === "feriado" ? "feriado" : "domingo";

  const result = useMemo(
    () =>
      calculateDomingoFeriado({
        payType,
        monthlySalary: parseMoney(salary),
        hourlyWage: parseMoney(hourlyWage),
        hours: parseNumber(hours),
      }),
    [payType, salary, hourlyWage, hours],
  );

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="df-type">Forma de remuneração</Label>
          <Select
            value={payType}
            onValueChange={(v) => setPayType(v as DomingoFeriadoPayType)}
          >
            <SelectTrigger id="df-type" className={`${inputClass} ${fieldClass}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensalista">Mensalista (salário ÷ 30)</SelectItem>
              <SelectItem value="horista">Horista (hora × horas × 2)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {payType === "mensalista" ? (
          <div className="sm:col-span-2">
            <Label htmlFor="df-salary">Salário mensal (R$)</Label>
            <Input
              id="df-salary"
              className={inputClass}
              inputMode="decimal"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <p className="text-xs text-landing-muted mt-1">
              Súmula 146 do TST: valor do dia = salário ÷ 30
            </p>
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="df-hourly">Valor da hora (R$)</Label>
              <Input
                id="df-hourly"
                className={inputClass}
                inputMode="decimal"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="df-hours">Horas trabalhadas no {dayLabel}</Label>
              <Input
                id="df-hours"
                className={inputClass}
                inputMode="decimal"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <ResultBox>
        {payType === "mensalista" ? (
          <>
            <ResultRow label="Valor do dia (salário ÷ 30)" value={formatBrl(result.dailyRate)} />
            <ResultRow label="Remuneração em dobro do dia" value={formatBrl(result.remuneracaoEmDobro)} />
            <ResultRow
              label="Acréscimo na folha (1 dia — salário já inclui o repouso)"
              value={formatBrl(result.acrescimoNaFolha)}
            />
          </>
        ) : (
          <>
            <ResultRow label="Valor da hora" value={formatBrl(result.valorHora)} />
            <ResultRow label="Horas trabalhadas" value={formatHours(result.hours)} />
            <ResultRow label="Remuneração em dobro" value={formatBrl(result.remuneracaoEmDobro)} />
          </>
        )}
      </ResultBox>
    </div>
  );
}

export function DomingoTrabalhadoCalculatorForm() {
  return <DomingoFeriadoCalculatorForm dayKind="domingo" />;
}

export function FeriadoTrabalhadoCalculatorForm() {
  return <DomingoFeriadoCalculatorForm dayKind="feriado" />;
}

export function BancoHorasCalculatorForm() {
  const [credito, setCredito] = useState("20");
  const [debito, setDebito] = useState("8");
  const [fator, setFator] = useState("1");

  const result = useMemo(
    () =>
      calculateBancoDeHoras({
        creditoHoras: parseNumber(credito),
        debitoHoras: parseNumber(debito),
        fatorConversao: parseNumber(fator) || 1,
      }),
    [credito, debito, fator],
  );

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="bh-cred">Horas a crédito</Label>
          <Input
            id="bh-cred"
            className={inputClass}
            inputMode="decimal"
            value={credito}
            onChange={(e) => setCredito(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bh-deb">Horas a débito</Label>
          <Input
            id="bh-deb"
            className={inputClass}
            inputMode="decimal"
            value={debito}
            onChange={(e) => setDebito(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="bh-fator">Fator de conversão (ex.: 1,5)</Label>
          <Input
            id="bh-fator"
            className={inputClass}
            inputMode="decimal"
            value={fator}
            onChange={(e) => setFator(e.target.value)}
          />
          <p className="text-xs text-landing-muted mt-1">Use 1 se o acordo não prevê multiplicador</p>
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Saldo bruto (crédito − débito)" value={formatHours(result.saldoBrutoHoras)} />
        <ResultRow label="Fator" value={String(result.fator)} />
        <ResultRow label="Saldo convertido" value={formatHours(result.saldoConvertidoHoras)} />
      </ResultBox>
    </div>
  );
}

export function CustoPontoCalculatorForm() {
  const [funcionarios, setFuncionarios] = useState("10");

  const plans = useMemo(
    () =>
      TIPOS_ASSINATURA_COMERCIAIS.map((p) => ({
        range: p.nome,
        priceValue: p.priceValue,
        maxFuncionarios: p.quantidadeFuncionarios,
      })),
    [],
  );

  const result = useMemo(
    () =>
      calculateCustoPonto({
        funcionarios: parseNumber(funcionarios) || 1,
        plans,
      }),
    [funcionarios, plans],
  );

  return (
    <div className="rounded-xl border border-landing-ink/15 bg-landing-canvas/50 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="cp-n">Número de funcionários</Label>
          <Input
            id="cp-n"
            className={inputClass}
            inputMode="numeric"
            value={funcionarios}
            onChange={(e) => setFuncionarios(e.target.value)}
          />
        </div>
      </div>
      <ResultBox>
        <ResultRow label="Faixa sugerida" value={result.planoLabel} />
        <ResultRow label="Mensal estimado" value={formatBrl(result.precoMensal)} />
        <ResultRow label="Anual estimado" value={formatBrl(result.precoAnual)} />
        <ResultRow label="Por funcionário / mês" value={formatBrl(result.custoPorFuncionarioMes)} />
      </ResultBox>
      <p className="mt-4 text-sm text-landing-muted">
        Valores conforme{" "}
        <a href="/precos" className="underline underline-offset-4 text-landing-ink font-medium">
          página de preços
        </a>
        . Plano teste (1 funcionário) disponível em{" "}
        <a href="/cadastro" className="underline underline-offset-4 text-landing-ink font-medium">
          /cadastro
        </a>
        .
      </p>
    </div>
  );
}

const FORM_BY_SLUG: Record<CalculatorSlug, () => JSX.Element> = {
  "hora-extra": HoraExtraCalculatorForm,
  "horas-noturnas": HorasNoturnasCalculatorForm,
  ferias: FeriasCalculatorForm,
  "ferias-empregada-domestica": FeriasDomesticaCalculatorForm,
  "folha-de-pagamento": FolhaDePagamentoCalculatorForm,
  "folha-de-ponto": FolhaDePontoCalculatorForm,
  "domingo-trabalhado": DomingoTrabalhadoCalculatorForm,
  "feriado-trabalhado": FeriadoTrabalhadoCalculatorForm,
  "banco-de-horas": BancoHorasCalculatorForm,
  "custo-ponto-eletronico": CustoPontoCalculatorForm,
  "imposto-de-renda": ImpostoDeRendaCalculatorForm,
  inss: InssCalculatorForm,
  fgts: FgtsCalculatorForm,
};

export function CalculatorFormBySlug({ slug }: { slug: CalculatorSlug }) {
  const Form = FORM_BY_SLUG[slug];
  return <Form />;
}
