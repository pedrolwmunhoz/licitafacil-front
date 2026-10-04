/**
 * Templates de @graph por formato do canvas jsonld-grafos-segponto.
 * Cada página indexada importa um arquivo em content/jsonld/* que chama um destes.
 *
 * aboutIds = assuntos centrais (2–3). mentionIds = conceitos com página própria, secundários.
 * relatedArticlePaths = outros artigos do mesmo interesse (só @id, sem recriar o post).
 * Não transformar cada H2 em Thing.
 */
import { SITE_ORIGIN } from "@/content/landing-site";
import { BLOG_AUTOR } from "@/content/blog/autor";
import { BLOG_CAPA_ALTURA, BLOG_CAPA_LARGURA, BLOG_INDEX_PATH } from "@/content/blog/constants";
import { blogCapaUrl } from "@/content/blog/paths";
import {
  type BreadcrumbItem,
  type ConceptId,
  type FaqItem,
  ORGANIZATION_ID,
  SOFTWARE_ID,
  articleRefs,
  baseGlobalNodes,
  buildBreadcrumbNode,
  buildConceptNodes,
  buildFaqEntities,
  buildFaqPageNode,
  buildGraph,
  buildSoftwareRefNode,
  buildSoftwareWithOffers,
  buildWebPageNode,
  conceptRefs,
  idRef,
  pageId,
  pageUrl,
} from "@/components/seo/jsonld/core";

function uniqueConcepts(
  aboutIds: readonly ConceptId[] = [],
  mentionIds: readonly ConceptId[] = [],
): ConceptId[] {
  return [...new Set([...aboutIds, ...mentionIds])];
}

/** Home / — SoftwareApplication + offers + FAQ da home. */
export function homeJsonLd(input: {
  title: string;
  description: string;
  faqs: FaqItem[];
}): Record<string, unknown> {
  const path = "/";
  return buildGraph([
    ...baseGlobalNodes(),
    buildSoftwareWithOffers(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      aboutSoftware: true,
      mainEntityId: SOFTWARE_ID,
    }),
    {
      "@type": "FAQPage",
      "@id": pageId(path, "faq"),
      url: SITE_ORIGIN,
      isPartOf: idRef(pageId(path, "webpage")),
      mainEntity: buildFaqEntities(input.faqs),
    },
  ]);
}

/** Landing SEO (feature / vertical). */
export function landingJsonLd(input: {
  path: string;
  title: string;
  description: string;
  faqs?: FaqItem[];
  aboutIds?: readonly ConceptId[];
  mentionIds?: readonly ConceptId[];
  breadcrumb: BreadcrumbItem[];
}): Record<string, unknown> {
  const aboutIds = input.aboutIds ?? [];
  const mentionIds = input.mentionIds ?? [];
  const nodes: Record<string, unknown>[] = [
    ...baseGlobalNodes(),
    buildSoftwareRefNode(),
    ...buildConceptNodes(uniqueConcepts(aboutIds, mentionIds)),
  ];
  const webpage = buildWebPageNode({
    path: input.path,
    title: input.title,
    description: input.description,
    aboutIds,
    mainEntityId: SOFTWARE_ID,
    breadcrumb: true,
  });
  if (mentionIds.length) {
    webpage.mentions = conceptRefs(mentionIds);
  }
  nodes.push(webpage, buildBreadcrumbNode(input.path, input.breadcrumb));
  if (input.faqs?.length) nodes.push(buildFaqPageNode(input.path, input.faqs));
  return buildGraph(nodes);
}

/** /precos — SoftwareApplication + Offer[]. */
export function precosJsonLd(input: {
  title: string;
  description: string;
  faqs?: FaqItem[];
}): Record<string, unknown> {
  const path = "/precos";
  const nodes: Record<string, unknown>[] = [
    ...baseGlobalNodes(),
    buildSoftwareWithOffers(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      aboutSoftware: true,
      mainEntityId: SOFTWARE_ID,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Preços", path },
    ]),
  ];
  if (input.faqs?.length) nodes.push(buildFaqPageNode(path, input.faqs));
  return buildGraph(nodes);
}

