export type FiltroStatusSolicitacao = "todos" | "pendente" | "aprovado" | "reprovado";

export function statusSolicitacaoNorm(status: string | null | undefined): string {
  return (status ?? "").trim().toLowerCase();
}

export function statusSolicitacaoLabel(status: string | null | undefined): string {
  const v = statusSolicitacaoNorm(status);
  if (v === "aprovado") return "Aprovado";
  if (v === "reprovado") return "Reprovado";
  if (v === "pendente") return "Pendente";
  return status?.trim() || "—";
}

export function statusSolicitacaoBadgeClass(status: string | null | undefined): string {
  const v = statusSolicitacaoNorm(status);
  if (v === "aprovado") {
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300";
  }
  if (v === "reprovado") {
    return "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300";
  }
  return "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200";
}

export function tipoSolicitacaoLabel(tipo: string | null | undefined): string {
  const t = (tipo ?? "").trim().toLowerCase();
  if (t === "criar registro" || t === "criacao" || t === "criação") return "Criar registro";
  if (t === "excluir" || t === "remocao" || t === "remoção") return "Excluir registro";
  if (!tipo?.trim()) return "—";
  return tipo.trim().charAt(0).toUpperCase() + tipo.trim().slice(1);
}

/** Justificativa fixa do sync offline do app (schema tipo_justificativa). */
export function isSolicitacaoOffline(motivo: string | null | undefined): boolean {
  return (motivo ?? "").trim().toUpperCase() === "OFFLINE_APP";
}

export function motivoSolicitacaoLabel(motivo: string | null | undefined): string {
  if (isSolicitacaoOffline(motivo)) return "Ponto offline";
  const m = (motivo ?? "").trim();
  if (!m) return "—";
  return m;
}
