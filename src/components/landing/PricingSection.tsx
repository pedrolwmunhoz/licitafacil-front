import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { INCLUDED_IN_ALL_PLANS, TIPOS_ASSINATURA } from "@/constants/tipoAssinatura";

const PricingSection = ({ tituloDaPagina = false }: { tituloDaPagina?: boolean }) => {
  return (
    <section id="precos" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <RevealOnScroll>
          <LandingSectionHeader
            eyebrow="Preços"
            title="Plano por tamanho do time"
            subtitle="Preço mensal conforme a faixa de funcionários. Cobrança recorrente no cartão após a contratação."
            as={tituloDaPagina ? "h1" : "h2"}
          />
        </RevealOnScroll>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {TIPOS_ASSINATURA.map(({ id, nome, priceDisplay }, i) => (
            <RevealOnScroll key={id} delayMs={i * 90} className="h-full min-h-0">
              <article className="flex h-full min-h-0 flex-col rounded-xl border border-landing-ink/10 bg-white p-6 shadow-sm transition-all hover:border-landing-ink/20 hover:shadow-md">
                <div>
                  <p className="text-sm font-medium text-landing-ink">{nome}</p>
                  <p className="mt-4 font-display text-3xl font-bold tabular-nums text-landing-ink md:text-[2rem]">
                    {priceDisplay}
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
                    asChild
                    className="w-full rounded-lg bg-landing-cta font-semibold text-landing-cta-foreground shadow-none hover:bg-landing-cta hover:brightness-[0.97]"
                  >
                    <a href={`/cadastro?plano=${id}`}>Começar</a>
                  </Button>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-landing-muted md:mt-12 md:text-base">
            Todos os planos incluem os mesmos recursos. O que muda entre as faixas é a quantidade de
            funcionários permitida e o valor da mensalidade.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default PricingSection;
