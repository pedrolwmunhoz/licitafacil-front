/**
 * Helpers compartilhados do grafo JSON-LD (canvas SegPonto).
 * Sem imports de conteúdo de página — só entities + planos (offers).
 */
import { TIPOS_ASSINATURA } from "@/constants/tipoAssinatura";
import { BRAND_NAME, SITE_ORIGIN } from "@/content/landing-site";
import {
  CONCEPT_IDS,
  ORGANIZATION_ID,
  SOFTWARE_ID,
  WEBSITE_ID,
  type ConceptId,
  articleRefs,
  buildConceptNode,
  buildConceptNodes,
  buildGraph,
  buildLogoNode,
  buildOrganizationNode,
  buildSoftwareApplicationNode,
  buildSoftwareRefNode,
  buildWebSiteNode,
  conceptRefs,
  idRef,
  pageId,
  pageUrl,
} from "@/components/seo/entities";

export type FaqItem = { q: string; a: string };
export type BreadcrumbItem = { name: string; path: string };

export {
  CONCEPT_IDS,
  ORGANIZATION_ID,
  SOFTWARE_ID,
  WEBSITE_ID,
  type ConceptId,
  articleRefs,
  buildConceptNode,
  buildConceptNodes,
  buildGraph,
  buildSoftwareRefNode,
  conceptRefs,
  idRef,
  pageId,
  pageUrl,
};

export function baseGlobalNodes(): Record<string, unknown>[] {
  return [buildOrganizationNode(), buildLogoNode(), buildWebSiteNode()];
}

export function buildSoftwareWithOffers(): Record<string, unknown> {
  return {
    ...buildSoftwareApplicationNode(),
    offers: TIPOS_ASSINATURA.map((plan) => ({
      "@type": "Offer",
      name: `${BRAND_NAME} — ${plan.nome}`,
      price: plan.priceValue.toFixed(2),
      priceCurrency: "BRL",
      url: `${SITE_ORIGIN}/precos`,
      availability: "https://schema.org/InStock",
    })),
  };
}

export function buildFaqEntities(faqs: FaqItem[]): Record<string, unknown>[] {
  return faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  }));
}

export function buildBreadcrumbNode(path: string, items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    "@id": pageId(path, "breadcrumb"),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function buildFaqPageNode(path: string, faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": pageId(path, "faq"),
    url: pageUrl(path),
    isPartOf: idRef(pageId(path, "webpage")),
    mainEntity: buildFaqEntities(faqs),
  };
}

type WebPageOptions = {
  path: string;
  title: string;
  description: string;
  type?: string;
  /** Conceitos centrais da página (2–3). */
  aboutIds?: readonly ConceptId[];
  /** Soft ref ao produto (home/preços) — não é conceito. */
  aboutSoftware?: boolean;
  mainEntityId?: string;
  breadcrumb?: boolean;
  publisher?: boolean;
};

export function buildWebPageNode(opts: WebPageOptions): Record<string, unknown> {
  const url = pageUrl(opts.path);
  const node: Record<string, unknown> = {
    "@type": opts.type ?? "WebPage",
    "@id": pageId(opts.path, "webpage"),
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: idRef(WEBSITE_ID),
  };
  if (opts.aboutSoftware) {
    node.about = idRef(SOFTWARE_ID);
  } else if (opts.aboutIds?.length) {
    node.about = conceptRefs(opts.aboutIds);
  }
  if (opts.mainEntityId) node.mainEntity = idRef(opts.mainEntityId);
  if (opts.breadcrumb) node.breadcrumb = idRef(pageId(opts.path, "breadcrumb"));
  if (opts.publisher !== false) node.publisher = idRef(ORGANIZATION_ID);
  return node;
}
