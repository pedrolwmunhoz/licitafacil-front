import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BLOG_AUTOR } from "@/content/blog/autor";

/** Largura e respiro lateral de todas as seções do blog. */
export const BLOG_WRAP = "mx-auto w-full max-w-[1160px] px-5 md:px-8";

export const BLOG_BOTAO =
  "inline-flex h-[38px] items-center justify-center rounded-lg border border-landing-ink/25 bg-transparent px-4 text-sm font-medium text-landing-ink transition-colors hover:bg-landing-canvas";

export const BLOG_BOTAO_ESCURO =
  "inline-flex h-[38px] items-center justify-center rounded-lg bg-landing-ink px-4 text-sm font-medium text-white transition-colors hover:bg-landing-cta hover:text-landing-cta-foreground disabled:pointer-events-none disabled:opacity-50";

export const BLOG_CAMPO =
  "h-[38px] min-w-0 rounded-lg border border-landing-ink/25 bg-white px-3 text-sm text-landing-ink outline-none placeholder:text-landing-muted focus:border-landing-ink";

export function BlogTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-lg bg-landing-cta/35 px-2.5 py-0.5 text-xs font-semibold text-landing-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

const AVATAR_TAMANHO = {
  sm: "h-9 w-9 text-[13px]",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-[15px]",
  xl: "h-[52px] w-[52px] text-base",
} as const;

export function BlogAvatar({
  iniciais = BLOG_AUTOR.iniciais,
  tamanho = "md",
  className,
}: {
  iniciais?: string;
  tamanho?: keyof typeof AVATAR_TAMANHO;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-landing-ink font-semibold text-landing-cta",
        AVATAR_TAMANHO[tamanho],
        className,
      )}
    >
      {iniciais}
    </span>
  );
}
