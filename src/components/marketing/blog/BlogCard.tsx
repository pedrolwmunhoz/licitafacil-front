import type { BlogCatalogEntry } from "@/content/blog/catalog";
import { blogCategoria } from "@/content/blog/categorias";
import { BLOG_CAPA_ALTURA, BLOG_CAPA_LARGURA } from "@/content/blog/constants";
import { blogCapaPath, blogPostPath, formatBlogDateCurta } from "@/content/blog/paths";
import { BlogTag } from "@/components/marketing/blog/blog-ui";

type BlogCardProps = {
  post: BlogCatalogEntry;
  comResumo?: boolean;
  /** Fica no HTML (links para o Google) mas escondido até "Carregar mais". */
  escondido?: boolean;
};

/** Celular: linha com título e miniatura à direita. Desktop: card com capa em cima. */
export function BlogCard({ post, comResumo = true, escondido = false }: BlogCardProps) {
  return (
    <article hidden={escondido} className="group border-b border-landing-ink/10 lg:border-0">
      <a href={blogPostPath(post.slug)} className="flex items-start gap-3 py-3 lg:block lg:py-0">
        <img
          src={blogCapaPath(post.slug)}
          alt={post.title}
          width={BLOG_CAPA_LARGURA}
          height={BLOG_CAPA_ALTURA}
          loading="lazy"
          decoding="async"
          className="order-last ml-auto h-16 w-16 shrink-0 rounded-lg bg-landing-canvas object-cover lg:order-none lg:ml-0 lg:aspect-[16/10] lg:h-auto lg:w-full lg:rounded-[10px]"
        />
        <div className="min-w-0">
          <BlogTag className="mt-3.5 hidden lg:inline-block">{blogCategoria(post.slug)}</BlogTag>
          <h3 className="text-[15px] font-semibold leading-snug underline-offset-[3px] group-hover:underline lg:mb-1.5 lg:mt-2 lg:text-xl lg:tracking-tight">
            {post.title}
          </h3>
          {comResumo ? (
            <p className="mb-2.5 hidden text-[15px] leading-relaxed text-landing-muted lg:block">{post.description}</p>
          ) : null}
          <p className="mt-1 text-xs text-landing-muted lg:mt-0 lg:text-[13px]">
            <time dateTime={post.publishedAt}>{formatBlogDateCurta(post.publishedAt)}</time> · {post.readMinutes} min
          </p>
        </div>
      </a>
    </article>
  );
}
