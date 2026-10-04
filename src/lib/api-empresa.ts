/**
 * Chamadas à API da área Empresa.
 * URLs e parâmetros conforme doc.html e controllers Java.
 */
import api from "./api";
import type {
  BancoHorasListagemPageResponse,
  BancoHorasListarParams,
  EspelhoPontoListagemPageResponse,
  EspelhoPontoListarParams,
  FuncionarioListagemPageResponse,
  FuncionarioListarParams,
  FuncionarioNomeListagemPageResponse,
  FuncionarioCreateRequest,
  FuncionarioUpdateRequest,
  FuncionarioResetarSenhaRequest,
  FuncionarioResetarEmailRequest,
  SolicitacoesPontoListagemResponse,
  AprovarSolicitacaoRequest,
  ReprovarSolicitacaoRequest,
  FeriasAfastamentosListagemResponse,
  CriarAfastamentoRequest,
  FeriadoListagemPageResponse,
  CriarFeriadoRequest,
  EditarFeriadoRequest,
  GeofenceItemResponse,
  GeofenceListagemPageResponse,
  CriarGeofenceRequest,
  AtualizarGeofenceRequest,
  AuditoriaListagemResponse,
  AuditoriaDetalheResponse,
  PontoListagemComConfigResponse,
  HistoricoCartaoPontoResponse,
  ResumoBancoHorasResponse,
  EmpresaPerfilResponse,
  EmpresaEnderecoRequest,
  EmpresaResetarSenhaRequest,
  ConfigInicialStatusResponse,
  EmpresaConfigInicialRequest,
  FuncionarioPerfilResponse,
  DashboardMetricasResponse,
  CobrancaConfiguradoResponse,
  MudarPlanoAssinaturaResponse,
  CobrancaUsoFaturaResponseDTO,
  CobrancaUsoFaturaListagemPageResponse,
  EmpresaCadastroComPlanoRequest,
  EmpresaCadastroComPlanoResponse,
  CobrancaConfirmacaoResponse,
} from "@/types/empresa";

const BASE = "/api/empresa";

/** GET /api/cobranca/confirmacao — valida pagamento no servidor (ref da URL ou JWT). */
export function confirmarPagamentoCobranca(
  ref?: string | null,
): Promise<CobrancaConfirmacaoResponse> {
  return api
    .get<CobrancaConfirmacaoResponse>("/api/cobranca/confirmacao", {
      params: ref ? { ref } : undefined,
    })
    .then((r) => r.data);
}

/** POST /api/empresa/cadastro-com-plano — contratação na landing + checkout AbacatePay (público). */
export function cadastroComPlano(
  body: EmpresaCadastroComPlanoRequest,
): Promise<EmpresaCadastroComPlanoResponse> {
  return api
    .post<EmpresaCadastroComPlanoResponse>(`${BASE}/cadastro-com-plano`, body)
    .then((r) => r.data);
}

/** GET /api/empresa/funcionario — Doc id 18. Params: page, pageSize, nome, departamento, cargo, status */
export function listarFuncionarios(
  params: FuncionarioListarParams = {}
): Promise<FuncionarioListagemPageResponse> {
  const { page = 0, pageSize = 10, nome, departamento, cargo, status } = params;
  return api
    .get<FuncionarioListagemPageResponse>(`${BASE}/funcionario`, {
      params: {
        page,
        pageSize,
        ...(nome != null && nome !== "" ? { nome } : {}),
        ...(departamento != null && departamento !== "" ? { departamento } : {}),
        ...(cargo != null && cargo !== "" ? { cargo } : {}),
        ...(status != null && status !== "" ? { status } : {}),
      },
    })
    .then((r) => r.data);
}

/** GET /api/empresa/funcionario/nomes — listagem leve paginada (usuarioId + nome). */
export function listarNomesFuncionarios(
  params: { page?: number; pageSize?: number; nome?: string } = {}
): Promise<FuncionarioNomeListagemPageResponse> {
  const { page = 0, pageSize = 20, nome } = params;
  return api
    .get<FuncionarioNomeListagemPageResponse>(`${BASE}/funcionario/nomes`, {
      params: {
        page,
        pageSize,
        ...(nome != null && nome !== "" ? { nome } : {}),
      },
    })
    .then((r) => r.data);
}

