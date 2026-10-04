import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Plus } from "lucide-react";
import {
  LIST_CARD,
  LIST_CARD_CONTENT_FLUSH,
  LIST_CARD_HEADER,
  LIST_TABLE_AREA_FLUSH,
} from "@/lib/list-card-layout";
import { TABLE_CELL_MAIN_MOBILE, TABLE_COL_MD_ONLY } from "@/lib/table-responsive";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListPagination } from "@/components/ListPagination";
import { useToast } from "@/hooks/use-toast";
import { useValidation } from "@/hooks/useValidation";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { validateAnoMesAtualOuFuturo, validateRequiredSelect } from "@/lib/validations";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { CACHE_MEDIUM, invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import {
  listarFeriasAfastamentosEmpresa,
  listarFeriasPorFuncionario,
  criarAfastamento,
  listarNomesFuncionarios,
} from "@/lib/api-empresa";
import type { CriarAfastamentoRequest } from "@/types/empresa";
import { TIPO_AFASTAMENTO_OPCOES } from "@/types/empresa";
import {
  formatDateFerias,
  statusAfastamentoBadgeClass,
  statusAfastamentoLabel,
  statusAfastamentoNorm,
} from "@/lib/ferias-ui";
import {
  FILTRO_FUNCIONARIO_NENHUM,
  FiltroFuncionarioSelect,
} from "@/components/empresa/FiltroFuncionarioSelect";

type FiltroStatus = "todos" | "ativo" | "inativo";

export default function FeriasPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroFuncionarioId, setFiltroFuncionarioId] = useState(FILTRO_FUNCIONARIO_NENHUM);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [open, setOpen] = useState(false);
  const [funcionarioId, setFuncionarioId] = useState("");
  const [tipoAfastamentoId, setTipoAfastamentoId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacao, setObservacao] = useState("");

  const { getError, handleBlur, handleChange, validateAll, clearAll } = useValidation();

  const filtroPorFuncionario =
    filtroFuncionarioId !== FILTRO_FUNCIONARIO_NENHUM ? filtroFuncionarioId : null;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.ferias(page, size, filtroPorFuncionario ?? ""),
    queryFn: () =>
      filtroPorFuncionario
        ? listarFeriasPorFuncionario(filtroPorFuncionario, { page, size })
        : listarFeriasAfastamentosEmpresa({ page, size }),
    ...CACHE_MEDIUM,
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
        "Erro ao carregar.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  const { data: funcionariosData } = useQuery({
    queryKey: queryKeys.empresa.funcionarioNomes("filtro-select"),
    queryFn: () => listarNomesFuncionarios({ page: 0, pageSize: 100 }),
    enabled: open,
    ...CACHE_MEDIUM,
  });

  const itens = useMemo(() => data?.items ?? [], [data]);
  const itensFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return itens;
    return itens.filter((i) => statusAfastamentoNorm(i.status) === filtroStatus);
  }, [itens, filtroStatus]);

  const resetForm = () => {
    setFuncionarioId("");
    setTipoAfastamentoId("");
    setDataInicio("");
    setDataFim("");
    setObservacao("");
    clearAll();
  };

  const criarMutation = useMutation({
    mutationFn: (body: CriarAfastamentoRequest) =>
      criarAfastamento(funcionarioId, {
        ...body,
        ativo: body.ativo ?? true,
      }),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "feriasEmpresa");
      setOpen(false);
      resetForm();
      toast({ title: "Afastamento criado" });
    },
    onError: (err: unknown) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar afastamento",
        description:
          (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
          "Tente novamente.",
      });
    },
  });

  const validadoresAfastamento = {
    funcionarioId: (v: string) => validateRequiredSelect(v, "Selecione o funcionário."),
    tipoAfastamentoId: (v: string) => validateRequiredSelect(v, "Selecione o tipo de afastamento."),
    dataInicio: (v: string) => validateAnoMesAtualOuFuturo(v, true, "Data início"),
    dataFim: (v: string) => {
      const err = validateAnoMesAtualOuFuturo(v, true, "Data fim");
      if (err) return err;
      if (dataInicio && v && v < dataInicio) return "Data fim não pode ser menor que a data início.";
      return undefined;
    },
  };

  const handleSubmit = () => {
    const ok = validateAll([
      ["funcionarioId", funcionarioId, validadoresAfastamento.funcionarioId],
      ["tipoAfastamentoId", tipoAfastamentoId, validadoresAfastamento.tipoAfastamentoId],
      ["dataInicio", dataInicio, validadoresAfastamento.dataInicio],
      ["dataFim", dataFim, validadoresAfastamento.dataFim],
    ]);
    if (!ok) {
      toast({ variant: "destructive", title: "Corrija os campos antes de criar." });
      return;
    }
    criarMutation.mutate({
      tipoAfastamentoId: parseInt(tipoAfastamentoId, 10),
      dataInicio,
      dataFim,
      observacao: observacao.trim() || undefined,
      ativo: true,
    });
  };

  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / size)) : 1;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-display text-xl font-semibold">Férias e afastamentos</h1>
            <p className="text-sm text-muted-foreground">
              Consulte e cadastre afastamentos por funcionário.
            </p>
          </div>
        </div>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              Novo afastamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo afastamento</DialogTitle>
              <DialogDescription>
                Selecione o tipo e informe início e fim (podem ser iguais).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label required>Funcionário</Label>
                <Select
                  value={funcionarioId}
                  onValueChange={(v) => {
                    setFuncionarioId(v);
                    handleChange("funcionarioId", v, validadoresAfastamento.funcionarioId);
                  }}
                >
                  <SelectTrigger aria-invalid={!!getError("funcionarioId")}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {funcionariosData?.conteudo?.map((f) => (
                      <SelectItem key={f.usuarioId} value={f.usuarioId}>
                        {f.nome || "—"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldExpectedStatus error={getError("funcionarioId")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipoAfastamentoId" required>
                  Tipo de afastamento
                </Label>
                <Select
                  value={tipoAfastamentoId}
                  onValueChange={(v) => {
                    setTipoAfastamentoId(v);
                    handleChange("tipoAfastamentoId", v, validadoresAfastamento.tipoAfastamentoId);
                  }}
                >
                  <SelectTrigger id="tipoAfastamentoId" aria-invalid={!!getError("tipoAfastamentoId")}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPO_AFASTAMENTO_OPCOES.map((op) => (
                      <SelectItem key={op.id} value={String(op.id)}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldExpectedStatus error={getError("tipoAfastamentoId")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dataInicio" required>
                    Data início
                  </Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={dataInicio}
                    onChange={(e) => {
                      setDataInicio(e.target.value);
                      handleChange("dataInicio", e.target.value, validadoresAfastamento.dataInicio);
                    }}
                    onBlur={() => handleBlur("dataInicio", dataInicio, validadoresAfastamento.dataInicio)}
                    aria-invalid={!!getError("dataInicio")}
                  />
                  <FieldExpectedStatus error={getError("dataInicio")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dataFim" required>
                    Data fim
                  </Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={dataFim}
                    onChange={(e) => {
                      setDataFim(e.target.value);
                      handleChange("dataFim", e.target.value, validadoresAfastamento.dataFim);
                    }}
                    onBlur={() => handleBlur("dataFim", dataFim, validadoresAfastamento.dataFim)}
                    aria-invalid={!!getError("dataFim")}
                  />
                  <FieldExpectedStatus error={getError("dataFim")} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observacao">Observação (opcional)</Label>
                <Input
                  id="observacao"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Detalhes do afastamento"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={criarMutation.isPending}>
                {criarMutation.isPending ? "Salvando…" : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Registros</CardTitle>
          <div
            className="mt-3 flex flex-wrap items-center justify-between gap-2"
            role="group"
            aria-label="Filtros"
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ["todos", "Todos"],
                  ["ativo", "Ativo"],
                  ["inativo", "Inativo"],
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
        <CardContent className={cn(LIST_CARD_CONTENT_FLUSH, "!p-0")}>
          {isLoading && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground sm:px-5">
              Carregando…
            </div>
          )}
          {!isLoading && (
            <>
              <div className={cn("overflow-x-auto", LIST_TABLE_AREA_FLUSH)}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Funcionário</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Tipo</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Início</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Fim</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                          Nenhum registro encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      itensFiltrados.map((item, idx) => (
                        <TableRow
                          key={`${item.nomeFuncionario}-${item.inicio}-${item.nomeAfastamento}-${idx}`}
                        >
                          <TableCell className={cn("font-medium", TABLE_CELL_MAIN_MOBILE)}>
                            {item.nomeFuncionario ?? "—"}
                            <span className="mt-0.5 block text-xs font-normal text-muted-foreground md:hidden">
                              {item.nomeAfastamento ?? "—"}
                              {" · "}
                              {formatDateFerias(item.inicio)}
                              {item.fim && item.fim !== item.inicio
                                ? ` – ${formatDateFerias(item.fim)}`
                                : ""}
                            </span>
                          </TableCell>
                          <TableCell className={TABLE_COL_MD_ONLY}>
                            {item.nomeAfastamento ?? "—"}
                          </TableCell>
                          <TableCell className={cn(TABLE_COL_MD_ONLY, "tabular-nums")}>
                            {formatDateFerias(item.inicio)}
                          </TableCell>
                          <TableCell className={cn(TABLE_COL_MD_ONLY, "tabular-nums")}>
                            {formatDateFerias(item.fim)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                                statusAfastamentoBadgeClass(item.status)
                              )}
                            >
                              {statusAfastamentoLabel(item.status)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {(data?.total ?? 0) > 0 && (
                <ListPagination
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
