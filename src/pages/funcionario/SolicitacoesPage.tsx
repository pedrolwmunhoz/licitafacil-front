import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ClipboardList } from "lucide-react";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { cn, formatDataHora } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPagination } from "@/components/ListPagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { listarMinhasSolicitacoesPonto } from "@/lib/api-funcionario";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SolicitacaoPontoItemFuncionarioResponse } from "@/types/empresa";
import { useToast } from "@/hooks/use-toast";
import { CACHE_SHORT, queryKeys } from "@/lib/query-cache-policy";
import {
  type FiltroStatusSolicitacao,
  statusSolicitacaoBadgeClass,
  statusSolicitacaoLabel,
  statusSolicitacaoNorm,
  tipoSolicitacaoLabel,
} from "@/lib/solicitacoes-ui";

export default function SolicitacoesFuncionarioPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusSolicitacao>("todos");
  const [detalharTarget, setDetalharTarget] = useState<SolicitacaoPontoItemFuncionarioResponse | null>(
    null
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.funcionario.solicitacoes(page, size),
    queryFn: () => listarMinhasSolicitacoesPonto({ page, size }),
    ...CACHE_SHORT,
  });

  useEffect(() => {
    if (isError && error) {
      const msg =
        (error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
        (error as Error)?.message ??
        "Erro ao carregar solicitações.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  const itens = useMemo(() => data?.items ?? [], [data]);
  const itensFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return itens;
    return itens.filter((s) => statusSolicitacaoNorm(s.status) === filtroStatus);
  }, [itens, filtroStatus]);

  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / size)) : 1;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Minhas solicitações</h1>
          <p className="text-sm text-muted-foreground">
            Histórico dos seus pedidos de criação ou exclusão de registro.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Solicitações</CardTitle>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por status">
            {(
              [
                ["todos", "Todos"],
                ["pendente", "Pendente"],
                ["aprovado", "Aprovado"],
                ["reprovado", "Reprovado"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={filtroStatus === value ? "default" : "outline"}
                onClick={() => setFiltroStatus(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 pb-4 sm:px-5`}>
          {isLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!isLoading && itensFiltrados.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhuma solicitação encontrada.
            </p>
          )}
          {!isLoading && itensFiltrados.length > 0 && (
            <ul className="-mx-4 divide-y divide-border/60 sm:-mx-5">
              {itensFiltrados.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-5"
                    onClick={() => setDetalharTarget(s)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {tipoSolicitacaoLabel(s.tipo)}
                        </p>
                        <span
                          className={cn(
                            "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                            statusSolicitacaoBadgeClass(s.status)
                          )}
                        >
                          {statusSolicitacaoLabel(s.status)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {formatDataHora(s.data, data?.timezone)}
                        {s.motivo ? ` · ${s.motivo}` : ""}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {(data?.total ?? 0) > 0 && (
            <ListPagination
              variant="inline"
              page={page}
              totalPages={totalPaginas}
              totalItems={data?.total ?? 0}
              pageSize={size}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setSize(n);
                setPage(0);
              }}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={!!detalharTarget} onOpenChange={(open) => !open && setDetalharTarget(null)}>
        <DialogContent className="sm:max-w-md">
          {detalharTarget && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 pr-6">
                  <DialogTitle>Detalhes da solicitação</DialogTitle>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      statusSolicitacaoBadgeClass(detalharTarget.status)
                    )}
                  >
                    {statusSolicitacaoLabel(detalharTarget.status)}
                  </span>
                </div>
                <DialogDescription className="sr-only">
                  Detalhes da sua solicitação de ponto.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="font-medium text-foreground">
                      {tipoSolicitacaoLabel(detalharTarget.tipo)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Data e hora</p>
                    <p className="font-medium text-foreground">
                      {formatDataHora(detalharTarget.data, data?.timezone)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Motivo</p>
                  <p className="font-medium text-foreground">{detalharTarget.motivo || "—"}</p>
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">Observação enviada</Label>
                  <Textarea
                    readOnly
                    disabled
                    value={detalharTarget.observacao ?? ""}
                    rows={2}
                    className="resize-none bg-muted/50 text-left pointer-events-none"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">Observação da empresa</Label>
                  <Textarea
                    readOnly
                    disabled
                    value={detalharTarget.observacaoAprovacao ?? ""}
                    rows={2}
                    className="resize-none bg-muted/50 text-left pointer-events-none"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
