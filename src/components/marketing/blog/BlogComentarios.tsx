import { useEffect, useState, type FormEvent } from "react";
import { comentar, listarComentarios } from "@/lib/api-blog";
import type { BlogComentario } from "@/types/blog";
import { BLOG_BOTAO_ESCURO, BLOG_CAMPO, BlogAvatar } from "@/components/marketing/blog/blog-ui";

export const BLOG_COMENTARIOS_ANCORA = "comentarios";

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes.length > 1 ? partes[partes.length - 1][0] : "")).toUpperCase();
}

function quandoFoi(iso: string): string {
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (dias < 1) return "hoje";
  if (dias < 30) return `${dias} d`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

type Aviso = { tipo: "erro" | "ok"; texto: string } | null;

export function BlogComentarios({ slug, qntAprovados }: { slug: string; qntAprovados: number | null }) {
  const [comentarios, setComentarios] = useState<BlogComentario[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<Aviso>(null);

  useEffect(() => {
    listarComentarios(slug)
      .then(setComentarios)
      .catch(() => setComentarios([]));
  }, [slug]);

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nome.trim().length < 2) {
      setAviso({ tipo: "erro", texto: "Informe seu nome." });
      return;
    }
    if (texto.trim().length < 2) {
      setAviso({ tipo: "erro", texto: "Escreva algo antes de enviar." });
      return;
    }
    setEnviando(true);
    try {
      await comentar(slug, { nome: nome.trim(), email: email.trim() || null, texto: texto.trim() });
      setTexto("");
      setAviso({ tipo: "ok", texto: "Comentário enviado. Ele aparece aqui depois de aprovado." });
    } catch (erro) {
      setAviso({ tipo: "erro", texto: erro instanceof Error ? erro.message : "Não foi possível enviar." });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id={BLOG_COMENTARIOS_ANCORA} aria-labelledby="comentarios-titulo" className="mt-12 scroll-mt-28">
      <h2 id="comentarios-titulo" className="mb-5 text-xl font-semibold">
        Comentários{qntAprovados !== null ? ` (${qntAprovados})` : ""}
      </h2>
      {comentarios.map((c) => (
        <div key={c.id} className="mb-5 flex gap-3">
          <BlogAvatar iniciais={iniciais(c.nome)} tamanho="sm" className="bg-landing-canvas text-landing-ink" />
          <div>
            <p className="text-sm font-semibold">
              {c.nome} <span className="font-normal text-landing-muted">· {quandoFoi(c.createdAt)}</span>
            </p>
            <p className="mt-0.5 whitespace-pre-line text-[15px] text-landing-muted">{c.texto}</p>
          </div>
        </div>
      ))}
      <form onSubmit={enviar} className="mt-2 flex flex-col gap-2.5" noValidate>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input
            className={BLOG_CAMPO}
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setAviso(null);
            }}
            placeholder="Seu nome"
            aria-label="Seu nome"
            maxLength={100}
            autoComplete="name"
          />
          <input
            className={BLOG_CAMPO}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail (opcional, não aparece)"
            aria-label="E-mail (opcional)"
            maxLength={255}
            autoComplete="email"
          />
        </div>
        <div className="flex gap-2.5">
          <input
            className={`${BLOG_CAMPO} flex-1`}
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setAviso(null);
            }}
            placeholder="Escreva um comentário"
            aria-label="Comentário"
            maxLength={2000}
          />
          <button type="submit" className={BLOG_BOTAO_ESCURO} disabled={enviando}>
            {enviando ? "Enviando…" : "Enviar"}
          </button>
        </div>
      </form>
      <p aria-live="polite" className={`mt-1.5 text-[13px] ${aviso?.tipo === "erro" ? "text-destructive" : "text-landing-muted"}`}>
        {aviso?.texto}
      </p>
    </section>
  );
}
