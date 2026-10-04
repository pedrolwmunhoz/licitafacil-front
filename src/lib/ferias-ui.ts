export function formatDateFerias(s: string | null | undefined): string {
  if (!s) return "—";
  try {
    const d = new Date(s + "T00:00:00");
    return d.toLocaleDateString("pt-BR");
  } catch {
    return s;
  }
}

export function statusAfastamentoNorm(status: string | null | undefined): string {
  return (status ?? "").trim().toLowerCase();
}

export function statusAfastamentoLabel(status: string | null | undefined): string {
  const v = statusAfastamentoNorm(status);
  if (v === "ativo") return "Ativo";
  if (v === "inativo") return "Inativo";
  return status?.trim() || "—";
}

export function statusAfastamentoBadgeClass(status: string | null | undefined): string {
  const v = statusAfastamentoNorm(status);
  if (v === "ativo") {
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300";
  }
  if (v === "inativo") {
    return "bg-muted text-muted-foreground";
  }
  return "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200";
}

/** Período formatado: 01/09/2026 – 15/09/2026 */
export function periodoAfastamentoLabel(inicio: string | null | undefined, fim: string | null | undefined): string {
  const a = formatDateFerias(inicio);
  const b = formatDateFerias(fim);
  if (a === "—" && b === "—") return "—";
  if (b === "—" || a === b) return a;
  return `${a} – ${b}`;
}
