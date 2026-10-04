import { MapPin, Clock, CalendarClock, CheckSquare, Palmtree, ClipboardList, FileBarChart } from "lucide-react";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";

const features = [
  {
    icon: MapPin,
    title: "Área permitida no mapa",
    desc: "Só registra onde a empresa autorizou. Batida fora do combinado vira exceção com rastro.",
  },
  {
    icon: Clock,
    title: "Banco de horas",
    desc: "Saldo e movimentação acompanhados no sistema, com histórico para conferir na folha.",
  },
  {
    icon: CalendarClock,
    title: "Jornada por perfil",
    desc: "Regras diferentes por empresa, setor ou pessoa, conforme a operação precisa.",
  },
  {
    icon: CheckSquare,
    title: "Ajuste com aprovação",
    desc: "O colaborador pede, o gestor decide e tudo fica registrado para consulta depois.",
  },
  {
    icon: Palmtree,
    title: "Férias e afastamento",
    desc: "Integrado ao ponto para o fechamento bater com o que aconteceu no calendário.",
  },
  {
    icon: ClipboardList,
    title: "Registro de alterações",
    desc: "Quem mudou o quê e quando fica guardado para auditoria ou conferência interna.",
  },
  {
    icon: FileBarChart,
    title: "Relatórios exportáveis",
    desc: "PDF e planilha para gestão e contador, sem depender de e-mail com pedaço solto de dado.",
  },
];

const FeaturesSection = () => (
  <section id="funcionalidades" className="py-16 md:py-24 bg-landing-canvas scroll-mt-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <RevealOnScroll>
        <LandingSectionHeader
          eyebrow="Funcionalidades"
          title="O que o sistema entrega"
          subtitle="Ponto, exceções, fechamento e relatório no mesmo fluxo, sem empilhar ferramenta em cima de ferramenta."
        />
      </RevealOnScroll>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-5">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <RevealOnScroll
            key={title}
            delayMs={i * 80}
            className="w-full max-w-[17.5rem] shrink-0 sm:w-[17.5rem]"
          >
            <article className="h-full rounded-xl border border-landing-ink/10 bg-white p-5 shadow-sm hover:shadow-md hover:border-landing-ink/20 transition-all">
              <Icon className="h-8 w-8 text-landing-ink mb-3" strokeWidth={1.75} />
              <h3 className="font-display font-semibold text-landing-ink mb-1">{title}</h3>
              <p className="text-sm text-landing-muted leading-relaxed">{desc}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
