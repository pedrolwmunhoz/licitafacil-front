import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, Pencil, Plus, Search } from "lucide-react";
import {
  LIST_CARD,
  LIST_CARD_CONTENT_FLUSH,
  LIST_CARD_HEADER,
  LIST_TABLE_AREA_FLUSH,
} from "@/lib/list-card-layout";
import { MESES_BH } from "@/lib/banco-horas-ui";
import { cn } from "@/lib/utils";
import { TABLE_CELL_MAIN_MOBILE, TABLE_COL_MD_ONLY } from "@/lib/table-responsive";
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
import {
  validateData,
  validateDescricaoFeriado,
  validateRequiredSelect,
} from "@/lib/validations";
import { FieldExpectedStatus } from "@/components/ui/field-with-expected";
import { listarFeriados, criarFeriado, editarFeriado } from "@/lib/api-empresa";
import type { CriarFeriadoRequest, EditarFeriadoRequest, FeriadoItemResponse } from "@/types/empresa";
import { TIPO_FERIADO_OPCOES_EMPRESA } from "@/types/empresa";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { CACHE_MEDIUM, invalidateUserMutation, queryKeys } from "@/lib/query-cache-policy";
import {
  formatDateFerias,
  statusAfastamentoBadgeClass,
  statusAfastamentoLabel,
} from "@/lib/ferias-ui";

type FiltroStatus = "todos" | "ativo" | "inativo";

