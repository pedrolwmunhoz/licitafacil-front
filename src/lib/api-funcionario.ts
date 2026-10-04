/**
 * Chamadas à API da área Funcionário.
 * URLs e parâmetros conforme doc.html e controllers Java.
 */
import api from "./api";
import type {
  AssinarComprovanteJornadaResponse,
  FeriasAfastamentosListagemResponse,
  FuncionarioPerfilResponse,
  PontoListagemComConfigResponse,
  HistoricoCartaoPontoResponse,
  ResumoBancoHorasResponse,
  RegistroPontoManualRequest,
  SolicitacoesPontoListagemFuncionarioResponse,
  EmpresaPerfilResponse,
} from "@/types/empresa";

/** GET /api/funcionario/perfil — Doc id 26 */
export function getPerfilFuncionario(): Promise<FuncionarioPerfilResponse> {
  return api.get<FuncionarioPerfilResponse>("/api/funcionario/perfil").then((r) => r.data);
}

/** GET /api/funcionario/:funcionarioId/ponto — Doc id 28. Params: ano, mes, page, size. Retorna jornadas paginadas + tempoDescansoEntreJornada. */
export function listarMeuPonto(
  funcionarioId: string,
  ano: number,
  mes: number,
  page = 0,
  size = 100
): Promise<PontoListagemComConfigResponse> {
  return api
    .get<PontoListagemComConfigResponse>(`/api/funcionario/${funcionarioId}/ponto`, {
      params: { ano, mes, page, size },
    })
    .then((r) => r.data);
}

/** GET /api/funcionario/:id/cartao-ponto/historico — rastro ativo+inativo no intervalo. */
export function listarHistoricoCartaoPontoFuncionario(
  funcionarioId: string,
  inicio: string,
  fim: string
): Promise<HistoricoCartaoPontoResponse> {
  return api
    .get<HistoricoCartaoPontoResponse>(`/api/funcionario/${funcionarioId}/cartao-ponto/historico`, {
      params: { inicio, fim },
    })
    .then((r) => r.data);
}

/** POST /api/empresa/funcionario/registro-ponto — App: só timezone (Instant.now no backend). */
export function registrarPontoApp(
  idempotencyKey: string,
  body: {
    timezone: string;
    registroMetadados?: { geoLatitude?: number; geoLongitude?: number };
  }
): Promise<void> {
  return api
    .post("/api/empresa/funcionario/registro-ponto", body, {
      headers: { "Idempotency-Key": idempotencyKey },
    })
    .then(() => undefined);
}

/** POST /api/funcionario/registro-ponto/manual — Doc id 29. Header Idempotency-Key obrigatório. */
export function registrarPontoManual(
  idempotencyKey: string,
  body: RegistroPontoManualRequest
): Promise<void> {
  return api
    .post("/api/funcionario/registro-ponto/manual", body, {
      headers: { "Idempotency-Key": idempotencyKey },
    })
    .then(() => undefined);
}

/** DELETE /api/empresa/registro-ponto/:idRegistro — Doc id 33. Solicitação de remoção ou remoção direta conforme config empresa. */
export function deletarRegistroFuncionario(
  idRegistro: string,
  body?: {
    observacao?: string;
    registroMetadados?: { geoLatitude?: number; geoLongitude?: number };
  }
): Promise<void> {
  return api
    .delete(`/api/empresa/registro-ponto/${idRegistro}`, { data: body ?? {} })
    .then(() => undefined);
}

/** GET /api/usuario/banco-horas/resumo — Resumo do próprio funcionário (JWT). periodo: TUDO | MENSAL (default). ano/mes: quando MENSAL. */
export function resumoBancoHorasFuncionario(params?: {
  periodo?: "TUDO" | "MENSAL";
  ano?: number;
  mes?: number;
}): Promise<ResumoBancoHorasResponse> {
  return api
    .get<ResumoBancoHorasResponse>("/api/usuario/banco-horas/resumo", {
      params: params ? { periodo: params.periodo, ano: params.ano, mes: params.mes } : undefined,
    })
    .then((r) => r.data);
}


/** GET /api/usuario/empresa-perfil — Perfil da empresa do funcionário (para PDF/layout). */
export function getPerfilEmpresaDoFuncionario(): Promise<EmpresaPerfilResponse> {
  return api.get<EmpresaPerfilResponse>("/api/usuario/empresa-perfil").then((r) => r.data);
}

/** POST /api/funcionario/comprovante-jornada/assinar — Doc id 35. Assina payload (ex.: hash do PDF); não persiste. */
export function assinarComprovanteJornada(payloadBase64: string): Promise<AssinarComprovanteJornadaResponse> {
  return api
    .post<AssinarComprovanteJornadaResponse>("/api/funcionario/comprovante-jornada/assinar", { payloadBase64 })
    .then((r) => r.data);
}

/** GET /api/funcionario/solicitacoes-ponto — Doc id 41b. Params: page, size. Lista do próprio funcionário (somente leitura). Item sem nome. */
export function listarMinhasSolicitacoesPonto(
  params: { page?: number; size?: number } = {}
): Promise<SolicitacoesPontoListagemFuncionarioResponse> {
  const { page = 0, size = 10 } = params;
  return api
    .get<SolicitacoesPontoListagemFuncionarioResponse>("/api/funcionario/solicitacoes-ponto", {
      params: { page, size },
    })
    .then((r) => r.data);
}

/** GET /api/funcionario/ferias-afastamentos — Doc id 39. Params: page, size */
export function listarFeriasAfastamentosFuncionario(
  params: { page?: number; size?: number } = {}
): Promise<FeriasAfastamentosListagemResponse> {
  const { page = 0, size = 10 } = params;
  return api
    .get<FeriasAfastamentosListagemResponse>("/api/funcionario/ferias-afastamentos", {
      params: { page, size },
    })
    .then((r) => r.data);
}
