import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { History, Loader2 } from "lucide-react";
import { listarHistoricoCartaoPonto } from "@/lib/api-empresa";
import { listarHistoricoCartaoPontoFuncionario } from "@/lib/api-funcionario";
import { CACHE_MEDIUM, queryKeys } from "@/lib/query-cache-policy";
import { cn, formatData, formatHora } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IntervaloCartaoPonto } from "@/components/ponto/intervalo-cartao-ponto";

type ModalHistoricoCartaoPontoModo = "empresa" | "funcionario";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modo: ModalHistoricoCartaoPontoModo;
  funcionarioId: string;
  intervalo: IntervaloCartaoPonto | null;
  timezone?: string;
};

function formatIntervaloCurto(inicio: string | undefined, fim: string | undefined, tz?: string): string {
  if (!inicio || !fim) return "";
  const a = formatHora(inicio, tz, true);
  const b = formatHora(fim, tz, true);
  const da = formatData(inicio, tz);
  const db = formatData(fim, tz);
  if (da && db && da !== db) return `${da} ${a} → ${db} ${b}`;
  return `${a} → ${b}`;
}

export function ModalHistoricoCartaoPonto({
  open,
  onOpenChange,
  modo,
  funcionarioId,
  intervalo,
  timezone,
}: Props) {
  const enabled = open && !!funcionarioId && !!intervalo?.inicio && !!intervalo?.fim;

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: queryKeys.cartaoPontoHistorico(
      modo,
      funcionarioId,
      intervalo?.inicio,
      intervalo?.fim
    ),
    queryFn: () =>
      modo === "empresa"
        ? listarHistoricoCartaoPonto(funcionarioId, intervalo!.inicio, intervalo!.fim)
        : listarHistoricoCartaoPontoFuncionario(funcionarioId, intervalo!.inicio, intervalo!.fim),
    enabled,
    ...CACHE_MEDIUM,
  });

  const registros = useMemo(() => {
    const list = [...(data?.registros ?? [])];
    list.sort((a, b) => String(a.horario).localeCompare(String(b.horario)));
    return list;
  }, [data?.registros]);

  const ativos = registros.filter((r) => r.ativo).length;
  const inativos = registros.length - ativos;
  const intervaloLabel = formatIntervaloCurto(
    intervalo?.inicio,
    intervalo?.fim,
    timezone
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(92vh,680px)] w-[min(100vw-1.5rem,28rem)] max-w-lg flex-col gap-0 overflow-hidden p-0 sm:w-full sm:max-w-xl sm:rounded-xl"
        aria-describedby="historico-cartao-desc"
      >
        <div className="shrink-0 border-b border-border/70 px-5 pb-4 pt-5 pr-12 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40">
              <History className="h-5 w-5 text-foreground/80" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <DialogTitle className="font-display text-lg leading-tight sm:text-xl">
                Histórico do cartão
              </DialogTitle>
              <DialogDescription id="historico-cartao-desc" className="text-sm text-muted-foreground">
                Rastro completo no intervalo da jornada — inclui batidas removidas.
              </DialogDescription>
              {intervaloLabel ? (
                <p className="font-mono text-xs tabular-nums text-muted-foreground">{intervaloLabel}</p>
              ) : null}
              {!isLoading && !isError && registros.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-900 ring-1 ring-emerald-500/25 dark:text-emerald-100">
                    {ativos} ativa{ativos === 1 ? "" : "s"}
                  </span>
                  {inativos > 0 ? (
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border">
                      {inativos} inativa{inativos === 1 ? "" : "s"}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Carregando histórico…
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-8 text-center">
              <p className="text-sm text-destructive">Não foi possível carregar o histórico.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                disabled={isFetching}
                onClick={() => void refetch()}
              >
                Tentar de novo
              </Button>
            </div>
          )}

          {!isLoading && !isError && registros.length === 0 && (
            <div className="rounded-lg border border-dashed border-border px-4 py-12 text-center text-sm text-muted-foreground">
              Nenhum registro neste intervalo.
            </div>
          )}

          {!isLoading && !isError && registros.length > 0 && (
            <ol className="relative space-y-0 pl-2">
              {registros.map((r, i) => {
                const isLast = i === registros.length - 1;
                const tz = timezone || r.timezone;
                return (
                  <li key={r.registroId} className="relative flex gap-3 pb-4 last:pb-0">
                    {!isLast && (
                      <span
                        className="absolute left-[7px] top-4 bottom-0 w-px bg-border"
                        aria-hidden
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-[1] mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 bg-background",
                        r.ativo
                          ? "border-emerald-500 bg-emerald-500/20"
                          : "border-muted-foreground/40 bg-muted"
                      )}
                      aria-hidden
                    />
                    <div
                      className={cn(
                        "min-w-0 flex-1 rounded-lg border px-3 py-2.5",
                        r.ativo
                          ? "border-border/80 bg-background"
                          : "border-dashed border-border/70 bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-muted-foreground">
                            {formatData(r.horario, tz)}
                          </p>
                          <p
                            className={cn(
                              "font-mono text-xl font-semibold tabular-nums tracking-tight",
                              !r.ativo && "text-muted-foreground line-through decoration-muted-foreground/60"
                            )}
                          >
                            {formatHora(r.horario, tz, true)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
                            r.ativo
                              ? "bg-emerald-500/15 text-emerald-900 ring-1 ring-emerald-500/25 dark:text-emerald-100"
                              : "bg-muted text-muted-foreground ring-1 ring-border"
                          )}
                        >
                          {r.ativo ? "Ativa" : "Inativa"}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <DialogFooter className="shrink-0 border-t border-border bg-muted/40 px-4 py-3 sm:px-6">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
