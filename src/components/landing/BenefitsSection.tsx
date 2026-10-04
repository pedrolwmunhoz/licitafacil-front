import { ShieldCheck, FileDown, Zap, Eye, Clock, TrendingUp } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Pronto para quando pedirem documento",
    desc: "Relatório e histórico organizados para fiscalização, auditoria interna ou advogado.",
  },
  {
    icon: FileDown,
    title: "Fechamento em PDF ou Excel",
    desc: "O RH e o contador recebem o que precisam sem ficar remontando dado no fim do mês.",
  },
  {
    icon: Zap,
    title: "Cálculo com regra definida",
    desc: "Hora extra, banco de horas e exceções seguem a regra que você configurou, não a planilha paralela.",
  },
  {
    icon: Eye,
    title: "Menos brecha para batida irregular",
    desc: "Política clara e registro com contexto reduzem discussão de “o que realmente aconteceu”.",
  },
  {
    icon: Clock,
    title: "RH ganha tempo",
    desc: "Menos dia inteiro conferindo planilha; mais validação rápida do que já está no sistema.",
  },
  {
    icon: TrendingUp,
    title: "Cresce sem trocar de sistema",
    desc: "De poucos funcionários a um time maior: o mesmo padrão para todo mundo.",
  },
];

const BenefitsSection = () => (
  <section id="beneficios" className="py-16 md:py-24 bg-landing-canvas scroll-mt-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <RevealOnScroll>
        <LandingSectionHeader
          eyebrow="Benefícios"
          title="O que muda no dia a dia e no fechamento"
          subtitle="Menos susto com jornada, menos retrabalho para o RH e números mais confiáveis para a gestão e para o contador."
        />
      </RevealOnScroll>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {benefits.map(({ icon: Icon, title, desc }, i) => (
          <RevealOnScroll key={title} delayMs={i * 95}>
            <article className="h-full rounded-xl border border-landing-ink/10 bg-white p-6 shadow-sm hover:shadow-md hover:border-landing-ink/20 transition-all">
              <div className="h-11 w-11 rounded-lg bg-landing-cta/20 flex items-center justify-center mb-4 border border-landing-ink/5">
                <Icon className="h-5 w-5 text-landing-ink" />
              </div>
              <h3 className="font-display font-semibold text-landing-ink mb-2">{title}</h3>
              <p className="text-sm text-landing-muted leading-relaxed">{desc}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
