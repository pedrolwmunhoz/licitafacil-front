import { precosFaqs, precosSeoMeta } from "@/content/seo-landings/precos";
import { precosJsonLd } from "@/components/seo/jsonld/templates";

/** JSON-LD exclusivo de /precos */
export const path = precosSeoMeta.path;
export const jsonLd = precosJsonLd({
  title: precosSeoMeta.title,
  description: precosSeoMeta.description,
  faqs: precosFaqs,
});