/** /perguntas-frequentes — FAQPage como mainEntity. */
export function faqHubJsonLd(input: {
  title: string;
  description: string;
  faqs: FaqItem[];
}): Record<string, unknown> {
  const path = "/perguntas-frequentes";
  const faqId = pageId(path, "faq");
  return buildGraph([
    ...baseGlobalNodes(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      mainEntityId: faqId,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Perguntas frequentes", path },
    ]),
    {
      "@type": "FAQPage",
      "@id": faqId,
      url: pageUrl(path),
      mainEntity: buildFaqEntities(input.faqs),
    },
  ]);
}

/** /sobre — AboutPage. */
export function sobreJsonLd(input: { title: string; description: string }): Record<string, unknown> {
  const path = "/sobre";
  return buildGraph([
    ...baseGlobalNodes(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      type: "AboutPage",
      mainEntityId: ORGANIZATION_ID,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Sobre", path },
    ]),
  ]);
}

/** /documentacao. */
export function documentacaoJsonLd(input: {
  title: string;
  description: string;
}): Record<string, unknown> {
  const path = "/documentacao";
  return buildGraph([
    ...baseGlobalNodes(),
    buildSoftwareRefNode(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      aboutSoftware: true,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Documentação", path },
    ]),
  ]);
}

/** Legal /privacidade | /termos. */
export function legalJsonLd(input: {
  path: string;
  title: string;
  description: string;
  crumbName: string;
}): Record<string, unknown> {
  return buildGraph([
    ...baseGlobalNodes(),
    buildWebPageNode({
      path: input.path,
      title: input.title,
      description: input.description,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(input.path, [
      { name: "Home", path: "/" },
      { name: input.crumbName, path: input.path },
    ]),
  ]);
}

/** Marketing genérico (ex.: /segmentos) sem conceito. */
export function marketingPageJsonLd(input: {
  path: string;
  title: string;
  description: string;
  crumbName: string;
  includeSoftware?: boolean;
}): Record<string, unknown> {
  const nodes: Record<string, unknown>[] = [...baseGlobalNodes()];
  if (input.includeSoftware !== false) nodes.push(buildSoftwareRefNode());
  nodes.push(
    buildWebPageNode({
      path: input.path,
      title: input.title,
      description: input.description,
      aboutSoftware: input.includeSoftware !== false,
      mainEntityId: input.includeSoftware !== false ? SOFTWARE_ID : undefined,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(input.path, [
      { name: "Home", path: "/" },
      { name: input.crumbName, path: input.path },
    ]),
  );
  return buildGraph(nodes);
}

export type BlogCatalogEntry = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
};

/** Índice /blog. */
export function blogIndexJsonLd(input: {
  title: string;
  description: string;
  posts: readonly BlogCatalogEntry[];
}): Record<string, unknown> {
  const path = "/blog";
  const blogId = pageId(path, "blog");
  const blogPostNodes = input.posts.map((post) => {
    const postPath = `${path}/${post.slug}`;
    return {
      "@type": "BlogPosting",
      "@id": pageId(postPath, "article"),
      headline: post.title,
      description: post.description,
      url: pageUrl(postPath),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: idRef(ORGANIZATION_ID),
      publisher: idRef(ORGANIZATION_ID),
    };
  });

  return buildGraph([
    ...baseGlobalNodes(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      mainEntityId: blogId,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Blog", path },
    ]),
    {
      "@type": "Blog",
      "@id": blogId,
      url: pageUrl(path),
      name: input.title,
      description: input.description,
      publisher: idRef(ORGANIZATION_ID),
      blogPost: blogPostNodes,
    },
  ]);
}

/** Artigo /blog/:slug. */
export function articleJsonLd(input: {
  path: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  faqs?: FaqItem[];
  aboutIds?: readonly ConceptId[];
  mentionIds?: readonly ConceptId[];
  /** Paths de outros posts do mesmo interesse (ex.: /blog/...). */
  relatedArticlePaths?: readonly string[];
}): Record<string, unknown> {
  const articleId = pageId(input.path, "article");
  const webpageId = pageId(input.path, "webpage");
  const aboutIds = input.aboutIds ?? [];
  const mentionIds = input.mentionIds ?? [];
  const related = input.relatedArticlePaths ?? [];
  const nodes: Record<string, unknown>[] = [
    ...baseGlobalNodes(),
    ...buildConceptNodes(uniqueConcepts(aboutIds, mentionIds)),
  ];
  const webpage = buildWebPageNode({
    path: input.path,
    title: input.title,
    description: input.description,
    aboutIds,
    mainEntityId: articleId,
    breadcrumb: true,
  });
  if (mentionIds.length) webpage.mentions = conceptRefs(mentionIds);

  const slug = input.path.slice(`${BLOG_INDEX_PATH}/`.length);
  const article: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": articleId,
    headline: input.title,
    description: input.description,
    url: pageUrl(input.path),
    image: {
      "@type": "ImageObject",
      url: blogCapaUrl(slug),
      width: BLOG_CAPA_LARGURA,
      height: BLOG_CAPA_ALTURA,
    },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { "@type": "Person", name: BLOG_AUTOR.nome },
    publisher: idRef(ORGANIZATION_ID),
    isPartOf: idRef(webpageId),
    mainEntityOfPage: idRef(webpageId),
  };
  if (aboutIds.length) article.about = conceptRefs(aboutIds);
  if (mentionIds.length) article.mentions = conceptRefs(mentionIds);
  if (related.length) article.isRelatedTo = articleRefs(related);

  nodes.push(
    webpage,
    article,
    buildBreadcrumbNode(input.path, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: input.title, path: input.path },
    ]),
  );
  if (input.faqs?.length) nodes.push(buildFaqPageNode(input.path, input.faqs));
  return buildGraph(nodes);
}

