/** Tipos alinhados à documentação e aos DTOs do backend (doc.html + Java). */

import type { TipoUsuario } from "@/types/auth";

export interface Paginacao {
  totalPaginas: number;
  totalElementos: number;
  totalElementosPaginaAtual: number;
  paginaAtual: number;
}

export interface TelefoneListagemDto {
  codigoPais: string;
  ddd: string;
  numero: string;
}

/** Listagem exibe primeiroNome + ultimoNome na tabela. */
export interface FuncionarioListagemResponse {
  usuarioId: string;
  primeiroNome: string;
  ultimoNome: string;
  username: string;
  emails: string[];
  telefones: TelefoneListagemDto[];
  matricula?: string | null;
  cargo?: string | null;
  departamento?: string | null;
  ativo?: boolean;
}

/** GET /api/empresa/funcionario/nomes — item mínimo. */
export interface FuncionarioNomeItemResponse {
  usuarioId: string;
  nome: string;
}

/** GET /api/empresa/funcionario/nomes — mesma Paginacao das demais listagens. */
export interface FuncionarioNomeListagemPageResponse {
  paginacao: Paginacao;
  conteudo: FuncionarioNomeItemResponse[];
}

/** GET /api/empresa/funcionario — Doc id 18 */
export interface FuncionarioListagemPageResponse {
  paginacao: Paginacao;
  conteudo: FuncionarioListagemResponse[];
  funcionariosAtivos?: number;
  departamentos?: string[];
  cargos?: string[];
}

export interface FuncionarioListarParams {
  page?: number;
  pageSize?: number;
  nome?: string;
  departamento?: string;
  cargo?: string;
  status?: "ativo" | "inativo" | "";
}

/** GET /api/empresa/espelho-ponto/listagem — Doc id 40b */
export interface EspelhoPontoListagemResponse {
  usuarioId: string;
  nomeCompleto: string;
  totalHorasEsperadas: string;
  totalHorasTrabalhadas: string;
  totalHorasTrabalhadasFeriado: string;
}

export interface EspelhoPontoListagemPageResponse {
  paginacao: Paginacao;
  conteudo: EspelhoPontoListagemResponse[];
}

export interface EspelhoPontoListarParams {
  page?: number;
  pageSize?: number;
  nome?: string;
  ano?: number;
  mes?: number;
}

/** GET /api/empresa/banco-horas/listagem */
export interface BancoHorasListagemResponse {
  usuarioId: string;
  nomeCompleto: string;
  totalHorasExtras: string;
}

export interface BancoHorasListagemPageResponse {
  paginacao: Paginacao;
  conteudo: BancoHorasListagemResponse[];
}

export interface BancoHorasListarParams {
  page?: number;
  pageSize?: number;
  nome?: string;
}

/** Telefone (usuario_telefone). Doc id 12/16. */
export interface UsuarioTelefoneRequest {
  codigoPais: string;
  ddd: string;
  numero: string;
}

/** Tipo de contrato (tipo_contrato no schema: CLT, PJ, ESTAGIO). Só front; backend resolve por nome. */
export const TIPO_CONTRATO = ["CLT", "PJ", "ESTAGIO"] as const;
export type TipoContrato = (typeof TIPO_CONTRATO)[number];

/** Opções para select: id na ordem do INSERT (1=CLT, 2=PJ, 3=ESTAGIO). */
export const TIPO_CONTRATO_OPCOES: { id: number; descricao: TipoContrato }[] = [
  { id: 1, descricao: "CLT" },
  { id: 2, descricao: "PJ" },
  { id: 3, descricao: "ESTAGIO" },
];

export function tipoContratoFromId(id: number): TipoContrato | null {
  const o = TIPO_CONTRATO_OPCOES.find((x) => x.id === id);
  return o ? o.descricao : null;
}

export function tipoContratoToId(descricao: string): number | null {
  const o = TIPO_CONTRATO_OPCOES.find((x) => x.descricao === descricao);
  return o ? o.id : null;
}

