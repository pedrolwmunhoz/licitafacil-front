import { describe, it, expect, vi } from "vitest";
import {
  afterUserAction,
  allCacheRootPrefixes,
  cacheRoots,
  domainsForAction,
  invalidateUserMutation,
  queryKeyMatchesSomeRoot,
  queryKeys,
  resolveInvalidationDomains,
  type CacheDomain,
  type UserAction,
} from "@/lib/query-cache-policy";

describe("query-cache-policy — contrato", () => {
  it("todo domain em afterUserAction existe em cacheRoots", () => {
    const rootKeys = new Set(Object.keys(cacheRoots));
    for (const [action, domains] of Object.entries(afterUserAction)) {
      for (const d of domains) {
        expect(rootKeys.has(d), `${action} → ${d}`).toBe(true);
      }
    }
  });

  it("prefixes de cacheRoots são únicos", () => {
    const seen = new Map<string, string>();
    for (const [name, key] of Object.entries(cacheRoots)) {
      const prefix = key.join("/");
      expect(seen.get(prefix), `duplicado ${prefix}`).toBeUndefined();
      seen.set(prefix, name);
    }
  });

  it("pontoFuncionario invalida solicitações + cartão", () => {
    const d = domainsForAction("pontoFuncionario");
    expect(d).toContain("funcionarioSolicitacoes");
    expect(d).toContain("funcionarioPonto");
    expect(d).toContain("cartaoPontoHistorico");
  });

  it("solicitacaoEmpresa invalida ponto BH (grade do banco de horas)", () => {
    expect(domainsForAction("solicitacaoEmpresa")).toContain("empresaPontoBh");
  });

  it("feriasEmpresa invalida espelho", () => {
    expect(domainsForAction("feriasEmpresa")).toContain("empresaEspelho");
  });

  it("cobranca key é canônica com empresaId", () => {
    expect(queryKeys.empresa.cobranca("abc")).toEqual([
      "empresa",
      "cobranca-configurado",
      "abc",
    ]);
    expect(queryKeys.empresa.faturas("abc")).toEqual([
      "empresa",
      "faturas-cobranca",
      "abc",
    ]);
  });

  it("queryKeys.empresa.dashboard fica sob root empresa/dashboard", () => {
    expect(queryKeys.empresa.dashboard.metricasDia().slice(0, 2)).toEqual([
      "empresa",
      "dashboard",
    ]);
  });

  it("todas as factories queryKeys começam em algum cacheRoot", () => {
    const samples: readonly unknown[][] = [
      [...queryKeys.empresa.dashboard.metricasDia()],
      [...queryKeys.empresa.perfil()],
      [...queryKeys.empresa.geofences("all")],
      [...queryKeys.empresa.funcionarioPerfil("id")],
      [...queryKeys.empresa.funcionarioNomes()],
      [...queryKeys.empresa.funcionarios(0, 10, "", "", "", "")],
      [...queryKeys.empresa.configInicial()],
      [...queryKeys.empresa.cobranca("e1")],
      [...queryKeys.empresa.faturas("e1")],
      [...queryKeys.empresa.auditoria(0, 10)],
      [...queryKeys.empresa.auditoriaDetalhe("x")],
      [...queryKeys.empresa.bancoHorasListagem(0, 10, "")],
      [...queryKeys.empresa.bancoHorasResumoTudo("f")],
      [...queryKeys.empresa.bancoHorasResumoMensal("f", 2026, 1)],
      [...queryKeys.empresa.pontoBh("f", 2026, 1)],
      [...queryKeys.empresa.espelhoListagem(0, 10, "", 2026, 1)],
      [...queryKeys.empresa.espelho("f", 2026, 1, 0, 10)],
      [...queryKeys.empresa.solicitacoes(0, 10, "")],
      [...queryKeys.empresa.feriados(0, 10, undefined, undefined, undefined)],
      [...queryKeys.empresa.ferias(0, 10, "")],
      [...queryKeys.funcionario.perfil()],
      [...queryKeys.funcionario.empresaPerfil()],
      [...queryKeys.funcionario.ponto("f", 2026, 1)],
      [...queryKeys.funcionario.pontoBh("f", 2026, 1)],
      [...queryKeys.funcionario.bancoHorasTudo()],
      [...queryKeys.funcionario.bancoHorasMensal(2026, 1)],
      [...queryKeys.funcionario.solicitacoes(0, 10)],
      [...queryKeys.funcionario.ferias(0, 10)],
      [...queryKeys.perfilDropdown("EMPRESA")],
      [...queryKeys.cartaoPontoHistorico("empresa", "f", "a", "b")],
    ];
    for (const key of samples) {
      expect(queryKeyMatchesSomeRoot(key), JSON.stringify(key)).toBe(true);
    }
  });

  it("resolveInvalidationDomains deduplica roots entre actions", () => {
    const domains = resolveInvalidationDomains(["pontoEmpresa", "dashboard"]);
    const dashCount = domains.filter((d) => d === "empresaDashboard").length;
    expect(dashCount).toBe(1);
  });

  it("invalidateUserMutation chama invalidateQueries por cada root", () => {
    const calls: unknown[] = [];
    const qc = {
      invalidateQueries: vi.fn((args: { queryKey: unknown }) => {
        calls.push(args.queryKey);
        return Promise.resolve();
      }),
    };
    invalidateUserMutation(qc as never, "dashboard");
    expect(qc.invalidateQueries).toHaveBeenCalledTimes(1);
    expect(calls[0]).toEqual(["empresa", "dashboard"]);
  });

  it("pontoEmpresa e funcionario invalidam o dashboard (sem helper paralelo)", () => {
    expect(domainsForAction("pontoEmpresa")).toContain("empresaDashboard");
    expect(domainsForAction("funcionario")).toContain("empresaDashboard");
    expect(domainsForAction("solicitacaoEmpresa")).toContain("empresaDashboard");
    expect(domainsForAction("feriasEmpresa")).toContain("empresaDashboard");
  });

  it("invalidateUserMutation com pontoEmpresa cobre espelho+bh+auditoria+cartão+dashboard", () => {
    const keys: string[][] = [];
    const qc = {
      invalidateQueries: vi.fn((args: { queryKey: string[] }) => {
        keys.push(args.queryKey);
        return Promise.resolve();
      }),
    };
    invalidateUserMutation(qc as never, "pontoEmpresa");
    const joined = keys.map((k) => k.join("/"));
    expect(joined).toContain("empresa/espelho-ponto");
    expect(joined).toContain("empresa/espelho-ponto-listagem");
    expect(joined).toContain("empresa/ponto");
    expect(joined).toContain("empresa/auditoria");
    expect(joined).toContain("empresa/dashboard");
    expect(joined).toContain("cartao-ponto-historico");
  });

  it("ação desconhecida lança em DEV", () => {
    expect(() =>
      resolveInvalidationDomains("acaoInexistente" as UserAction)
    ).toThrow(/desconhecido/);
  });

  it("afterUserAction não expõe actions mortas", () => {
    const actions = Object.keys(afterUserAction);
    expect(actions).not.toContain("solicitacaoFuncionario");
    expect(actions).not.toContain("perfilFuncionario");
    expect(actions).not.toContain("feriasFuncionario");
  });

  it("allCacheRootPrefixes retorna todos os roots", () => {
    expect(allCacheRootPrefixes().length).toBe(Object.keys(cacheRoots).length);
  });
});
