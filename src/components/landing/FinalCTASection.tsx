import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { HIRE_CTA_CLASS } from "@/components/landing/LandingHireCta";

const FinalCTASection = () => {
  return (
    <section id="cta" className="relative py-16 md:py-24 bg-landing-ink text-white scroll-mt-20">
      <span id="contratar" className="sr-only" aria-hidden />
      <RevealOnScroll className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Organize o ponto antes do fechamento virar corre-corre
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Escolha o plano, cadastre a empresa e conclua o pagamento no checkout seguro. Em poucos minutos você já pode
          registrar batidas com histórico claro para o RH e o contador.
        </p>
        <a href="/cadastro" className={`${HIRE_CTA_CLASS} px-8`}>
          Contratar agora
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </a>
        <p className="mt-5 text-sm text-white/65">Assinatura mensal no cartão • Configuração em ~5 min</p>
      </RevealOnScroll>
    </section>
  );
};

export default FinalCTASection;