/** POST /api/empresa/funcionario — Doc id 12 */
export function criarFuncionario(body: FuncionarioCreateRequest): Promise<{ funcionarioId: string }> {
  return api.post<{ funcionarioId: string }>(`${BASE}/funcionario`, body).then((r) => r.data);
}

/** PUT /api/empresa/funcionario/:funcionarioId — Doc id 16 */
export function atualizarFuncionario(
  funcionarioId: string,
  body: FuncionarioUpdateRequest
): Promise<void> {
  return api.put(`${BASE}/funcionario/${funcionarioId}`, body).then(() => undefined);
}

/** POST /api/empresa/funcionario/:funcionarioId/resetar-senha — Doc id 13 */
export function resetarSenhaFuncionario(
  funcionarioId: string,
  body: FuncionarioResetarSenhaRequest
): Promise<void> {
  return api.post(`${BASE}/funcionario/${funcionarioId}/resetar-senha`, body).then(() => undefined);
}

/** POST /api/empresa/funcionario/:funcionarioId/resetar-email — Doc id 14 */
export function resetarEmailFuncionario(
  funcionarioId: string,
  body: FuncionarioResetarEmailRequest
): Promise<void> {
  return api.post(`${BASE}/funcionario/${funcionarioId}/resetar-email`, body).then(() => undefined);
}

/** POST /api/empresa/funcionario/:funcionarioId/desbloquear — Doc id 15 */
export function desbloquearFuncionario(funcionarioId: string): Promise<void> {
  return api.post(`${BASE}/funcionario/${funcionarioId}/desbloquear`, {}).then(() => undefined);
}

/** DELETE /api/empresa/funcionario/:funcionarioId — Doc id 17 */
export function deletarFuncionario(funcionarioId: string): Promise<void> {
  return api.delete(`${BASE}/funcionario/${funcionarioId}`).then(() => undefined);
}

/** GET /api/empresa/funcionario/:funcionarioId/perfil — Perfil do funcionário (para empresa editar) */
export function getPerfilFuncionario(funcionarioId: string): Promise<FuncionarioPerfilResponse> {
  return api
    .get<FuncionarioPerfilResponse>(`${BASE}/funcionario/${funcionarioId}/perfil`)
    .then((r) => r.data);
}

// --- Solicitações de ponto ---

/** GET /api/empresa/solicitacoes-ponto — Doc id 36. Params: page, size, nome */
export function listarSolicitacoesPonto(
  params: { page?: number; size?: number; nome?: string } = {}
): Promise<SolicitacoesPontoListagemResponse> {
  const { page = 0, size = 10, nome } = params;
  return api
    .get<SolicitacoesPontoListagemResponse>(`${BASE}/solicitacoes-ponto`, {
      params: { page, size, ...(nome != null && nome !== "" ? { nome } : {}) },
    })
    .then((r) => r.data);
}

/** POST /api/empresa/solicitacoes-ponto/:idRegistroPendente/aprovar — Doc id 37. Header Idempotency-Key obrigatório. Body opcional com observacao. */
export function aprovarSolicitacaoPonto(idRegistroPendente: string, body?: AprovarSolicitacaoRequest): Promise<void> {
  return api
    .post(`${BASE}/solicitacoes-ponto/${idRegistroPendente}/aprovar`, body ?? {}, {
      headers: { "Idempotency-Key": idRegistroPendente },
    })
    .then(() => undefined);
}

/** POST /api/empresa/solicitacoes-ponto/:idRegistroPendente/reprovar — Doc id 38 */
export function reprovarSolicitacaoPonto(
  idRegistroPendente: string,
  body: ReprovarSolicitacaoRequest
): Promise<void> {
  return api
    .post(`${BASE}/solicitacoes-ponto/${idRegistroPendente}/reprovar`, body)
    .then(() => undefined);
}