/** Contrato funcionário (contrato_funcionario). Doc id 12/16. */
export interface ContratoFuncionarioRequest {
  matricula?: string | null;
  pisPasep?: string | null;
  cargo: string;
  departamento?: string | null;
  tipoContratoId: number;
  ativo: boolean;
  dataAdmissao: string; // yyyy-MM-dd
  dataDemissao?: string | null; // yyyy-MM-dd
  salarioMensal?: number | null;
  salarioHora?: number | null;
}

/** Tipo de escala jornada (tipo_escala_jornada). IDs = produção (1=5x2, 2=12x36, 3=6x1, 4=5x1). */
export const TIPO_ESCALA_JORNADA = ["5x2", "6x1", "5x1", "12x36"] as const;
export type TipoEscalaJornada = (typeof TIPO_ESCALA_JORNADA)[number];

/** Opções para select — ids alinhados ao banco em produção. */
export const TIPO_ESCALA_JORNADA_OPCOES: { id: number; descricao: TipoEscalaJornada }[] = [
  { id: 1, descricao: "5x2" },
  { id: 3, descricao: "6x1" },
  { id: 4, descricao: "5x1" },
  { id: 2, descricao: "12x36" },
];

export function tipoEscalaJornadaFromId(id: number): TipoEscalaJornada | null {
  const o = TIPO_ESCALA_JORNADA_OPCOES.find((x) => x.id === id);
  return o ? o.descricao : null;
}

export function tipoEscalaJornadaToId(descricao: string): number | null {
  const o = TIPO_ESCALA_JORNADA_OPCOES.find((x) => x.descricao === descricao);
  return o ? o.id : null;
}

/** Dia de trabalho conforme escala (espelha EscalaJornadaDias no backend). ISO folga 1=seg…7=dom. */
export function isDiaDeTrabalhoEscala(
  escala: TipoEscalaJornada | string | null | undefined,
  dataIso: string,
  inicioEscalaIso?: string | null,
  diasFolga?: number[] | null
): boolean {
  const [y, mo, d] = dataIso.split("-").map(Number);
  if (!y || !mo || !d) return false;
  const dia = new Date(y, mo - 1, d);
  const jsDow = dia.getDay(); // 0=dom … 6=sáb
  const isoDow = jsDow === 0 ? 7 : jsDow;
  const e = (escala ?? "5x2").trim();

  const ancoraStr = inicioEscalaIso || "1970-01-01";
  const [ay, am, ad] = ancoraStr.split("-").map(Number);
  const ancoraOk = !!(ay && am && ad);
  const ancora = ancoraOk ? new Date(ay, am - 1, ad) : new Date(1970, 0, 1);
  const diff = Math.floor((dia.getTime() - ancora.getTime()) / 86_400_000);

  if (e === "5x1") {
    if (diff < 0) return false;
    return diff % 6 < 5;
  }
  if (e === "12x36") {
    if (diff < 0) return false;
    return diff % 2 === 0;
  }

  const folgas =
    diasFolga && diasFolga.length > 0
      ? diasFolga
      : e === "6x1"
        ? [7]
        : [6, 7];
  return !folgas.includes(isoDow);
}

/** Jornada funcionário (jornada_funcionario_config). Durações em ISO-8601 (ex: PT8H). */
export interface JornadaFuncionarioConfigRequest {
  tipoEscalaJornadaId: number;
  cargaHorariaDiaria: string; // PT8H
  cargaHorariaSemanal: string; // PT44H
  toleranciaPadrao?: string | null; // PT0S
  /** Só leitura/perfil — no write o backend calcula pelo almoço. */
  intervaloPadrao?: string | null;
  tempoDescansoEntreJornada?: string | null; // PT11H
  entradaPadrao: string; // HH:mm
  saidaPadrao: string; // HH:mm
  inicioEscala: string; // yyyy-MM-dd
  diasFolga?: number[] | null; // ISO 1–7
  almocoInicio?: string | null; // HH:mm
  almocoFim?: string | null; // HH:mm
  gravaGeoObrigatoria: boolean;
  gravaPontoApenasEmGeofence?: boolean;
}

