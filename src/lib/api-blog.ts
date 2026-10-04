import { CSRF_HEADER_VALOR, resolveApiBaseUrl } from "./api-base";
import { obterDeviceId } from "./device-id";
import type {
  BlogComentario,
  BlogCurtida,
  BlogMaisLido,
  BlogPostEstado,
  CriarBlogComentarioRequest,
} from "@/types/blog";

/**
 * Blog público: fetch direto (sem o axios do painel, que redireciona para o login).
 * O visitante é só o X-Device-Id; o gateway não repassa sessão nessas rotas.
 */
const BASE = `${resolveApiBaseUrl()}/api/v2/blog`;

async function chamar<T>(caminho: string, init: RequestInit = {}): Promise<T> {
  const resposta = await fetch(`${BASE}${caminho}`, {
    ...init,
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": CSRF_HEADER_VALOR,
      "X-Device-Id": obterDeviceId(),
    },
  });
  if (!resposta.ok) {
    const corpo = (await resposta.json().catch(() => null)) as { mensagem?: string } | null;
    throw new Error(corpo?.mensagem ?? "Não foi possível completar a ação. Tente novamente.");
  }
  if (resposta.status === 204 || resposta.status === 201 || resposta.status === 202) return undefined as T;
  return (await resposta.json()) as T;
}

const caminhoPost = (slug: string) => `/posts/${encodeURIComponent(slug)}`;

function corpoReferrer(): string {
  const referrer = typeof document !== "undefined" ? document.referrer.trim() : "";
  return JSON.stringify({ referrer: referrer || null });
}

export function registrarVisitaInicio(): Promise<void> {
  return chamar("/visita", { method: "POST", body: corpoReferrer() });
}

export function registrarVisitaPost(slug: string): Promise<BlogPostEstado> {
  return chamar(`${caminhoPost(slug)}/visita`, { method: "POST", body: corpoReferrer() });
}

export function alternarCurtida(slug: string): Promise<BlogCurtida> {
  return chamar(`${caminhoPost(slug)}/curtida`, { method: "POST" });
}

export function listarComentarios(slug: string): Promise<BlogComentario[]> {
  return chamar(`${caminhoPost(slug)}/comentarios`);
}

export function comentar(slug: string, body: CriarBlogComentarioRequest): Promise<void> {
  return chamar(`${caminhoPost(slug)}/comentarios`, { method: "POST", body: JSON.stringify(body) });
}

/** Enviada no polling (~2s) e ao sair: keepalive deixa a requisição terminar depois do unload. */
export function registrarMetrica(
  slug: string,
  sessaoId: string,
  tempoPagina: number,
  percentualLido: number,
): Promise<void> {
  return chamar(`${caminhoPost(slug)}/metrica`, {
    method: "POST",
    keepalive: true,
    body: JSON.stringify({ sessaoId, tempoPagina, percentualLido }),
  });
}

export function listarMaisLidos(): Promise<BlogMaisLido[]> {
  return chamar("/mais-lidos");
}
