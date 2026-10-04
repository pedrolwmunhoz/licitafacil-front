import { FAQ_TOPICS } from "@/content/help/faq-topics";
import { faqHubJsonLd } from "@/components/seo/jsonld/templates";

const faqs = FAQ_TOPICS.flatMap((t) => t.items);

/** JSON-LD exclusivo de /perguntas-frequentes */
export const path = "/perguntas-frequentes";
export const jsonLd = faqHubJsonLd({
  title: "Perguntas frequentes | SegPonto",
  description: "FAQ SegPonto: conta, batida no app, jornada, cobrança e links para guias legais. Respostas curtas para gestores de PME.",
  faqs,
});