/** POST /api/empresa/funcionario — Doc id 12. Corpo conforme FuncionarioCreateRequest Java */
export interface FuncionarioCreateRequest {
  username: string;
  nomeCompleto: string;
  primeiroNome: string;
  ultimoNome: string;
  cpf: string;
  dataNascimento?: string | null;
  email: string;
  senha: string;
  usuarioTelefone?: UsuarioTelefoneRequest | null;
  contratoFuncionario?: ContratoFuncionarioRequest | null;
  jornadaFuncionarioConfig?: JornadaFuncionarioConfigRequest | null;
  geofenceIds?: string[] | null;
}

/** PUT /api/empresa/funcionario/:id — Doc id 16 */
export interface FuncionarioUpdateRequest {
  username: string;
  nomeCompleto: string;
  primeiroNome: string;
  ultimoNome: string;
  cpf: string;
  dataNascimento?: string | null;
  email: string;
  usuarioTelefone?: UsuarioTelefoneRequest | null;
  contratoFuncionario?: ContratoFuncionarioRequest | null;
  jornadaFuncionarioConfig?: JornadaFuncionarioConfigRequest | null;
  geofenceIds?: string[] | null;
}

/** POST .../resetar-senha — Doc id 13 */
export interface FuncionarioResetarSenhaRequest {
  senhaNova: string;
}

/** POST .../resetar-email — Doc id 14 */
export interface FuncionarioResetarEmailRequest {
  emailNovo: string;
}

/** GET /api/empresa/funcionario/:id/ponto ou /api/funcionario/:id/ponto — Doc 28/33. Resposta paginada com jornadas + config. */
export interface PontoListagemComConfigResponse {
  jornadas: PontoDiaResponse[];
  total: number;
  page: number;
  size: number;
  tempoDescansoEntreJornada: string;
  timezone?: string;
}
/** Uma jornada pode atravessar o dia; data = data da primeira batida. inconsistencias = derivadas na hora (ex.: IMPAR / Em aberto quando jornada ímpar). */
export interface PontoDiaResponse {
  jornada: string;
  data: string;
  diaSemana: string;
  status: string;
  marcacoes: {
    registroId: string;
    /** LocalDateTime já no timezone da batida (sem Z). */
    horario: string;
    timezone?: string;
    /** Instant UTC (com Z) — intervalo do histórico do cartão. */
    horarioUtc?: string;
    tipo?: "ENTRADA" | "SAIDA";
    inconsistencias?: string[];
    geoLatitude?: number | null;
    geoLongitude?: number | null;
  }[];
  totalHoras: string;
  quantidadeRegistros?: number;
  /** Carga prevista do dia (HH:mm). */
  horasEsperadas?: string;
  /** trabalhado − esperado (HH:mm com sinal); futuros = 00:00. */
  saldo?: string;
}

/** GET cartao-ponto/historico — rastro ativo+inativo no intervalo */
export interface HistoricoCartaoPontoResponse {
  inicio: string;
  fim: string;
  registros: {
    registroId: string;
    horario: string;
    timezone: string;
    ativo: boolean;
    status: "ATIVO" | "INATIVO" | string;
  }[];
}

export type BancoHorasStatusDia =
  | "TRABALHO"
  | "FOLGA"
  | "FERIADO"
  | "FERIAS"
  | "AFASTAMENTO"
  | "FALTA"
  | string;

export interface BancoHorasMovimentacaoResponse {
  data: string;
  statusDia: BancoHorasStatusDia;
  tipo: string;
  trabalhadas: string;
  esperadas: string;
  delta: string;
  observacao?: string | null;
}

