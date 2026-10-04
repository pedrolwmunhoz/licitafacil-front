import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ChevronRight, Shield, XCircle } from "lucide-react";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { cn, formatDataHora } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPagination } from "@/components/ListPagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { CACHE_MEDIUM, queryKeys } from "@/lib/query-cache-policy";
import { detalharAuditoria, listarAuditoria } from "@/lib/api-empresa";
import type { AuditoriaItemResponse } from "@/types/empresa";

type FiltroSucesso = "todos" | "ok" | "erro";

function sucessoBadge(sucesso: boolean) {
  return sucesso
    ? "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
    : "bg-red-500/12 text-red-800 dark:bg-red-500/20 dark:text-red-300";
}

function formatJsonBlock(value: Record<string, unknown> | null | undefined): string {
  if (value == null || Object.keys(value).length === 0) return "—";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function AuditoriaPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroSucesso, setFiltroSucesso] = useState<FiltroSucesso>("todos");
  const [detalheId, setDetalheId] = useState<string | null>(null);
  const [listTimezone, setListTimezone] = useState<string | undefined>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.auditoria(page, size),
    queryFn: () => listarAuditoria({ page, size }),
    ...CACHE_MEDIUM,
  });

  useEffect(() => {
    if (data?.timezone) setListTimezone(data.timezone);
  }, [data?.timezone]);

  useEffect(() => {
    if (isError && error) {
      const msg =
        (error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
        (error as Error)?.message ??
        "Erro ao carregar.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  const itens = useMemo(() => data?.items ?? [], [data]);
  const itensFiltrados = useMemo(() => {
    if (filtroSucesso === "todos") return itens;
    if (filtroSucesso === "ok") return itens.filter((i) => i.sucesso);
    return itens.filter((i) => !i.sucesso);
  }, [itens, filtroSucesso]);

  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / size)) : 1;

  const detalheQuery = useQuery({
    queryKey: queryKeys.empresa.auditoriaDetalhe(detalheId ?? ""),
    queryFn: () => detalharAuditoria(detalheId!),
    enabled: !!detalheId,
    ...CACHE_MEDIUM,
  });

  useEffect(() => {
    if (detalheQuery.isError && detalheQuery.error) {
      const msg =
        (detalheQuery.error as { response?: { data?: { mensagem?: string } }; message?: string })
          ?.response?.data?.mensagem ??
        (detalheQuery.error as Error)?.message ??
        "Erro ao carregar detalhe.";
      toast({ variant: "destructive", title: "Erro", description: msg });
      setDetalheId(null);
    }
  }, [detalheQuery.isError, detalheQuery.error, toast]);

  const abrirDetalhe = (item: AuditoriaItemResponse) => {
    if (!item.id) return;
    setDetalheId(item.id);
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Auditoria</h1>
          <p className="text-sm text-muted-foreground">
            Log de ações realizadas na conta da empresa.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Registros</CardTitle>
          <div
            className="mt-3 flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filtros"
          >
            {(
              [
                ["todos", "Todos"],
                ["ok", "Sucesso"],
                ["erro", "Falha"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={filtroSucesso === value ? "default" : "outline"}
                onClick={() => setFiltroSucesso(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 pb-4 sm:px-5`}>
          {isLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!isLoading && itensFiltrados.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum registro.</p>
          )}
          {!isLoading && itensFiltrados.length > 0 && (
            <ul className="-mx-4 divide-y divide-border/60 sm:-mx-5">
              {itensFiltrados.map((item) => (
                <li key={item.id ?? `${item.acao}-${item.data}-${item.nomeUsuario}`}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-5"
                    onClick={() => abrirDetalhe(item)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.descricao || item.acao || "—"}</p>
                      <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                        {item.acao ?? "—"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.nomeUsuario ?? "—"}
                        {" · "}
                        {formatDataHora(item.data, data?.timezone)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                        sucessoBadge(!!item.sucesso)
                      )}
                    >
                      {item.sucesso ? (
                        <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden />
                      ) : (
                        <XCircle className="h-3 w-3 shrink-0" aria-hidden />
                      )}
                      {item.sucesso ? "Sucesso" : "Falha"}
                    </span>
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

      <Dialog
        open={!!detalheId}
        onOpenChange={(open) => {
          if (!open) setDetalheId(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2 pr-6">
              <DialogTitle>Detalhe do registro</DialogTitle>
              {detalheQuery.data && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    sucessoBadge(!!detalheQuery.data.sucesso)
                  )}
                >
                  {detalheQuery.data.sucesso ? "Sucesso" : "Falha"}
                </span>
              )}
            </div>
            <DialogDescription className="sr-only">
              Dados completos do log de auditoria.
            </DialogDescription>
          </DialogHeader>

          {detalheQuery.isLoading && (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          )}
          {detalheQuery.data && (
            <div className="max-h-[min(70vh,560px)] space-y-3 overflow-y-auto text-sm">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Descrição</p>
                  <p className="font-medium text-foreground">
                    {detalheQuery.data.descricao || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Usuário</p>
                  <p className="font-medium text-foreground">
                    {detalheQuery.data.nomeUsuario || detalheQuery.data.username || "—"}
                  </p>
                  {detalheQuery.data.nomeUsuario &&
                    detalheQuery.data.username &&
                    detalheQuery.data.nomeUsuario !== detalheQuery.data.username && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        @{detalheQuery.data.username}
                      </p>
                    )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data</p>
                  <p className="font-medium text-foreground">
                    {formatDataHora(detalheQuery.data.createdAt, listTimezone)}
                  </p>
                </div>
                {detalheQuery.data.ipAddress && (
                  <div>
                    <p className="text-xs text-muted-foreground">IP</p>
                    <p className="font-medium text-foreground">{detalheQuery.data.ipAddress}</p>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Ação</p>
                  <p className="break-all font-mono text-xs font-medium text-foreground">
                    {detalheQuery.data.acao || "—"}
                  </p>
                </div>
                {!detalheQuery.data.sucesso && detalheQuery.data.mensagemErro && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground">Mensagem de erro</p>
                    <p className="font-medium text-destructive">
                      {detalheQuery.data.mensagemErro}
                    </p>
                  </div>
                )}
              </div>

              {(detalheQuery.data.dispositivo || detalheQuery.data.dispositivoId) && (
                <div className="space-y-2 rounded-md border border-border/60 bg-muted/30 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Dispositivo</p>
                  {detalheQuery.data.dispositivo ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {(
                        [
                          ["Nome", detalheQuery.data.dispositivo.nome],
                          ["Modelo", detalheQuery.data.dispositivo.modelo],
                          ["Sistema", detalheQuery.data.dispositivo.sistemaOperacional],
                          ["Versão do app", detalheQuery.data.dispositivo.versaoApp],
                          ["ID do aparelho", detalheQuery.data.dispositivo.deviceId],
                        ] as const
                      )
                        .filter(([, v]) => !!v)
                        .map(([label, value]) => (
                          <div key={label}>
                            <p className="text-[11px] text-muted-foreground">{label}</p>
                            <p className="break-all text-xs font-medium text-foreground">{value}</p>
                          </div>
                        ))}
                      {detalheQuery.data.dispositivo.userAgent && (
                        <div className="sm:col-span-2">
                          <p className="text-[11px] text-muted-foreground">User-Agent</p>
                          <p className="break-all text-xs text-foreground">
                            {detalheQuery.data.dispositivo.userAgent}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="break-all font-mono text-xs text-foreground">
                      {detalheQuery.data.dispositivoId}
                    </p>
                  )}
                </div>
              )}

              <div>
                <p className="mb-1 text-xs text-muted-foreground">Dados anteriores</p>
                <pre className="max-h-40 overflow-auto rounded-md border border-border/60 bg-muted/40 p-2.5 font-mono text-[11px] leading-relaxed text-foreground">
                  {formatJsonBlock(detalheQuery.data.dadosAntigos)}
                </pre>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Dados novos</p>
                <pre className="max-h-40 overflow-auto rounded-md border border-border/60 bg-muted/40 p-2.5 font-mono text-[11px] leading-relaxed text-foreground">
                  {formatJsonBlock(detalheQuery.data.dadosNovos)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