// --- Férias e afastamentos ---

/** GET /api/empresa/ferias-afastamentos — Doc id 41. Params: page, size, nome */
export function listarFeriasAfastamentosEmpresa(
  params: { page?: number; size?: number; nome?: string } = {}
): Promise<FeriasAfastamentosListagemResponse> {
  const { page = 0, size = 10, nome } = params;
  return api
    .get<FeriasAfastamentosListagemResponse>(`${BASE}/ferias-afastamentos`, {
      params: { page, size, ...(nome != null && nome !== "" ? { nome } : {}) },
    })
    .then((r) => r.data);
}

/** GET /api/empresa/espelho-ponto/listagem — Doc id 40b. Params: page, pageSize, nome, ano, mes */
export function listagemEspelhoPonto(
  params: EspelhoPontoListarParams = {}
): Promise<EspelhoPontoListagemPageResponse> {
  const { page = 0, pageSize = 20, nome, ano, mes } = params;
  return api
    .get<EspelhoPontoListagemPageResponse>(`${BASE}/espelho-ponto/listagem`, {
      params: {
        page,
        pageSize,
        ...(nome != null && nome !== "" ? { nome } : {}),
        ...(ano != null ? { ano } : {}),
        ...(mes != null ? { mes } : {}),
      },
    })
    .then((r) => r.data);
}

/** GET /api/empresa/banco-horas/listagem — listagem própria (não usa GET /funcionario). */
export function listagemBancoHoras(
  params: BancoHorasListarParams = {}
): Promise<BancoHorasListagemPageResponse> {
  const { page = 0, pageSize = 20, nome } = params;
  return api
    .get<BancoHorasListagemPageResponse>(`${BASE}/banco-horas/listagem`, {
      params: {
        page,
        pageSize,
        ...(nome != null && nome !== "" ? { nome } : {}),
      },
    })
    .then((r) => r.data);
}

/** GET /api/empresa/funcionario/:funcionarioId/ponto — Doc id 33. Params: ano, mes, page, size. Retorna jornadas paginadas + tempoDescansoEntreJornada. */
export function listarPontoFuncionario(
  funcionarioId: string,
  ano: number,
  mes: number,
  page = 0,
  size = 100
): Promise<PontoListagemComConfigResponse> {
  return api
    .get<PontoListagemComConfigResponse>(`${BASE}/funcionario/${funcionarioId}/ponto`, {
      params: { ano, mes, page, size },
    })
    .then((r) => r.data);
}

/** GET /api/empresa/funcionario/:id/cartao-ponto/historico — rastro ativo+inativo no intervalo. */
export function listarHistoricoCartaoPonto(
  funcionarioId: string,
  inicio: string,
  fim: string
): Promise<HistoricoCartaoPontoResponse> {
  return api
    .get<HistoricoCartaoPontoResponse>(`${BASE}/funcionario/${funcionarioId}/cartao-ponto/historico`, {
      params: { inicio, fim },
    })
    .then((r) => r.data);
}

/** DELETE /api/empresa/funcionario/:funcionarioId/registro-ponto/:registroId — Doc id 34 */
export function deletarRegistroPonto(
  funcionarioId: string,
  registroId: string
): Promise<void> {
  return api
    .delete(`${BASE}/funcionario/${funcionarioId}/registro-ponto/${registroId}`)
    .then(() => undefined);
}

/** POST /api/empresa/funcionario/:funcionarioId/registro-ponto — manual: horarioUtc + timezone. */
export function criarRegistroPontoFuncionario(
  funcionarioId: string,
  body: { horarioUtc: string; timezone: string; justificativa: string; observacao?: string | null },
  idempotencyKey?: string
): Promise<void> {
  const key = idempotencyKey ?? crypto.randomUUID();
  return api
    .post(`${BASE}/funcionario/${funcionarioId}/registro-ponto`, body, {
      headers: { "Idempotency-Key": key },
    })
    .then(() => undefined);
}

