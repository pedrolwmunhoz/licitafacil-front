export type BlogFaqItem = { q: string; a: string };

/** H3 dentro de uma seção H2 — categorias de exemplo / contraste (template Guia da Carreira). */
export type BlogSubsection = {
  title: string;
  paragraphs: string[];
};

export type BlogTable = {
  headers: string[];
  rows: string[][];
};

export type BlogSection = {
  title: string;
  paragraphs: string[];
  /** Parágrafos depois de tabela/bullets (mesma H2). */
  closingParagraphs?: string[];
  bullets?: string[];
  table?: BlogTable;
  subsections?: BlogSubsection[];
};

export type BlogPost = {
  /** URL: /blog/{slug} — derivado do título, em kebab-case */
  slug: string;
  title: string;
  /** H1 no padrão das landings (texto + destaque verde). */
  hero: { titleBefore: string; highlight: string };
  /** Meta description (SEO / Google). */
  description: string;
  /** Resumo curto (lista do blog / cards). */
  intro: string;
  /**
   * Abertura do artigo (template Guia da Carreira): 3–4 parágrafos
   * com gancho, contexto, perguntas do leitor e ponte.
   * Se omitido, a página usa só `intro`.
   */
  opening?: string[];
  /** ISO 8601, ex.: 2026-05-15 */
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  /** Título acima do CTA de contratação no post (texto fixo do arquivo). */
  ctaTitulo: string;
  /** "Neste post": só as seções-chave, com rótulo curto; `secao` é o título exato do H2. */
  sumario: { secao: string; rotulo: string }[];
  sections: BlogSection[];
  /** FAQ para accordion na página e FAQPage no JSON-LD. */
  faqs?: BlogFaqItem[];
  related?: { label: string; to: string }[];
};
