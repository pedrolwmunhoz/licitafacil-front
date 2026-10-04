import type {
  BancoHorasEscalaDiaResponse,
  BancoHorasMovimentacaoResponse,
  BancoHorasStatusDia,
  PontoDiaResponse,
} from "@/types/empresa";
import { durationToMinutes } from "@/lib/duration";

/** "+08:42" / "08:42" / "-02:15" → minutos com sinal. */
export function parseHhmmToMinutes(v: string | null | undefined): number {
  if (!v) return 0;
  const s = v.trim();
  const neg = s.startsWith("-");
  const bare = s.replace(/^[+-]/, "");
  const parts = bare.split(":");
  const h = parseInt(parts[0] ?? "0", 10) || 0;
  const m = parseInt(parts[1] ?? "0", 10) || 0;
  const mins = h * 60 + m;
  return neg ? -mins : mins;
}

/** Minutos → "+08h42" / "-02h15" / " 00h00" (espaço de dígito no zero p/ alinhar). */
export function formatMinutesAsSaldo(mins: number): string {
  const sign = mins > 0 ? "+" : mins < 0 ? "-" : "\u2007";
  const abs = Math.abs(Math.trunc(mins));
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

export function formatSaldoDisplay(hhmmSigned: string | null | undefined): string {
  return formatMinutesAsSaldo(parseHhmmToMinutes(hhmmSigned));
}

export function formatHhmmPlain(hhmm: string | null | undefined): string {
  const mins = Math.abs(parseHhmmToMinutes(hhmm));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

export function saldoSituacao(mins: number): "positivo" | "negativo" | "zerado" {
  if (mins > 0) return "positivo";
  if (mins < 0) return "negativo";
  return "zerado";
}

export function saldoSituacaoLabel(mins: number): string {
  const s = saldoSituacao(mins);
  if (s === "positivo") return "Saldo positivo";
  if (s === "negativo") return "Saldo negativo";
  return "Zerado";
}

export function cargaDiariaMinutesFromIso(iso: string | null | undefined): number {
  if (!iso) return 8 * 60;
  return durationToMinutes(iso) || 8 * 60;
}

export type MovimentacaoBh = {
  data: string;
  tipo: string;
  deltaMin: number;
  /** Minutos trabalhados no dia (API). */
  trabalhadasMin: number;
  statusDia?: BancoHorasStatusDia;
  observacao?: string | null;
  /** Presente só quando há jornada de ponto no dia (para abrir o modal). */
  jornada?: PontoDiaResponse | null;
};

export function movimentacoesFromResumo(
  items: BancoHorasMovimentacaoResponse[] | undefined | null,
  jornadas?: PontoDiaResponse[] | null
): MovimentacaoBh[] {
  if (!items?.length) return [];
  const byDate = new Map<string, PontoDiaResponse>();
  for (const j of jornadas ?? []) {
    if (j?.data) byDate.set(j.data, j);
  }
  return items.map((m) => ({
    data: m.data,
    tipo: m.tipo,
    deltaMin: parseHhmmToMinutes(m.delta),
    trabalhadasMin: parseHhmmToMinutes(m.trabalhadas),
    statusDia: m.statusDia,
    observacao: m.observacao,
    jornada: byDate.get(m.data) ?? null,
  }));
}

export function formatDataCurta(dataIso: string): string {
  const [y, mo, d] = dataIso.split("-");
  if (!y || !mo || !d) return dataIso;
  return `${d}/${mo}`;
}

export function formatDataLonga(dataIso: string): string {
  const [y, mo, d] = dataIso.split("-");
  if (!y || !mo || !d) return dataIso;
  return `${d}/${mo}/${y}`;
}

export const MESES_BH = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export const DIAS_SEMANA_CURTO = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

export function statusDiaClasses(status: BancoHorasStatusDia | undefined): string {
  switch (status) {
    case "TRABALHO":
      return "bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200";
    case "FOLGA":
      return "bg-muted text-muted-foreground";
    case "FERIADO":
      return "bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-200";
    case "FERIAS":
      return "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200";
    case "AFASTAMENTO":
      return "bg-orange-100 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200";
    case "FALTA":
      return "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function statusDiaDot(status: BancoHorasStatusDia | undefined): string {
  switch (status) {
    case "TRABALHO":
      return "bg-sky-500";
    case "FOLGA":
      return "bg-muted-foreground/40";
    case "FERIADO":
      return "bg-violet-500";
    case "FERIAS":
      return "bg-amber-500";
    case "AFASTAMENTO":
      return "bg-orange-500";
    case "FALTA":
      return "bg-rose-500";
    default:
      return "bg-muted-foreground/40";
  }
}

export function statusDiaLabel(status: BancoHorasStatusDia | undefined): string {
  switch (status) {
    case "TRABALHO":
      return "Trabalho";
    case "FOLGA":
      return "Folga";
    case "FERIADO":
      return "Feriado";
    case "FERIAS":
      return "Férias";
    case "AFASTAMENTO":
      return "Afastamento";
    case "FALTA":
      return "Falta";
    default:
      return status ?? "";
  }
}

/** Célula da grade mensal (padding no início/fim da semana = null). */
export type CelulaCalendarioEscala = {
  dia: number;
  data: string;
  item: BancoHorasEscalaDiaResponse | null;
} | null;

/** Monta grade mensal (seg→dom). Sempre inclui o número do dia; item vem da API se houver. */
export function montarGradeEscala(
  escala: BancoHorasEscalaDiaResponse[] | undefined | null,
  ano: number,
  mes: number
): CelulaCalendarioEscala[] {
  const byDate = new Map((escala ?? []).map((d) => [d.data, d]));
  const first = new Date(ano, mes - 1, 1);
  const daysInMonth = new Date(ano, mes, 0).getDate();
  const jsDow = first.getDay();
  const offset = jsDow === 0 ? 6 : jsDow - 1;
  const cells: CelulaCalendarioEscala[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const data = `${ano}-${String(mes).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      dia: day,
      data,
      item: byDate.get(data) ?? null,
    });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