export interface BancoHorasEscalaDiaResponse {
  data: string;
  diaSemana: number;
  status: BancoHorasStatusDia;
  label: string;
  cargaEsperada: string;
  detalhe?: string | null;
}

/** GET resumo-banco-horas — totais derivados do período (HH:mm; extras/créditos/débitos com sinal) */
export interface ResumoBancoHorasResponse {
  totalHorasTrabalhadas: string;
  totalHorasEsperadas: string;
  totalHorasFeriado: string;
  /** Saldo do período (trabalhadas − esperadas), com sinal. */
  totalHorasExtras: string;
  /** Soma dos deltas diários positivos. */
  totalCreditos: string;
  /** Soma dos deltas diários negativos (com sinal −). */
  totalDebitos: string;
  /** Dias com delta ≠ 0 (preenchido no período mensal). */
  movimentacoes?: BancoHorasMovimentacaoResponse[];
  /** Calendário da escala no período (preenchido no mensal). */
  escala?: BancoHorasEscalaDiaResponse[];
}



/** GET /api/empresa/perfil — Doc id 27 */
export interface EmpresaPerfilResponse {
  username: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  telefoneId?: string | null;
  codigoPais?: string;
  ddd?: string;
  numero?: string;
  rua?: string;
  numeroEndereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  timezone?: string;
  /** ISO-8601 Duration (ex: PT8H) */
  cargaDiariaPadrao?: string;
  /** ISO-8601 Duration (ex: PT44H) */
  cargaSemanalPadrao?: string;
  /** ISO-8601 Duration (ex: PT0S, PT30M, PT1H) */
  toleranciaPadrao?: string;
  /** ISO-8601 Duration (ex: PT1H) */
  intervaloPadrao?: string;
  controlePontoObrigatorio?: boolean;
  tipoModeloPonto?: string;
  tempoRetencao?: number;
  auditoriaAtiva?: boolean;
  assinaturaDigitalObrigatoria?: boolean;
  gravarGeolocalizacaoObrigatoria?: boolean;
  /** Ponto só aceito dentro de geofence cadastrado (empresa_jornada_config). */
  gravaPontoApenasEmGeofence?: boolean;
  permitirAjustePontoDireto?: boolean;
  /** Jornada padrão completa (null se ainda não configurada). */
  jornada?: EmpresaJornadaConfigRequest | null;
}

