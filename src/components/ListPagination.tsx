import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS } from "@/lib/pagination-constants";
import { cn } from "@/lib/utils";

export type ListPaginationProps = {
  /** Página atual (0-based). */
  page: number;
  totalPages: number;
  /** Total de registros (opcional — exibe no resumo). */
  totalItems?: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: readonly number[];
  /**
   * `footer` — rodapé de tabela (borda + padding).
   * `inline` — dentro de card já com padding.
   */
  variant?: "footer" | "inline";
  className?: string;
  maxPageButtons?: number;
};

function pageWindow(current: number, total: number, max: number): number[] {
  if (total <= 0) return [];
  if (total <= max) return Array.from({ length: total }, (_, i) => i);
  const half = Math.floor(max / 2);
  let start = Math.max(0, current - half);
  let end = start + max - 1;
  if (end > total - 1) {
    end = total - 1;
    start = Math.max(0, end - max + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function formatRegistros(n: number): string {
  return n === 1 ? "1 registro" : `${n} registros`;
}

/**
 * Rodapé de paginação compartilhado das listagens (PT-BR).
 * Sempre em 3 colunas: resumo | navegação | por página.
 */
export function ListPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  variant = "footer",
  className,
  maxPageButtons = 5,
}: ListPaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(0, page), safeTotalPages - 1);
  const canPrev = safePage > 0;
  const canNext = safePage < safeTotalPages - 1;
  const pages = pageWindow(safePage, safeTotalPages, maxPageButtons);

  const rangeLabel = (() => {
    if (totalItems == null || totalItems <= 0) {
      return `Página ${safePage + 1} de ${safeTotalPages}`;
    }
    const from = safePage * pageSize + 1;
    const to = Math.min(totalItems, (safePage + 1) * pageSize);
    return `${from}–${to} de ${formatRegistros(totalItems)}`;
  })();

  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2",
        variant === "footer"
          ? "mt-3 border-t border-border/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
          : "mt-2 border-t border-border/60 pt-3",
        className
      )}
      role="navigation"
      aria-label="Paginação"
    >
      <p className="min-w-0 truncate text-xs tabular-nums text-muted-foreground sm:text-sm">
        {rangeLabel}
      </p>

      <div className="flex shrink-0 items-center justify-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1 px-2 sm:px-2.5"
          disabled={!canPrev}
          aria-label="Página anterior"
          onClick={() => canPrev && onPageChange(safePage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            type="button"
            variant={p === safePage ? "default" : "outline"}
            size="icon"
            className="h-8 w-8 tabular-nums"
            aria-label={`Página ${p + 1}`}
            aria-current={p === safePage ? "page" : undefined}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1 px-2 sm:px-2.5"
          disabled={!canNext}
          aria-label="Próxima página"
          onClick={() => canNext && onPageChange(safePage + 1)}
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2">
        {onPageSizeChange ? (
          <>
            <span className="hidden text-xs text-muted-foreground whitespace-nowrap sm:inline">
              Por página
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                onPageSizeChange(Number(v));
              }}
            >
              <SelectTrigger className="h-8 w-[4.5rem]" aria-label="Registros por página">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : null}
      </div>
    </div>
  );
}
