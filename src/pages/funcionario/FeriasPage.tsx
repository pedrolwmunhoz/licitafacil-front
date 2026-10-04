import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import {
  LIST_CARD,
  LIST_CARD_CONTENT_FLUSH,
  LIST_CARD_HEADER,
  LIST_TABLE_AREA_FLUSH,
} from "@/lib/list-card-layout";
import { TABLE_CELL_MAIN_MOBILE, TABLE_COL_MD_ONLY } from "@/lib/table-responsive";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { CACHE_MEDIUM, queryKeys } from "@/lib/query-cache-policy";
import { DEFAULT_PAGE_SIZE } from "@/lib/pagination-constants";
import { listarFeriasAfastamentosFuncionario } from "@/lib/api-funcionario";
import {
  formatDateFerias,
  statusAfastamentoBadgeClass,
  statusAfastamentoLabel,
  statusAfastamentoNorm,
} from "@/lib/ferias-ui";

type FiltroStatus = "todos" | "ativo" | "inativo";

export default function FeriasFuncionarioPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.funcionario.ferias(page, size),
    queryFn: () => listarFeriasAfastamentosFuncionario({ page, size }),
    ...CACHE_MEDIUM,
  });

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
    if (filtroStatus === "todos") return itens;
    return itens.filter((i) => statusAfastamentoNorm(i.status) === filtroStatus);
  }, [itens, filtroStatus]);

  const totalPaginas = data ? Math.max(1, Math.ceil(data.total / size)) : 1;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-semibold">Minhas férias e afastamentos</h1>
          <p className="text-sm text-muted-foreground">
            Consulte seus períodos de férias e afastamentos.
          </p>
        </div>
      </div>

      <Card className={LIST_CARD}>
        <CardHeader className={LIST_CARD_HEADER}>
          <CardTitle className="text-base">Registros</CardTitle>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por status">
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
                      <TableHead>Tipo</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Início</TableHead>
                      <TableHead className={TABLE_COL_MD_ONLY}>Fim</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itensFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                          Nenhum registro encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      itensFiltrados.map((item, idx) => (
                        <TableRow key={`${item.nomeAfastamento}-${item.inicio}-${idx}`}>
                          <TableCell className={cn("font-medium", TABLE_CELL_MAIN_MOBILE)}>
                            {item.nomeAfastamento ?? "—"}
                            <span className="mt-0.5 block text-xs font-normal text-muted-foreground md:hidden">
                              {formatDateFerias(item.inicio)}
                              {item.fim && item.fim !== item.inicio
                                ? ` – ${formatDateFerias(item.fim)}`
                                : ""}
                            </span>
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
