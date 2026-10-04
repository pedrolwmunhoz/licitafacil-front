export type IntervaloCartaoPonto = {
  inicio: string;
  fim: string;
};

/** Primeiro e último ponto ativo da jornada → intervalo Instant ISO. */
export function intervaloDaJornada(
  marcacoes: { horarioUtc?: string }[] | undefined | null
): IntervaloCartaoPonto | null {
  if (!marcacoes?.length) return null;
  const utcs = marcacoes.map((m) => m.horarioUtc).filter((x): x is string => !!x);
  if (utcs.length === 0) return null;
  const sorted = [...utcs].sort();
  return { inicio: sorted[0]!, fim: sorted[sorted.length - 1]! };
}
