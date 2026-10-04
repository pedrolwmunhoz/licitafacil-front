import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export type SegPontoWordmarkProps = {
  /** `nav` = header da landing; `page` = destaque em login e contratação */
  variant?: "nav" | "page";
  className?: string;
};

/**
 * Logotipo textual SegPonto + ícone LayoutGrid na caixa (mesma composição da Navbar).
 */
export function SegPontoWordmark({ variant = "nav", className }: SegPontoWordmarkProps) {
  const isNav = variant === "nav";
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-display font-bold text-landing-ink shrink-0",
        isNav ? "text-lg" : "text-2xl",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-landing-ink/10 bg-white shadow-sm",
          isNav ? "h-9 w-9" : "h-11 w-11"
        )}
      >
        <LayoutGrid className={isNav ? "h-5 w-5" : "h-6 w-6"} strokeWidth={2.25} aria-hidden />
      </span>
      <span>SegPonto</span>
    </div>
  );
}
