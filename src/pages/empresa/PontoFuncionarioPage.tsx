import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileDown,
  Loader2,
  MoreVertical,
  Plus,
} from "lucide-react";
import { ModalDetalharJornada } from "@/components/ponto/ModalDetalharJornada";
import ModalCriarRegistro from "@/components/ponto/ModalCriarRegistro";
import {
  FILTRO_FUNCIONARIO_NENHUM,
  FiltroFuncionarioSelect,
} from "@/components/empresa/FiltroFuncionarioSelect";
import { useNomeFuncionarioFiltro } from "@/hooks/use-nome-funcionario-filtro";
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
import { useToast } from "@/hooks/use-toast";
import {
  criarRegistroPontoFuncionario,
  deletarRegistroPonto,
  getPerfilEmpresa,
  getPerfilFuncionario,
  listagemEspelhoPonto,
  listarPontoFuncionario,
  resumoBancoHoras,
} from "@/lib/api-empresa";
import {
  MESES_BH,
  cargaDiariaMinutesFromIso,
  formatHhmmPlain,
  formatMinutesAsSaldo,
  parseHhmmToMinutes,
} from "@/lib/banco-horas-ui";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import { CACHE_MEDIUM, CACHE_LONG, invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { ListPagination } from "@/components/ListPagination";
import { cn, formatHora } from "@/lib/utils";
import { exportarEspelhoPdf } from "@/lib/espelho-export";
import {
  dataSobreBatida,
  jornadaAtravessaOutroDia,
} from "@/lib/espelho-ui";
import type { PontoDiaResponse } from "@/types/empresa";

const SLOT_LABELS_BASE = ["Entrada", "Saída int.", "Retorno", "Saída"] as const;

/** Rótulos das colunas de batida; a partir da 5ª: Entrada 2 / Saída 2… */
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

function situacaoListagem(trabalhadas: string | undefined, esperadas: string | undefined): string {
  const t = parseHhmmToMinutes(trabalhadas);
  const e = parseHhmmToMinutes(esperadas);
  if (t === 0 && e === 0) return "Sem registros";
  if (t === 0) return "Sem batidas";
  return "Regular";
}

function PontoFuncionarioPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { funcionarioId: funcionarioIdParam } = useParams<{ funcionarioId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const hoje = new Date();

  const selectedId = funcionarioIdParam?.trim() || null;

  const anoFromUrl = Number(searchParams.get("ano"));
  const mesFromUrl = Number(searchParams.get("mes"));
  const [ano, setAno] = useState(
    Number.isFinite(anoFromUrl) && anoFromUrl >= 2000 ? anoFromUrl : hoje.getFullYear()
  );
  const [mes, setMes] = useState(
    Number.isFinite(mesFromUrl) && mesFromUrl >= 1 && mesFromUrl <= 12
      ? mesFromUrl
      : hoje.getMonth() + 1
  );
  const [filtroFuncionarioId, setFiltroFuncionarioId] = useState(FILTRO_FUNCIONARIO_NENHUM);
  const nome = useNomeFuncionarioFiltro(filtroFuncionarioId) ?? "";
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedNomeState, setSelectedNomeState] = useState("");
  const [pontoPage, setPontoPage] = useState(0);
  const pontoSize = 100;
  const [editarDiaTarget, setEditarDiaTarget] = useState<PontoDiaResponse | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createDataInicial, setCreateDataInicial] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<{
    registroId: string;
    data: string;
    horario: string;
  } | null>(null);

  const syncPeriodoNaUrl = useCallback(
    (nextAno: number, nextMes: number) => {
      if (!selectedId) return;
      const next = new URLSearchParams(searchParams);
      next.set("ano", String(nextAno));
      next.set("mes", String(nextMes));
      setSearchParams(next, { replace: true });
    },
    [selectedId, searchParams, setSearchParams]
  );

  useEffect(() => {
    if (!selectedId) return;
    const a = Number(searchParams.get("ano"));
    const m = Number(searchParams.get("mes"));
    if (Number.isFinite(a) && a >= 2000) setAno(a);
    if (Number.isFinite(m) && m >= 1 && m <= 12) setMes(m);
  }, [selectedId, searchParams]);

  const abrirFuncionario = (id: string, nomeCompleto?: string) => {
    setSelectedNomeState(nomeCompleto ?? "");
    setPontoPage(0);
    setEditarDiaTarget(null);
    const qs = new URLSearchParams();
    qs.set("ano", String(ano));
    qs.set("mes", String(mes));
    navigate(`/empresa/espelho-ponto/${id}?${qs.toString()}`);
  };

  const clearSelection = () => {
    setSelectedNomeState("");
    setEditarDiaTarget(null);
    const qs = new URLSearchParams();
    qs.set("ano", String(ano));
    qs.set("mes", String(mes));
    navigate(`/empresa/espelho-ponto?${qs.toString()}`);
  };
  const { data: listagemData, isLoading: listLoading, isError: listagemError, error: listagemErr } =
    useQuery({
      queryKey: queryKeys.empresa.espelhoListagem(page, pageSize, nome, ano, mes),
      queryFn: () => listagemEspelhoPonto({ page, pageSize, nome: nome || undefined, ano, mes }),
      ...CACHE_MEDIUM,
    });

  const funcionarios = listagemData?.conteudo ?? [];
  const paginacao = listagemData?.paginacao;
  const totalPaginas =
    paginacao != null ? Math.max(1, Math.ceil((paginacao.totalElementos ?? 0) / pageSize)) : 1;
  const paginaAtual = paginacao?.paginaAtual ?? page;

  const selectedIdx = selectedId ? funcionarios.findIndex((f) => f.usuarioId === selectedId) : -1;

  const { data: perfilEmpresa } = useQuery({
    queryKey: queryKeys.empresa.perfil(),
    queryFn: getPerfilEmpresa,
    ...CACHE_LONG,
  });

  const { data: perfilFunc } = useQuery({
    queryKey: queryKeys.empresa.funcionarioPerfil(selectedId ?? ""),
    queryFn: () => getPerfilFuncionario(selectedId!),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const selectedNome =
    (selectedIdx >= 0 ? funcionarios[selectedIdx]?.nomeCompleto : null) ||
    perfilFunc?.nomeCompleto?.trim() ||
    [perfilFunc?.primeiroNome, perfilFunc?.ultimoNome].filter(Boolean).join(" ").trim() ||
    selectedNomeState ||
    "—";

  const cargaMin = useMemo(() => {
    const fromFunc = perfilFunc?.jornadaFuncionarioConfig?.cargaHorariaDiaria;
    const fromEmp = perfilEmpresa?.cargaDiariaPadrao;
    return cargaDiariaMinutesFromIso(fromFunc || fromEmp);
  }, [perfilFunc, perfilEmpresa]);

  const jornadaLabel = formatMinutesAsSaldo(cargaMin).replace(/^[+\u2007-]/, "");

  /** Livre pra trás; só bloqueia ir além do mês atual. */
  const mesMaximo = useMemo(() => {
    const agora = new Date();
    return { ano: agora.getFullYear(), mes: agora.getMonth() + 1 };
  }, []);

  const canPrevMes = true;
  const canNextMes =
    ano < mesMaximo.ano || (ano === mesMaximo.ano && mes < mesMaximo.mes);

  useEffect(() => {
    if (ano > mesMaximo.ano || (ano === mesMaximo.ano && mes > mesMaximo.mes)) {
      setAno(mesMaximo.ano);
      setMes(mesMaximo.mes);
      if (selectedId) syncPeriodoNaUrl(mesMaximo.ano, mesMaximo.mes);
    }
  }, [ano, mes, mesMaximo, selectedId, syncPeriodoNaUrl]);

  const {
    data: pontoData,
    isLoading: pontoLoading,
    isError: pontoError,
    error: pontoErr,
  } = useQuery({
    queryKey: queryKeys.empresa.espelho(selectedId ?? "", ano, mes, pontoPage, pontoSize),
    queryFn: () => listarPontoFuncionario(selectedId!, ano, mes, pontoPage, pontoSize),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const { data: resumoPeriodo, isLoading: resumoLoading } = useQuery({
    queryKey: queryKeys.empresa.bancoHorasResumoMensal(selectedId ?? "", ano, mes),
    queryFn: () => resumoBancoHoras(selectedId!, { periodo: "MENSAL", ano, mes }),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const jornadas = useMemo(() => pontoData?.jornadas ?? [], [pontoData]);
  const pontoTotalPages = Math.max(1, Math.ceil((pontoData?.total ?? 0) / (pontoData?.size || pontoSize)));

  /** Quantas colunas de batida mostrar (≥4; cresce se o dia tiver mais registros). */
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

  const deleteRegistroMutation = useMutation({
    mutationFn: ({ rid }: { rid: string }) => deletarRegistroPonto(selectedId!, rid),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "pontoEmpresa");
      setDeleteTarget(null);
      toast({ title: "Registro removido" });
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { mensagem?: string } } };
      toast({
        variant: "destructive",
        title: "Erro ao remover",
        description: e.response?.data?.mensagem ?? "Não foi possível remover.",
      });
    },
  });

  const createRegistroMutation = useMutation({
    mutationFn: (body: {
      horarioUtc: string;
      timezone: string;
      justificativa: string;
      observacao?: string | null;
    }) => criarRegistroPontoFuncionario(selectedId!, body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "pontoEmpresa");
      setCreateOpen(false);
      setCreateDataInicial(undefined);
      toast({ title: "Registro criado" });
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { mensagem?: string } } };
      toast({
        variant: "destructive",
        title: "Erro ao criar",
        description: e.response?.data?.mensagem ?? "Não foi possível criar o registro.",
      });
    },
  });

  useEffect(() => {
    if (listagemError && listagemErr) {
      const msg =
        (listagemErr as { response?: { data?: { mensagem?: string } }; message?: string })?.response
          ?.data?.mensagem ??
        (listagemErr as Error)?.message ??
        "Erro ao carregar.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [listagemError, listagemErr, toast]);

  useEffect(() => {
    if (pontoError && pontoErr) {
      const msg =
        (pontoErr as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data
          ?.mensagem ??
        (pontoErr as Error)?.message ??
        "Erro ao carregar ponto.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [pontoError, pontoErr, toast]);

  const shiftMes = (delta: number) => {
    const d = new Date(ano, mes - 1 + delta, 1);
    const nextAno = d.getFullYear();
    const nextMes = d.getMonth() + 1;
    if (delta > 0) {
      if (nextAno > mesMaximo.ano || (nextAno === mesMaximo.ano && nextMes > mesMaximo.mes)) {
        return;
      }
    }
    setAno(nextAno);
    setMes(nextMes);
    setPontoPage(0);
    if (selectedId) {
      syncPeriodoNaUrl(nextAno, nextMes);
    } else {
      const next = new URLSearchParams(searchParams);
      next.set("ano", String(nextAno));
      next.set("mes", String(nextMes));
      setSearchParams(next, { replace: true });
    }
  };

  useEffect(() => {
    setPage(0);
  }, [filtroFuncionarioId]);

  const handleExportarEspelho = async () => {
    if (!selectedId || !jornadas.length) {
      toast({ variant: "destructive", title: "Nada para exportar", description: "Sem jornadas no período." });
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
          nome: selectedNome,
          cpf: perfilFunc?.cpf,
          matricula: perfilFunc?.matricula,
          email: perfilFunc?.email,
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

  if (selectedId) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-2"
            onClick={() => {
              clearSelection();
              invalidateUserMutation(queryClient, "pontoEmpresa");
            }}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Espelho de ponto
          </Button>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-semibold">{selectedNome}</h1>
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
              <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => shiftMes(1)} disabled={!canNextMes}>
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
                    setCreateDataInicial(undefined);
                    setCreateOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Adicionar batida
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/empresa/solicitacoes")}>
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
                        <th key={i} className="px-2 py-2 font-medium whitespace-nowrap">
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
                                <span className="text-xs leading-none text-amber-700 dark:text-amber-400" aria-hidden>
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
                                      <span className="text-[10px] text-muted-foreground">{dataExtra}</span>
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
            {pontoTotalPages > 1 && (
              <div className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-2 sm:px-5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={pontoPage <= 0}
                  onClick={() => setPontoPage((p) => p - 1)}
                >
                  Anterior
                </Button>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Página {pontoPage + 1} de {pontoTotalPages}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={pontoPage >= pontoTotalPages - 1}
                  onClick={() => setPontoPage((p) => p + 1)}
                >
                  Próxima
                </Button>
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
          modo="empresa"
          timezone={pontoData?.timezone}
          funcionarioId={selectedId}
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
            nome: selectedNome,
            cpf: perfilFunc?.cpf,
            matricula: perfilFunc?.matricula,
            email: perfilFunc?.email,
          }}
          onRemover={(registroId) => {
            const m = editarDiaTarget?.marcacoes?.find((x) => x.registroId === registroId);
            if (m) {
              setDeleteTarget({
                registroId,
                data: m.horario.slice(0, 10),
                horario: m.horario,
              });
              setEditarDiaTarget(null);
            }
          }}
          onAdicionarRegistro={() => {
            if (editarDiaTarget) {
              setCreateDataInicial(editarDiaTarget.data);
              setEditarDiaTarget(null);
              setCreateOpen(true);
            }
          }}
        />

        <ModalCriarRegistro
          open={createOpen}
          onOpenChange={(o) => {
            setCreateOpen(o);
          }}
          onSubmit={(data) =>
            createRegistroMutation.mutate({
              horarioUtc: data.horarioUtc,
              timezone: data.timezone,
              justificativa: data.justificativa.trim(),
              observacao: data.observacao?.trim() || null,
            })
          }
          isLoading={createRegistroMutation.isPending}
          variant="empresa"
          dataInicial={createDataInicial}
          subtitulo={`Funcionário: ${selectedNome}`}
        />

        <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir registro de ponto?</AlertDialogTitle>
              <AlertDialogDescription>
                Registro do dia {deleteTarget?.data} às{" "}
                {deleteTarget?.horario ? formatHora(deleteTarget.horario) : "—"} será removido. Deseja
                continuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteTarget) deleteRegistroMutation.mutate({ rid: deleteTarget.registroId });
                }}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Espelho de ponto</h1>
          <p className="text-sm text-muted-foreground">
            Consulte os registros de jornada dos funcionários.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Funcionários</CardTitle>
          <div
            className="mt-3 flex flex-wrap items-center justify-between gap-2"
            role="group"
            aria-label="Filtros"
          >
            <div className="flex items-center gap-1">
              <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => shiftMes(-1)} disabled={!canPrevMes}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[9.5rem] text-center text-sm font-medium">
                {MESES_BH[mes - 1]}/{ano}
              </span>
              <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => shiftMes(1)} disabled={!canNextMes}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <FiltroFuncionarioSelect
              value={filtroFuncionarioId}
              onChange={setFiltroFuncionarioId}
            />
          </div>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 pb-4 sm:px-5`}>
          {listLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!listLoading && funcionarios.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum funcionário encontrado.</p>
          )}
          {!listLoading && funcionarios.length > 0 && (
            <ul className="-mx-4 divide-y divide-border/60 sm:-mx-5">
              {funcionarios.map((f) => (
                <li key={f.usuarioId}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-5"
                    onClick={() => abrirFuncionario(f.usuarioId, f.nomeCompleto ?? "")}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{f.nomeCompleto ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {situacaoListagem(f.totalHorasTrabalhadas, f.totalHorasEsperadas)}
                        {" · "}
                        Trab. {formatHhmmPlain(f.totalHorasTrabalhadas)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-muted-foreground">Previstas</p>
                      <p className="text-sm font-semibold tabular-nums">
                        {formatHhmmPlain(f.totalHorasEsperadas)}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {paginacao != null && (paginacao.totalElementos ?? 0) > 0 && (
            <ListPagination
              variant="inline"
              page={paginaAtual}
              totalPages={totalPaginas}
              totalItems={paginacao.totalElementos}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(n) => {
                setPageSize(n);
                setPage(0);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PontoFuncionarioPage;
