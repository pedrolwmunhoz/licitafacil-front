import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { TABLE_CELL_MAIN_MOBILE, TABLE_COL_MD_ONLY } from "@/lib/table-responsive";
import { LIST_CARD, LIST_CARD_CONTENT_FLUSH, LIST_CARD_HEADER } from "@/lib/list-card-layout";
import {
  CACHE_MEDIUM,
  invalidateUserMutation,
  queryKeys,
} from "@/lib/query-cache-policy";
import { Users, Search, Plus, Trash2, MoreVertical, Pencil, Key, Mail, Unlock, Clock, Wallet } from "lucide-react";
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
import { ListPagination } from "@/components/ListPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useValidation } from "@/hooks/useValidation";
import { FuncionarioDetalheView } from "@/components/funcionarios/FuncionarioDetalheView";
import { maskEmailInput } from "@/lib/format";
import { validateEmail, validateSenha, getFieldExpected } from "@/lib/validations";
import {
  listarFuncionarios,
  deletarFuncionario,
  resetarSenhaFuncionario,
  resetarEmailFuncionario,
  desbloquearFuncionario,
} from "@/lib/api-empresa";
import type { FuncionarioListagemResponse } from "@/types/empresa";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";

export default function FuncionariosPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { getError, handleBlur, handleChange, clearError } = useValidation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [nomeInput, setNomeInput] = useState("");
  const nome = useDebouncedValue(nomeInput.trim(), 350);
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroCargo, setFiltroCargo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"" | "ativo" | "inativo">("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedNomeLista, setSelectedNomeLista] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<FuncionarioListagemResponse | null>(null);
  const [senhaNova, setSenhaNova] = useState("");
  const [emailNovo, setEmailNovo] = useState("");
  const [resetSenhaTarget, setResetSenhaTarget] = useState<FuncionarioListagemResponse | null>(null);
  const [resetEmailTarget, setResetEmailTarget] = useState<FuncionarioListagemResponse | null>(null);

  useEffect(() => {
    if (resetSenhaTarget) {
      setSenhaNova("");
      clearError("resetSenhaNova");
    }
  }, [resetSenhaTarget, clearError]);
  useEffect(() => {
    if (resetEmailTarget) {
      setEmailNovo("");
      clearError("resetEmailNovo");
    }
  }, [resetEmailTarget, clearError]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.empresa.funcionarios(
      page,
      pageSize,
      nome,
      filtroDepartamento,
      filtroCargo,
      filtroStatus
    ),
    queryFn: () =>
      listarFuncionarios({
        page,
        pageSize,
        nome: nome || undefined,
        departamento: filtroDepartamento || undefined,
        cargo: filtroCargo || undefined,
        status: filtroStatus || undefined,
      }),
    ...CACHE_MEDIUM,
  });

  useEffect(() => {
    setPage(0);
  }, [nome, filtroDepartamento, filtroCargo, filtroStatus]);

  useEffect(() => {
    if (isError && error) {
      const msg = (error as { response?: { data?: { mensagem?: string } }; message?: string })?.response?.data?.mensagem ?? (error as Error)?.message ?? "Erro ao carregar funcionários.";
      toast({ variant: "destructive", title: "Erro", description: msg });
    }
  }, [isError, error, toast]);

  useEffect(() => {
    const st = location.state as { openPerfilId?: string; nomeLista?: string } | null;
    if (!st?.openPerfilId) return;
    setSelectedId(st.openPerfilId);
    setSelectedNomeLista(st.nomeLista?.trim() || "");
    navigate(location.pathname + location.search, { replace: true, state: {} });
  }, [location.state, location.pathname, location.search, navigate]);

  const deleteMutation = useMutation({
    mutationFn: (funcionarioId: string) => deletarFuncionario(funcionarioId),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      setDeleteTarget(null);
      if (selectedId && deleteTarget?.usuarioId === selectedId) {
        setSelectedId(null);
        setSelectedNomeLista("");
      }
      toast({ title: "Funcionário desativado", description: "O colaborador não poderá mais registrar pontos. O histórico foi preservado." });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao desativar",
        description: err.response?.data?.mensagem ?? "Não foi possível desativar o funcionário.",
      });
    },
  });

  const resetSenhaMutation = useMutation({
    mutationFn: ({ id, senhaNova }: { id: string; senhaNova: string }) =>
      resetarSenhaFuncionario(id, { senhaNova }),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      setResetSenhaTarget(null);
      setSenhaNova("");
      toast({ title: "Senha alterada", description: "A nova senha foi definida." });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao resetar senha",
        description: err.response?.data?.mensagem ?? "Não foi possível alterar a senha.",
      });
    },
  });

  const resetEmailMutation = useMutation({
    mutationFn: ({ id, emailNovo }: { id: string; emailNovo: string }) =>
      resetarEmailFuncionario(id, { emailNovo }),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      setResetEmailTarget(null);
      setEmailNovo("");
      toast({ title: "E-mail alterado", description: "O novo e-mail foi definido." });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao resetar e-mail",
        description: err.response?.data?.mensagem ?? "Não foi possível alterar o e-mail.",
      });
    },
  });

  const desbloquearMutation = useMutation({
    mutationFn: (funcionarioId: string) => desbloquearFuncionario(funcionarioId),
    onSuccess: () => {
      invalidateUserMutation(queryClient, "funcionario");
      toast({ title: "Funcionário desbloqueado", description: "O acesso foi liberado." });
    },
    onError: (err: AxiosError<{ mensagem?: string }>) => {
      toast({
        variant: "destructive",
        title: "Erro ao desbloquear",
        description: err.response?.data?.mensagem ?? "Não foi possível desbloquear.",
      });
    },
  });

  const handleClearSearch = () => {
    setNomeInput("");
    setFiltroDepartamento("");
    setFiltroCargo("");
    setFiltroStatus("");
    setPage(0);
  };

  const nomeDaLista = (f: FuncionarioListagemResponse) =>
    [f.primeiroNome, f.ultimoNome].filter(Boolean).join(" ").trim() || f.username || "—";

  const openPerfil = (f: FuncionarioListagemResponse) => {
    setSelectedId(f.usuarioId);
    setSelectedNomeLista(nomeDaLista(f));
  };

  const openEditById = (usuarioId: string, nomeFallback = "") => {
    navigate(`/empresa/funcionarios/${usuarioId}/editar`, {
      state: { returnTo: "perfil", nomeLista: nomeFallback },
    });
  };

  const openCreate = () => {
    navigate("/empresa/funcionarios/novo");
  };

  const openEdit = (f: FuncionarioListagemResponse) => {
    navigate(`/empresa/funcionarios/${f.usuarioId}/editar`);
  };

  const paginacao = data?.paginacao;
  const totalElementos = paginacao?.totalElementos ?? 0;
  const totalPaginas =
    paginacao != null ? Math.max(1, Math.ceil(totalElementos / pageSize)) : 1;
  const paginaAtual = paginacao?.paginaAtual ?? 0;
  const funcionariosAtivos = data?.funcionariosAtivos ?? totalElementos;
  const departamentosOpts = data?.departamentos ?? [];
  const cargosOpts = data?.cargos ?? [];

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {selectedId ? (
        <FuncionarioDetalheView
          funcionarioId={selectedId}
          nomeLista={selectedNomeLista}
          onBack={() => {
            setSelectedId(null);
            setSelectedNomeLista("");
          }}
          onEditar={() => openEditById(selectedId, selectedNomeLista)}
        />
      ) : (
        <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-display text-xl font-semibold">Funcionários</h1>
            <p className="text-sm text-muted-foreground">
              {paginacao != null
                ? `${funcionariosAtivos} funcionário${funcionariosAtivos === 1 ? "" : "s"} ativo${funcionariosAtivos === 1 ? "" : "s"}`
                : "Administre o cadastro dos colaboradores"}
            </p>
          </div>
        </div>
        <Button className="shrink-0 gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Adicionar funcionário
        </Button>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Funcionários</CardTitle>
          <div className="mt-3 space-y-2" role="group" aria-label="Filtros">
            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[12rem] flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Buscar por nome, CPF ou matrícula..."
                  value={nomeInput}
                  onChange={(e) => setNomeInput(e.target.value)}
                />
              </div>
              {(nomeInput || filtroDepartamento || filtroCargo || filtroStatus) && (
                <Button variant="ghost" size="sm" onClick={handleClearSearch}>
                  Limpar
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={filtroDepartamento || "__todos__"}
                onValueChange={(v) => setFiltroDepartamento(v === "__todos__" ? "" : v)}
              >
                <SelectTrigger className="h-9 w-[min(100%,11rem)]">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__todos__">Departamento</SelectItem>
                  {departamentosOpts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filtroCargo || "__todos__"}
                onValueChange={(v) => setFiltroCargo(v === "__todos__" ? "" : v)}
              >
                <SelectTrigger className="h-9 w-[min(100%,11rem)]">
                  <SelectValue placeholder="Cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__todos__">Cargo</SelectItem>
                  {cargosOpts.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filtroStatus || "__todos__"}
                onValueChange={(v) => setFiltroStatus(v === "__todos__" ? "" : (v as "ativo" | "inativo"))}
              >
                <SelectTrigger className="h-9 w-[min(100%,9rem)]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__todos__">Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`${LIST_CARD_CONTENT_FLUSH} space-y-3 px-4 pb-4 sm:px-5`}>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          )}
          {!isLoading && (data || isError) && (
            <>
              {(data?.conteudo ?? []).length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Nenhum funcionário encontrado.
                </p>
              ) : (
                <div className="-mx-4 overflow-x-auto sm:-mx-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Funcionário</TableHead>
                        <TableHead className={TABLE_COL_MD_ONLY}>Matrícula</TableHead>
                        <TableHead className={TABLE_COL_MD_ONLY}>Departamento</TableHead>
                        <TableHead className={TABLE_COL_MD_ONLY}>Cargo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data?.conteudo ?? []).map((f) => {
                        const ativo = f.ativo !== false;
                        return (
                          <TableRow
                            key={f.usuarioId}
                            className="cursor-pointer"
                            onClick={() => openPerfil(f)}
                          >
                            <TableCell className={cn("font-medium", TABLE_CELL_MAIN_MOBILE)}>
                              {nomeDaLista(f)}
                            </TableCell>
                            <TableCell className={TABLE_COL_MD_ONLY}>{f.matricula || "—"}</TableCell>
                            <TableCell className={TABLE_COL_MD_ONLY}>{f.departamento || "—"}</TableCell>
                            <TableCell className={TABLE_COL_MD_ONLY}>{f.cargo || "—"}</TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1.5 text-xs font-medium",
                                  ativo ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    ativo ? "bg-emerald-500" : "bg-muted-foreground"
                                  )}
                                />
                                {ativo ? "Ativo" : "Inativo"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    aria-label="Ações"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEdit(f)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar funcionário
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openPerfil(f)}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Ver perfil
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(`/empresa/espelho-ponto/${f.usuarioId}`)
                                    }
                                  >
                                    <Clock className="mr-2 h-4 w-4" />
                                    Ver espelho de ponto
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      navigate(`/empresa/banco-horas/${f.usuarioId}`)
                                    }
                                  >
                                    <Wallet className="mr-2 h-4 w-4" />
                                    Ver banco de horas
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => { setResetSenhaTarget(f); setSenhaNova(""); }}>
                                    <Key className="mr-2 h-4 w-4" />
                                    Resetar senha
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { setResetEmailTarget(f); setEmailNovo(f.emails?.[0] ?? ""); }}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Resetar e-mail
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => desbloquearMutation.mutate(f.usuarioId)}>
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Desbloquear
                                  </DropdownMenuItem>
                                  {ativo && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => setDeleteTarget(f)}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Desativar funcionário
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
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
        </>
      )}


      {/* Dialog Resetar senha */}
      <Dialog open={!!resetSenhaTarget} onOpenChange={() => setResetSenhaTarget(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Resetar senha</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Nova senha para <strong>{resetSenhaTarget?.username}</strong>
          </p>
          <div className="space-y-2 py-2">
            <Label required>Nova senha</Label>
            <Input
              type="password"
              value={senhaNova}
              onChange={(e) => {
                setSenhaNova(e.target.value);
                handleChange("resetSenhaNova", e.target.value, (v) => validateSenha(v, true, "Nova senha"));
              }}
              onBlur={() => handleBlur("resetSenhaNova", senhaNova, (v) => validateSenha(v, true, "Nova senha"))}
              placeholder="••••••••"
              aria-invalid={!!getError("resetSenhaNova")}
            />
            <p className="text-xs text-muted-foreground">Esperado: {getFieldExpected("senha")}</p>
            {getError("resetSenhaNova") && <p role="alert" className="text-sm text-destructive">{getError("resetSenhaNova")}</p>}
            {!getError("resetSenhaNova") && senhaNova.length > 0 && (
              <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">Válido</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetSenhaTarget(null)}>Cancelar</Button>
            <Button
              disabled={!senhaNova.trim() || !!getError("resetSenhaNova") || resetSenhaMutation.isPending}
              onClick={() =>
                resetSenhaTarget && resetSenhaMutation.mutate({ id: resetSenhaTarget.usuarioId, senhaNova })
              }
            >
              {resetSenhaMutation.isPending ? "Salvando..." : "Alterar senha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Resetar e-mail */}
      <Dialog open={!!resetEmailTarget} onOpenChange={() => setResetEmailTarget(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Resetar e-mail</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Novo e-mail para <strong>{resetEmailTarget?.username}</strong>
          </p>
          <div className="space-y-2 py-2">
            <Label required>Novo e-mail</Label>
            <Input
              type="email"
              value={emailNovo}
              onChange={(e) => {
                const next = maskEmailInput(e.target.value);
                setEmailNovo(next);
                handleChange("resetEmailNovo", next, (v) => validateEmail(v, true));
              }}
              onBlur={() => handleBlur("resetEmailNovo", emailNovo, (v) => validateEmail(v, true))}
              placeholder="email@empresa.com"
              aria-invalid={!!getError("resetEmailNovo")}
            />
            <p className="text-xs text-muted-foreground">Esperado: {getFieldExpected("email")}</p>
            {getError("resetEmailNovo") && <p role="alert" className="text-sm text-destructive">{getError("resetEmailNovo")}</p>}
            {!getError("resetEmailNovo") && emailNovo.trim().length > 0 && (
              <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">Válido</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetEmailTarget(null)}>Cancelar</Button>
            <Button
              disabled={!emailNovo.trim() || !!getError("resetEmailNovo") || resetEmailMutation.isPending}
              onClick={() =>
                resetEmailTarget &&
                resetEmailMutation.mutate({ id: resetEmailTarget.usuarioId, emailNovo })
              }
            >
              {resetEmailMutation.isPending ? "Salvando..." : "Alterar e-mail"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Desativar {deleteTarget ? nomeDaLista(deleteTarget) : "funcionário"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              O funcionário deixará de aparecer nas listas de colaboradores ativos e não poderá
              registrar novos pontos. Os registros históricos serão preservados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.usuarioId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Desativando..." : "Desativar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
