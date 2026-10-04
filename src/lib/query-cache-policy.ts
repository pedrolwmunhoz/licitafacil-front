/**
 * Cache React Query — fonte única de verdade (frontend).
 *
 * ## System design (contrato de frescor)
 *
 * 1. **Navegação / troca de aba** → NÃO refetch enquanto fresca (`staleTime`).
 * 2. **Mutação do próprio usuário** → `invalidateUserMutation(...)` (só no onSuccess).
 * 3. **Outro usuário / outro device** → sem push; espera `staleTime` ou refresh explícito.
 * 4. **Keys** → SEMPRE via `queryKeys.*` (nunca literais soltos nas pages).
 *
 * Ver `doc/C4-ARCHITECTURE.md` §8.
 */
import type { QueryClient } from "@tanstack/react-query";

export const MS = {
  SECOND: 1_000,
  MINUTE: 60_000,
  HOUR: 3_600_000,
} as const;

export type CachePolicy = {
  staleTime: number;
  gcTime: number;
  refetchOnWindowFocus: boolean;
  refetchOnReconnect: boolean;
  refetchOnMount: boolean | "always";
};

const baseQuiet = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: true as const,
};

export const GLOBAL_QUERY_DEFAULTS: CachePolicy = {
  ...baseQuiet,
  staleTime: 10 * MS.MINUTE,
  gcTime: 30 * MS.MINUTE,
};

export const CACHE_LIVE: CachePolicy = {
  ...baseQuiet,
  staleTime: 1 * MS.MINUTE,
  gcTime: 10 * MS.MINUTE,
};

export const CACHE_SHORT: CachePolicy = {
  ...baseQuiet,
  staleTime: 5 * MS.MINUTE,
  gcTime: 20 * MS.MINUTE,
};

export const CACHE_MEDIUM: CachePolicy = {
  ...baseQuiet,
  staleTime: 15 * MS.MINUTE,
  gcTime: 40 * MS.MINUTE,
};

export const CACHE_LONG: CachePolicy = {
  ...baseQuiet,
  staleTime: 30 * MS.MINUTE,
  gcTime: 60 * MS.MINUTE,
};

/** Raízes — prefix match no invalidate. */
export const cacheRoots = {
  empresaDashboard: ["empresa", "dashboard"] as const,
  empresaEspelho: ["empresa", "espelho-ponto"] as const,
  empresaEspelhoListagem: ["empresa", "espelho-ponto-listagem"] as const,
  empresaPontoBh: ["empresa", "ponto"] as const,
  empresaBancoHorasListagem: ["empresa", "banco-horas-listagem"] as const,
  empresaBancoHorasResumo: ["empresa", "banco-horas-resumo"] as const,
  empresaFuncionarios: ["empresa", "funcionarios"] as const,
  empresaFuncionarioNomes: ["empresa", "funcionario-nomes"] as const,
  empresaFuncionarioPerfil: ["empresa", "funcionario-perfil"] as const,
  empresaSolicitacoes: ["empresa", "solicitacoes-ponto"] as const,
  empresaFeriados: ["empresa", "feriados"] as const,
  empresaFerias: ["empresa", "ferias-afastamentos"] as const,
  empresaPerfil: ["empresa", "perfil"] as const,
  empresaGeofences: ["empresa", "geofences"] as const,
  empresaAuditoria: ["empresa", "auditoria"] as const,
  empresaConfigInicial: ["empresa", "config-inicial-status"] as const,
  empresaCobranca: ["empresa", "cobranca-configurado"] as const,
  empresaFaturas: ["empresa", "faturas-cobranca"] as const,
  perfilDropdown: ["perfil"] as const,
  cartaoPontoHistorico: ["cartao-ponto-historico"] as const,

  funcionarioPonto: ["funcionario", "ponto"] as const,
  funcionarioBancoHoras: ["funcionario", "banco-horas-resumo"] as const,
  funcionarioSolicitacoes: ["funcionario", "solicitacoes-ponto"] as const,
  funcionarioPerfil: ["funcionario", "perfil"] as const,
  funcionarioEmpresaPerfil: ["funcionario", "empresa-perfil"] as const,
  funcionarioFerias: ["funcionario", "ferias-afastamentos"] as const,
} as const;

export type CacheDomain = keyof typeof cacheRoots;

