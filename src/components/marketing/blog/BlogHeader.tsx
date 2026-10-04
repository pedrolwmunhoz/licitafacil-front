import { useState, type FormEvent } from "react";
import { ArrowLeft, Menu, Search, Share2, X } from "lucide-react";
import { SegPontoWordmark } from "@/components/landing/SegPontoWordmark";
import { BLOG_HOME_CTA_HREF, BLOG_INDEX_PATH } from "@/content/blog/constants";
import { CALCULATORS_INDEX_PATH } from "@/content/calculators/constants";
import { BLOG_WRAP } from "@/components/marketing/blog/blog-ui";
import { compartilharPagina } from "@/components/marketing/blog/compartilhar";

const LINKS = [
  { label: "Blog", href: BLOG_INDEX_PATH },
  { label: "Calculadoras", href: CALCULATORS_INDEX_PATH },
  { label: "Preços", href: "/precos" },
  { label: "Ajuda", href: "/perguntas-frequentes" },
] as const;

const BOTAO_ICONE = "flex h-10 w-10 items-center justify-center rounded-lg text-landing-muted transition-colors hover:text-landing-ink";

type BlogHeaderProps = {
  /** Barra de leitura do post (0–100); sem ela a barra não aparece. */
  progresso?: number;
  /** No início do blog a busca filtra a lista na hora; nos posts ela abre o início com ?busca=. */
  busca?: string;
  onBuscaChange?: (valor: string) => void;
  /** No celular o post mostra voltar, logo e compartilhar; o início mostra logo, busca e menu. */
  noPost?: boolean;
};

export function BlogHeader({ progresso, busca, onBuscaChange, noPost = false }: BlogHeaderProps) {
  const filtraNaPagina = onBuscaChange !== undefined;
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    if (filtraNaPagina) e.preventDefault();
  };

  const campoBusca = filtraNaPagina ? { value: busca ?? "", onChange: (e: { target: { value: string } }) => onBuscaChange(e.target.value) } : {};

  return (
    <header className="sticky top-0 z-40 border-b border-landing-ink/10 bg-white">
      <div className={`${BLOG_WRAP} hidden h-[68px] items-center gap-10 lg:flex`}>
        <a href="/" aria-label="SegPonto, página inicial">
          <SegPontoWordmark variant="nav" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] text-landing-muted lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.href === BLOG_INDEX_PATH ? "page" : undefined}
              className="transition-colors hover:text-landing-ink aria-[current=page]:font-semibold aria-[current=page]:text-landing-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <form
            role="search"
            action={BLOG_INDEX_PATH}
            method="get"
            onSubmit={enviar}
            className="hidden h-[38px] w-[220px] items-center gap-2 rounded-lg border border-landing-ink/25 px-3 text-landing-muted focus-within:border-landing-ink lg:flex"
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <input
              type="search"
              name="busca"
              placeholder="Buscar posts"
              aria-label="Buscar posts"
              {...campoBusca}
              className="min-w-0 flex-1 bg-transparent text-sm text-landing-ink outline-none placeholder:text-landing-muted"
            />
          </form>
          <a
            href={BLOG_HOME_CTA_HREF}
            className="inline-flex h-[38px] items-center rounded-lg bg-landing-ink px-4 text-sm font-medium text-white transition-colors hover:bg-landing-cta hover:text-landing-cta-foreground"
          >
            Contratar agora
          </a>
        </div>
      </div>

      {noPost ? (
        <div className="flex h-14 items-center justify-between px-2 lg:hidden">
          <a href={BLOG_INDEX_PATH} aria-label="Voltar para o blog" className={BOTAO_ICONE}>
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </a>
          <a href="/" aria-label="SegPonto, página inicial">
            <SegPontoWordmark variant="nav" />
          </a>
          <button
            type="button"
            aria-label="Compartilhar post"
            onClick={() => compartilharPagina().catch(() => undefined)}
            className={BOTAO_ICONE}
          >
            <Share2 className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="lg:hidden">
          <div className="flex h-14 items-center justify-between pl-4 pr-2">
            <a href="/" aria-label="SegPonto, página inicial">
              <SegPontoWordmark variant="nav" />
            </a>
            <div className="flex items-center">
              <button
                type="button"
                aria-label="Buscar posts"
                aria-expanded={buscaAberta}
                onClick={() => {
                  setBuscaAberta((v) => !v);
                  setMenuAberto(false);
                }}
                className={BOTAO_ICONE}
              >
                <Search className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuAberto}
                onClick={() => {
                  setMenuAberto((v) => !v);
                  setBuscaAberta(false);
                }}
                className={BOTAO_ICONE}
              >
                {menuAberto ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </button>
            </div>
          </div>
          {buscaAberta ? (
            <form role="search" action={BLOG_INDEX_PATH} method="get" onSubmit={enviar} className="px-4 pb-3">
              <input
                type="search"
                name="busca"
                placeholder="Buscar posts"
                aria-label="Buscar posts"
                autoFocus
                {...campoBusca}
                className="h-10 w-full rounded-lg border border-landing-ink/25 bg-white px-3 text-sm text-landing-ink outline-none placeholder:text-landing-muted focus:border-landing-ink"
              />
            </form>
          ) : null}
          {menuAberto ? (
            <nav aria-label="Principal" className="border-t border-landing-ink/10 px-4 py-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={link.href === BLOG_INDEX_PATH ? "page" : undefined}
                  className="block py-2.5 text-[15px] text-landing-muted aria-[current=page]:font-semibold aria-[current=page]:text-landing-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BLOG_HOME_CTA_HREF}
                className="my-2 flex h-10 items-center justify-center rounded-lg bg-landing-ink text-sm font-medium text-white"
              >
                Contratar agora
              </a>
            </nav>
          ) : null}
        </div>
      )}

      {progresso !== undefined ? (
        <div className="h-[3px] bg-landing-ink/10" aria-hidden>
          <span className="block h-[3px] bg-landing-cta" style={{ width: `${progresso}%` }} />
        </div>
      ) : null}
    </header>
  );
}
