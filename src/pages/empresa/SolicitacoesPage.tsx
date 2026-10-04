import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Check, ChevronRight, ClipboardList, X } from "lucide-react";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { cn, formatDataHora } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPagination } from "@/components/ListPagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { CACHE_SHORT, queryKeys, invalidateUserMutation } from "@/lib/query-cache-policy";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import { validateMotivo, validateJustificativa } from "@/lib/validations";
import {
  listarSolicitacoesPonto,
  aprovarSolicitacaoPonto,
  reprovarSolicitacaoPonto,
} from "@/lib/api-empresa";
import type { SolicitacaoPontoItemResponse } from "@/types/empresa";
import {
  type FiltroStatusSolicitacao,
  motivoSolicitacaoLabel,
  statusSolicitacaoBadgeClass,
  statusSolicitacaoLabel,
  statusSolicitacaoNorm,
  tipoSolicitacaoLabel,
} from "@/lib/solicitacoes-ui";
import {
  FILTRO_FUNCIONARIO_NENHUM,
  FiltroFuncionarioSelect,
} from "@/components/empresa/FiltroFuncionarioSelect";
import { useNomeFuncionarioFiltro } from "@/hooks/use-nome-funcionario-filtro";

export default function SolicitacoesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getError, handleBlur, handleChange, validateAll } = useValidation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroFuncionarioId, setFiltroFuncionarioId] = useState(FILTRO_FUNCIONARIO_NENHUM);
  const nome = useNomeFuncionarioFiltro(filtroFuncionarioId);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusSolicitacao>("todos");
  const [reprovarTarget, setReprovarTarget] = useState<SolicitacaoPontoItemResponse | null>(null);
  const [detalharTarget, setDetalharTarget] = useState<SolicitacaoPontoItemResponse | null>(null);
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [observacaoAprovacao, setObservacaoAprovacao] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.solicitacoes(page, size, nome ?? ""),
    queryFn: () => listarSolicitacoesPonto({ page, size, nome: nome || undefined }),
    ...CACHE_SHORT,
  });

  useEffect(() => {
    setPage(0);
  }, [filtroFuncionarioId]);

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

  const aprovarMutation = useMutation({
    mutationFn: ({ id, observacao }: { id: string; observacao?: string }) =>
      aprovarSolicitacaoPonto(id, observacao ? { observacao } : undefined),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "solicitacaoEmpresa");
      setDetalharTarget(null);
      setObservacaoAprovacao("");
      toast({ title: "Solicitação aprovada" });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: err.response?.data?.mensagem ?? "Não foi possível aprovar.",
      });
    },
  });

  const reprovarMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: { motivo: string; observacao?: string } }) =>
      reprovarSolicitacaoPonto(id, body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "solicitacaoEmpresa");
      setReprovarTarget(null);
      setMotivo("");
      setObservacao("");
      setObservacaoAprovacao("");
      toast({ title: "Solicitação reprovada" });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: err.response?.data?.mensagem ?? "Não foi possível reprovar.",
      });
    },
  });

  const handleReprovarSubmit = () => {
    if (!validateAll([["motivo", motivo, (v) => validateMotivo(v, true)]])) return;
    const m = motivo.trim();
    if (reprovarTarget) {
      reprovarMutation.mutate({
        id: reprovarTarget.id,
        body: { motivo: m, observacao: observacao.trim() || undefined },
      });
    }
  };

  const fecharDetalhe = () => {
    setDetalharTarget(null);
    setObservacaoAprovacao("");
  };

  const abrirReprovar = (s: SolicitacaoPontoItemResponse) => {
    setReprovarTarget(s);
    setDetalharTarget(null);
    setMotivo("");
    setObservacao(observacaoAprovacao.trim());
    setObservacaoAprovacao("");
  };

  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / size)) : 1;
  const isPendente = statusSolicitacaoNorm(detalharTarget?.status) === "pendente";

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Solicitações de ponto</h1>
          <p className="text-sm text-muted-foreground">
            Aprove ou reprove pedidos de criação ou exclusão de registro.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Solicitações</CardTitle>
          <div
            className="mt-3 flex flex-wrap items-center justify-between gap-2"
            role="group"
            aria-label="Filtros"
          >
            <div className="flex flex-wrap items-center gap-1.5">
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
            <FiltroFuncionarioSelect
              value={filtroFuncionarioId}
              onChange={setFiltroFuncionarioId}
            />
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
              {itensFiltrados.map((s) => {
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-5"
                      onClick={() => {
                        setDetalharTarget(s);
                        setObservacaoAprovacao("");
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{s.nomeFuncionario ?? "—"}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {tipoSolicitacaoLabel(s.tipo)}
                          {" · "}
                          {formatDataHora(s.data, data?.timezone)}
                          {s.motivo ? ` · ${motivoSolicitacaoLabel(s.motivo)}` : ""}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                          statusSolicitacaoBadgeClass(s.status)
                        )}
                      >
                        {statusSolicitacaoLabel(s.status)}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  </li>
                );
              })}
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

      <Dialog
        open={!!detalharTarget}
        onOpenChange={(open) => {
          if (!open) fecharDetalhe();
        }}
      >
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
                  Dados da solicitação de ponto do funcionário.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Funcionário</p>
                    <p className="font-medium text-foreground">
                      {detalharTarget.nomeFuncionario ?? "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="font-medium text-foreground">
                      {tipoSolicitacaoLabel(detalharTarget.tipo)}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground">Data e hora</p>
                    <p className="font-medium text-foreground">
                      {formatDataHora(detalharTarget.data, data?.timezone)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Motivo</p>
                  <p className="font-medium text-foreground">{motivoSolicitacaoLabel(detalharTarget.motivo)}</p>
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-muted-foreground">Observação do funcionário</Label>
                  <Textarea
                    readOnly
                    disabled
                    value={detalharTarget.observacao ?? ""}
                    rows={2}
                    className="resize-none bg-muted/50 text-left pointer-events-none"
                  />
                </div>
                {!isPendente && (
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
                )}
                {isPendente && (
                  <div className="grid gap-1.5">
                    <Label htmlFor="obs-aprovacao" className="text-xs text-muted-foreground">
                      Observação da empresa (opcional)
                    </Label>
                    <Textarea
                      id="obs-aprovacao"
                      value={observacaoAprovacao}
                      onChange={(e) => setObservacaoAprovacao(e.target.value)}
                      placeholder="Comentário ao aprovar ou reprovar…"
                      rows={2}
                      className="resize-none text-left"
                    />
                  </div>
                )}
              </div>

              {isPendente && (
                <DialogFooter className="gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    className="gap-1"
                    onClick={() => abrirReprovar(detalharTarget)}
                    disabled={aprovarMutation.isPending}
                  >
                    <X className="h-4 w-4" />
                    Reprovar
                  </Button>
                  <Button
                    type="button"
                    className="gap-1"
                    onClick={() =>
                      aprovarMutation.mutate({
                        id: detalharTarget.id,
                        observacao: observacaoAprovacao.trim() || undefined,
                      })
                    }
                    disabled={aprovarMutation.isPending}
                  >
                    <Check className="h-4 w-4" />
                    {aprovarMutation.isPending ? "Aprovando…" : "Aprovar"}
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!reprovarTarget}
        onOpenChange={(open) => {
          if (!open && !reprovarMutation.isPending) {
            setReprovarTarget(null);
            setMotivo("");
            setObservacao("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reprovar solicitação</AlertDialogTitle>
            <AlertDialogDescription>
              Informe o motivo da reprovação. Este campo é obrigatório.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="motivo" required>
                Motivo
              </Label>
              <Textarea
                id="motivo"
                value={motivo}
                onChange={(e) => {
                  setMotivo(e.target.value);
                  handleChange("motivo", e.target.value, (v) => validateMotivo(v, true));
                }}
                onBlur={() => handleBlur("motivo", motivo, (v) => validateMotivo(v, true))}
                placeholder="Ex: Horário fora do permitido"
                rows={2}
                aria-invalid={!!getError("motivo")}
                className="resize-none"
              />
              <FieldExpectedStatus error={getError("motivo")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="observacao">Observação (opcional)</Label>
              <Textarea
                id="observacao"
                value={observacao}
                onChange={(e) => {
                  setObservacao(e.target.value);
                  handleChange("observacao", e.target.value, (v) => validateJustificativa(v, false));
                }}
                onBlur={() =>
                  handleBlur("observacao", observacao, (v) => validateJustificativa(v, false))
                }
                placeholder="Detalhes adicionais"
                rows={2}
                aria-invalid={!!getError("observacao")}
              />
              <FieldExpectedStatus error={getError("observacao")} />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={reprovarMutation.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                handleReprovarSubmit();
              }}
              disabled={reprovarMutation.isPending || !motivo.trim()}
            >
              {reprovarMutation.isPending ? "Enviando…" : "Reprovar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
