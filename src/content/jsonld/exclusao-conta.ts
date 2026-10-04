import { legalJsonLd } from "@/components/seo/jsonld/templates";

export const path = "/exclusao-conta";
export const jsonLd = legalJsonLd({
  path: "/exclusao-conta",
  title: "Exclusão de conta | SegPonto",
  description:
    "Como solicitar a exclusão da conta no SegPonto: quais dados são excluídos, quais podem ser mantidos e por quanto tempo.",
  crumbName: "Exclusão de conta",
});
