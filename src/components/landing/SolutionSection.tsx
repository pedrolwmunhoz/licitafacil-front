import { MapPin, Fingerprint, ClipboardCheck, Monitor, Smartphone } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

const items = [
  {
    icon: MapPin,
    title: "Cada batida com contexto",
    desc: "A política da empresa e a localização (quando você definir) entram no registro. Menos dúvida na hora de conferir.",
  },
  {
    icon: Fingerprint,
    title: "Assinatura digital",
    desc: "Cada ponto fica vinculado ao colaborador de forma segura, como a legislação trabalhista costuma exigir.",
  },
  {
    icon: ClipboardCheck,
    title: "Histórico de quem mudou o quê",
    desc: "Ajustes e alterações ficam registrados: quem fez, quando e o quê. Ajuda em auditoria e em conversa com o fiscal.",
  },
  {
    icon: Monitor,
    title: "Regra única na empresa",
    desc: "Terminal na empresa ou batida pelo celular, sempre com a mesma regra para fechar o mês.",
  },
  {
    icon: Smartphone,
    title: "Celular para quem roda fora do escritório",
    desc: "Área permitida no mapa e batida pelo app. Serve para equipe externa e home office sem soltar tudo solto.",
  },
];

const SolutionSection = () => (
  <section className="py-16 md:py-24 bg-landing-canvas scroll-mt-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <RevealOnScroll>
            <LandingSectionHeader
              align="left"
              eyebrow="A solução"
              title="SegPonto: ponto eletrônico com histórico que aguenta conferência"
              subtitle="Registro digital rastreável para o RH trabalhar no dia a dia e para você ter o que mostrar em fiscalização ou no fechamento com o contador."
            />
          </RevealOnScroll>
          <div className="space-y-6">
            {items.map(({ icon: Icon, title, desc }, i) => (
              <RevealOnScroll key={title} delayMs={i * 95}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-landing-cta/20 flex items-center justify-center border border-landing-ink/10">
                    <Icon className="h-5 w-5 text-landing-ink" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-landing-ink">{title}</h3>
                    <p className="text-sm text-landing-muted leading-relaxed mt-1">{desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center md:sticky md:top-28">
          <RevealOnScroll delayMs={180} className="w-full max-w-sm">
            <div className="rounded-2xl border border-landing-ink/10 bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] p-8 space-y-6">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-landing-cta/25 flex items-center justify-center mb-3 border border-landing-ink/10">
                <Fingerprint className="h-8 w-8 text-landing-ink" />
              </div>
              <p className="font-display font-bold text-landing-ink text-lg">Batida registrada</p>
              <p className="text-sm text-landing-muted">08:02 — histórico gravado</p>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-landing-ink/10 pb-2">
                <dt className="text-landing-muted">Área / regra</dt>
                <dd className="text-landing-ink font-medium text-right">Dentro do combinado ✓</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-landing-ink/10 pb-2">
                <dt className="text-landing-muted">Assinatura</dt>
                <dd className="text-landing-ink font-medium text-right">Associada à batida ✓</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-landing-muted">Histórico</dt>
                <dd className="text-landing-ink font-medium text-right">Alteração registrada ✓</dd>
              </div>
            </dl>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  </section>
);

export default SolutionSection;
