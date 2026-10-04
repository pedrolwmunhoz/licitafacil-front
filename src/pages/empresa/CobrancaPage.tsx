import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_SHORT, CACHE_LONG, queryKeys, invalidateUserMutation } from "@/lib/query-cache-policy";
import { AlertTriangle, ExternalLink, RefreshCw, Wallet } from "lucide-react";
import {
  listFaturasCobranca,
  getCobrancaConfigurado,
  sincronizarCobranca,
  getPerfilEmpresa,
  mudarPlanoAssinatura,
} from "@/lib/api-empresa";
import { getNomeTipoAssinatura, type TipoAssinaturaId } from "@/constants/tipoAssinatura";
import { PlanosAssinaturaGrid } from "@/components/empresa/PlanosAssinaturaGrid";
import { cn, formatDataHora, getBrowserTimezone } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TABLE_CELL_MAIN_MOBILE, TABLE_CELL_SECOND_MOBILE, TABLE_COL_MD_ONLY } from "@/lib/table-responsive";
import { useToast } from "@/hooks/use-toast";

const STATUS_LABEL: Record<string, string> = {
  PAGO: "Pago",
  PENDENTE: "Pendente",
  FALHOU: "Falhou",
  CANCELADO: "Cancelado",
};

function statusLabel(status: string): string {
  return STATUS_LABEL[status] ?? status;
}

function statusClass(status: string): string {
  if (status === "PAGO") return "text-emerald-700 dark:text-emerald-400";
  if (status === "PENDENTE" || status === "FALHOU") return "text-amber-700 dark:text-amber-400";
  return "text-muted-foreground";
}

