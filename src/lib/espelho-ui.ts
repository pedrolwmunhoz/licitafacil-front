import { formatHora } from "@/lib/utils";

/** Extrai yyyy-MM-dd do início de um LocalDateTime/ISO. */
export function dataIsoFromHorario(horario: string | null | undefined): string | null {
  if (!horario) return null;
  const d = horario.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
}

export function formatDataCurtaIso(dataIso: string): string {
  const [y, mo, d] = dataIso.split("-");
  if (!y || !mo || !d) return dataIso;
  return `${d}/${mo}`;
}

/** True se alguma batida cai em dia civil diferente da data da jornada. */
export function jornadaAtravessaOutroDia(
  jornadaData: string,
  marcacoes: { horario: string }[] | null | undefined
): boolean {
  return (marcacoes ?? []).some((m) => {
    const d = dataIsoFromHorario(m.horario);
    return d != null && d !== jornadaData;
  });
}

/**
 * Data curta (dd/mm) para mostrar acima do horário — só se a batida for
 * de outro dia civil na mesma jornada (turno que atravessa a meia-noite).
 */
export function dataSobreBatida(
  jornadaData: string,
  horario: string | null | undefined,
  jornadaCruzaDia: boolean
): string | null {
  if (!jornadaCruzaDia || !horario) return null;
  const d = dataIsoFromHorario(horario);
  if (!d || d === jornadaData) return null;
  return formatDataCurtaIso(d);
}

export function formatHoraComDataOpcional(
  jornadaData: string,
  horario: string,
  jornadaCruzaDia: boolean
): { data: string | null; hora: string } {
  return {
    data: dataSobreBatida(jornadaData, horario, jornadaCruzaDia),
    hora: formatHora(horario),
  };
}
