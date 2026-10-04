import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { INCLUDED_IN_ALL_PLANS, TIPOS_ASSINATURA, type TipoAssinaturaId } from "@/constants/tipoAssinatura";

type Props = {
  selectedId: TipoAssinaturaId | null;
  onSelectTipo: (tipoAssinaturaId: TipoAssinaturaId) => void;
};

/** Mesmo layout da PricingSection da landing (grid 2/4 cols). */
export function PlanosAssinaturaGrid({ selectedId, onSelectTipo }: Props) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
      {TIPOS_ASSINATURA.map((t, i) => {
        const selected = selectedId === t.id;
        return (
          <RevealOnScroll key={t.id} delayMs={i * 90} className="h-full min-h-0">
            <article
              role="button"
              tabIndex={0}
              onClick={() => onSelectTipo(t.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectTipo(t.id);
                }
              }}
              className={cn(
                "flex h-full min-h-0 cursor-pointer flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-landing-ink/20 hover:shadow-md",
                selected
                  ? "border-landing-cta ring-2 ring-landing-cta ring-offset-2 ring-offset-landing-canvas"
                  : "border-landing-ink/10",
              )}
            >
              <div>
                <p className="text-sm font-medium text-landing-ink">{t.nome}</p>
                <p className="mt-4 font-display text-3xl font-bold tabular-nums text-landing-ink md:text-[2rem]">
                  {t.priceDisplay}
                </p>
                <p className="mt-1 text-sm text-landing-muted">/ mês</p>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-landing-muted">Inclui</p>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-snug text-landing-muted sm:gap-2">
                {INCLUDED_IN_ALL_PLANS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-landing-ink" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full pt-6">
                <Button
                  type="button"
                  className={cn(
                    "w-full rounded-lg font-semibold shadow-none hover:brightness-[0.97]",
                    selected
                      ? "bg-landing-ink text-white hover:bg-landing-ink hover:brightness-[0.97]"
                      : "bg-landing-cta text-landing-cta-foreground hover:bg-landing-cta",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTipo(t.id);
                  }}
                >
                  {selected ? "Plano selecionado" : "Selecionar plano"}
                </Button>
              </div>
            </article>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
