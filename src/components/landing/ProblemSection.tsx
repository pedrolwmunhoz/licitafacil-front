import { FileSpreadsheet, BookOpen, Calculator, Scale, Search } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Só planilha",
    desc: "Na hora da discussão sobre jornada, planilha vira “versão contra versão”. Falta histórico confiável.",
  },
  {
    icon: BookOpen,
    title: "Livro de papel",
    desc: "Rasura e letra ruim não seguram perícia. O fiscal quer sequência clara e registro legível.",
  },
  {
    icon: Calculator,
    title: "Conta na mão",
    desc: "Hora extra e banco de horas mal fechados viram diferença na folha — e processo na fila.",
  },
  {
    icon: Scale,
    title: "Pouca prova no registro",
    desc: "Sem assinatura e sem contexto da batida, fica difícil defender o que realmente aconteceu.",
  },
  {
    icon: Search,
    title: "Fiscalização pedindo documento",
    desc: "Se o ponto está espalhado em papel e e-mail, montar a pasta na pressão custa caro.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <RevealOnScroll>
          <LandingSectionHeader
            eyebrow="O problema"
            title="Ponto mal controlado vira risco antes de virar processo"
            subtitle="Muita empresa ainda mistura papel, planilha e regra verbal. Quando o assunto é jornada, o que falta é registro organizado e rastreável."
          />
        </RevealOnScroll>
        <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <RevealOnScroll key={title} delayMs={i * 100} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <article className="h-full rounded-xl border-y border-r border-landing-ink/10 border-l-4 border-l-amber-500 bg-landing-canvas/50 p-5 shadow-sm hover:shadow-md hover:border-landing-ink/25 transition-all">
                <div className="h-11 w-11 rounded-lg bg-amber-500/15 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-amber-900" />
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
}