/** GET /api/empresa/funcionario/:funcionarioId/ferias-afastamentos — Doc id 40. Params: page, size */
export function listarFeriasPorFuncionario(
  funcionarioId: string,
  params: { page?: number; size?: number } = {}
): Promise<FeriasAfastamentosListagemResponse> {
  const { page = 0, size = 10 } = params;
  return api
    .get<FeriasAfastamentosListagemResponse>(
      `${BASE}/funcionario/${funcionarioId}/ferias-afastamentos`,
      { params: { page, size } }
    )
    .then((r) => r.data);
}

/** GET /api/empresa/funcionario/:funcionarioId/resumo-banco-horas — Doc id 43. periodo: TUDO | MENSAL (default). ano/mes: quando MENSAL (default = mês atual). */
export function resumoBancoHoras(
  funcionarioId: string,
  params?: { periodo?: "TUDO" | "MENSAL"; ano?: number; mes?: number }
): Promise<ResumoBancoHorasResponse> {
  return api
    .get<ResumoBancoHorasResponse>(`${BASE}/funcionario/${funcionarioId}/resumo-banco-horas`, {
      params: params ? { periodo: params.periodo, ano: params.ano, mes: params.mes } : undefined,
    })
    .then((r) => r.data);
}


/** GET /api/empresa/perfil — Doc id 27 */
export function getPerfilEmpresa(): Promise<EmpresaPerfilResponse> {
  return api.get<EmpresaPerfilResponse>(`${BASE}/perfil`).then((r) => r.data);
}

/** PUT /api/empresa/endereco — Doc id 7 */
export function atualizarEnderecoEmpresa(
  body: EmpresaEnderecoRequest
): Promise<void> {
  return api.put(`${BASE}/endereco`, body).then(() => undefined);
}

/** GET /api/empresa/config-inicial/status — primeira vez que a empresa faz login */
export function getConfigInicialStatus(): Promise<ConfigInicialStatusResponse> {
  return api.get<ConfigInicialStatusResponse>(`${BASE}/config-inicial/status`).then((r) => r.data);
}

/**
 * Duas chamadas: 1) POST /config-inicial com JSON (config). 2) Se tiver cert, POST /config-inicial/certificado com multipart (só arquivo + senha).
 */
export async function configInicialEmpresa(
  body: EmpresaConfigInicialRequest,
  certificadoA1?: File | null,
  certificadoA1Senha?: string | null
): Promise<void> {
  await api.post(`${BASE}/config-inicial`, body);
  const temCert = certificadoA1 != null && certificadoA1.size > 0;
  if (!temCert) return;
  const form = new FormData();
  form.append("certificadoA1", certificadoA1);
  if (certificadoA1Senha != null && certificadoA1Senha.trim() !== "") {
    form.append("certificadoA1Senha", certificadoA1Senha.trim());
  }
  // Forçar multipart: remover Content-Type da instância (axios coloca multipart/form-data + boundary quando data é FormData)
  await api.post(`${BASE}/config-inicial/certificado`, form, {
    headers: { "Content-Type": false } as unknown as Record<string, string>,
  });
}

/** POST /api/empresa/resetar-senha — Doc id 9 */
export function resetarSenhaEmpresa(body: EmpresaResetarSenhaRequest): Promise<void> {
  return api.post(`${BASE}/resetar-senha`, body).then(() => undefined);
}

/** PUT /api/empresa/jornada-padrao — Doc id 10 */
export function atualizarJornadaPadrao(body: Record<string, unknown>): Promise<void> {
  return api.put(`${BASE}/jornada-padrao`, body).then(() => undefined);
}

/** PUT /api/empresa/banco-horas-config */
export function atualizarBancoHorasConfig(body: {
  empresaBancoHorasConfig: { ativo: boolean };
}): Promise<void> {
  return api.put(`${BASE}/banco-horas-config`, body).then(() => undefined);
}

