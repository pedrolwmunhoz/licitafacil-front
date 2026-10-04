import { LandingHireCta } from "@/components/landing/LandingHireCta";
import { LandingHeroHighlight } from "@/components/landing/LandingHeroHighlight";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import HeroDashboardMock from "@/components/landing/HeroDashboardMock";

const HeroSection = () => {
  return (
    <section id="topo" className="relative pt-24 pb-0 md:pt-28 overflow-hidden bg-landing-canvas text-landing-ink">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-16 md:pb-20">
          {/* above-the-fold: sem opacity-0 (LCP = “SegPonto” / H1) */}
          <div className="space-y-6 z-10">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-landing-ink leading-snug">
              <span className="block max-w-full">
                Ponto eletrônico e registro de ponto digital rastreável para o mês{" "}
                <LandingHeroHighlight>fechar com segurança</LandingHeroHighlight>
              </span>
            </h1>

            <p className="text-lg text-landing-muted max-w-xl leading-relaxed">
              Batidas com geolocalização, relatórios completos e assinatura digital. Escolha o plano, cadastre a empresa
              e ative a assinatura mensal no cartão em poucos minutos.
            </p>

            <LandingHireCta />
          </div>

          <div id="recursos" className="relative w-full max-w-xl mx-auto lg:max-w-none lg:mx-0 lg:min-w-0">
            <RevealOnScroll delayMs={150} className="relative">
              <HeroDashboardMock />
              <div className="absolute -z-10 -top-8 -right-8 h-64 w-64 rounded-full bg-landing-cta/15 blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 h-48 w-48 rounded-full bg-landing-ink/10 blur-3xl" />
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <div id="prova-social" className="border-t border-landing-ink/10 bg-landing-bar py-8 md:py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-landing-muted mb-6">
            Segmentos que exigem controle sério de ponto
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70 grayscale">
            {["Indústria", "Varejo", "Serviços", "Saúde", "Logística", "Tecnologia"].map((name) => (
              <span
                key={name}
                className="font-display text-lg md:text-xl font-bold text-landing-ink select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