/** Factories canônicas — único jeito de montar queryKey nas pages. */
export const queryKeys = {
  empresa: {
    dashboard: {
      root: () => [...cacheRoots.empresaDashboard] as const,
      metricasDia: () => [...cacheRoots.empresaDashboard, "metricas-dia"] as const,
      metricasPeriodo: (dataInicio: string, dataFim: string) =>
        [...cacheRoots.empresaDashboard, "metricas-dia-por-periodo", dataInicio, dataFim] as const,
    },
    perfil: () => [...cacheRoots.empresaPerfil] as const,
    geofences: (scope: "all" | "perfil" | string = "all") =>
      [...cacheRoots.empresaGeofences, scope] as const,
    funcionarioPerfil: (id: string) => [...cacheRoots.empresaFuncionarioPerfil, id] as const,
    funcionarioNomes: (scope = "filtro-select") =>
      [...cacheRoots.empresaFuncionarioNomes, scope] as const,
    funcionarios: (
      page: number,
      pageSize: number,
      nome: string,
      departamento: string,
      cargo: string,
      status: string
    ) =>
      [
        ...cacheRoots.empresaFuncionarios,
        page,
        pageSize,
        nome,
        departamento,
        cargo,
        status,
      ] as const,
    configInicial: () => [...cacheRoots.empresaConfigInicial] as const,
    /** Sempre com empresaId — uma shape só (dropdown + página). */
    cobranca: (empresaId: string) => [...cacheRoots.empresaCobranca, empresaId] as const,
    faturas: (empresaId: string) => [...cacheRoots.empresaFaturas, empresaId] as const,
    auditoria: (page: number, size: number) =>
      [...cacheRoots.empresaAuditoria, page, size] as const,
    auditoriaDetalhe: (id: string) => [...cacheRoots.empresaAuditoria, "detalhe", id] as const,
    bancoHorasListagem: (page: number, pageSize: number, nomeBusca: string) =>
      [...cacheRoots.empresaBancoHorasListagem, page, pageSize, nomeBusca] as const,
    bancoHorasResumoTudo: (funcionarioId: string) =>
      [...cacheRoots.empresaBancoHorasResumo, funcionarioId, "TUDO"] as const,
    bancoHorasResumoMensal: (funcionarioId: string, ano: number, mes: number) =>
      [...cacheRoots.empresaBancoHorasResumo, funcionarioId, "MENSAL", ano, mes] as const,
    pontoBh: (funcionarioId: string, ano: number, mes: number) =>
      [...cacheRoots.empresaPontoBh, "bh", funcionarioId, ano, mes] as const,
    espelhoListagem: (
      page: number,
      pageSize: number,
      nome: string,
      ano: number,
      mes: number
    ) => [...cacheRoots.empresaEspelhoListagem, page, pageSize, nome, ano, mes] as const,
    espelho: (
      funcionarioId: string,
      ano: number,
      mes: number,
      pontoPage: number,
      pontoSize: number
    ) =>
      [...cacheRoots.empresaEspelho, funcionarioId, ano, mes, pontoPage, pontoSize] as const,
    solicitacoes: (page: number, size: number, nome: string) =>
      [...cacheRoots.empresaSolicitacoes, page, size, nome] as const,
    feriados: (
      page: number,
      pageSize: number,
      nome: string | undefined,
      dataInicio: string | undefined,
      dataFim: string | undefined
    ) => [...cacheRoots.empresaFeriados, page, pageSize, nome, dataInicio, dataFim] as const,
    ferias: (page: number, size: number, filtroPorFuncionario: string) =>
      [...cacheRoots.empresaFerias, page, size, filtroPorFuncionario] as const,
  },

  funcionario: {
    perfil: () => [...cacheRoots.funcionarioPerfil] as const,
    empresaPerfil: () => [...cacheRoots.funcionarioEmpresaPerfil] as const,
    ponto: (funcionarioId: string, ano: number, mes: number) =>
      [...cacheRoots.funcionarioPonto, funcionarioId, ano, mes] as const,
    pontoBh: (funcionarioId: string, ano: number, mes: number) =>
      [...cacheRoots.funcionarioPonto, "bh", funcionarioId, ano, mes] as const,
    bancoHorasTudo: () => [...cacheRoots.funcionarioBancoHoras, "TUDO"] as const,
    bancoHorasMensal: (ano: number, mes: number) =>
      [...cacheRoots.funcionarioBancoHoras, "MENSAL", ano, mes] as const,
    solicitacoes: (page: number, size: number) =>
      [...cacheRoots.funcionarioSolicitacoes, page, size] as const,
    ferias: (page: number, size: number) =>
      [...cacheRoots.funcionarioFerias, page, size] as const,
  },

  perfilDropdown: (userType: string) => [...cacheRoots.perfilDropdown, userType] as const,

  cartaoPontoHistorico: (
    modo: string,
    funcionarioId: string,
    inicio?: string,
    fim?: string
  ) => [...cacheRoots.cartaoPontoHistorico, modo, funcionarioId, inicio, fim] as const,
} as const;

