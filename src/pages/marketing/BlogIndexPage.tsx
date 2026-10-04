import { useEffect, useState } from "react";
import Footer from "@/components/landing/Footer";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { BlogHeader } from "@/components/marketing/blog/BlogHeader";
import { BlogCard } from "@/components/marketing/blog/BlogCard";
import { BlogMaisLidos } from "@/components/marketing/blog/BlogMaisLidos";
import { BlogCtaContratacao } from "@/components/marketing/blog/BlogCtaContratacao";
import { BLOG_BOTAO, BLOG_WRAP, BlogAvatar, BlogTag } from "@/components/marketing/blog/blog-ui";
import { PUBLIC_PAGE_SEO } from "@/content/public-page-seo";
import { BLOG_CATALOG } from "@/content/blog/catalog";
import { BLOG_AUTOR } from "@/content/blog/autor";
import { BLOG_CATEGORIAS, blogCategoria, type BlogCategoria } from "@/content/blog/categorias";
import { BLOG_CAPA_ALTURA, BLOG_CAPA_LARGURA } from "@/content/blog/constants";
import { blogCapaPath, blogPostPath, formatBlogDateCurta } from "@/content/blog/paths";
import { jsonLd, path as blogJsonLdPath } from "@/content/jsonld/blog";
import { registrarVisitaInicio } from "@/lib/api-blog";
import { cn } from "@/lib/utils";

const POSTS_POR_VEZ = 10;

function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

const BlogIndexPage = () => {
  const seo = PUBLIC_PAGE_SEO.blog;
  const [destaque, ...recentes] = BLOG_CATALOG;
  const [categoria, setCategoria] = useState<BlogCategoria | null>(null);
  const [busca, setBusca] = useState("");
  const [limite, setLimite] = useState(POSTS_POR_VEZ);

  useEffect(() => {
    setBusca(new URLSearchParams(window.location.search).get("busca") ?? "");
    registrarVisitaInicio().catch(() => undefined);
  }, []);

  const termo = normalizar(busca);
  const filtrando = termo !== "" || categoria !== null;
  const posts = filtrando
    ? BLOG_CATALOG.filter(
        (p) =>
          (categoria === null || blogCategoria(p.slug) === categoria) &&
          (termo === "" || normalizar(`${p.title} ${p.description}`).includes(termo)),
      )
    : recentes;

  const escolherCategoria = (nova: BlogCategoria | null) => {
    setCategoria(nova);
    setLimite(POSTS_POR_VEZ);
  };

  const buscar = (valor: string) => {
    setBusca(valor);
    setLimite(POSTS_POR_VEZ);
  };

  return (
    <div className="min-h-screen bg-landing-paper text-landing-ink antialiased">
      <PageSeo {...seo} />
      <JsonLdScript routeKey={blogJsonLdPath} graph={jsonLd} />
      <BlogHeader busca={busca} onBuscaChange={buscar} />
      <main id="conteudo-principal" tabIndex={-1} className={BLOG_WRAP}>
        <h1 className="sr-only">Blog SegPonto: ponto eletrônico, jornada e cálculos trabalhistas</h1>

        <a
          href={blogPostPath(destaque.slug)}
          className="group grid items-center gap-3 border-b border-landing-ink/10 py-4 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-12 lg:py-12"
        >
          <div>
            <p className="mb-3 hidden text-xs font-semibold uppercase tracking-[0.2em] text-landing-muted lg:block">
              Em destaque
            </p>
            <img
              src={blogCapaPath(destaque.slug)}
              alt={destaque.title}
              width={BLOG_CAPA_LARGURA}
              height={BLOG_CAPA_ALTURA}
              decoding="async"
              className="aspect-[16/10] w-full rounded-lg bg-landing-canvas object-cover lg:rounded-[10px]"
            />
          </div>
          <div>
            <BlogTag>{blogCategoria(destaque.slug)}</BlogTag>
            <h2 className="mb-1 mt-2 text-xl font-semibold leading-snug underline-offset-4 group-hover:underline lg:my-3.5 lg:text-[44px] lg:font-bold lg:leading-[1.15] lg:tracking-tight">
              {destaque.title}
            </h2>
            <p className="mb-2.5 text-sm leading-relaxed text-landing-muted lg:mb-5 lg:text-lg">{destaque.description}</p>
            <div className="flex items-center gap-2 text-xs text-landing-muted lg:gap-2.5 lg:text-[13px]">
              <BlogAvatar tamanho="sm" className="h-6 w-6 text-[11px] lg:h-9 lg:w-9 lg:text-[13px]" />
              <span>
                <b className="font-semibold text-landing-ink">{BLOG_AUTOR.nome}</b> ·{" "}
                <time dateTime={destaque.publishedAt}>{formatBlogDateCurta(destaque.publishedAt)}</time> ·{" "}
                {destaque.readMinutes} min de leitura
              </span>
            </div>
          </div>
        </a>

        <div className="grid gap-14 pb-10 pt-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:pb-16 lg:pt-10">
          <section aria-labelledby="posts-recentes">
            <div className="mb-3 flex flex-col gap-3 lg:mb-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-4">
              <h2 id="posts-recentes" className={cn("text-base font-semibold lg:text-xl", !termo && "sr-only lg:not-sr-only")}>
                {termo ? `Resultados para “${busca.trim()}”` : "Posts recentes"}
              </h2>
              <div
                role="group"
                aria-label="Categorias"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
              >
                {[null, ...BLOG_CATEGORIAS].map((c) => (
                  <button
                    key={c ?? "todos"}
                    type="button"
                    aria-pressed={categoria === c}
                    onClick={() => escolherCategoria(c)}
                    className="shrink-0 whitespace-nowrap rounded-lg border border-landing-ink/25 px-3 py-1 text-[13px] text-landing-muted transition-colors hover:text-landing-ink aria-pressed:border-landing-ink aria-pressed:bg-landing-ink aria-pressed:text-white lg:shrink lg:whitespace-normal lg:px-3.5 lg:text-sm"
                  >
                    {c ?? "Todos"}
                  </button>
                ))}
              </div>
            </div>

            {posts.length ? (
              <div className="grid border-t border-landing-ink/10 lg:grid-cols-2 lg:gap-7 lg:border-0">
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} escondido={i >= limite} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-landing-ink/10 bg-white p-6 text-[15px] text-landing-muted">
                Nenhum post encontrado. Tente outra palavra ou outra categoria.
              </p>
            )}

            {posts.length > limite ? (
              <div className="mt-9 flex justify-center">
                <button type="button" onClick={() => setLimite((n) => n + POSTS_POR_VEZ)} className={BLOG_BOTAO}>
                  Carregar mais posts
                </button>
              </div>
            ) : null}
          </section>

          <aside className="hidden space-y-5 lg:block">
            <section aria-labelledby="sobre-autor" className="rounded-xl border border-landing-ink/10 bg-white p-5">
              <div className="mb-2.5 flex items-center gap-3">
                <BlogAvatar tamanho="lg" />
                <div>
                  <h2 id="sobre-autor" className="text-base font-semibold">
                    {BLOG_AUTOR.nome}
                  </h2>
                  <span className="text-[13px] text-landing-muted">{BLOG_AUTOR.papel}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-landing-muted">{BLOG_AUTOR.bio}</p>
            </section>
            <BlogMaisLidos />
            <BlogCtaContratacao className="sticky top-[100px]" />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndexPage;
