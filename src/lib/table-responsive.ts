/**
 * Colunas que só aparecem a partir do breakpoint `md` (tablets+).
 * Aplicar no <TableHead> e no <TableCell> correspondente.
 */
export const TABLE_COL_MD_ONLY = "hidden md:table-cell";

/**
 * Coluna principal de texto no mobile: largura máxima e reticências (...).
 * A partir de `md` o texto volta ao fluxo normal.
 */
export const TABLE_CELL_MAIN_MOBILE =
  "min-w-0 max-w-[min(85vw,18rem)] overflow-hidden text-ellipsis whitespace-nowrap md:max-w-none md:overflow-visible md:whitespace-normal md:text-clip";

/**
 * Segunda coluna de texto ainda visível no mobile (ex.: status, data).
 */
export const TABLE_CELL_SECOND_MOBILE =
  "min-w-0 max-w-[min(42vw,12rem)] overflow-hidden text-ellipsis whitespace-nowrap md:max-w-none md:overflow-visible md:whitespace-normal md:text-clip";
