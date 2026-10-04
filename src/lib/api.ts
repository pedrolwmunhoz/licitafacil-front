import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";
import {
  API_ERRO_ID_COBRANCA_ACESSO_NEGADO,
  empresaDeveEvitarRedirectPor403Cobranca,
} from "@/constants/api-errors";
import { CSRF_HEADER_VALOR, resolveApiBaseUrl } from "./api-base";
import { navigateApp, navigateAppReplace } from "./app-navigation";
import { obterDeviceId } from "./device-id";
import { sessaoHint } from "./sessao-hint";

let ultimoToastCobrancaMs = 0;
const INTERVALO_MIN_TOAST_COBRANCA_MS = 8000;

function extrairErroApi(data: unknown): { id?: string; mensagem?: string } {
  if (typeof data !== "object" || data === null) return {};
  const o = data as Record<string, unknown>;
  const id = o.id != null ? String(o.id) : undefined;
  const mensagem = o.mensagem != null ? String(o.mensagem) : undefined;
  return { id, mensagem };
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 30_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": CSRF_HEADER_VALOR,
  },
});

/** O site usa a sessão por cookie do gateway (/api/v2); o app Android segue no /api com Bearer. */
function paraV2(url: string): string {
  return url.startsWith("/api/") && !url.startsWith("/api/v2/") ? `/api/v2/${url.slice("/api/".length)}` : url;
}

/** Caminho no formato /api/... (sem query e sem o /v2), para comparar rotas. */
function caminhoApi(config: InternalAxiosRequestConfig): string {
  const caminho = (config.url ?? "").replace(config.baseURL ?? "", "").split("?")[0] ?? "";
  return caminho.replace(/^\/api\/v2\//, "/api/");
}

/**
 * Rotas em que 401/403 é resposta de negócio (credencial errada, link expirado, sem sessão ainda)
 * e não sessão encerrada: não redirecionam para o login.
 */
function isRespostaSemRedirect(config: InternalAxiosRequestConfig): boolean {
  const metodo = (config.method ?? "").toLowerCase();
  const caminho = caminhoApi(config);
  if (metodo === "get") return caminho === "/api/pub/auth/me";
  if (metodo !== "post") return false;
  return (
    caminho === "/api/empresa/cadastro-com-plano" ||
    caminho === "/api/pub/auth" ||
    caminho === "/api/pub/auth/magic-link/redeem" ||
    caminho === "/api/pub/auth/recuperar-senha" ||
    caminho === "/api/pub/auth/validar-codigo" ||
    caminho === "/api/pub/auth/resetar-senha" ||
    caminho === "/api/pub/auth/logout"
  );
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url) config.url = paraV2(config.url);
  config.headers.set("X-Device-Id", obterDeviceId());
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;
    if (!originalRequest) return Promise.reject(error);

    // O gateway já renova o JWT sozinho; 401 aqui é sessão encerrada (expirada, revogada ou logout).
    if (error.response?.status === 401) {
      if (isRespostaSemRedirect(originalRequest)) {
        return Promise.reject(error);
      }
      sessaoHint.limpar();
      navigateApp("/login");
      return Promise.reject(error);
    }

    // 403 Forbidden — cobrança / limite (id no JSON)
    if (error.response?.status === 403) {
      if (isRespostaSemRedirect(originalRequest)) {
        return Promise.reject(error);
      }
      const { id, mensagem } = extrairErroApi(error.response?.data);
      const mensagemInadimplencia = mensagem?.includes("inadimplência") ?? false;

      if (id === API_ERRO_ID_COBRANCA_ACESSO_NEGADO || mensagemInadimplencia) {
        const userType = sessaoHint.tipo();
        if (userType === "EMPRESA") {
          if (empresaDeveEvitarRedirectPor403Cobranca()) {
            return Promise.reject(error);
          }
          navigateAppReplace("/empresa/pagamento-pendente");
          return Promise.reject(error);
        }
        if (userType === "FUNCIONARIO") {
          window.dispatchEvent(new CustomEvent("segponto:cobranca-bloqueio"));
          const agora = Date.now();
          if (agora - ultimoToastCobrancaMs >= INTERVALO_MIN_TOAST_COBRANCA_MS) {
            ultimoToastCobrancaMs = agora;
            toast.error(
              mensagem ||
                "O acesso está suspenso até a empresa regularizar a cobrança do plano.",
              { duration: 9000 }
            );
          }
          return Promise.reject(error);
        }
      }

      navigateApp("/login?unauthorized=1");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
