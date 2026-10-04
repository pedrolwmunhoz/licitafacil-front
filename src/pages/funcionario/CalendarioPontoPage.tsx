import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  FileDown,
  Loader2,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CACHE_MEDIUM, CACHE_LONG, queryKeys, invalidateUserMutation } from "@/lib/query-cache-policy";
import { ModalDetalharJornada } from "@/components/ponto/ModalDetalharJornada";
import ModalCriarRegistro from "@/components/ponto/ModalCriarRegistro";
import {
  deletarRegistroFuncionario,
  getPerfilEmpresaDoFuncionario,
  getPerfilFuncionario,
  listarMeuPonto,
  registrarPontoManual,
  resumoBancoHorasFuncionario,
} from "@/lib/api-funcionario";
import {
  MESES_BH,
  cargaDiariaMinutesFromIso,
  formatHhmmPlain,
  formatMinutesAsSaldo,
  parseHhmmToMinutes,
} from "@/lib/banco-horas-ui";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { exportarEspelhoPdf } from "@/lib/espelho-export";
import { cn, formatHora } from "@/lib/utils";
import {
  dataSobreBatida,
  jornadaAtravessaOutroDia,
} from "@/lib/espelho-ui";
import { useAuth } from "@/contexts/AuthContext";
import type { PontoDiaResponse } from "@/types/empresa";

const SLOT_LABELS_BASE = ["Entrada", "Saída int.", "Retorno", "Saída"] as const;

function slotLabel(i: number): string {
  if (i < SLOT_LABELS_BASE.length) return SLOT_LABELS_BASE[i]!;
  const extra = i - SLOT_LABELS_BASE.length;
  const n = Math.floor(extra / 2) + 2;
  return extra % 2 === 0 ? `Entrada ${n}` : `Saída ${n}`;
}

function formatDataCurta(dataIso: string): string {
  const [y, mo, d] = dataIso.split("-");
  if (!y || !mo || !d) return dataIso;
  return `${d}/${mo}`;
}

