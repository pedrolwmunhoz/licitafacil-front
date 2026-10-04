import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import Footer from "@/components/landing/Footer";
import { LandingHireCta } from "@/components/landing/LandingHireCta";
import { PageSeo } from "@/components/seo/PageSeo";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { BLOG_FAQ_ANCORA, BlogArticleBody, BlogFaq } from "@/components/marketing/BlogArticleBody";
import { BlogHeader } from "@/components/marketing/blog/BlogHeader";
import { BlogCard } from "@/components/marketing/blog/BlogCard";
import { BlogPostRail } from "@/components/marketing/blog/BlogPostRail";
import { BlogToc } from "@/components/marketing/blog/BlogToc";
import { BLOG_COMENTARIOS_ANCORA, BlogComentarios } from "@/components/marketing/blog/BlogComentarios";
import { useBlogLeitura } from "@/components/marketing/blog/useBlogLeitura";
import { compartilharPagina } from "@/components/marketing/blog/compartilhar";
import { BlogCtaContratacao } from "@/components/marketing/blog/BlogCtaContratacao";
import { BLOG_WRAP, BlogAvatar, BlogTag } from "@/components/marketing/blog/blog-ui";
import { BLOG_AUTOR } from "@/content/blog/autor";
import { BLOG_CATALOG, type BlogCatalogEntry } from "@/content/blog/catalog";
import { blogCategoria } from "@/content/blog/categorias";
import { BLOG_CAPA_ALTURA, BLOG_CAPA_LARGURA, BLOG_HOME_CTA_HREF, BLOG_INDEX_PATH } from "@/content/blog/constants";
import { blogAncora, blogCapaPath, blogCapaUrl, blogPostPath, formatBlogDate } from "@/content/blog/paths";
import { expandBlogTokens } from "@/content/blog/tokens";
import { BRAND_NAME } from "@/content/landing-site";
import { alternarCurtida, registrarVisitaPost } from "@/lib/api-blog";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog/types";
import type { BlogPostEstado } from "@/types/blog";

const BLOG_CALCULATOR_LINKS: Record<string, { to: string; label: string }> = {
  "como-calcular-hora-extra": { to: "/calculadoras/hora-extra", label: "Abrir calculadora de hora extra" },
  "como-calcular-horas-noturnas": {
    to: "/calculadoras/horas-noturnas",
    label: "Abrir calculadora de horas noturnas",
  },
  "como-calcular-ferias": { to: "/calculadoras/ferias", label: "Abrir calculadora de férias" },
  "como-calcular-ferias-coletivas": {
    to: "/calculadoras/ferias",
    label: "Abrir calculadora de férias",
  },
  "como-calcular-ferias-empregada-domestica": {
    to: "/calculadoras/ferias-empregada-domestica",
    label: "Abrir calculadora de férias da empregada doméstica",
  },
  "como-calcular-folha-de-pagamento": {
    to: "/calculadoras/folha-de-pagamento",
    label: "Abrir calculadora de folha de pagamento",
  },
  "como-calcular-imposto-de-renda": {
    to: "/calculadoras/imposto-de-renda",
    label: "Abrir calculadora de imposto de renda",
  },
  "como-calcular-inss": { to: "/calculadoras/inss", label: "Abrir calculadora de INSS" },
  "como-calcular-fgts": { to: "/calculadoras/fgts", label: "Abrir calculadora de FGTS" },
  "como-calcular-domingo-trabalhado": {
    to: "/calculadoras/domingo-trabalhado",
    label: "Abrir calculadora de domingo trabalhado",
  },
  "como-calcular-feriado-trabalhado": {
    to: "/calculadoras/feriado-trabalhado",
    label: "Abrir calculadora de feriado trabalhado",
  },
  "como-funciona-o-banco-de-horas-na-pratica": {
    to: "/calculadoras/banco-de-horas",
    label: "Abrir calculadora de banco de horas",
  },
};

const QNT_LEIA_TAMBEM = 3;

