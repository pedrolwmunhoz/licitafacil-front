import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const HIRE_CTA_CLASS =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-landing-cta px-7 text-base font-semibold text-landing-cta-foreground shadow-none transition-[filter] hover:brightness-[0.97]";

/** CTA primário de contratação — mesmo markup da home (sem Button/cva). */
export function LandingHireCta({
  note = "Planos mensais • Checkout seguro no cartão • Configuração em ~5 min",
  noteClassName,
  className,
  href = "/cadastro",
}: {
  note?: string | null;
  noteClassName?: string;
  className?: string;
  href?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-2 pt-1", className)}>
      <a href={href} className={HIRE_CTA_CLASS}>
        Contratar agora
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </a>
      {note ? (
        <p className={cn("text-sm text-landing-muted leading-snug max-w-xl", noteClassName)}>{note}</p>
      ) : null}
    </div>
  );
}
