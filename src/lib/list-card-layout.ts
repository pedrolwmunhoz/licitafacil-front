/**
 * Padrão visual das listagens com tabela: card com borda landing, conteúdo da
 * tabela sem padding lateral no CardContent, rodapé de paginação alinhado ao header.
 */
export const LIST_CARD = "overflow-hidden border-landing-ink/10 shadow-sm dark:border-border";
export const LIST_CARD_HEADER =
  "border-b border-border/60 bg-muted/20 pb-3 dark:border-border";
/** CardContent quando a tabela ocupa a largura total do card. */
export const LIST_CARD_CONTENT_FLUSH = "p-0 pt-0";
/** Borda ao redor da tabela (full-bleed no card). */
export const LIST_TABLE_WRAP =
  "rounded-lg border border-landing-ink/10 bg-white shadow-inner dark:border-border dark:bg-card";

/**
 * Área da tabela só com separador do header — sem “caixa” interna extra nas laterais
 * (evita parecer padding dentro do card).
 */
export const LIST_TABLE_AREA_FLUSH =
  "overflow-x-auto border-t border-border/60 bg-white dark:bg-zinc-950";
/** Área de paginação / metadados abaixo da tabela (3 colunas: info | nav | ações). */
export const LIST_TABLE_FOOTER =
  "mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 border-t border-border/60 px-4 pb-4 pt-3 sm:gap-4 sm:px-5 sm:pb-5";