/** "Leia também": posts do `related` primeiro, completando com a mesma categoria. */
function postsLeiaTambem(post: BlogPost): BlogCatalogEntry[] {
  const porPath = new Map(BLOG_CATALOG.map((p) => [blogPostPath(p.slug), p]));
  const cards: BlogCatalogEntry[] = [];
  for (const r of post.related ?? []) {
    const p = porPath.get(r.to);
    if (p && p.slug !== post.slug && cards.length < QNT_LEIA_TAMBEM) cards.push(p);
  }
  const categoria = blogCategoria(post.slug);
  for (const p of BLOG_CATALOG) {
    if (cards.length >= QNT_LEIA_TAMBEM) break;
    if (p.slug !== post.slug && blogCategoria(p.slug) === categoria && !cards.includes(p)) cards.push(p);
  }
  return cards;
}

type BlogPostViewProps = {
  post: BlogPost;
  jsonLd: Record<string, unknown>;
};

/** Artigo — post + JSON-LD já resolvidos pela página da URL. */
export function BlogPostView({ post, jsonLd }: BlogPostViewProps) {
  const path = blogPostPath(post.slug);
  const description = expandBlogTokens(post.description);
  const categoria = blogCategoria(post.slug);
  const capa = blogCapaPath(post.slug);
  const artigo = useRef<HTMLElement>(null);
  const [estado, setEstado] = useState<BlogPostEstado | null>(null);

  const sumario = useMemo(
    () => [
      ...post.sumario.map((s) => ({ id: blogAncora(s.secao), titulo: s.rotulo })),
      ...(post.faqs?.length ? [{ id: BLOG_FAQ_ANCORA, titulo: "Perguntas frequentes" }] : []),
    ],
    [post],
  );
  const ancoras = useMemo(() => sumario.map((s) => s.id), [sumario]);
  const { progresso, ancoraAtual } = useBlogLeitura(post.slug, artigo, ancoras);
  const cards = useMemo(() => postsLeiaTambem(post), [post]);

  useEffect(() => {
    registrarVisitaPost(post.slug)
      .then(setEstado)
      .catch(() => undefined);
  }, [post.slug]);

  const [linkCopiado, setLinkCopiado] = useState(false);

  const compartilhar = () => {
    compartilharPagina()
      .then((r) => {
        if (r === "copiado") {
          setLinkCopiado(true);
          window.setTimeout(() => setLinkCopiado(false), 2000);
        }
      })
      .catch(() => undefined);
  };

  const curtir = () => {
    alternarCurtida(post.slug)
      .then((r) => setEstado((e) => (e ? { ...e, curtido: r.curtido, qntCurtidas: r.qntCurtidas } : e)))
      .catch(() => undefined);
  };

  return (
    <div className="min-h-screen bg-landing-paper text-landing-ink antialiased">
      <PageSeo
        title={`${post.title} | ${BRAND_NAME}`}
        description={description}
        path={path}
        ogType="article"
        imagem={{ url: blogCapaUrl(post.slug), tipo: "image/jpeg", largura: BLOG_CAPA_LARGURA, altura: BLOG_CAPA_ALTURA }}
      />
      <Helmet>
        <link rel="preload" as="image" href={capa} />
      </Helmet>
      <JsonLdScript routeKey={path} graph={jsonLd} />
      <BlogHeader progresso={progresso} noPost />
      <main id="conteudo-principal" tabIndex={-1}>
        <div className={BLOG_WRAP}>
          <nav aria-label="Trilha" className="hidden items-center gap-1.5 pt-7 text-sm text-landing-muted lg:flex">
            <a href={BLOG_INDEX_PATH} className="inline-flex items-center gap-1.5 text-landing-ink/80 hover:text-landing-ink">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Blog
            </a>
            <span aria-hidden>/</span>
            <span>{categoria}</span>
          </nav>

          <header className="pb-4 pt-5 lg:pb-8 lg:pt-7">
            <BlogTag>{categoria}</BlogTag>
            <h1 className="mb-3.5 mt-2.5 text-2xl font-bold leading-[1.25] tracking-tight lg:mb-5 lg:mt-4 lg:text-5xl lg:leading-[1.15]">
              {post.hero.titleBefore} <span className="bg-landing-cta/60 px-1 [box-decoration-break:clone]">{post.hero.highlight}</span>
            </h1>
            <div className="flex items-center gap-2.5 text-xs text-landing-muted lg:text-[13px]">
              <BlogAvatar className="h-9 w-9 text-[13px] lg:h-10 lg:w-10 lg:text-sm" />
              <span className="text-left">
                <b className="font-semibold text-landing-ink">{BLOG_AUTOR.nome}</b>
                <br />
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time> · {post.readMinutes} min de
                leitura
              </span>
            </div>
          </header>

          <img
            src={capa}
            alt={post.title}
            width={BLOG_CAPA_LARGURA}
            height={BLOG_CAPA_ALTURA}
            decoding="async"
            className="mx-auto aspect-[16/10] w-full max-w-[1024px] rounded-lg bg-landing-canvas object-cover lg:aspect-[1024/572] lg:rounded-[10px]"
          />

          <div className="grid gap-10 pb-10 pt-5 lg:grid-cols-[64px_minmax(0,680px)_1fr] lg:pb-16 lg:pt-12">
            <BlogPostRail
              curtido={estado?.curtido ?? false}
              qntCurtidas={estado?.qntCurtidas ?? null}
              qntComentarios={estado?.qntComentarios ?? null}
              onCurtir={curtir}
              comentariosAncora={BLOG_COMENTARIOS_ANCORA}
            />

            <article ref={artigo} className="min-w-0">
              <BlogArticleBody
                abertura={post.opening?.length ? post.opening : [post.intro]}
                sections={post.sections}
                calculatorLink={BLOG_CALCULATOR_LINKS[post.slug]}
              />

              <div className="my-6 flex items-center justify-around border-y border-landing-ink/10 py-2 text-[13px] text-landing-muted lg:hidden">
                <button
                  type="button"
                  onClick={curtir}
                  aria-pressed={estado?.curtido ?? false}
                  aria-label={estado?.curtido ? "Descurtir" : "Curtir"}
                  className={cn("inline-flex h-10 items-center gap-1.5 px-3", estado?.curtido && "text-landing-ink")}
                >
                  <Heart className="h-[18px] w-[18px]" fill={estado?.curtido ? "currentColor" : "none"} aria-hidden />
                  <span className="tabular-nums">{estado ? estado.qntCurtidas : "Curtir"}</span>
                </button>
                <a href={`#${BLOG_COMENTARIOS_ANCORA}`} aria-label="Comentários" className="inline-flex h-10 items-center gap-1.5 px-3">
                  <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                  <span className="tabular-nums">{estado ? estado.qntComentarios : "Comentar"}</span>
                </a>
                <button type="button" onClick={compartilhar} className="inline-flex h-10 items-center gap-1.5 px-3">
                  <Share2 className="h-[18px] w-[18px]" aria-hidden />
                  <span aria-live="polite">{linkCopiado ? "Link copiado" : "Compartilhar"}</span>
                </button>
              </div>

              <div className="my-8">
                <p className="mb-3 text-base font-semibold leading-snug text-landing-ink lg:text-lg">{post.ctaTitulo}</p>
                <LandingHireCta href={BLOG_HOME_CTA_HREF} />
              </div>

              <div className="flex gap-3 rounded-xl bg-landing-canvas p-4 lg:gap-4 lg:p-6">
                <BlogAvatar tamanho="xl" className="h-11 w-11 text-[15px] lg:h-[52px] lg:w-[52px] lg:text-base" />
                <div>
                  <span className="block text-sm leading-relaxed text-landing-muted lg:text-[15px]">Autor</span>
                  <b className="font-semibold">{BLOG_AUTOR.nome}</b>
                  <p className="mt-1 text-sm leading-relaxed text-landing-muted lg:text-[15px]">{BLOG_AUTOR.bio}</p>
                </div>
              </div>

              <BlogComentarios slug={post.slug} qntAprovados={estado?.qntComentarios ?? null} />

              {post.faqs?.length ? <BlogFaq faqs={post.faqs} /> : null}
            </article>

            <aside className="sticky top-[100px] hidden max-h-[calc(100vh-120px)] self-start overflow-y-auto lg:block">
              <BlogToc itens={sumario} atual={ancoraAtual} />
              <BlogCtaContratacao className="mt-8" />
            </aside>
          </div>
        </div>

        {cards.length ? (
          <section
            aria-labelledby="leia-tambem"
            className="border-t border-landing-ink/10 bg-landing-canvas pb-8 pt-6 lg:bg-transparent lg:pb-16 lg:pt-12"
          >
            <div className={BLOG_WRAP}>
              <h2 id="leia-tambem" className="mb-2 text-base font-semibold lg:mb-5 lg:text-xl">
                Leia também
              </h2>
              <div className="grid lg:grid-cols-3 lg:gap-7">
                {cards.map((p) => (
                  <BlogCard key={p.slug} post={p} comResumo={false} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
