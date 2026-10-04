import { BLOG_INDEX_PATH } from "@/content/blog/constants";
import { SITE_ORIGIN } from "@/content/landing-site";

export { BLOG_INDEX_PATH } from "@/content/blog/constants";

export function blogPostPath(slug: string): string {
  return `${BLOG_INDEX_PATH}/${slug}`;
}

export function blogCapaPath(slug: string): string {
  return `${BLOG_INDEX_PATH}/img/${slug}.jpg`;
}

export function blogCapaUrl(slug: string): string {
  return `${SITE_ORIGIN}${blogCapaPath(slug)}`;
}

/** id do H2 a partir do título: âncora do sumário "Neste post". */
export function blogAncora(titulo: string): string {
  return titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatBlogDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "18 set" — cards da lista. */
export function formatBlogDateCurta(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`)
    .toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    .replace(".", "")
    .replace(" de ", " ");
}
