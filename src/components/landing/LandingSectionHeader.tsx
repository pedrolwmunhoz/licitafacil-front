import { cn } from "@/lib/utils";

type LandingSectionHeaderProps = {
  /** Se omitido, só o título e o subtítulo aparecem (útil para seção com um único título). */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Tipografia e espaçamentos menores (ex.: fluxos internos da área logada). */
  compact?: boolean;
  /** Ainda mais compacto: use com `compact` (menos margem e fontes menores). */
  dense?: boolean;
  /**
   * Espaço abaixo do título.
   * - `section` (padrão): gap grande da home, para cards/grids.
   * - `prose`: título de artigo seguido de parágrafos (sem margem negativa no texto).
   */
  gap?: "section" | "prose";
  /** `h1` quando a seção é o título da página. */
  as?: "h1" | "h2";
};

export function LandingSectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  compact = false,
  dense = false,
  gap = "section",
  as: Titulo = "h2",
}: LandingSectionHeaderProps) {
  const wrap = align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl";
  const marginBottom = cn(
    dense && compact && "mb-3 sm:mb-4",
    !dense && compact && "mb-6 md:mb-8",
    !compact && gap === "prose" && "mb-5 md:mb-6",
    !compact && gap === "section" && "mb-12 md:mb-16",
  );
  return (
    <div className={cn(wrap, marginBottom)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-semibold uppercase text-landing-muted",
            dense && compact && "mb-1 text-[0.6rem] tracking-[0.12em]",
            !dense && compact && "mb-1.5 text-[0.65rem] tracking-[0.16em]",
            !compact && "mb-3 text-xs tracking-[0.2em]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Titulo
        className={cn(
          "font-display text-landing-ink tracking-tight leading-tight",
          dense && compact && "mb-1 text-base font-semibold sm:text-lg",
          !dense && compact && "mb-2 text-xl font-semibold md:text-2xl",
          !compact && gap === "prose" && "mb-0 text-3xl font-bold md:text-4xl",
          !compact && gap === "section" && "mb-4 text-3xl font-bold md:text-4xl",
        )}
      >
        {title}
      </Titulo>
      {subtitle ? (
        <p
          className={cn(
            "text-landing-muted",
            dense && compact && "text-xs leading-snug sm:text-sm",
            !dense && compact && "text-sm leading-relaxed md:text-[0.9375rem]",
            !compact && gap === "prose" && "mt-3 text-lg leading-relaxed",
            !compact && gap === "section" && "text-lg leading-relaxed",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
