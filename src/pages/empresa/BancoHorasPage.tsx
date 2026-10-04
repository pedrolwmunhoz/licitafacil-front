import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, FileDown, Loader2, Wallet } from "lucide-react";
import { BancoHorasDetalheView } from "@/components/banco-horas/BancoHorasDetalheView";
import { ModalDetalharJornada } from "@/components/ponto/ModalDetalharJornada";
import {
  FILTRO_FUNCIONARIO_NENHUM,
  FiltroFuncionarioSelect,
} from "@/components/empresa/FiltroFuncionarioSelect";
import { useNomeFuncionarioFiltro } from "@/hooks/use-nome-funcionario-filtro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPagination } from "@/components/ListPagination";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import {
  getPerfilEmpresa,
  getPerfilFuncionario,
  listagemBancoHoras,
  listarPontoFuncionario,
  resumoBancoHoras,
} from "@/lib/api-empresa";
import { exportarBancoHorasPdf } from "@/lib/banco-horas-export";
import {
  formatDataLonga,
  formatMinutesAsSaldo,
  movimentacoesFromResumo,
  parseHhmmToMinutes,
  saldoSituacao,
  saldoSituacaoLabel,
  type MovimentacaoBh,
} from "@/lib/banco-horas-ui";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { CACHE_MEDIUM, queryKeys } from "@/lib/query-cache-policy";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { PontoDiaResponse } from "@/types/empresa";

