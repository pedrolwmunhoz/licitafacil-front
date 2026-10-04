import type { TipoEscalaJornada } from "@/types/empresa";

/** Valores padrão por escala (chave = descricao). */
export const ESCALA_DEFAULTS: Record<
  TipoEscalaJornada,
  { cargaHorariaDiaria: string; cargaHorariaSemanal: string; tempoDescansoEntreJornada: string }
> = {
  "5x2": { cargaHorariaDiaria: "PT8H", cargaHorariaSemanal: "PT40H", tempoDescansoEntreJornada: "PT11H" },
  "6x1": { cargaHorariaDiaria: "PT7H20M", cargaHorariaSemanal: "PT44H", tempoDescansoEntreJornada: "PT11H" },
  "5x1": { cargaHorariaDiaria: "PT7H20M", cargaHorariaSemanal: "PT44H", tempoDescansoEntreJornada: "PT11H" },
  "12x36": { cargaHorariaDiaria: "PT12H", cargaHorariaSemanal: "PT36H", tempoDescansoEntreJornada: "PT36H" },
};

/** Horários de entrada/saída sugeridos por escala. */
export const ESCALA_HORARIOS: Record<TipoEscalaJornada, { entrada: string; saida: string }> = {
  "5x2": { entrada: "08:00", saida: "17:00" },
  "6x1": { entrada: "08:00", saida: "15:20" },
  "5x1": { entrada: "08:00", saida: "15:20" },
  "12x36": { entrada: "07:00", saida: "19:00" },
};

/** Folgas padrão ISO 1=seg … 7=dom. */
export const ESCALA_FOLGAS_DEFAULT: Record<TipoEscalaJornada, number[]> = {
  "5x2": [6, 7],
  "6x1": [7],
  "5x1": [],
  "12x36": [],
};

export const DIAS_SEMANA_ISO: { value: number; label: string }[] = [
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
  { value: 7, label: "Domingo" },
];

export function escalaTemDiaFolga(e: TipoEscalaJornada | null | undefined): e is "5x2" | "6x1" {
  return e === "5x2" || e === "6x1";
}

export function escalaCiclica(e: TipoEscalaJornada | null | undefined): boolean {
  return e === "5x1" || e === "12x36";
}

/** Soma dias a uma data ISO yyyy-MM-dd (calendário local). */
export function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

/** Label do dia da semana (ISO) a partir de yyyy-MM-dd. */
export function weekdayLabelFromIso(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  const jsDow = new Date(y, m - 1, d).getDay();
  const isoDow = jsDow === 0 ? 7 : jsDow;
  return DIAS_SEMANA_ISO.find((x) => x.value === isoDow)?.label ?? "";
}

export const JORNADA_FIELD_HELP = {
  escala: "Tipo de escala do colaborador. Ao escolher, o sistema preenche os campos abaixo — você pode mudar depois.",
  cargaDiaria: "Quantas horas a pessoa deve trabalhar em um dia. Ex.: 08:00 = 8 horas.",
  cargaSemanal: "Quantas horas a pessoa deve trabalhar na semana. Ex.: 40:00 = 40 horas.",
  entrada: "Horário em que a pessoa deve chegar. Ex.: 08:00.",
  saida: "Horário em que a pessoa deve sair. Ex.: 17:00.",
  horario: "Horário de entrada e saída do dia.",
  almoco: "Horário de almoço ou intervalo. É opcional.",
  descanso: "Tempo mínimo de descanso entre o fim de um turno e o início do próximo. Ex.: 11:00 = 11 horas.",
  tolerancia: "Minutos de atraso ou saída antecipada que a empresa aceita sem marcar diferença. Ex.: 00:10 = 10 minutos.",
  intervalo: "Quanto tempo dura a pausa de almoço ou refeição. Ex.: 01:00 = 1 hora.",
  inicioEscala: "Data em que essa escala começa a valer para o colaborador.",
  primeiraFolga5x1: "Data da primeira folga nessa escala.",
  diaFolga: "Dia da semana em que a pessoa não trabalha.",
} as const;