/** Hub /calculadoras. */
export function calculatorsIndexJsonLd(input: {
  title: string;
  description: string;
  items: { name: string; path: string }[];
}): Record<string, unknown> {
  const path = "/calculadoras";
  const listId = pageId(path, "calculators-list");
  return buildGraph([
    ...baseGlobalNodes(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      mainEntityId: listId,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Calculadoras", path },
    ]),
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Calculadoras de jornada SegPonto",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: pageUrl(item.path),
      })),
    },
  ]);
}

/** Hub /segmentos. */
export function segmentosIndexJsonLd(input: {
  title: string;
  description: string;
  items: { name: string; path: string }[];
}): Record<string, unknown> {
  const path = "/segmentos";
  const listId = pageId(path, "segmentos-list");
  return buildGraph([
    ...baseGlobalNodes(),
    buildSoftwareRefNode(),
    buildWebPageNode({
      path,
      title: input.title,
      description: input.description,
      aboutSoftware: true,
      mainEntityId: listId,
      breadcrumb: true,
    }),
    buildBreadcrumbNode(path, [
      { name: "Home", path: "/" },
      { name: "Segmentos", path },
    ]),
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Ponto eletrônico por segmento",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: pageUrl(item.path),
      })),
    },
  ]);
}

/** /calculadoras/:slug. */
export function calculatorJsonLd(input: {
  path: string;
  title: string;
  description: string;
  faqs: FaqItem[];
  aboutIds?: readonly ConceptId[];
  mentionIds?: readonly ConceptId[];
  relatedArticlePaths?: readonly string[];
}): Record<string, unknown> {
  const calcId = pageId(input.path, "calculator");
  const aboutIds = input.aboutIds ?? [];
  const mentionIds = input.mentionIds ?? [];
  const related = input.relatedArticlePaths ?? [];
  const nodes: Record<string, unknown>[] = [
    ...baseGlobalNodes(),
    ...buildConceptNodes(uniqueConcepts(aboutIds, mentionIds)),
  ];
  const webpage = buildWebPageNode({
    path: input.path,
    title: input.title,
    description: input.description,
    aboutIds,
    mainEntityId: calcId,
    breadcrumb: true,
  });
  if (mentionIds.length) webpage.mentions = conceptRefs(mentionIds);

  const app: Record<string, unknown> = {
    "@type": "WebApplication",
    "@id": calcId,
    name: input.title,
    description: input.description,
    url: pageUrl(input.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    publisher: idRef(ORGANIZATION_ID),
  };
  if (aboutIds.length) app.about = conceptRefs(aboutIds);
  if (mentionIds.length) app.mentions = conceptRefs(mentionIds);
  if (related.length) app.isRelatedTo = articleRefs(related);

  nodes.push(
    webpage,
    buildBreadcrumbNode(input.path, [
      { name: "Home", path: "/" },
      { name: "Calculadoras", path: "/calculadoras" },
      { name: input.title.split(" | ")[0] ?? input.title, path: input.path },
    ]),
    app,
  );
  if (input.faqs?.length) nodes.push(buildFaqPageNode(input.path, input.faqs));
  return buildGraph(nodes);
}
