import { useEffect, useState } from "react";
import { BLOG_CATALOG, type BlogCatalogEntry } from "@/content/blog/catalog";
import { blogPostPath } from "@/content/blog/paths";
import { listarMaisLidos } from "@/lib/api-blog";

/** Ranking por views vem da API; sem views ainda, a caixa não aparece. */
export function BlogMaisLidos() {
  const [posts, setPosts] = useState<BlogCatalogEntry[]>([]);

  useEffect(() => {
    listarMaisLidos()
      .then((lista) =>
        setPosts(
          lista
            .map((item) => BLOG_CATALOG.find((p) => p.slug === item.slug))
            .filter((p): p is BlogCatalogEntry => p !== undefined),
        ),
      )
      .catch(() => setPosts([]));
  }, []);

  if (!posts.length) return null;

  return (
    <section aria-labelledby="mais-lidos" className="rounded-xl border border-landing-ink/10 bg-white p-5">
      <h2 id="mais-lidos" className="mb-3 text-base font-semibold">
        Mais lidos
      </h2>
      <ol className="[counter-reset:n]">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="flex gap-3 border-t border-landing-ink/10 py-2.5 text-sm font-medium first:border-t-0 before:w-[18px] before:shrink-0 before:text-xl before:font-semibold before:leading-none before:text-landing-muted before:content-[counter(n)] before:[counter-increment:n]"
          >
            <a href={blogPostPath(post.slug)} className="hover:underline underline-offset-[3px]">
              {post.title}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
