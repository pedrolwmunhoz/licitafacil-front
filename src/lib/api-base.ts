/**
 * Produção: `VITE_API_URL` (https://api.segponto.com, o gateway).
 * Dev (`vite`): caminho relativo + proxy em vite.config → gateway em :8082 (mesma origem, cookie funciona).
 */
export function resolveApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.DEV) {
    return "";
  }
  return "http://localhost:8082";
}

/** Valor esperado pelo gateway no header anti-CSRF (junto com Origin permitido). */
export const CSRF_HEADER_VALOR = "segponto-web";
