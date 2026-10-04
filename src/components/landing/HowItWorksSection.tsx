import { UserPlus, Users, Fingerprint, Cpu, FileDown } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

const steps = [
  {
    icon: UserPlus,
    title: "Abra a conta e defina a regra",
    desc: "Escolha o plano, cadastre a empresa e conclua o pagamento no checkout seguro.",
  },
  {
    icon: Users,
    title: "Cadastre o time e a jornada",
    desc: "Quem são os colaboradores e qual jornada ou escala cada um segue.",
  },
  {
    icon: Fingerprint,
    title: "Batida pelo app ou terminal",
    desc: "Cada marcação entra no histórico com as validações que você configurou.",
  },
  {
    icon: Cpu,
    title: "O sistema calcula no fechamento",
    desc: "Hora extra, banco de horas e exceções com a mesma regra para todo mundo.",
  },
  {
    icon: FileDown,
    title: "Gere o relatório",
    desc: "Exporte para o RH e para o contador no formato que o fechamento pede.",
  },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-16 md:py-24 bg-white scroll-mt-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <RevealOnScroll>
        <LandingSectionHeader
          eyebrow="Como funciona"
          title="Cinco passos da contratação ao relatório"
          subtitle="Fluxo direto: você configura, o time bate ponto, o sistema calcula e você exporta."
        />
      </RevealOnScroll>
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-0">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <RevealOnScroll key={title} delayMs={i * 110}>
              <div className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-12 w-12 rounded-full bg-landing-ink text-white flex items-center justify-center font-display font-bold text-lg">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 ? (
                    <div className="w-px flex-1 min-h-[2rem] bg-landing-ink/15 mt-2" aria-hidden />
                  ) : null}
                </div>
                <div className="pb-10 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-5 w-5 text-landing-ink" strokeWidth={2} />
                    <h3 className="font-display font-semibold text-landing-ink">{title}</h3>
                  </div>
                  <p className="text-sm text-landing-muted leading-relaxed pl-7">{desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
