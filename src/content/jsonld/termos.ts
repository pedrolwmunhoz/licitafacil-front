import { legalJsonLd } from "@/components/seo/jsonld/templates";

export const path = "/termos";
export const jsonLd = legalJsonLd({
  path: "/termos",
  title: "Termos de Uso | SegPonto",
  description: "Condições de uso do software SegPonto: conta, planos, responsabilidades da empresa contratante e limitações do serviço SaaS.",
  crumbName: "Termos",
});
