import { LANDING_FAQS } from "@/content/landing-faqs";
import { homeJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de / */
export const path = "/";
export const jsonLd = homeJsonLd({
  title: "SegPonto | Sistema de ponto eletrônico para PME",
  description: "Controle o ponto dos seus funcionários com segurança jurídica e geolocalização. SegPonto é o SaaS para PMEs reduzirem riscos trabalhistas e fiscalizações.",
  faqs: LANDING_FAQS,
});