/** GET /api/empresa/metricas-dia — Métrica do dia (hoje ou última cadastrada). */
export function getMetricasDia(): Promise<DashboardMetricasResponse> {
  return api.get<DashboardMetricasResponse>(`${BASE}/metricas-dia`).then((r) => r.data);
}

/** GET /api/empresa/metricas-dia/por-periodo — Lista métricas diárias por data início e fim. */
export function getMetricasDiaPorPeriodo(dataInicio: string, dataFim: string): Promise<DashboardMetricasResponse[]> {
  return api
    .get<DashboardMetricasResponse[]>(`${BASE}/metricas-dia/por-periodo`, {
      params: { dataInicio, dataFim },
    })
    .then((r) => r.data);
}

/** POST /api/empresa/funcionario/:funcionarioId/afastamentos — Doc id 42 */
export function criarAfastamento(
  funcionarioId: string,
  body: CriarAfastamentoRequest
): Promise<void> {
  return api
    .post(`${BASE}/funcionario/${funcionarioId}/afastamentos`, body)
    .then(() => undefined);
}

// --- Feriados ---

/** GET /api/empresa/feriados — Doc id 57. Params: page, size, observacao, dataInicio, dataFim (opcionais). */
export function listarFeriados(
  params: { page?: number; size?: number; observacao?: string; dataInicio?: string; dataFim?: string } = {}
): Promise<FeriadoListagemPageResponse> {
  const { page = 0, size = 20, observacao, dataInicio, dataFim } = params;
  const query: Record<string, string | number> = { page, size };
  if (observacao != null && observacao.trim() !== "") query.observacao = observacao.trim();
  if (dataInicio != null && dataInicio.trim() !== "") query.dataInicio = dataInicio.trim();
  if (dataFim != null && dataFim.trim() !== "") query.dataFim = dataFim.trim();
  return api
    .get<FeriadoListagemPageResponse>(`${BASE}/feriados`, { params: query })
    .then((r) => r.data);
}

/** POST /api/empresa/feriados — Doc id 58. Empresa só pode ESTADUAL ou MUNICIPAL. */
export function criarFeriado(body: CriarFeriadoRequest): Promise<void> {
  return api.post(`${BASE}/feriados`, body).then(() => undefined);
}

/** PUT /api/empresa/feriados/:feriadoId — Doc id 59 */
export function editarFeriado(
  feriadoId: string,
  body: EditarFeriadoRequest
): Promise<void> {
  return api.put(`${BASE}/feriados/${feriadoId}`, body).then(() => undefined);
}

/** DELETE /api/empresa/feriados/:feriadoId — Doc id 60 */
export function excluirFeriado(feriadoId: string): Promise<void> {
  return api.delete(`${BASE}/feriados/${feriadoId}`).then(() => undefined);
}

// --- Geofences ---

/** GET /api/empresa/geofences — Doc id 46. Params: page, size */
export function listarGeofences(
  params: { page?: number; size?: number } = {}
): Promise<GeofenceListagemPageResponse> {
  const { page = 0, size = 10 } = params;
  return api.get<GeofenceListagemPageResponse>(`${BASE}/geofences`, { params: { page, size } }).then((r) => r.data);
}

/** POST /api/empresa/geofences — Doc id 47 */
export function criarGeofence(body: CriarGeofenceRequest): Promise<void> {
  return api.post(`${BASE}/geofences`, body).then(() => undefined);
}

/** PUT /api/empresa/geofences/:geofenceId */
export function atualizarGeofence(geofenceId: string, body: AtualizarGeofenceRequest): Promise<void> {
  return api.put(`${BASE}/geofences/${geofenceId}`, body).then(() => undefined);
}

/** DELETE /api/empresa/geofences/:geofenceId */
export function excluirGeofence(geofenceId: string): Promise<void> {
  return api.delete(`${BASE}/geofences/${geofenceId}`).then(() => undefined);
}

// --- Auditoria ---