/**
 * Pacotes de invalidação — só ações com call site real.
 * Mutações: `invalidateUserMutation(qc, action)` exclusivamente no onSuccess.
 */
export const afterUserAction = {
  pontoEmpresa: [
    "empresaEspelho",
    "empresaEspelhoListagem",
    "empresaPontoBh",
    "empresaBancoHorasListagem",
    "empresaBancoHorasResumo",
    "empresaDashboard",
    "empresaAuditoria",
    "cartaoPontoHistorico",
  ] as const satisfies readonly CacheDomain[],

  /** Inclui solicitações: ajuste/remoção do funcionário geram pedido. */
  pontoFuncionario: [
    "funcionarioPonto",
    "funcionarioBancoHoras",
    "funcionarioSolicitacoes",
    "cartaoPontoHistorico",
  ] as const satisfies readonly CacheDomain[],

  funcionario: [
    "empresaFuncionarios",
    "empresaFuncionarioNomes",
    "empresaFuncionarioPerfil",
    "empresaDashboard",
    "empresaAuditoria",
  ] as const satisfies readonly CacheDomain[],

  solicitacaoEmpresa: [
    "empresaSolicitacoes",
    "empresaDashboard",
    "empresaEspelho",
    "empresaEspelhoListagem",
    "empresaPontoBh",
    "empresaBancoHorasResumo",
    "empresaAuditoria",
    "cartaoPontoHistorico",
  ] as const satisfies readonly CacheDomain[],

  feriado: ["empresaFeriados", "empresaAuditoria"] as const satisfies readonly CacheDomain[],

  feriasEmpresa: [
    "empresaFerias",
    "empresaBancoHorasResumo",
    "empresaDashboard",
    "empresaEspelho",
    "empresaAuditoria",
  ] as const satisfies readonly CacheDomain[],

  perfilEmpresa: [
    "empresaPerfil",
    "empresaGeofences",
    "perfilDropdown",
    "empresaConfigInicial",
    "funcionarioEmpresaPerfil",
  ] as const satisfies readonly CacheDomain[],

  configInicial: [
    "empresaConfigInicial",
    "empresaPerfil",
    "perfilDropdown",
  ] as const satisfies readonly CacheDomain[],

  cobranca: [
    "empresaCobranca",
    "empresaFaturas",
    "perfilDropdown",
  ] as const satisfies readonly CacheDomain[],

  dashboard: ["empresaDashboard"] as const satisfies readonly CacheDomain[],
} as const;

export type UserAction = keyof typeof afterUserAction;

function isUserAction(x: string): x is UserAction {
  return Object.prototype.hasOwnProperty.call(afterUserAction, x);
}

function isCacheDomain(x: string): x is CacheDomain {
  return Object.prototype.hasOwnProperty.call(cacheRoots, x);
}

export function domainsForAction(action: UserAction): readonly CacheDomain[] {
  return afterUserAction[action];
}

/**
 * Resolve actions/domains → lista deduplicada de roots.
 * Item desconhecido: throw em DEV; ignore em prod (não silenciar typo em dev).
 */
export function resolveInvalidationDomains(
  action: UserAction | readonly UserAction[] | readonly CacheDomain[]
): CacheDomain[] {
  const items = typeof action === "string" ? [action] : [...action];
  const domains = new Set<CacheDomain>();

  for (const item of items) {
    if (isUserAction(item)) {
      for (const d of afterUserAction[item]) domains.add(d);
    } else if (isCacheDomain(item)) {
      domains.add(item);
    } else if (import.meta.env.DEV) {
      throw new Error(`invalidateUserMutation: ação/domain desconhecido: ${String(item)}`);
    }
  }

  return [...domains];
}

/** Só após mutação bem-sucedida — nunca no close/cancel/navegação. */
export function invalidateUserMutation(
  queryClient: QueryClient,
  action: UserAction | readonly UserAction[] | readonly CacheDomain[]
): void {
  for (const d of resolveInvalidationDomains(action)) {
    void queryClient.invalidateQueries({ queryKey: [...cacheRoots[d]] });
  }
}

/** Prefixos de root como tuplas — para testes de conformidade de keys. */
export function allCacheRootPrefixes(): readonly (readonly string[])[] {
  return Object.values(cacheRoots).map((k) => [...k]);
}

export function queryKeyMatchesSomeRoot(queryKey: readonly unknown[]): boolean {
  const strParts = queryKey.filter((x): x is string => typeof x === "string");
  if (strParts.length === 0) return false;
  return allCacheRootPrefixes().some((prefix) => {
    if (strParts.length < prefix.length) return false;
    return prefix.every((p, i) => strParts[i] === p);
  });
}
