/** Resposta 403 do interceptor de cobrança — tratar no cliente sem encerrar sessão. */
export const API_ERRO_ID_COBRANCA_ACESSO_NEGADO = "COBRANCA_ACESSO_NEGADO";

/** Rotas onde já estamos a tratar bloqueio de cobrança — não fazer `location.href` de novo (evita loop com layout). */
const EMPRESA_ROTAS_SEM_REDIRECT_403_COBRANCA = [
  "/empresa/pagamento-pendente",
  "/empresa/cobranca",
] as const;

/** Normaliza path sem barra final (exceto raiz). */
function pathnameNormalizado(): string {
  const p = window.location.pathname;
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

export function empresaDeveEvitarRedirectPor403Cobranca(): boolean {
  const path = pathnameNormalizado();
  return EMPRESA_ROTAS_SEM_REDIRECT_403_COBRANCA.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