/** GET /api/empresa/auditoria — Doc id 50. Params: page, size */
export function listarAuditoria(
  params: { page?: number; size?: number } = {}
): Promise<AuditoriaListagemResponse> {
  const { page = 0, size = 10 } = params;
  return api
    .get<AuditoriaListagemResponse>(`${BASE}/auditoria`, { params: { page, size } })
    .then((r) => r.data);
}

/** GET /api/empresa/auditoria/:logId — Doc id 51 */
export function detalharAuditoria(logId: string): Promise<AuditoriaDetalheResponse> {
  return api.get<AuditoriaDetalheResponse>(`${BASE}/auditoria/${logId}`).then((r) => r.data);
}

// --- Relatórios (blob download) ---

export type FormatoRelatorio = "PDF" | "EXCEL";

/** POST /api/empresa/relatorios/ponto-detalhado — Doc id 48. Query: ano, mes, formato */
export function downloadRelatorioPontoDetalhado(
  ano: number,
  mes: number,
  formato: FormatoRelatorio
): Promise<Blob> {
  return api
    .post(
      `${BASE}/relatorios/ponto-detalhado`,
      null,
      { params: { ano, mes, formato }, responseType: "blob" }
    )
    .then((r) => r.data);
}

/** POST /api/empresa/relatorios/ponto-resumo — Doc id 49. Query: ano, mes, formato */
export function downloadRelatorioPontoResumo(
  ano: number,
  mes: number,
  formato: FormatoRelatorio
): Promise<Blob> {
  return api
    .post(
      `${BASE}/relatorios/ponto-resumo`,
      null,
      { params: { ano, mes, formato }, responseType: "blob" }
    )
    .then((r) => r.data);
}

// --- Cobrança por uso ---

/** GET /api/empresa/:empresaId/cobranca-uso/configurado */
export function getCobrancaConfigurado(
  empresaId: string
): Promise<CobrancaConfiguradoResponse> {
  return api
    .get<CobrancaConfiguradoResponse>(`${BASE}/${empresaId}/cobranca-uso/configurado`)
    .then((r) => r.data);
}

/** GET /api/empresa/:empresaId/cobranca-uso — Lista paginada de faturas */
export function listarFaturas(
  empresaId: string,
  params: { page?: number; size?: number } = {}
): Promise<CobrancaUsoFaturaListagemPageResponse> {
  const { page = 0, size = 20 } = params;
  return api
    .get<CobrancaUsoFaturaListagemPageResponse>(`${BASE}/${empresaId}/cobranca-uso`, {
      params: { page, size },
    })
    .then((r) => r.data);
}

/** Alias para `CobrancaPage`. */
export function listFaturasCobranca(
  empresaId: string,
  page = 0,
  size = 20
): Promise<CobrancaUsoFaturaListagemPageResponse> {
  return listarFaturas(empresaId, { page, size });
}

/** POST /api/empresa/:empresaId/cobranca-uso/sincronizar — atualiza fatura do mês e links pendentes na AbacatePay */
export function sincronizarCobranca(empresaId: string): Promise<void> {
  return api.post(`${BASE}/${empresaId}/cobranca-uso/sincronizar`).then(() => undefined);
}

/** POST /api/empresa/:empresaId/cobranca-uso/mudar-plano */
export function mudarPlanoAssinatura(
  empresaId: string,
  tipoAssinaturaId: number
): Promise<MudarPlanoAssinaturaResponse> {
  return api
    .post<MudarPlanoAssinaturaResponse>(`${BASE}/${empresaId}/cobranca-uso/mudar-plano`, {
      tipoAssinaturaId,
    })
    .then((r) => r.data);
}

/** GET /api/empresa/:empresaId/cobranca-uso/:faturaId */
export function detalharFatura(
  empresaId: string,
  faturaId: number
): Promise<CobrancaUsoFaturaResponseDTO> {
  return api
    .get<CobrancaUsoFaturaResponseDTO>(`${BASE}/${empresaId}/cobranca-uso/${faturaId}`)
    .then((r) => r.data);
}
