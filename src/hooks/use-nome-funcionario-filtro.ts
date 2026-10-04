import { useQuery } from "@tanstack/react-query";
import { CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import { listarNomesFuncionarios } from "@/lib/api-empresa";

/** Nome do filtrado, ou undefined se nenhum. */
export function useNomeFuncionarioFiltro(funcionarioId: string): string | undefined {
  const { data } = useQuery({
    queryKey: queryKeys.empresa.funcionarioNomes(),
    queryFn: () => listarNomesFuncionarios({ page: 0, pageSize: 100 }),
    ...CACHE_LONG,
  });
  if (!funcionarioId) return undefined;
  return data?.conteudo?.find((x) => x.usuarioId === funcionarioId)?.nome || undefined;
}