export default function BancoHorasPage() {
  const hoje = new Date();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { funcionarioId: funcionarioIdParam } = useParams<{ funcionarioId?: string }>();
  const selectedId = funcionarioIdParam?.trim() || null;

  const [filtroFuncionarioId, setFiltroFuncionarioId] = useState(FILTRO_FUNCIONARIO_NENHUM);
  const nomeBusca = useNomeFuncionarioFiltro(filtroFuncionarioId) ?? "";
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroSaldo, setFiltroSaldo] = useState<"todos" | "positivo" | "negativo" | "zerado">("todos");
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth() + 1);
  const [jornadaModal, setJornadaModal] = useState<PontoDiaResponse | null>(null);
  const [pdfPending, setPdfPending] = useState(false);

  useEffect(() => {
    setPage(0);
  }, [filtroFuncionarioId]);

  const abrirFuncionario = (id: string) => {
    navigate(`/empresa/banco-horas/${id}`);
  };

  const clearSelection = () => {
    setJornadaModal(null);
    navigate("/empresa/banco-horas");
  };

  const { data: listagemData, isLoading: listLoading } = useQuery({
    queryKey: queryKeys.empresa.bancoHorasListagem(page, pageSize, nomeBusca),
    queryFn: () => listagemBancoHoras({ page, pageSize, nome: nomeBusca || undefined }),
    ...CACHE_MEDIUM,
  });

  const funcionarios = useMemo(() => listagemData?.conteudo ?? [], [listagemData]);
  const paginacao = listagemData?.paginacao;
  const totalPaginas = paginacao?.totalPaginas ?? 1;
  const paginaAtual = paginacao?.paginaAtual ?? page;

  const linhas = useMemo(() => {
    return funcionarios.map((f) => {
      const mins = parseHhmmToMinutes(f.totalHorasExtras);
      return {
        id: f.usuarioId,
        nome: f.nomeCompleto?.trim() || "—",
        mins,
        situacao: saldoSituacao(mins),
        loading: false,
      };
    });
  }, [funcionarios]);

  const linhasFiltradas = useMemo(() => {
    if (filtroSaldo === "todos") return linhas;
    return linhas.filter((l) => l.situacao === filtroSaldo);
  }, [linhas, filtroSaldo]);

  const { data: perfilFunc } = useQuery({
    queryKey: queryKeys.empresa.funcionarioPerfil(selectedId ?? ""),
    queryFn: () => getPerfilFuncionario(selectedId!),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const { data: perfilEmpresa } = useQuery({
    queryKey: queryKeys.empresa.perfil(),
    queryFn: getPerfilEmpresa,
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const dataInicioNav =
    perfilFunc?.jornadaFuncionarioConfig?.inicioEscala?.slice(0, 10) ||
    perfilFunc?.contratoFuncionario?.dataAdmissao?.slice(0, 10) ||
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

  const canNextMes =
    ano < mesMaximo.ano || (ano === mesMaximo.ano && mes < mesMaximo.mes);

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

  const selectedNome =
    selectedId != null
      ? linhas.find((l) => l.id === selectedId)?.nome ||
        funcionarios.find((f) => f.usuarioId === selectedId)?.nomeCompleto?.trim() ||
        perfilFunc?.nomeCompleto?.trim() ||
        [perfilFunc?.primeiroNome, perfilFunc?.ultimoNome].filter(Boolean).join(" ").trim() ||
        "—"
      : "";

  const { data: saldoAtual, isLoading: saldoLoading } = useQuery({
    queryKey: queryKeys.empresa.bancoHorasResumoTudo(selectedId ?? ""),
    queryFn: () => resumoBancoHoras(selectedId!, { periodo: "TUDO" }),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const { data: resumoPeriodo, isLoading: resumoLoading } = useQuery({
    queryKey: queryKeys.empresa.bancoHorasResumoMensal(selectedId ?? "", ano, mes),
    queryFn: () => resumoBancoHoras(selectedId!, { periodo: "MENSAL", ano, mes }),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const { data: pontoData } = useQuery({
    queryKey: queryKeys.empresa.pontoBh(selectedId ?? "", ano, mes),
    queryFn: () => listarPontoFuncionario(selectedId!, ano, mes, 0, 100),
    enabled: !!selectedId,
    ...CACHE_MEDIUM,
  });

  const movimentacoes = useMemo(
    () => movimentacoesFromResumo(resumoPeriodo?.movimentacoes, pontoData?.jornadas),
    [resumoPeriodo?.movimentacoes, pontoData?.jornadas]
  );

  const shiftMes = (delta: number) => {
    const d = new Date(ano, mes - 1 + delta, 1);
    const nextAno = d.getFullYear();
    const nextMes = d.getMonth() + 1;
    if (delta < 0 && mesMinimo) {
      if (nextAno < mesMinimo.ano || (nextAno === mesMinimo.ano && nextMes < mesMinimo.mes)) {
        return;
      }
    }
    if (delta > 0) {
      if (nextAno > mesMaximo.ano || (nextAno === mesMaximo.ano && nextMes > mesMaximo.mes)) {
        return;
      }
    }
    setAno(nextAno);
    setMes(nextMes);
  };

  const hojeLabel = formatDataLonga(
    `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`
  );

  const handleGerarPdf = async () => {
    if (!selectedId || pdfPending) return;
    setPdfPending(true);
    try {
      await exportarBancoHorasPdf({
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
        hojeLabel,
        saldoAtual,
        resumoPeriodo,
        movimentacoes,
      });
      toast({ title: "PDF salvo" });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: err instanceof Error ? err.message : "Tente novamente.",
      });
    } finally {
      setPdfPending(false);
    }
  };

  if (selectedId) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" size="sm" className="-ml-2" onClick={clearSelection}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Banco de horas
          </Button>
        </div>

        <BancoHorasDetalheView
          titulo={selectedNome}
          headerExtra={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={pdfPending || resumoLoading}
              onClick={() => void handleGerarPdf()}
            >
              {pdfPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}
              Gerar PDF
            </Button>
          }
          saldoAtual={saldoAtual}
          saldoLoading={saldoLoading}
          resumoPeriodo={resumoPeriodo}
          resumoLoading={resumoLoading}
          ano={ano}
          mes={mes}
          onPrevMes={() => shiftMes(-1)}
          onNextMes={() => shiftMes(1)}
          canPrevMes={canPrevMes}
          canNextMes={canNextMes}
          hojeLabel={hojeLabel}
          movimentacoes={movimentacoes}
          movLoading={resumoLoading}
          onSelectMov={(m: MovimentacaoBh) => {
            if (m.jornada) setJornadaModal(m.jornada);
          }}
          escala={resumoPeriodo?.escala}
        />

        <ModalDetalharJornada
          open={!!jornadaModal}
          onOpenChange={(open) => {
            if (!open) setJornadaModal(null);
          }}
          jornada={jornadaModal}
          modo="empresa"
          timezone={pontoData?.timezone}
          funcionarioId={selectedId}
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
          onRemover={() => undefined}
          onAdicionarRegistro={() => undefined}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
      <div>
          <h1 className="font-display text-xl font-semibold">Banco de horas</h1>
        <p className="text-sm text-muted-foreground">
            Saldos pela escala, feriados, férias e afastamentos.
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
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ["todos", "Todos"],
                  ["positivo", "Positivo"],
                  ["negativo", "Negativo"],
                  ["zerado", "Zerado"],
                ] as const
              ).map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={filtroSaldo === value ? "default" : "outline"}
                  onClick={() => setFiltroSaldo(value)}
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
          {listLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
          {!listLoading && linhasFiltradas.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum funcionário encontrado.</p>
          )}
          {!listLoading && linhasFiltradas.length > 0 && (
            <ul className="-mx-4 divide-y divide-border/60 sm:-mx-5">
              {linhasFiltradas.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-5"
                    onClick={() => abrirFuncionario(l.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{l.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {l.loading ? "…" : saldoSituacaoLabel(l.mins)}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-sm font-semibold tabular-nums",
                        l.mins > 0 && "text-emerald-700 dark:text-emerald-400",
                        l.mins < 0 && "text-rose-700 dark:text-rose-400"
                      )}
                    >
                      {l.loading ? "…" : formatMinutesAsSaldo(l.mins)}
                      </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </button>
                </li>
              ))}
            </ul>
          )}

          {(paginacao?.totalElementos ?? 0) > 0 && (
            <ListPagination
              variant="inline"
              page={paginaAtual}
              totalPages={totalPaginas}
              totalItems={paginacao?.totalElementos}
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