/** Espelho de ponto do próprio funcionário (ex-“Meu calendário”). */
export default function CalendarioPontoPage() {
  const hoje = new Date();
  const { usuarioId: userId } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [editarDiaTarget, setEditarDiaTarget] = useState<PontoDiaResponse | null>(null);
  const [criarRegistroOpen, setCriarRegistroOpen] = useState(false);
  const [criarRegistroDataInicial, setCriarRegistroDataInicial] = useState<string | undefined>();
  const [removerRegistroId, setRemoverRegistroId] = useState<string | null>(null);
  const [removerObservacao, setRemoverObservacao] = useState("");
  const [mostrarModalIrSolicitacoes, setMostrarModalIrSolicitacoes] = useState(false);

  const { data: perfil } = useQuery({
    queryKey: queryKeys.funcionario.perfil(),
    queryFn: getPerfilFuncionario,
    enabled: !!userId,
    ...CACHE_LONG,
  });

  const { data: perfilEmpresa } = useQuery({
    queryKey: queryKeys.funcionario.empresaPerfil(),
    queryFn: getPerfilEmpresaDoFuncionario,
    enabled: !!userId,
    ...CACHE_LONG,
  });

  const dataInicioNav =
    perfil?.jornadaFuncionarioConfig?.inicioEscala?.slice(0, 10) ||
    perfil?.contratoFuncionario?.dataAdmissao?.slice(0, 10) ||
    null;

  const mesMinimo = useMemo(() => {
    if (!dataInicioNav) return null;
    const [y, m] = dataInicioNav.split("-").map(Number);
    if (!y || !m) return null;
    return { ano: y, mes: m };
  }, [dataInicioNav]);

  const mesMaximo = useMemo(() => {
    const agora = new Date();
    return { ano: agora.getFullYear(), mes: agora.getMonth() + 1 };
  }, []);

  const canPrevMes =
    !mesMinimo || ano > mesMinimo.ano || (ano === mesMinimo.ano && mes > mesMinimo.mes);
  const canNextMes = ano < mesMaximo.ano || (ano === mesMaximo.ano && mes < mesMaximo.mes);

  useEffect(() => {
    if (!mesMinimo) return;
    if (ano < mesMinimo.ano || (ano === mesMinimo.ano && mes < mesMinimo.mes)) {
      setAno(mesMinimo.ano);
      setMes(mesMinimo.mes);
    }
  }, [mesMinimo, ano, mes]);

  useEffect(() => {
    if (ano > mesMaximo.ano || (ano === mesMaximo.ano && mes > mesMaximo.mes)) {
      setAno(mesMaximo.ano);
      setMes(mesMaximo.mes);
    }
  }, [ano, mes, mesMaximo]);

  const cargaMin = useMemo(() => {
    const fromFunc = perfil?.jornadaFuncionarioConfig?.cargaHorariaDiaria;
    const fromEmp = perfilEmpresa?.cargaDiariaPadrao;
    return cargaDiariaMinutesFromIso(fromFunc || fromEmp);
  }, [perfil, perfilEmpresa]);

  const jornadaLabel = formatMinutesAsSaldo(cargaMin).replace(/^[+\u2007-]/, "");

  const {
    data: pontoData,
    isLoading: pontoLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.funcionario.ponto(userId!, ano, mes),
    queryFn: () => listarMeuPonto(userId!, ano, mes, 0, 100),
    enabled: !!userId,
    ...CACHE_MEDIUM,
  });

  const { data: resumoPeriodo, isLoading: resumoLoading } = useQuery({
    queryKey: queryKeys.funcionario.bancoHorasMensal(ano, mes),
    queryFn: () => resumoBancoHorasFuncionario({ periodo: "MENSAL", ano, mes }),
    enabled: !!userId,
    ...CACHE_MEDIUM,
  });

  useEffect(() => {
    if (isError && error) {
      const msg =
        (error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
        (error as Error)?.message ??
        "Erro ao carregar ponto.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  const jornadas = useMemo<PontoDiaResponse[]>(
    () => (isError ? [] : (pontoData?.jornadas ?? [])),
    [isError, pontoData]
  );

  const slotCount = useMemo(() => {
    const max = jornadas.reduce((acc, d) => Math.max(acc, d.marcacoes?.length ?? 0), 0);
    return Math.max(SLOT_LABELS_BASE.length, max);
  }, [jornadas]);

  const ocorrencias = useMemo(() => {
    return jornadas.filter((d) => {
      const st = (d.status ?? "normal").toLowerCase();
      if (st === "falta" || st === "em_aberto") return true;
      return (d.marcacoes ?? []).some((m) => (m.inconsistencias?.length ?? 0) > 0);
    }).length;
  }, [jornadas]);

  const nomeExibicao =
    perfil?.nomeCompleto?.trim() ||
    [perfil?.primeiroNome, perfil?.ultimoNome].filter(Boolean).join(" ").trim() ||
    "Meu espelho";

  const shiftMes = (delta: number) => {
    const d = new Date(ano, mes - 1 + delta, 1);
    const nextAno = d.getFullYear();
    const nextMes = d.getMonth() + 1;
    if (delta < 0 && mesMinimo) {
      if (nextAno < mesMinimo.ano || (nextAno === mesMinimo.ano && nextMes < mesMinimo.mes)) return;
    }
    if (delta > 0) {
      if (nextAno > mesMaximo.ano || (nextAno === mesMaximo.ano && nextMes > mesMaximo.mes)) return;
    }
    setAno(nextAno);
    setMes(nextMes);
  };

  const registrarManualMutation = useMutation({
    mutationFn: ({
      idempotencyKey,
      horarioUtc,
      timezone,
      justificativa,
      observacao,
    }: {
      idempotencyKey: string;
      horarioUtc: string;
      timezone: string;
      justificativa: string;
      observacao?: string | null;
    }) =>
      registrarPontoManual(idempotencyKey, { horarioUtc, timezone, justificativa, observacao }),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "pontoFuncionario");
      setCriarRegistroOpen(false);
      setCriarRegistroDataInicial(undefined);
      setMostrarModalIrSolicitacoes(true);
    },
    onError: (err: unknown) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description:
          (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
          "Tente novamente.",
      });
    },
  });

  const deletarMutation = useMutation({
    mutationFn: ({ idRegistro, observacao }: { idRegistro: string; observacao?: string }) =>
      deletarRegistroFuncionario(idRegistro, observacao ? { observacao } : undefined),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "pontoFuncionario");
      setRemoverRegistroId(null);
      setRemoverObservacao("");
      setMostrarModalIrSolicitacoes(true);
    },
    onError: (err: unknown) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description:
          (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
          "Tente novamente.",
      });
    },
  });

  const handleExportarEspelho = async () => {
    if (!jornadas.length) {
      toast({
        variant: "destructive",
        title: "Nada para exportar",
        description: "Sem jornadas no período.",
      });
      return;
    }
    try {
      await exportarEspelhoPdf({
        empresa: {
          razaoSocial: perfilEmpresa?.razaoSocial,
          cnpj: perfilEmpresa?.cnpj,
          email: perfilEmpresa?.email,
          rua: perfilEmpresa?.rua,
          numeroEndereco: perfilEmpresa?.numeroEndereco,
          complemento: perfilEmpresa?.complemento ?? undefined,
          bairro: perfilEmpresa?.bairro,
          cidade: perfilEmpresa?.cidade,
          uf: perfilEmpresa?.uf,
          cep: perfilEmpresa?.cep,
        },
        funcionario: {
          nome: nomeExibicao,
          cpf: perfil?.cpf,
          matricula: perfil?.matricula,
          email: perfil?.email,
        },
        ano,
        mes,
        jornadaLabel,
        jornadas,
        slotCount,
        resumo: {
          dias: jornadas.length,
          totalEsperado: formatHhmmPlain(resumoPeriodo?.totalHorasEsperadas),
          totalTrabalhado: formatHhmmPlain(resumoPeriodo?.totalHorasTrabalhadas),
          ocorrencias,
        },
        fileName: `espelho-${ano}-${String(mes).padStart(2, "0")}`,
      });
      toast({ title: "PDF salvo" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao exportar",
        description: err instanceof Error ? err.message : "Tente novamente.",
      });
    }
  };

  if (!userId) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-sm text-muted-foreground">Sessão inválida. Faça login novamente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-semibold">Espelho de ponto</h1>
          <p className="text-sm text-muted-foreground">
            Jornada {jornadaLabel} · {MESES_BH[mes - 1]}/{ano}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => shiftMes(-1)}
              disabled={!canPrevMes}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[9.5rem] text-center text-sm font-medium">
              {MESES_BH[mes - 1]}/{ano}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => shiftMes(1)}
              disabled={!canNextMes}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => void handleExportarEspelho()}>
            <FileDown className="mr-1 h-4 w-4" /> Exportar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="icon" className="h-8 w-8" aria-label="Mais ações">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setCriarRegistroDataInicial(undefined);
                  setCriarRegistroOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Adicionar batida
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/funcionario/solicitacoes")}>
                Consultar ajustes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Dias", value: String(jornadas.length) },
          {
            label: "Total esperado mês",
            value: resumoLoading ? "…" : formatHhmmPlain(resumoPeriodo?.totalHorasEsperadas),
          },
          {
            label: "Total trabalhado",
            value: resumoLoading ? "…" : formatHhmmPlain(resumoPeriodo?.totalHorasTrabalhadas),
          },
          { label: "Ocorrências", value: pontoLoading ? "…" : String(ocorrencias) },
        ].map((c) => (
          <Card key={c.label} className={LIST_CARD}>
            <CardContent className="px-3 py-3 sm:px-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Jornadas do período</CardTitle>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} px-0 pb-2`}>
          {pontoLoading && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Carregando…
            </div>
          )}
          {!pontoLoading && jornadas.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground sm:px-5">
              Nenhum registro neste período.
            </p>
          )}
          {!pontoLoading && jornadas.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                    <th className="px-4 py-2 font-medium sm:px-5">Data</th>
                    <th className="px-2 py-2 font-medium">Jornada</th>
                    {Array.from({ length: slotCount }, (_, i) => (
                      <th key={i} className="whitespace-nowrap px-2 py-2 font-medium">
                        {slotLabel(i)}
                      </th>
                    ))}
                    <th className="px-2 py-2 font-medium">Total</th>
                    <th className="px-4 py-2 text-right font-medium sm:px-5">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {jornadas.map((dia) => {
                    const espMin = parseHhmmToMinutes(dia.horasEsperadas);
                    const delta = parseHhmmToMinutes(dia.saldo);
                    const st = (dia.status ?? "normal").toLowerCase();
                    const temOcorrencia =
                      st === "falta" ||
                      st === "em_aberto" ||
                      (dia.marcacoes ?? []).some((m) => (m.inconsistencias?.length ?? 0) > 0);
                    const cruzaDia = jornadaAtravessaOutroDia(dia.data, dia.marcacoes);
                    return (
                      <tr
                        key={`${dia.jornada}-${dia.data}`}
                        className="cursor-pointer border-b border-border/40 transition-colors hover:bg-muted/50"
                        onClick={() => setEditarDiaTarget(dia)}
                      >
                        <td className="px-4 py-2.5 tabular-nums sm:px-5">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="font-medium">{formatDataCurta(dia.data)}</span>
                            {dia.diaSemana && (
                              <span className="text-xs text-muted-foreground">{dia.diaSemana}</span>
                            )}
                            {temOcorrencia && (
                              <span
                                className="text-xs leading-none text-amber-700 dark:text-amber-400"
                                aria-hidden
                              >
                                ⚠
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 tabular-nums text-muted-foreground">
                          {formatMinutesAsSaldo(espMin).replace(/^[+\u2007]/, "") || "00h00"}
                        </td>
                        {Array.from({ length: slotCount }, (_, i) => {
                          const m = dia.marcacoes?.[i];
                          const dataExtra = m
                            ? dataSobreBatida(dia.data, m.horario, cruzaDia)
                            : null;
                          return (
                            <td key={i} className="px-2 py-2.5 tabular-nums">
                              {m ? (
                                <span className="inline-flex flex-col items-start leading-tight">
                                  {dataExtra && (
                                    <span className="text-[10px] text-muted-foreground">
                                      {dataExtra}
                                    </span>
                                  )}
                                  <span>{formatHora(m.horario)}</span>
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                          );
                        })}
                        <td className="px-2 py-2.5 font-medium tabular-nums">
                          {formatHhmmPlain(dia.totalHoras)}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right font-semibold tabular-nums sm:px-5",
                            delta > 0 && "text-emerald-700 dark:text-emerald-400",
                            delta < 0 && "text-rose-700 dark:text-rose-400"
                          )}
                        >
                          {formatMinutesAsSaldo(delta)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <ModalDetalharJornada
        open={!!editarDiaTarget}
        onOpenChange={(open) => {
          if (!open) setEditarDiaTarget(null);
        }}
        jornada={editarDiaTarget}
        modo="funcionario"
        timezone={pontoData?.timezone}
        jornadaLabel={jornadaLabel}
        documentoEmpresa={{
          razaoSocial: perfilEmpresa?.razaoSocial,
          cnpj: perfilEmpresa?.cnpj,
          email: perfilEmpresa?.email,
          rua: perfilEmpresa?.rua,
          numeroEndereco: perfilEmpresa?.numeroEndereco,
          complemento: perfilEmpresa?.complemento ?? undefined,
          bairro: perfilEmpresa?.bairro,
          cidade: perfilEmpresa?.cidade,
          uf: perfilEmpresa?.uf,
          cep: perfilEmpresa?.cep,
        }}
        documentoFuncionario={{
          nome: nomeExibicao,
          cpf: perfil?.cpf,
          matricula: perfil?.matricula,
          email: perfil?.email,
        }}
        onRemover={(registroId) => {
          setRemoverRegistroId(registroId);
          setEditarDiaTarget(null);
        }}
        onAdicionarRegistro={() => {
          setCriarRegistroDataInicial(editarDiaTarget?.data);
          setEditarDiaTarget(null);
          setCriarRegistroOpen(true);
        }}
      />

      <ModalCriarRegistro
        key={criarRegistroOpen ? "open" : "closed"}
        open={criarRegistroOpen}
        onOpenChange={(open) => {
          setCriarRegistroOpen(open);
          if (!open) setCriarRegistroDataInicial(undefined);
        }}
        onSubmit={(data) => {
          registrarManualMutation.mutate({
            idempotencyKey: crypto.randomUUID(),
            horarioUtc: data.horarioUtc,
            timezone: data.timezone,
            justificativa: data.justificativa,
            observacao: data.observacao,
          });
        }}
        isLoading={registrarManualMutation.isPending}
        variant="funcionario"
        dataInicial={criarRegistroDataInicial}
      />

      <AlertDialog
        open={mostrarModalIrSolicitacoes}
        onOpenChange={(open) => !open && setMostrarModalIrSolicitacoes(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Solicitação enviada</AlertDialogTitle>
            <AlertDialogDescription>
              Acompanhe o status em Solicitações. A empresa precisa aprovar o ajuste.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setMostrarModalIrSolicitacoes(false);
                navigate("/funcionario/solicitacoes");
              }}
            >
              Ir para Solicitações
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!removerRegistroId}
        onOpenChange={(open) => {
          if (!open) {
            setRemoverRegistroId(null);
            setRemoverObservacao("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Solicitar remoção do registro</AlertDialogTitle>
            <AlertDialogDescription>
              Será enviada uma solicitação para remover esta batida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="remover-observacao">Observação (opcional)</Label>
            <Input
              id="remover-observacao"
              placeholder="Motivo da solicitação…"
              value={removerObservacao}
              onChange={(e) => setRemoverObservacao(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                removerRegistroId &&
                deletarMutation.mutate({
                  idRegistro: removerRegistroId,
                  observacao: removerObservacao.trim() || undefined,
                })
              }
            >
              {deletarMutation.isPending ? "Enviando…" : "Solicitar remoção"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