/** PUT /api/empresa/endereco — Doc id 7 */
export interface EmpresaEnderecoRequest {
  rua: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

/** POST /api/empresa/resetar-senha — Doc id 9 */
export interface EmpresaResetarSenhaRequest {
  senhaAntiga: string;
  senhaNova: string;
}

/** GET /api/empresa/config-inicial/status — Doc id 8. Primeira vez que a empresa faz login. */
export interface ConfigInicialStatusResponse {
  configInicialRealizada: boolean;
}

/** GET /api/empresa/metricas-dia — Métrica diária (hoje ou última cadastrada). */
export interface DashboardMetricasResponse {
  id: string;
  dataRef: string;
  anoRef: number;
  mesRef: number;
  quantidadeFuncionarios: number;
  solicitacoesPendentes: number;
  totalDoDia: string; // Duration ISO-8601 (ex: PT8H30M)
  totalPontoHoje: number;
}

/** Jornada padrão da empresa (config inicial / jornada-padrao). Durações em ISO-8601. */
export interface EmpresaJornadaConfigRequest {
  tipoEscalaJornadaId: number;
  cargaHorariaDiaria: string;
  cargaHorariaSemanal: string;
  toleranciaPadrao: string;
  /** Só leitura — no write o backend calcula pelo almoço. */
  intervaloPadrao?: string | null;
  tempoDescansoEntreJornada?: string | null;
  entradaPadrao: string; // HH:mm
  saidaPadrao: string; // HH:mm
  inicioEscala: string; // yyyy-MM-dd
  diasFolga?: number[] | null;
  almocoInicio?: string | null;
  almocoFim?: string | null;
  timezone: string;
  gravaGeoObrigatoria: boolean;
  gravaPontoApenasEmGeofence: boolean;
  permiteAjustePonto: boolean;
}

/** Banco de horas da empresa (config inicial) — só ativo. */
export interface EmpresaBancoHorasConfigRequest {
  ativo: boolean;
}

/** Geofence na configuração inicial (usuario_geofence). */
export interface UsuarioGeofenceRequest {
  descricao: string;
  latitude: number;
  longitude: number;
  raioMetros: number;
  ativo: boolean;
}

/** POST /api/empresa/config-inicial — Doc id 8. */
export interface EmpresaConfigInicialRequest {
  empresaJornadaConfig: EmpresaJornadaConfigRequest;
  empresaBancoHorasConfig: EmpresaBancoHorasConfigRequest;
  usuarioGeofence?: UsuarioGeofenceRequest[];
}

/** GET /api/funcionario/perfil — Doc id 26. Mesmo shape do editar (objetos aninhados). */
export interface FuncionarioPerfilResponse {
  username: string;
  funcionarioAtivo?: boolean;
  nomeCompleto?: string;
  primeiroNome?: string;
  ultimoNome?: string;
  cpf?: string;
  dataNascimento?: string;
  matricula?: string;
  email?: string;
  usuarioTelefone?: UsuarioTelefoneRequest | null;
  contratoFuncionario?: ContratoFuncionarioRequest | null;
  jornadaFuncionarioConfig?: JornadaFuncionarioConfigRequest | null;
  geofenceIds?: string[] | null;
}

/** POST registro manual: Instant UTC + timezone do device. */
export interface RegistroPontoManualRequest {
  horarioUtc: string; // Instant ISO com Z
  timezone: string;
  justificativa: string;
  observacao?: string | null;
  registroMetadados?: { geoLatitude?: number; geoLongitude?: number } | null;
}

/** POST /api/funcionario/comprovante-jornada/assinar — Doc id 35. Body: payloadBase64. Não persiste; retorna dados para embutir no PDF. */
export interface AssinarComprovanteJornadaResponse {
  assinaturaDigital?: string | null;
  certificadoSerial?: string | null;
  timestampAssinatura?: string | null; // LocalDateTime ex: yyyy-MM-ddTHH:mm:ss
}

// --- Solicitações de ponto (Doc ids 36, 37, 38) ---

export interface SolicitacaoPontoItemResponse {
  id: string;
  tipo: string;
  data: string; // LocalDate yyyy-MM-dd
  horario: string | null; // HH:mm do registro
  motivo: string;
  nomeFuncionario: string;
  status: string;
  observacao: string | null;
  observacaoAprovacao: string | null;
}

/** GET /api/empresa/solicitacoes-ponto — Doc id 36. Params: page, size */
export interface SolicitacoesPontoListagemResponse {
  items: SolicitacaoPontoItemResponse[];
  total: number;
  page: number;
  size: number;
  timezone?: string;
}

/** GET /api/funcionario/solicitacoes-ponto — Doc id 41b. Item sem nomeFuncionario. */
export interface SolicitacaoPontoItemFuncionarioResponse {
  id: string;
  tipo: string;
  data: string; // LocalDateTime ISO (data e hora do registro)
  motivo: string;
  status: string;
  observacao: string | null;
  observacaoAprovacao: string | null;
}

export interface SolicitacoesPontoListagemFuncionarioResponse {
  items: SolicitacaoPontoItemFuncionarioResponse[];
  total: number;
  page: number;
  size: number;
  timezone?: string;
}

/** POST /api/empresa/solicitacoes-ponto/:idRegistroPendente/aprovar — Doc id 37 */
export interface AprovarSolicitacaoRequest {
  observacao?: string | null;
}

/** POST /api/empresa/solicitacoes-ponto/:idRegistroPendente/reprovar — Doc id 38 */
export interface ReprovarSolicitacaoRequest {
  motivo: string;
  observacao?: string | null;
}

// --- Férias e afastamentos (Doc ids 39–42) ---

export interface FeriasAfastamentoItemResponse {
  nomeFuncionario: string | null;
  nomeAfastamento: string;
  inicio: string; // LocalDate yyyy-MM-dd
  fim: string | null;
  status: string;
}

/** GET /api/empresa/ferias-afastamentos ou /funcionario/ferias-afastamentos — Doc 39/41 */
export interface FeriasAfastamentosListagemResponse {
  items: FeriasAfastamentoItemResponse[];
  total: number;
  page: number;
  size: number;
}

/** Tipo de afastamento (tipo_afastamento no schema). Ordem do seed: id 1..5. Backend recebe id e faz findByIdAndAtivoTrue. */
export const TIPO_AFASTAMENTO = ["FERIAS", "LICENCA_MEDICA", "ATESTADO", "LICENCA_MATERNIDADE", "FALTA_JUSTIFICADA"] as const;
export type TipoAfastamento = (typeof TIPO_AFASTAMENTO)[number];

/** Opções para combobox: id na ordem do INSERT no schema (1=FERIAS, 2=LICENCA_MEDICA, 3=ATESTADO, 4=LICENCA_MATERNIDADE, 5=FALTA_JUSTIFICADA). */
export const TIPO_AFASTAMENTO_OPCOES: { id: number; descricao: TipoAfastamento; label: string }[] = [
  { id: 1, descricao: "FERIAS", label: "Férias" },
  { id: 2, descricao: "LICENCA_MEDICA", label: "Licença médica" },
  { id: 3, descricao: "ATESTADO", label: "Atestado" },
  { id: 4, descricao: "LICENCA_MATERNIDADE", label: "Licença maternidade" },
  { id: 5, descricao: "FALTA_JUSTIFICADA", label: "Falta justificada" },
];

/** POST /api/empresa/funcionario/:funcionarioId/afastamentos — Doc id 42 */
export interface CriarAfastamentoRequest {
  tipoAfastamentoId: number;
  dataInicio: string; // yyyy-MM-dd
  dataFim?: string | null;
  observacao?: string | null;
  ativo?: boolean;
}

// --- Feriados (Doc ids 57–60) ---

export interface FeriadoItemResponse {
  id: string;
  data: string; // yyyy-MM-dd
  descricao: string;
  tipoFeriadoId: number;
  tipoFeriadoDescricao: string;
  ativo: boolean;
  createdAt: string;
}

/** GET /api/empresa/feriados — Doc id 57 */
export interface FeriadoListagemPageResponse {
  paginacao: Paginacao;
  conteudo: FeriadoItemResponse[];
}

/** POST /api/empresa/feriados — Doc id 58. Empresa só pode ESTADUAL ou MUNICIPAL. */
export interface CriarFeriadoRequest {
  data: string; // yyyy-MM-dd
  descricao: string;
  tipoFeriadoId: number;
  ativo?: boolean;
}

/** PUT /api/empresa/feriados/:feriadoId — Doc id 59 */
export interface EditarFeriadoRequest {
  data: string;
  descricao: string;
  tipoFeriadoId: number;
  ativo?: boolean;
}

/** Tipo feriado: schema INSERT ordem NACIONAL, ESTADUAL, MUNICIPAL (id 1,2,3). Empresa só pode ESTADUAL e MUNICIPAL. */
export const TIPO_FERIADO_OPCOES_EMPRESA: { id: number; descricao: string; label: string }[] = [
  { id: 2, descricao: "ESTADUAL", label: "Estadual" },
  { id: 3, descricao: "MUNICIPAL", label: "Municipal" },
];

// --- Geofences (Doc ids 46, 47) ---

export interface GeofenceItemResponse {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  coordenadas: string;
  raio: number;
  createdAt: string;
  updatedAt: string;
}

/** GET /api/empresa/geofences — Params: page, size */
export interface GeofenceListagemPageResponse {
  paginacao: Paginacao;
  conteudo: GeofenceItemResponse[];
  timezone?: string;
}

/** POST /api/empresa/geofences — só dados do local. */
export interface CriarGeofenceRequest {
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  raioMetros: number;
  ativo?: boolean;
}

/** PUT /api/empresa/geofences/:geofenceId */
export interface AtualizarGeofenceRequest {
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  raioMetros: number;
  ativo?: boolean;
}

// --- Auditoria (Doc ids 50, 51) ---

export interface AuditoriaItemResponse {
  id: string;
  acao: string;
  descricao: string;
  data: string;
  nomeUsuario: string;
  sucesso: boolean;
}

export interface AuditoriaListagemResponse {
  items: AuditoriaItemResponse[];
  total: number;
  page: number;
  size: number;
  timezone?: string;
}

export interface AuditoriaDetalheResponse {
  usuarioId: string;
  nomeUsuario: string | null;
  username: string | null;
  acao: string;
  descricao: string;
  dadosAntigos: Record<string, unknown> | null;
  dadosNovos: Record<string, unknown> | null;
  dispositivoId: string | null;
  dispositivo: {
    id: string;
    deviceId: string;
    nome: string | null;
    modelo: string | null;
    sistemaOperacional: string | null;
    versaoApp: string | null;
    userAgent: string | null;
  } | null;
  ipAddress: string | null;
  sucesso: boolean;
  mensagemErro: string | null;
  createdAt: string;
}

/** GET /api/cobranca/confirmacao — retorno AbacatePay (ref assinado ou JWT empresa). */
export interface CobrancaConfirmacaoResponse {
  confirmado: boolean;
  valor: number | null;
  currency: string | null;
  transactionId: string | null;
}

/** GET /api/empresa/{id}/cobranca-uso/configurado */
export interface CobrancaConfiguradoResponse {
  configurado: boolean;
  cobrancaAtiva: boolean | null;
  tipoAssinaturaId: number | null;
  tipoAssinaturaProximoId?: number | null;
  assinaturaAtiva?: boolean | null;
  /** Fatura PAGO com periodo_fim >= agora (UTC). */
  adimplente?: boolean | null;
}

/** POST /api/empresa/:id/cobranca-uso/mudar-plano */
export interface MudarPlanoAssinaturaResponse {
  acao: "UPGRADE" | "DOWNGRADE" | string;
  tipoAssinaturaId: number;
  tipoAssinaturaProximoId: number | null;
  urlPagamento: string | null;
  faturaId: number | null;
}

/** POST /api/empresa/cadastro-com-plano — contratação na landing. */
export interface EmpresaCadastroComPlanoRequest {
  senha: string;
  razaoSocial: string;
  usuarioTelefone: UsuarioTelefoneRequest;
  tipoAssinaturaId: number;
  nome: string;
  cellphone: string;
  email: string;
  taxId: string;
}

export interface EmpresaCadastroComPlanoResponse {
  usuarioId: string;
  tipoUsuario: TipoUsuario;
  urlPagamento: string | null;
  faturaId: number | null;
  customerId: string | null;
}

/** Fatura mensal (plano fixo; snapshot do tipo na emissão). */
export interface CobrancaUsoFaturaResponseDTO {
  id: number;
  tipoAssinaturaId: number;
  tipoAssinaturaNome: string | null;
  periodoInicio: string;
  periodoFim: string;
  valorTotalCentavos: number;
  urlPagamento: string | null;
  status: string;
  createdAt: string;
}

/** Alias usado em api-empresa. */
export type CobrancaFatura = CobrancaUsoFaturaResponseDTO;

/** GET /api/empresa/:id/cobranca-uso — mesmo padrão das outras listagens (paginacao + conteudo). */
export interface CobrancaUsoFaturaListagemPageResponse {
  paginacao: Paginacao;
  conteudo: CobrancaUsoFaturaResponseDTO[];
}