export default function FeriadosPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const hoje = new Date();
  const [anoListagem, setAnoListagem] = useState(hoje.getFullYear());
  const [mesListagem, setMesListagem] = useState<number | "all">("all");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [nome, setNome] = useState("");
  const [nomeInput, setNomeInput] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [openCriar, setOpenCriar] = useState(false);
  const [editarTarget, setEditarTarget] = useState<FeriadoItemResponse | null>(null);

  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoFeriadoId, setTipoFeriadoId] = useState("");
  const [ativo, setAtivo] = useState(true);

  const { getError, handleBlur, handleChange, validateAll, clearAll } = useValidation();

  const { dataInicioListagem, dataFimListagem } = useMemo(() => {
    const y = anoListagem;
    const pad = (n: number) => String(n).padStart(2, "0");
    if (mesListagem === "all") {
      return {
        dataInicioListagem: `${y}-01-01`,
        dataFimListagem: `${y}-12-31`,
      };
    }
    const m = mesListagem;
    const first = new Date(y, m - 1, 1);
    const last = new Date(y, m, 0);
    return {
      dataInicioListagem: `${first.getFullYear()}-${pad(first.getMonth() + 1)}-${pad(first.getDate())}`,
      dataFimListagem: `${last.getFullYear()}-${pad(last.getMonth() + 1)}-${pad(last.getDate())}`,
    };
  }, [anoListagem, mesListagem]);

  const { data: listagem, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.feriados(
      page,
      pageSize,
      nome || undefined,
      dataInicioListagem,
      dataFimListagem
    ),
    queryFn: () =>
      listarFeriados({
        page,
        size: pageSize,
        observacao: nome || undefined,
        dataInicio: dataInicioListagem,
        dataFim: dataFimListagem,
      }),
    retry: false,
    ...CACHE_MEDIUM,
  });

  useEffect(() => {
    if (isError && error) {
      const msg =
        (error as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
        "Erro ao carregar feriados.";
      toast({
        variant: "destructive",
        title: "Erro ao carregar",
        description: msg,
      });
    }
  }, [isError, error, toast]);

  const itens = useMemo(() => listagem?.conteudo ?? [], [listagem]);
  const itensFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return itens;
    return itens.filter((f) => (filtroStatus === "ativo" ? f.ativo : !f.ativo));
  }, [itens, filtroStatus]);

  const criarMutation = useMutation({
    mutationFn: (body: CriarFeriadoRequest) => criarFeriado(body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "feriado");
      setOpenCriar(false);
      resetForm();
      toast({ title: "Feriado criado" });
    },
    onError: (err: unknown) => {
      toast({
        variant: "destructive",
        title: "Erro ao criar",
        description:
          (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
          "Tente novamente.",
      });
    },
  });

  const editarMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: EditarFeriadoRequest }) =>
      editarFeriado(id, body),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "feriado");
      setEditarTarget(null);
      resetForm();
      toast({ title: "Feriado atualizado" });
    },
    onError: (err: unknown) => {
      toast({
        variant: "destructive",
        title: "Erro ao editar",
        description:
          (err as { response?: { data?: { mensagem?: string } } })?.response?.data?.mensagem ??
          "Tente novamente.",
      });
    },
  });

  const resetForm = () => {
    setData("");
    setDescricao("");
    setTipoFeriadoId("");
    setAtivo(true);
    clearAll();
  };

  const openEditar = (f: FeriadoItemResponse) => {
    setEditarTarget(f);
    setData(f.data);
    setDescricao(f.descricao);
    setTipoFeriadoId(String(f.tipoFeriadoId));
    setAtivo(f.ativo);
    clearAll();
  };

  const validadoresCriarEditar = {
    data: (v: string) => validateData(v, true),
    descricao: (v: string) => validateDescricaoFeriado(v, true),
    tipoFeriadoId: (v: string) => validateRequiredSelect(v, "Selecione o tipo de feriado."),
  };

  const handleCriar = () => {
    const ok = validateAll([
      ["data", data, validadoresCriarEditar.data],
      ["descricao", descricao, validadoresCriarEditar.descricao],
      ["tipoFeriadoId", tipoFeriadoId, validadoresCriarEditar.tipoFeriadoId],
    ]);
    if (!ok) {
      toast({ variant: "destructive", title: "Corrija os campos antes de criar." });
      return;
    }
    const tid = parseInt(tipoFeriadoId, 10);
    criarMutation.mutate({ data, descricao: descricao.trim(), tipoFeriadoId: tid, ativo });
  };

  const handleEditar = () => {
    if (!editarTarget) return;
    const ok = validateAll([
      ["data", data, validadoresCriarEditar.data],
      ["descricao", descricao, validadoresCriarEditar.descricao],
      ["tipoFeriadoId", tipoFeriadoId, validadoresCriarEditar.tipoFeriadoId],
    ]);
    if (!ok) {
      toast({ variant: "destructive", title: "Corrija os campos antes de salvar." });
      return;
    }
    const tid = parseInt(tipoFeriadoId, 10);
    editarMutation.mutate({
      id: editarTarget.id,
      body: { data, descricao: descricao.trim(), tipoFeriadoId: tid, ativo },
    });
  };

  const handleSearch = () => {
    setNome(nomeInput.trim());
    setPage(0);
  };

  const handleClearSearch = () => {
    setNomeInput("");
    setNome("");
    setPage(0);
  };

  const formFields = (prefix: "criar" | "edit") => (
    <div className="space-y-4 py-1">
      <div className="grid gap-1.5">
        <Label htmlFor={`${prefix}-descricao`} required className="text-xs text-muted-foreground">
          Nome
        </Label>
        <Input
          id={`${prefix}-descricao`}
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
            handleChange("descricao", e.target.value, validadoresCriarEditar.descricao);
          }}
          onBlur={() => handleBlur("descricao", descricao, validadoresCriarEditar.descricao)}
          placeholder="Ex.: Natal, Ano Novo"
          maxLength={255}
          className="h-9"
          aria-invalid={!!getError("descricao")}
        />
        <FieldExpectedStatus error={getError("descricao")} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor={`${prefix}-data`} required className="text-xs text-muted-foreground">
            Data
          </Label>
          <Input
            id={`${prefix}-data`}
            type="date"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
              handleChange("data", e.target.value, validadoresCriarEditar.data);
            }}
            onBlur={() => handleBlur("data", data, validadoresCriarEditar.data)}
            className="h-9"
            aria-invalid={!!getError("data")}
          />
          <FieldExpectedStatus error={getError("data")} />
        </div>
        <div className="grid gap-1.5">
          <Label required className="text-xs text-muted-foreground">
            Tipo
          </Label>
          <Select
            value={tipoFeriadoId}
            onValueChange={(v) => {
              setTipoFeriadoId(v);
              handleChange("tipoFeriadoId", v, validadoresCriarEditar.tipoFeriadoId);
            }}
          >
            <SelectTrigger className="h-9" aria-invalid={!!getError("tipoFeriadoId")}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {TIPO_FERIADO_OPCOES_EMPRESA.map((op) => (
                <SelectItem key={op.id} value={String(op.id)}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldExpectedStatus error={getError("tipoFeriadoId")} />
        </div>
      </div>

      <div className="grid gap-1.5">
        <p className="text-xs text-muted-foreground">Status</p>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Status do feriado">
          <Button
            type="button"
            size="sm"
            variant={ativo ? "default" : "outline"}
            onClick={() => setAtivo(true)}
          >
            Ativo
          </Button>
          <Button
            type="button"
            size="sm"
            variant={!ativo ? "default" : "outline"}
            onClick={() => setAtivo(false)}
          >
            Inativo
          </Button>
        </div>
      </div>
    </div>
  );

  const paginacao = listagem?.paginacao;
  const totalPaginas = paginacao?.totalPaginas ?? 1;
  const paginaAtual = paginacao?.paginaAtual ?? 0;
  const anosOpcoes = [anoListagem - 1, anoListagem, anoListagem + 1].sort((a, b) => a - b);

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-display text-xl font-semibold">Feriados</h1>
            <p className="text-sm text-muted-foreground">
              Cadastre feriados estaduais e municipais. Nacionais da plataforma também aparecem aqui.
            </p>
          </div>
        </div>
        <Dialog
          open={openCriar}
          onOpenChange={(o) => {
            setOpenCriar(o);
            if (!o) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="shrink-0 gap-2">
              <Plus className="h-4 w-4" />
              Novo feriado
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Novo feriado</DialogTitle>
              <DialogDescription>
                Só estadual ou municipal. Nacionais vêm da plataforma.
              </DialogDescription>
            </DialogHeader>
            {formFields("criar")}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenCriar(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCriar} disabled={criarMutation.isPending}>
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
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={mesListagem === "all" ? "all" : String(mesListagem)}
                onValueChange={(v) => {
                  setMesListagem(v === "all" ? "all" : parseInt(v, 10));
                  setPage(0);
                }}
              >
                <SelectTrigger className="h-9 w-[8.5rem]">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo o ano</SelectItem>
                  {MESES_BH.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={String(anoListagem)}
                onValueChange={(v) => {
                  setAnoListagem(parseInt(v, 10));
                  setPage(0);
                }}
              >
                <SelectTrigger className="h-9 w-[5.5rem]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {anosOpcoes.map((a) => (
                    <SelectItem key={a} value={String(a)}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1.5">
                <Input
                  placeholder="Buscar por nome…"
                  value={nomeInput}
                  onChange={(e) => setNomeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-9 w-44"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </Button>
                {(nome || nomeInput) && (
                  <Button type="button" variant="ghost" size="sm" onClick={handleClearSearch}>
                    Limpar
                  </Button>
                )}
              </div>
            </div>
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
                      <TableHead>Nome</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Data</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12 text-right">
                        <span className="sr-only">Ações</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                          Nenhum feriado encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      itensFiltrados.map((f) => (
                        <TableRow key={f.id}>
                          <TableCell className={cn("font-medium", TABLE_CELL_MAIN_MOBILE)}>
                            {f.descricao || "—"}
                            <span className="mt-0.5 block text-xs font-normal text-muted-foreground md:hidden">
                              {formatDateFerias(f.data)}
                              {" · "}
                              {f.tipoFeriadoDescricao || "—"}
                            </span>
                          </TableCell>
                          <TableCell className={cn(TABLE_COL_MD_ONLY, "tabular-nums")}>
                            {formatDateFerias(f.data)}
                          </TableCell>
                          <TableCell className={TABLE_COL_MD_ONLY}>
                            {f.tipoFeriadoDescricao || "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                                statusAfastamentoBadgeClass(f.ativo ? "ativo" : "inativo")
                              )}
                            >
                              {statusAfastamentoLabel(f.ativo ? "ativo" : "inativo")}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditar(f)}
                              aria-label="Editar feriado"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {(paginacao?.totalElementos ?? 0) > 0 && (
                <ListPagination
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
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!editarTarget}
        onOpenChange={(o) => {
          if (!o) {
            setEditarTarget(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar feriado</DialogTitle>
            <DialogDescription>
              Altere nome, data, tipo ou status.
            </DialogDescription>
          </DialogHeader>
          {formFields("edit")}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditarTarget(null);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleEditar} disabled={editarMutation.isPending}>
              {editarMutation.isPending ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
