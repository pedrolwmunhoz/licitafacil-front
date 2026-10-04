import { useQuery } from "@tanstack/react-query";
import { CACHE_LONG, queryKeys } from "@/lib/query-cache-policy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listarNomesFuncionarios } from "@/lib/api-empresa";
import { cn } from "@/lib/utils";

/** Sem filtro — lista completa (estado na page = ""). */
export const FILTRO_FUNCIONARIO_NENHUM = "";

/** Valor do SelectItem de limpar (Radix precisa de string não vazia). */
const VALOR_LIMPAR = "nenhum";

type Props = {
  value: string;
  onChange: (funcionarioId: string) => void;
  className?: string;
  triggerClassName?: string;
};

/**
 * Fechado sem filtro → "Selecionar funcionário".
 * Lista → "Nenhum" limpa o filtro de verdade (uuid → sem seleção).
 */
export function FiltroFuncionarioSelect({
  value,
  onChange,
  className,
  triggerClassName,
}: Props) {
  const { data } = useQuery({
    queryKey: queryKeys.empresa.funcionarioNomes(),
    queryFn: () => listarNomesFuncionarios({ page: 0, pageSize: 100 }),
    ...CACHE_LONG,
  });

  const opcoes = data?.conteudo ?? [];
  const semFiltro = !value;
  const valorSelect = semFiltro ? VALOR_LIMPAR : value;
  const rotulo = semFiltro
    ? "Selecionar funcionário"
    : opcoes.find((f) => f.usuarioId === value)?.nome?.trim() || "Selecionar funcionário";

  return (
    <div className={cn("min-w-[10rem] max-w-[16rem] flex-1 sm:flex-none sm:w-[14rem]", className)}>
      <Select
        value={valorSelect}
        onValueChange={(next) => {
          onChange(next === VALOR_LIMPAR ? FILTRO_FUNCIONARIO_NENHUM : next);
        }}
      >
        <SelectTrigger className={cn("h-8", triggerClassName)} aria-label="Filtrar por funcionário">
          <SelectValue>{rotulo}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={VALOR_LIMPAR}>Nenhum</SelectItem>
          {opcoes.map((f) => (
            <SelectItem key={f.usuarioId} value={f.usuarioId}>
              {f.nome || "—"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
