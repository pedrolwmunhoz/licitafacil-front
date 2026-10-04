import { Link } from "react-router-dom";
import { LANDING_PROSE_LINK_CLASS } from "@/content/landing-site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandingSectionHeader } from "@/components/landing/LandingSectionHeader";
import { RevealOnScroll } from "@/components/landing/RevealOnScroll";
import { LANDING_FAQS } from "@/content/landing-faqs";
import { expandBlogTokens } from "@/content/blog/tokens";

export type FaqItem = { q: string; a: string };

type FAQSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  showFooterLinks?: boolean;
};

const FAQSection = ({
  id = "faq",
  eyebrow = "FAQ",
  title = "Perguntas frequentes",
  subtitle = "Rastreabilidade, segurança da informação e uso pelas áreas de RH e contabilidade.",
  items = LANDING_FAQS,
  showFooterLinks = true,
}: FAQSectionProps) => (
  <section
    {...(id ? { id } : {})}
    className="scroll-mt-20 border-t border-landing-ink/10 bg-landing-canvas py-16 md:py-24"
  >
    <div className="container mx-auto px-4 max-w-6xl">
      <RevealOnScroll>
        <LandingSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </RevealOnScroll>
      <RevealOnScroll delayMs={120} className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-landing-ink/10 bg-white px-2 py-2 shadow-sm md:px-4">
          <Accordion type="single" collapsible className="w-full">
            {items.map(({ q, a }, i) => (
              <AccordionItem key={q} value={`faq-${i}`} className="border-landing-ink/10">
                <AccordionTrigger className="text-left font-display text-landing-ink hover:no-underline py-4">
                  {expandBlogTokens(q)}
                </AccordionTrigger>
                <AccordionContent className="text-landing-muted text-[15px] leading-relaxed pb-4">
                  {expandBlogTokens(a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {showFooterLinks ? (
          <p className="mt-6 text-center text-sm text-landing-muted">
            <Link to="/perguntas-frequentes" className={LANDING_PROSE_LINK_CLASS}>
              Ver todas as perguntas por tópico
            </Link>
            {" · "}
            <Link to="/documentacao" className={LANDING_PROSE_LINK_CLASS}>
              Guia de uso
            </Link>
          </p>
        ) : null}
      </RevealOnScroll>
    </div>
  </section>
);

export default FAQSection;
