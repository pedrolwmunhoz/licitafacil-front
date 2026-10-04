/**
 * Catálogo central de planos no front (id = tipo_assinatura no banco).
 * Usar em landing, cadastro, admin, cobrança, SEO — nunca hardcode id/nome/preço fora daqui.
 */

export enum TipoAssinaturaId {
  ATE_10 = 1,
  ATE_25 = 2,
  ATE_50 = 3,
  TESTE = 4,
}

export type TipoAssinaturaPlano = {
  id: TipoAssinaturaId;
  nome: string;
  priceDisplay: string;
  priceValue: number;
  quantidadeFuncionarios: number;
};

/** Ordem de exibição (teste primeiro). */
export const TIPOS_ASSINATURA: readonly TipoAssinaturaPlano[] = [
  {
    id: TipoAssinaturaId.TESTE,
    nome: "Teste — 1 funcionário",
    priceDisplay: "R$\u00a02,99",
    priceValue: 2.99,
    quantidadeFuncionarios: 1,
  },
  {
    id: TipoAssinaturaId.ATE_10,
    nome: "Até 10 funcionários",
    priceDisplay: "R$\u00a079,90",
    priceValue: 79.9,
    quantidadeFuncionarios: 10,
  },
  {
    id: TipoAssinaturaId.ATE_25,
    nome: "Até 25 funcionários",
    priceDisplay: "R$\u00a0149,90",
    priceValue: 149.9,
    quantidadeFuncionarios: 25,
  },
  {
    id: TipoAssinaturaId.ATE_50,
    nome: "Até 50 funcionários",
    priceDisplay: "R$\u00a0289,90",
    priceValue: 289.9,
    quantidadeFuncionarios: 50,
  },
] as const;

/** Inclusões iguais em todos os planos. */
export const INCLUDED_IN_ALL_PLANS = [
  "Registro via App e Painel Web",
  "Banco de Horas automático",
  "Relatórios (PDF, Excel e AFDT)",
  "Gestão de Férias e Feriados",
  "Configuração de Áreas de Ponto",
  "Auditoria de Registros",
] as const;

const BY_ID = new Map<TipoAssinaturaId, TipoAssinaturaPlano>(
  TIPOS_ASSINATURA.map((p) => [p.id, p]),
);

export function isTipoAssinaturaId(value: unknown): value is TipoAssinaturaId {
  return typeof value === "number" && Number.isInteger(value) && BY_ID.has(value as TipoAssinaturaId);
}

export function parseTipoAssinaturaId(raw: string | null | undefined): TipoAssinaturaId | null {
  if (raw == null || raw === "") return null;
  const n = Number(raw);
  return isTipoAssinaturaId(n) ? n : null;
}

export function getTipoAssinatura(id: number | null | undefined): TipoAssinaturaPlano | undefined {
  if (id == null || !isTipoAssinaturaId(id)) return undefined;
  return BY_ID.get(id);
}

export function getNomeTipoAssinatura(id: number | null | undefined): string | null {
  return getTipoAssinatura(id)?.nome ?? null;
}

/** Planos comerciais (sem teste) — calculadoras etc. */
export const TIPOS_ASSINATURA_COMERCIAIS = TIPOS_ASSINATURA.filter(
  (p) => p.id !== TipoAssinaturaId.TESTE,
);