/** Histórico de cobranças da assinatura recorrente (AbacatePay). */
export default function CobrancaPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { usuarioId } = useAuth();
  const empresaId = usuarioId ?? "";
  const [mudarPlanoOpen, setMudarPlanoOpen] = useState(false);
  const [mudandoPlano, setMudandoPlano] = useState(false);

  const { data: perfil } = useQuery({
    queryKey: queryKeys.empresa.perfil(),
    queryFn: getPerfilEmpresa,
    enabled: !!empresaId,
    ...CACHE_LONG,
  });

  const timezone = perfil?.timezone?.trim() || getBrowserTimezone();

  const { data: configurado } = useQuery({
    queryKey: queryKeys.empresa.cobranca(empresaId),
    queryFn: () => getCobrancaConfigurado(empresaId),
    enabled: !!empresaId,
    ...CACHE_SHORT,
  });

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: queryKeys.empresa.faturas(empresaId),
    queryFn: () => listFaturasCobranca(empresaId),
    enabled: !!empresaId,
    ...CACHE_SHORT,
  });

  if (!empresaId) return null;

  const handleSincronizar = async () => {
    await sincronizarCobranca(empresaId);
    invalidateUserMutation(queryClient, "cobranca");
  };

  const handleSelecionarPlano = async (tipoAssinaturaId: TipoAssinaturaId) => {
    if (mudandoPlano) return;
    if (configurado?.tipoAssinaturaId === tipoAssinaturaId) {
      toast({
        variant: "destructive",
        title: "Plano atual",
        description: "Selecione um plano diferente do vigente.",
      });
      return;
    }
    setMudandoPlano(true);
    try {
      const res = await mudarPlanoAssinatura(empresaId, tipoAssinaturaId);
      invalidateUserMutation(queryClient, "cobranca");
      setMudarPlanoOpen(false);
      if (res.acao === "UPGRADE" && res.urlPagamento) {
        toast({
          title: "Upgrade iniciado",
          description: "Conclua o pagamento para ativar o novo plano.",
        });
        window.location.assign(res.urlPagamento);
        return;
      }
      toast({
        title: "Downgrade agendado",
        description: `O plano ${getNomeTipoAssinatura(res.tipoAssinaturaProximoId) ?? "menor"} começa no fim do ciclo atual. Até lá o limite continua o vigente.`,
      });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
        (err as Error)?.message ??
        "Não foi possível mudar o plano.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    } finally {
      setMudandoPlano(false);
    }
  };

  if (isLoading) return <p className="text-muted-foreground text-sm">Carregando cobranças…</p>;
  if (error) return <p className="text-destructive text-sm">Não foi possível carregar as cobranças.</p>;

  const rows = data?.conteudo ?? [];
  const inadimplente = configurado?.configurado && configurado.adimplente === false;
  const planoVigenteNome = getNomeTipoAssinatura(configurado?.tipoAssinaturaId) ?? "—";
  const planoProximoNome = getNomeTipoAssinatura(configurado?.tipoAssinaturaProximoId ?? null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Cobrança</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Histórico do plano (ciclo de 30 dias). O acesso exige fatura paga com data fim ainda válida.
            Se a renovação automática falhar, use o link para regularizar.
          </p>
          <p className="mt-2 text-sm text-foreground">
            Plano vigente: <span className="font-medium">{planoVigenteNome}</span>
            {planoProximoNome ? (
              <span className="text-muted-foreground">
                {" "}
                · Downgrade para <span className="font-medium text-foreground">{planoProximoNome}</span> no fim do
                ciclo
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setMudarPlanoOpen(true)}
            disabled={!configurado?.configurado || mudandoPlano}
            className="shrink-0"
          >
            Mudar plano
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleSincronizar()}
            disabled={isFetching}
            className="shrink-0"
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isFetching && "animate-spin")} />
            Atualizar
          </Button>
        </div>
      </div>

      {inadimplente && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-950 dark:text-amber-100"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">Pagamento pendente</p>
            <p className="mt-1 text-amber-900/90 dark:text-amber-100/90">
              Regularize o pagamento abaixo para liberar o uso do plano.
            </p>
          </div>
        </div>
      )}

      <Card className="overflow-hidden border-landing-ink/10 shadow-sm dark:border-border">
        <CardHeader className="border-b border-border/60 bg-muted/20 pb-3 dark:border-border">
          <CardTitle className="flex items-center gap-2 font-display text-base">
            <Wallet className="h-5 w-5 shrink-0 text-landing-cta" strokeWidth={1.75} />
            Cobranças
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-0 sm:p-0 sm:pt-0">
          {rows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">Nenhuma cobrança registrada ainda.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-landing-ink/10 bg-white shadow-inner dark:border-border dark:bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Início</TableHead>
                    <TableHead>Fim</TableHead>
                    <TableHead className={TABLE_COL_MD_ONLY}>Plano</TableHead>
                    <TableHead className={TABLE_COL_MD_ONLY}>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((f) => {
                    const podePagar =
                      (f.status === "PENDENTE" || f.status === "FALHOU") && !!f.urlPagamento;
                    return (
                      <TableRow key={f.id}>
                        <TableCell className={cn(TABLE_CELL_MAIN_MOBILE, "tabular-nums md:whitespace-nowrap")}>
                          {formatDataHora(f.periodoInicio, timezone)}
                        </TableCell>
                        <TableCell className={cn(TABLE_CELL_SECOND_MOBILE, "tabular-nums md:whitespace-nowrap")}>
                          {formatDataHora(f.periodoFim, timezone)}
                        </TableCell>
                        <TableCell className={TABLE_COL_MD_ONLY}>
                          {getNomeTipoAssinatura(f.tipoAssinaturaId) ?? `#${f.tipoAssinaturaId}`}
                        </TableCell>
                        <TableCell className={cn(TABLE_COL_MD_ONLY, "tabular-nums")}>
                          {(f.valorTotalCentavos / 100).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className={cn(statusClass(f.status))}>
                          {statusLabel(f.status)}
                        </TableCell>
                        <TableCell>
                          {podePagar ? (
                            <a
                              href={f.urlPagamento!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2"
                            >
                              Regularizar
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                            </a>
                          ) : f.status === "PAGO" ? (
                            <span className="text-muted-foreground text-sm">—</span>
                          ) : (
                            <span className="text-muted-foreground text-sm">Aguardando link</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={mudarPlanoOpen} onOpenChange={setMudarPlanoOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mudar plano</DialogTitle>
            <DialogDescription>
              Upgrade cobra na hora e troca o plano após o pagamento. Downgrade cancela a renovação do plano atual e
              aplica o menor no fim do ciclo pago.
            </DialogDescription>
          </DialogHeader>
          <div className={cn(mudandoPlano && "pointer-events-none opacity-60")}>
            <PlanosAssinaturaGrid
              selectedId={(configurado?.tipoAssinaturaId as TipoAssinaturaId | null) ?? null}
              onSelectTipo={(id) => void handleSelecionarPlano(id)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
