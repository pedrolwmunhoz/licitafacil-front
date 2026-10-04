import type { LucideIcon } from "lucide-react";
import type { PublicPageSeoConfig } from "@/content/public-page-seo";

export type SeoLandingFaq = { q: string; a: string };

export type SeoLandingCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type SeoLandingStep = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

/** H3 dentro de uma seção H2 — categorias de exemplo / contraste (template Guia da Carreira). */
export type SeoLandingSubsection = {
  title: string;
  paragraphs: string[];
};

export type SeoLandingSection = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: SeoLandingSubsection[];
  variant?: "white" | "canvas";
};

export type SeoLandingContent = {
  seo: PublicPageSeoConfig;
  hero: {
    eyebrow?: string;
    titleBefore: string;
    highlight: string;
    /** Gancho curto no hero; se `opening` existir, preferir opening e deixar subtitle enxuto ou omitir. */
    subtitle?: string;
  };
  /**
   * Abertura Guia da Carreira (3–4 parágrafos): gancho, contexto, perguntas, ponte.
   * Renderizada logo após o H1, como no blog.
   */
  opening?: string[];
  sections: SeoLandingSection[];
  /** Só quando forem categorias reais de exemplo — não decoração. Preferir subsections H3. */
  cards?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: SeoLandingCard[];
  };
  /** Só para sequência de aplicação (passo 1…n). Preferir seção “Como fazer na prática”. */
  steps?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: SeoLandingStep[];
  };
  faqs?: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: SeoLandingFaq[];
  };
  related?: { label: string; to: string }[];
};
