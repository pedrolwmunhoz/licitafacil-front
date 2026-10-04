import { legalJsonLd } from "@/components/seo/jsonld/templates";

export const path = "/privacidade";
export const jsonLd = legalJsonLd({
  path: "/privacidade",
  title: "Política de Privacidade | SegPonto",
  description: "Como o SegPonto trata dados pessoais de colaboradores e gestores: LGPD, finalidades, direitos do titular e contato do encarregado.",
  crumbName: "Privacidade",
});
